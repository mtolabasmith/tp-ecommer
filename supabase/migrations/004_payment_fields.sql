alter table public.orders
add column if not exists metodo_pago text,
add column if not exists referencia_pago text,
add column if not exists pagado_en timestamp with time zone;

-- Nota: PostgreSQL NO soporta "create type if not exists" (da error de sintaxis).
-- Se usa un bloque DO idempotente equivalente para crear el ENUM solo si no existe.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'estado_orden') then
    create type estado_orden as enum (
      'pendiente', 'pagada', 'confirmada', 'enviada', 'entregada', 'cancelada'
    );
  end if;
end$$;
