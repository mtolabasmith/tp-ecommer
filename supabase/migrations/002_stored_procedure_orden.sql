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
begin
  insert into public.orders (user_id, total, status)
  values (p_user_id, p_total, 'pending')
  returning id into v_orden_id;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_product_id := (v_item->>'product_id')::uuid;
    v_quantity   := (v_item->>'quantity')::integer;

    select stock into v_stock
    from public.products
    where id = v_product_id;

    if v_stock is null then
      raise exception 'Producto no encontrado: %', v_product_id;
    end if;

    if v_stock < v_quantity then
      raise exception 'Stock insuficiente para producto: %', v_product_id;
    end if;

    insert into public.order_items (order_id, product_id, quantity, price)
    select v_orden_id, v_product_id, v_quantity, price
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
