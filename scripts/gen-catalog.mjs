// Genera lib/data/catalog.ts a partir de supabase/seed.sql.
// Así el catálogo estático (fallback cuando Supabase no está disponible)
// queda siempre en sync con el seed de la base de datos.
//
//   node scripts/gen-catalog.mjs
//
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const sql = readFileSync(join(root, "supabase", "seed.sql"), "utf8");

// ('name', 'description', price, stock, '/img', 'category')
const tupleRe =
  /\(\s*'((?:[^']|'')*)'\s*,\s*'((?:[^']|'')*)'\s*,\s*([\d.]+)\s*,\s*(\d+)\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\)/g;

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const seen = new Map();
const products = [];

let m;
while ((m = tupleRe.exec(sql)) !== null) {
  const [, name, description, price, stock, imageUrl, category] = m;
  const base = slugify(imageUrl.replace(/^.*\//, "").replace(/\.[a-z0-9]+$/i, ""));
  let id = base;
  if (seen.has(id)) {
    const n = seen.get(id) + 1;
    seen.set(id, n);
    id = `${base}-${n}`;
  } else {
    seen.set(id, 1);
  }
  products.push({
    id,
    name: name.replace(/''/g, "'"),
    description: description.replace(/''/g, "'"),
    price: Number(price),
    stock: Number(stock),
    image_url: imageUrl,
    category,
  });
}

const header = `// AUTO-GENERADO por scripts/gen-catalog.mjs a partir de supabase/seed.sql.
// No editar a mano: editar el seed y volver a correr \`node scripts/gen-catalog.mjs\`.
// Sirve como catálogo de respaldo cuando Supabase no está disponible.
import type { Product } from "@/lib/types";

export const fallbackProducts: Product[] = `;

writeFileSync(
  join(root, "lib", "data", "catalog.ts"),
  header + JSON.stringify(products, null, 2) + ";\n",
  "utf8"
);

console.log(`OK: ${products.length} productos -> lib/data/catalog.ts`);
