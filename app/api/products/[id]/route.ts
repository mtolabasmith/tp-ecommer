import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";

type Params = { params: Promise<{ id: string }> };

// GET /api/products/:id
export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// PUT /api/products/:id  -> actualizar (solo admin)
export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body inválido" }, { status: 400 });

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.name === "string") updates.name = body.name.trim();
  if (typeof body.description === "string") updates.description = body.description;
  if (typeof body.price === "number") updates.price = body.price;
  if (typeof body.stock === "number") updates.stock = body.stock;
  if (typeof body.image_url === "string") updates.image_url = body.image_url;
  if (typeof body.category === "string") updates.category = body.category;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(data);
}

// DELETE /api/products/:id  -> eliminar (solo admin)
export async function DELETE(_request: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
