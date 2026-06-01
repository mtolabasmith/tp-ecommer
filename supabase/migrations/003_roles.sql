alter table public.profiles
add column if not exists rol text not null default 'cliente';

create index if not exists idx_profiles_rol on public.profiles(rol);

create policy "Admins ven todas las ordenes"
  on public.orders for select
  using (
    auth.uid() in (
      select id from public.profiles where rol = 'admin'
    )
  );

create policy "Admins pueden actualizar ordenes"
  on public.orders for update
  using (
    auth.uid() in (
      select id from public.profiles where rol = 'admin'
    )
  );
