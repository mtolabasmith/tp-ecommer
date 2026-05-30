import { Suspense } from "react";
import type { Metadata } from "next";
import ProductCatalog from "./ProductCatalog";

export const metadata: Metadata = {
  title: "Catalog — The Archive",
  description: "Browse every jersey: legends, finals and iconic drops.",
};

export default function ProductsPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Catalog
        </div>
        <h1 className="section-title">
          All <em>pieces</em>
        </h1>
      </header>

      <Suspense fallback={<p className="catalog-state">Loading catalog…</p>}>
        <ProductCatalog />
      </Suspense>
    </main>
  );
}
