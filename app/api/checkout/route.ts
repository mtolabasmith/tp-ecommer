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
    return NextResponse.json({ error: "No valid products" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Asegura el perfil del comprador (orders.user_id referencia profiles.id).
  // El trigger de la migración 006 lo crea al registrarse; esto cubre
  // instancias donde la migración todavía no corrió.
  await supabase
    .from("profiles")
    .upsert({ id: user.id }, { onConflict: "id", ignoreDuplicates: true });

  // Crear la orden. Si todos los items existen en la base (id uuid), se usa
  // el stored procedure crear_orden_completa (migración 002): crea orden +
  // items y valida y descuenta stock en una sola transacción. Los items del
  // catálogo de respaldo (id slug) no están en la base, así que ese camino
  // inserta directo, sin product_id.
  let orderId: string;
  const allInDb = lineItems.every((li) => UUID_RE.test(li.id));

  if (allInDb) {
    const { data, error } = await supabase.rpc("crear_orden_completa", {
      p_user_id: user.id,
      p_items: lineItems.map((li) => ({
        product_id: li.id,
        quantity: li.quantity,
      })),
      p_total: total,
    });
    const result = Array.isArray(data) ? data[0] : data;
    if (error || !result?.success || !result?.orden_id) {
      const detail: string =
        result?.error_msg ?? error?.message ?? "Could not create the order";
      if (/stock/i.test(detail)) {
        return NextResponse.json(
          { error: "Not enough stock for one of the products in your cart" },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: detail }, { status: 500 });
    }
    orderId = result.orden_id;
  } else {
    const { data: order, error } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total, status: "pending" })
      .select()
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: error?.message ?? "Could not create the order" },
        { status: 500 }
      );
    }

    const rows = lineItems.map((li) => ({
      order_id: order.id,
      product_id: UUID_RE.test(li.id) ? li.id : null,
      quantity: li.quantity,
      price: li.price,
    }));
    const { error: itemsError } = await supabase.from("order_items").insert(rows);
    if (itemsError) {
      // No dejar una orden a medias si los items no se pudieron guardar.
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }
    orderId = order.id;
  }

  const baseUrl = request.nextUrl.origin;

  // Con Mercado Pago configurado: preferencia real
  if (isMpConfigured) {
    try {
      const url = await createPreference({
        orderId,
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
        { error: e instanceof Error ? e.message : "Mercado Pago error" },
        { status: 502 }
      );
    }
  }

  // Sin Mercado Pago: modo demo. La orden se confirma acá, del lado del
  // servidor y para el usuario autenticado de esta sesión; la página de
  // éxito es de solo lectura y no puede modificar órdenes.
  await supabase
    .from("orders")
    .update({ status: "paid", payment_id: "DEMO" })
    .eq("id", orderId)
    .eq("status", "pending");

  return NextResponse.json({
    url: `/checkout/success?order=${orderId}`,
    demo: true,
  });
}
