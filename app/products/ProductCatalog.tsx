"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import type { Product } from "@/lib/types";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "leyendas", label: "Legends" },
  { value: "finales", label: "Finals" },
  { value: "drops-iconicos", label: "Iconic Drops" },
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "name", label: "Name A–Z" },
];

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loadedCategory, setLoadedCategory] = useState<string | null>(null);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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

  // Derived state: avoids calling setState synchronously inside the effect.
  const loading = loadedCategory !== category && errorCategory !== category;
  const error = errorCategory === category;

  const priceCeil = products.length
    ? Math.ceil(Math.max(...products.map((p) => p.price)))
    : 0;
  const effectiveMax = maxPrice ?? priceCeil;

  function selectCategory(value: string) {
    const params = new URLSearchParams();
    if (value) params.set("category", value);
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ""}`);
  }

  let visible = products
    .filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((p) => p.price <= effectiveMax);
  if (sort === "price-asc") visible = [...visible].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") visible = [...visible].sort((a, b) => b.price - a.price);
  else if (sort === "name") visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-filters" role="tablist" aria-label="Filter by category">
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
            Search jersey
          </label>
          <input
            id="catalog-search-input"
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="catalog-controls">
        <label className="catalog-control">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        {priceCeil > 0 && (
          <label className="catalog-control catalog-price">
            <span>Up to ${effectiveMax}</span>
            <input
              type="range"
              min={0}
              max={priceCeil}
              step={5}
              value={effectiveMax}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price"
            />
          </label>
        )}
      </div>

      {loading && (
        <div className="catalog-grid" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {error && (
        <p className="catalog-state catalog-state--error" role="alert">
          We couldn&apos;t load the catalog. Please try again later.
        </p>
      )}

      {!loading && !error && visible.length === 0 && (
        <p className="catalog-state">No products match your search.</p>
      )}

      {!loading && !error && visible.length > 0 && (
        <>
          <p className="catalog-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"}
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
