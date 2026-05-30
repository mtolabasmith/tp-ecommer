import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Account — The Archive",
};

export default function LoginPage() {
  return (
    <main className="subpage auth-page">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Account
        </div>
        <h1 className="section-title">
          Access the <em>Archive</em>
        </h1>
      </header>

      <Suspense fallback={<p className="catalog-state">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
