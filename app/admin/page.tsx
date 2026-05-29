import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Panel admin — The Archive",
};

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    return (
      <main className="subpage">
        <header className="subpage-header">
          <div className="section-label">
            <span className="section-label-num">—</span>
            Administración
          </div>
          <h1 className="section-title">
            Acceso <em>restringido</em>
          </h1>
        </header>
        <p className="catalog-state">
          Necesitás iniciar sesión como administrador para entrar al panel.
        </p>
        <Link href="/login?redirect=/admin" className="btn-primary">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  return <AdminClient adminEmail={admin.email ?? ""} />;
}
