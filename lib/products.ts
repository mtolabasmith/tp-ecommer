import { createClient } from "@supabase/supabase-js";
import { fallbackProducts } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cliente de solo lectura para el catálogo (RLS permite SELECT público). */
function readClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

function normalize(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    description: String(row.description ?? ""),
    price: Number(row.price ?? 0),
    stock: Number(row.stock ?? 0),
    image_url: String(row.image_url ?? ""),
    category: String(row.category ?? "leyendas"),
  };
}

/**
 * Lista de productos. Lee de Supabase y, si no está disponible o falla,
 * cae al catálogo estático para que la app nunca quede sin datos.
 */
export async function getProducts(category?: string): Promise<Product[]> {
  const supabase = readClient();
  if (supabase) {
    try {
      let query = supabase.from("products").select("*");
      if (category) query = query.eq("category", category);
      const { data, error } = await query.order("name");
      if (!error && data && data.length > 0) {
        return data.map(normalize);
      }
    } catch {
      // cae al fallback
    }
  }
  const list = fallbackProducts;
  return category ? list.filter((p) => p.category === category) : list;
}

/** Un producto por id. Mismo patrón Supabase -> fallback. */
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = readClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) return normalize(data);
    } catch {
      // cae al fallback
    }
  }
  return fallbackProducts.find((p) => p.id === id) ?? null;
}

/** Categorías disponibles, derivadas del catálogo. */
export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  return Array.from(new Set(products.map((p) => p.category))).sort();
}
