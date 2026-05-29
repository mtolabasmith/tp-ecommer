-- ============================================================
--  The Archive — esquema inicial
--  Ejecutar en Supabase: SQL Editor -> pegar este archivo -> Run.
--  Luego correr supabase/seed.sql para cargar el catálogo.
-- ============================================================

-- Perfiles de usuario (extiende auth.users de Supabase)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  created_at timestamp with time zone default now()
);

-- Productos (camisetas)
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  image_url text,
  category text not null default 'leyendas',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Si la tabla products ya existía sin estas columnas, las agrega (idempotente)
alter table public.products add column if not exists category text not null default 'leyendas';
alter table public.products add column if not exists updated_at timestamp with time zone default now();

create index if not exists products_category_idx on public.products (category);

-- Órdenes
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  status text not null default 'pending',
  total numeric(10,2) not null,
  payment_id text,
  created_at timestamp with time zone default now()
);

-- Items de cada orden
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null,
  price numeric(10,2) not null
);

-- ============================================================
--  RLS (Row Level Security)
-- ============================================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Productos: visibles para todos (catálogo público)
drop policy if exists "Products are viewable by everyone" on public.products;
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

-- Perfiles: cada usuario ve y edita el suyo
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Órdenes: cada usuario ve solo las propias
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Items: cada usuario ve solo los de sus órdenes
drop policy if exists "Users can view own order items" on public.order_items;
create policy "Users can view own order items"
  on public.order_items for select
  using (
    order_id in (
      select id from public.orders where user_id = auth.uid()
    )
  );

-- Nota: las escrituras de productos (admin) y de órdenes (checkout/webhook)
-- se hacen del lado del servidor con la service_role key, que evita RLS.
-- Por eso no se definen policies de INSERT/UPDATE/DELETE acá.
