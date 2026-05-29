import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Acceso — The Archive",
};

export default function LoginPage() {
  return (
    <main className="subpage auth-page">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Cuenta
        </div>
        <h1 className="section-title">
          Acceder al <em>Archivo</em>
        </h1>
      </header>

      <Suspense fallback={<p className="catalog-state">Cargando…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
