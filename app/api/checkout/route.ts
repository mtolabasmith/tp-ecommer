import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";
import { isMpConfigured, createPreference } from "@/lib/mercadopago";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type IncomingItem = { id: string; quantity: number };

// POST /api/checkout  -> crea la orden y arranca el pago
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "Tenés que iniciar sesión para comprar" },
      { status: 401 }
    );
  }
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "El servidor no tiene Supabase configurado (service role)" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const items: IncomingItem[] = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }

  // Recalcular precios desde el catálogo (no confiar en el cliente)
  const lineItems: { name: string; price: number; quantity: number; id: string }[] = [];
  let total = 0;
  for (const it of items) {
    const product = await getProduct(String(it.id));
    if (!product) continue;
    const quantity = Math.max(1, Number(it.quantity) || 1);
    total += product.price * quantity;
    lineItems.push({ id: product.id, name: product.name, price: product.price, quantity });
  }
  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No hay productos válidos" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Crear la orden (persistencia real)
  const { data: order, error } = await supabase
    .from("orders")
    .insert({ user_id: user.id, total, status: "pending" })
    .select()
    .single();

  if (error || !order) {
    return NextResponse.json(
      { error: error?.message ?? "No se pudo crear la orden" },
      { status: 500 }
    );
  }

  // Items de la orden. product_id solo si es un uuid real de Supabase.
  const rows = lineItems.map((li) => ({
    order_id: order.id,
    product_id: UUID_RE.test(li.id) ? li.id : null,
    quantity: li.quantity,
    price: li.price,
  }));
  await supabase.from("order_items").insert(rows);

  const baseUrl = request.nextUrl.origin;

  // Con Mercado Pago configurado: preferencia real
  if (isMpConfigured) {
    try {
      const url = await createPreference({
        orderId: order.id,
        baseUrl,
        items: lineItems.map((li) => ({
          title: li.name,
          quantity: li.quantity,
          unit_price: li.price,
        })),
      });
      return NextResponse.json({ url });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Error con Mercado Pago" },
        { status: 502 }
      );
    }
  }

  // Sin Mercado Pago: modo demo (la página de éxito confirma la orden)
  return NextResponse.json({
    url: `/checkout/success?order=${order.id}&demo=1`,
    demo: true,
  });
}
