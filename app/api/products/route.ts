import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";

// GET /api/products?category=leyendas  -> listado del catálogo
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? undefined;
  const products = await getProducts(category);
  return NextResponse.json(products);
}

// POST /api/products  -> crear producto (solo admin)
export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "name es obligatorio" }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price < 0) {
    return NextResponse.json(
      { error: "price debe ser un número >= 0" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: body.name.trim(),
      description: body.description ?? "",
      price: body.price,
      stock: typeof body.stock === "number" ? body.stock : 0,
      image_url: body.image_url ?? "",
      category: body.category ?? "leyendas",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
