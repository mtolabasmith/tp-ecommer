import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getProduct } from "@/lib/products";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";
import { isMpConfigured, createPreference } from "@/lib/mercadopago";
import { isProductSize, type ProductSize } from "@/lib/types";

type IncomingItem = { id: string; quantity: number; size: unknown };

// POST /api/checkout  -> crea la orden y arranca el pago
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { error: "You need to sign in to buy" },
      { status: 401 }
    );
  }
  if (!isAdminConfigured) {
    return NextResponse.json(
      { error: "Server is missing Supabase configuration (service role)" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const items: IncomingItem[] = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "The cart is empty" }, { status: 400 });
  }

  // Recalcular precios desde el catálogo (no confiar en el cliente)
  const lineItems: {
    name: string;
    price: number;
    quantity: number;
    id: string;
    size: ProductSize;
  }[] = [];
  let total = 0;
  for (const it of items) {
    if (!isProductSize(it.size)) {
      return NextResponse.json({ error: "Invalid or missing size" }, { status: 400 });
    }
    const product = await getProduct(String(it.id));
    if (!product) continue;
    const quantity = Math.max(1, Number(it.quantity) || 1);
    total += product.price * quantity;
    lineItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: it.size,
    });
  }
  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid products" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const rpcItems = lineItems.map((li) => ({
    product_id: li.id,
    quantity: li.quantity,
    size: li.size,
  }));

  const { data: rpcResult, error } = await supabase.rpc("crear_orden_completa", {
    p_user_id: user.id,
    p_items: rpcItems,
    p_total: total,
  });

  const result = Array.isArray(rpcResult) ? rpcResult[0] : rpcResult;

  if (error || !result?.success || !result?.orden_id) {
    return NextResponse.json(
      { error: error?.message ?? result?.error_msg ?? "Could not create the order" },
      { status: 500 }
    );
  }

  const orderId = String(result.orden_id);

  const baseUrl = request.nextUrl.origin;

  // Con Mercado Pago configurado: preferencia real
  if (isMpConfigured) {
    try {
      const url = await createPreference({
        orderId,
        baseUrl,
        items: lineItems.map((li) => ({
          title: `${li.name} · Size ${li.size}`,
          quantity: li.quantity,
          unit_price: li.price,
        })),
      });
      return NextResponse.json({ url });
    } catch (e) {
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Mercado Pago error" },
        { status: 502 }
      );
    }
  }

  // Sin Mercado Pago: modo demo (la página de éxito confirma la orden)
  return NextResponse.json({
    url: `/checkout/success?order=${orderId}&demo=1`,
    demo: true,
  });
}
