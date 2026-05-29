import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { formatPrice } from "@/lib/format";
import LogoutButton from "@/app/components/LogoutButton";

export const metadata: Metadata = {
  title: "Mi cuenta — The Archive",
};

type OrderRow = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

export default async function AccountPage() {
  const user = await getSessionUser();

  if (!user) {
    return (
      <main className="subpage">
        <header className="subpage-header">
          <div className="section-label">
            <span className="section-label-num">—</span>
            Cuenta
          </div>
          <h1 className="section-title">
            Mi <em>cuenta</em>
          </h1>
        </header>
        <p className="catalog-state">Iniciá sesión para ver tu cuenta y tus órdenes.</p>
        <Link href="/login?redirect=/account" className="btn-primary">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("orders")
    .select("id, total, status, created_at")
    .order("created_at", { ascending: false });
  const orders = (data ?? []) as OrderRow[];

  return (
    <main className="subpage">
      <header className="admin-header">
        <div>
          <div className="section-label">
            <span className="section-label-num">—</span>
            Cuenta
          </div>
          <h1 className="section-title">
            Mi <em>cuenta</em>
          </h1>
          <p className="admin-user">{user.email}</p>
        </div>
        <LogoutButton />
      </header>

      <h2 className="cart-summary-title">Mis órdenes</h2>

      {orders.length === 0 ? (
        <div className="cart-page-empty">
          <p>Todavía no tenés órdenes.</p>
          <Link href="/products" className="btn-primary">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="admin-mono">{o.id.slice(0, 8)}…</td>
                  <td>{new Date(o.created_at).toLocaleString("es-AR")}</td>
                  <td>{formatPrice(o.total)}</td>
                  <td>
                    <span className={`order-status order-status--${o.status}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
