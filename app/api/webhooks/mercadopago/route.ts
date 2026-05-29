import { NextRequest, NextResponse } from "next/server";
import { getPayment } from "@/lib/mercadopago";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";

// Mercado Pago a veces hace un GET de verificación.
export function GET() {
  return NextResponse.json({ ok: true });
}

// POST /api/webhooks/mercadopago  -> notificación de pago
export async function POST(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const body = await request.json().catch(() => null);

    const type =
      url.searchParams.get("type") ??
      url.searchParams.get("topic") ??
      body?.type;
    const paymentId =
      url.searchParams.get("data.id") ??
      url.searchParams.get("id") ??
      body?.data?.id;

    // Solo nos interesan notificaciones de pago
    if (type !== "payment" || !paymentId || !isAdminConfigured) {
      return NextResponse.json({ received: true });
    }

    const payment = await getPayment(String(paymentId));
    const orderId: string | undefined = payment.external_reference;
    const status =
      payment.status === "approved"
        ? "paid"
        : payment.status === "rejected"
        ? "failed"
        : "pending";

    if (orderId) {
      const supabase = createAdminClient();
      await supabase
        .from("orders")
        .update({ status, payment_id: String(paymentId) })
        .eq("id", orderId);
    }

    return NextResponse.json({ received: true });
  } catch {
    // Siempre 200 para que Mercado Pago no reintente indefinidamente
    return NextResponse.json({ received: true });
  }
}
