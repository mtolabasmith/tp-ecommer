import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

/** Usuario autenticado actual (o null) leído desde las cookies de sesión. */
export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * ¿El usuario es admin?
 * - Si ADMIN_EMAILS está configurado, solo esos emails lo son.
 * - Si no se configuró, cualquier usuario autenticado es admin (modo demo).
 */
export function isAdmin(user: User | null): boolean {
  if (!user?.email) return false;
  const list = adminEmails();
  if (list.length === 0) return true;
  return list.includes(user.email.toLowerCase());
}

/** Devuelve el usuario admin o null si no autorizado. Para route handlers. */
export async function requireAdmin(): Promise<User | null> {
  const user = await getSessionUser();
  return isAdmin(user) ? user : null;
}
