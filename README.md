# The Archive — Tienda de camisetas históricas de fútbol

Aplicación web full-stack desarrollada para **Programación Web 2026 Q1 (PW 2026)**.
Es un e-commerce de camisetas de fútbol de colección, organizadas en tres categorías:
**Leyendas**, **Finales** y **Drops icónicos**.

> Demo de la grilla: este proyecto cubre los entregables E1–E6 y los criterios
> transversales (Funcionalidad, Código, Interfaz/Accesibilidad, Despliegue, Documentación).

---

## 🧱 Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Supabase** (PostgreSQL + Auth) como base de datos y autenticación
- **Mercado Pago** (Checkout Pro + webhook) para pagos
- **CSS** propio (sistema de diseño con variables) — sin framework de UI
- **GitHub Actions** para CI (lint + build) y **Vercel** para el despliegue

---

## ✨ Funcionalidades

| Entregable | Implementación |
|---|---|
| **E1 — Repo + CI/CD + preview** | GitHub Actions (`.github/workflows/ci.yml`) corre lint + build en cada push/PR. Preview por PR vía Vercel. |
| **E2 — Landing semántica y responsive** | Home (`app/page.tsx`) con HTML semántico, `aria-*`, y breakpoints en `app/styles.css`. |
| **E3 — Formularios + fetch + validación** | Login (`/login`), alta/edición en el admin y newsletter del footer, con validación y `fetch` a la API. |
| **E4 — Catálogo + API interna** | `/products` consume `GET /api/products` con filtros por categoría y búsqueda. Detalle en `/products/[id]`. |
| **E5 — CRUD en Supabase + admin** | Panel `/admin` con CRUD de productos y listado de órdenes, persistido en Supabase. |
| **E6 — Checkout + webhook** | `/checkout` crea la orden y una preferencia de Mercado Pago; el webhook actualiza el estado del pago. |

Otras: carrito persistente (localStorage) compartido entre páginas, panel de carrito
deslizable, fallback de catálogo si la base de datos no está disponible.

---

## 🚀 Puesta en marcha local

### 1. Requisitos
- Node.js 20+
- Una cuenta de [Supabase](https://supabase.com) y otra de [Mercado Pago](https://www.mercadopago.com.ar/developers) (opcional para el checkout)

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de entorno
```bash
cp .env.example .env.local
```
Completá `.env.local` con tus credenciales (ver tabla más abajo).

### 4. Base de datos (Supabase)
En el **SQL Editor** de tu proyecto Supabase:
1. Pegá y ejecutá `supabase/migrations/001_initial_schema.sql` (crea tablas + RLS).
2. Pegá y ejecutá `supabase/seed.sql` (carga ~70 camisetas).

> El catálogo estático de respaldo (`lib/data/catalog.ts`) se genera desde el seed con
> `node scripts/gen-catalog.mjs`, así nunca se desincronizan.

### 5. Correr en desarrollo
```bash
npm run dev
```
Abrí [http://localhost:3000](http://localhost:3000).

---

## 🔑 Variables de entorno

| Variable | Dónde se usa | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente y servidor | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` (o `..._PUBLISHABLE_KEY`) | Cliente y servidor | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor: CRUD admin, órdenes, webhook | Sí (para escribir) |
| `ADMIN_EMAILS` | Define quién entra a `/admin` (coma-separado) | No* |
| `MP_ACCESS_TOKEN` | Checkout con Mercado Pago | No** |

\* Si está vacío, **cualquier usuario autenticado** es admin (cómodo para la demo).
\*\* Sin token, el checkout funciona en **modo demo** (confirma la orden sin pago real).

---

## 🔌 API interna

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/products` | Lista de productos (acepta `?category=`) |
| `POST` | `/api/products` | Crear producto (admin) |
| `GET` | `/api/products/[id]` | Detalle de un producto |
| `PUT` | `/api/products/[id]` | Editar producto (admin) |
| `DELETE` | `/api/products/[id]` | Eliminar producto (admin) |
| `GET` | `/api/orders` | Listar órdenes (admin) |
| `POST` | `/api/checkout` | Crear orden + iniciar pago |
| `POST` | `/api/webhooks/mercadopago` | Webhook de Mercado Pago |

---

## 🗂️ Estructura

```
app/
  page.tsx                 # Landing (home)
  products/                # Catálogo + detalle ([id])
  cart/  checkout/  login/ # Carrito, checkout, auth
  admin/                   # Panel admin (CRUD + órdenes)
  api/                     # Route handlers (products, orders, checkout, webhook)
  components/              # Navbar, Footer, CartProvider, CartDrawer, ProductCard…
lib/
  products.ts              # Acceso a datos (Supabase + fallback)
  auth.ts                  # Sesión y verificación de admin
  mercadopago.ts           # Integración de pagos
  data/catalog.ts          # Catálogo de respaldo (autogenerado)
  types.ts                 # Tipos compartidos
utils/supabase/            # Clientes Supabase (browser/server/middleware/admin)
supabase/                  # Migración del esquema + seed
scripts/gen-catalog.mjs    # Genera el catálogo de respaldo desde el seed
```

---

## ☁️ Despliegue (Vercel)

1. Importá el repo en [Vercel](https://vercel.com/new).
2. Cargá las variables de entorno (las mismas de `.env.local`).
3. Deploy. Cada PR genera un **Preview Deployment** automático.
4. En Mercado Pago, configurá el webhook apuntando a
   `https://TU-DOMINIO/api/webhooks/mercadopago`.

---

## 📜 Scripts

```bash
npm run dev       # desarrollo
npm run build     # build de producción
npm run start     # servir el build
npm run lint      # linter
npm test          # tests unitarios (Vitest)
npm run test:e2e  # tests end-to-end (Playwright)
```

## ✅ Tests

- **Vitest** (unitarios): `npm test` — cubre la capa de datos (`lib/products`, fallback del catálogo) y los helpers (`lib/format`). Corren sin red ni base de datos. Se ejecutan también en CI.
- **Playwright** (e2e): primero `npx playwright install`, luego `npm run test:e2e` — levanta la app y prueba el flujo home → catálogo → agregar al carrito.
