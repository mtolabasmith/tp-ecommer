import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin panel — The Archive",
};

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    return (
      <main className="subpage">
        <header className="subpage-header">
          <div className="section-label">
            <span className="section-label-num">—</span>
            Administration
          </div>
          <h1 className="section-title">
            Access <em>restricted</em>
          </h1>
        </header>
        <p className="catalog-state">
          You need to sign in as an administrator to access the panel.
        </p>
        <Link href="/login?redirect=/admin" className="btn-primary">
          Sign in
        </Link>
      </main>
    );
  }

  return <AdminClient adminEmail={admin.email ?? ""} />;
}
