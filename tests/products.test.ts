import { describe, it, expect } from "vitest";
import { getProducts, getProduct } from "@/lib/products";

// Sin variables de Supabase, getProducts usa el catálogo de respaldo
// (lib/data/catalog.ts), así que estos tests corren sin red ni base de datos.
describe("getProducts (fallback catalog)", () => {
  it("returns a non-empty catalog", async () => {
    const all = await getProducts();
    expect(all.length).toBeGreaterThan(0);
  });

  it("filters by category", async () => {
    const finals = await getProducts("finales");
    expect(finals.length).toBeGreaterThan(0);
    expect(finals.every((p) => p.category === "finales")).toBe(true);
  });

  it("every product has the required fields", async () => {
    const all = await getProducts();
    for (const p of all.slice(0, 5)) {
      expect(typeof p.id).toBe("string");
      expect(typeof p.name).toBe("string");
      expect(typeof p.price).toBe("number");
    }
  });
});

describe("getProduct", () => {
  it("returns a product by id", async () => {
    const all = await getProducts();
    const found = await getProduct(all[0].id);
    expect(found?.id).toBe(all[0].id);
  });

  it("returns null for an unknown id", async () => {
    expect(await getProduct("does-not-exist-xyz")).toBeNull();
  });
});
