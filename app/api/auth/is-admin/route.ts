import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

// GET /api/auth/is-admin -> { admin: boolean }
// Usa la MISMA lógica que protege /admin (requireAdmin -> ADMIN_EMAILS).
export async function GET() {
  const admin = await requireAdmin();
  return NextResponse.json({ admin: Boolean(admin) });
}
