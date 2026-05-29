"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  { value: "", label: "Todas" },
  { value: "leyendas", label: "Leyendas" },
  { value: "finales", label: "Finales" },
  { value: "drops-iconicos", label: "Drops icónicos" },
];

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loadedCategory, setLoadedCategory] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    const url = category
      ? `/api/products?category=${encodeURIComponent(category)}`
      : "/api/products";

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: Product[]) => {
        if (active) {
          setProducts(data);
          setLoadedCategory(category);
        }
      })
      .catch(() => {
        if (active) setErrorCategory(category);
      });

    return () => {
      active = false;
    };
  }, [category]);

  // Estado derivado: evita setState síncrono dentro del effect.
  const loading = loadedCategory !== category && errorCategory !== category;
  const error = errorCategory === category;

  function selectCategory(value: string) {
    const params = new URLSearchParams();
    if (value) params.set("category", value);
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  }

  const visible = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-filters" role="tablist" aria-label="Filtrar por categoría">
          {CATEGORIES.map((c) => (
            <button
              key={c.value || "all"}
              type="button"
              role="tab"
              aria-selected={category === c.value}
              className={`catalog-filter ${category === c.value ? "is-active" : ""}`}
              onClick={() => selectCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="catalog-search">
          <label htmlFor="catalog-search-input" className="sr-only">
            Buscar camiseta
          </label>
          <input
            id="catalog-search-input"
            type="search"
            placeholder="Buscar por nombre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p className="catalog-state" aria-live="polite">Cargando catálogo…</p>}

      {error && (
        <p className="catalog-state catalog-state--error" role="alert">
          No pudimos cargar el catálogo. Intentá de nuevo más tarde.
        </p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="catalog-state">No hay productos para esta búsqueda.</p>
      )}

      {!loading && !error && visible.length > 0 && (
        <>
          <p className="catalog-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "pieza" : "piezas"}
          </p>
          <div className="catalog-grid">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
