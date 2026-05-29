import { Suspense } from "react";
import type { Metadata } from "next";
import ProductCatalog from "./ProductCatalog";

export const metadata: Metadata = {
  title: "Catálogo — The Archive",
  description: "Explorá todas las camisetas: leyendas, finales y drops icónicos.",
};

export default function ProductsPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Catálogo
        </div>
        <h1 className="section-title">
          Todas las <em>piezas</em>
        </h1>
      </header>

      <Suspense fallback={<p className="catalog-state">Cargando catálogo…</p>}>
        <ProductCatalog />
      </Suspense>
    </main>
  );
}
