alter table public.order_items
add column if not exists size text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'order_items_size_check'
      and conrelid = 'public.order_items'::regclass
  ) then
    alter table public.order_items
    add constraint order_items_size_check
    check (size is null or size in ('S', 'M', 'L', 'XL'));
  end if;
end
$$;

create or replace function crear_orden_completa(
  p_user_id uuid,
  p_items jsonb,
  p_total numeric
)
returns table (
  orden_id uuid,
  success boolean,
  error_msg text
)
language plpgsql
as $$
declare
  v_orden_id uuid;
  v_item jsonb;
  v_stock integer;
  v_product_id uuid;
  v_quantity integer;
  v_size text;
  v_product_name text;
begin
  insert into public.orders (user_id, total, status)
  values (p_user_id, p_total, 'pending')
  returning id into v_orden_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_quantity := (v_item->>'quantity')::integer;
    v_size := nullif(upper(trim(v_item->>'size')), '');

    -- traemos stock y nombre del producto (y bloqueamos la fila)
    select stock, name into v_stock, v_product_name
    from public.products
    where id = v_product_id
    for update;

    if v_stock is null then
      raise exception 'Product not found';
    end if;

    -- valida el talle solo si vino (el front ya obliga a elegirlo)
    if v_size is not null and v_size not in ('S', 'M', 'L', 'XL') then
      raise exception 'Invalid size for %', v_product_name;
    end if;

    if v_stock < v_quantity then
      raise exception 'Not enough stock for %', v_product_name;
    end if;

    insert into public.order_items (order_id, product_id, quantity, price, size)
    select v_orden_id, v_product_id, v_quantity, price, v_size
    from public.products
    where id = v_product_id;

    update public.products
    set stock = stock - v_quantity
    where id = v_product_id;
  end loop;

  return query select v_orden_id, true, null::text;

exception when others then
  return query select null::uuid, false, sqlerrm;
end;
$$;
