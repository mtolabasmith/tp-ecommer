import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://the-archive.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/products",
    "/legends",
    "/finals",
    "/numbers",
    "/history",
    "/drops",
    "/about",
    "/faq",
    "/login",
    "/cart",
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productEntries = products.map((p) => ({
      url: `${BASE}/products/${p.id}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // si falla el catálogo, devolvemos al menos las rutas estáticas
  }

  return [...staticEntries, ...productEntries];
}
