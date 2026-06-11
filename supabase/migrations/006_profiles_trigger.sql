-- ============================================================
--  Perfiles automáticos
--  orders.user_id referencia public.profiles(id), pero nada creaba la fila
--  del perfil al registrarse un usuario: el primer checkout de un usuario
--  nuevo fallaba por la foreign key. Este trigger crea el perfil junto con
--  el usuario, y el backfill cubre a los usuarios ya registrados.
--  Ejecutar en Supabase: SQL Editor -> pegar este archivo -> Run.
-- ============================================================

-- security definer: el trigger corre sobre auth.users, que no es del mismo
-- dueño que public.profiles; search_path fijo para evitar resolución insegura.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: perfiles para los usuarios que se registraron antes del trigger.
insert into public.profiles (id)
select u.id
from auth.users u
on conflict (id) do nothing;
