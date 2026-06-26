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

const productIdAliases: Record<string, string> = {
  "50fff7fc-e10b-421a-b5d0-8d96b0713e7e": "ronaldihno-barcelona-06-07-home",
  "1f9e108d-55c1-41bc-85a5-4866f5ba9b27": "ronaldonazario-inter-01-02-home",
  "59843f2b-043a-4018-9fd4-13f9a839c6f6": "ronaldo-united-07-08-home",
  "fb6e84c6-ca14-4715-8f1f-4ad66956bfa1":
    "messi-argentina-2022-home-finaldelmundo",
  "b472bd71-9f0a-4985-90ca-e93f8ca6a821": "iniesta-espana-2010-finaldelmundo",
  "af92a365-025e-42a8-8853-b90f34dd88ae":
    "robertocarlos-brazil-01-01-finalmundial",
  "c7086961-48e7-4159-80cb-1620a937295d": "becken-alemania-76-home",
};

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
  const fallbackId = productIdAliases[id] ?? id;
  return fallbackProducts.find((p) => p.id === fallbackId) ?? null;
}

/** Categorías disponibles, derivadas del catálogo. */
export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  return Array.from(new Set(products.map((p) => p.category))).sort();
}
