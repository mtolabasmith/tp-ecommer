import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con service_role key. SOLO para usar del lado del
 * servidor (route handlers): evita las políticas RLS, así que nunca debe
 * exponerse al navegador ni importarse en componentes cliente.
 *
 * Se usa para:
 *  - CRUD de productos desde el panel admin
 *  - crear órdenes en el checkout
 *  - actualizar el estado de la orden desde el webhook de Mercado Pago
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export function createAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment."
    );
  }
  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
