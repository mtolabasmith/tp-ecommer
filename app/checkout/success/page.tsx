import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import ClearCart from "@/app/components/ClearCart";
import { getSessionUser } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order — The Archive",
};

type SearchParams = {
  searchParams: Promise<{ order?: string; status?: string }>;
};

type OrderRow = { id: string; total: number; status: string } | null;

export default async function CheckoutSuccessPage({ searchParams }: SearchParams) {
  const { order, status } = await searchParams;

  // Página de solo lectura: la orden se confirma en el servidor
  // (POST /api/checkout en modo demo, o el webhook de Mercado Pago).
  // Se consulta con el cliente del usuario, así RLS garantiza que cada
  // uno solo puede ver sus propias órdenes.
  let orderData: OrderRow = null;
  const user = await getSessionUser();
  if (order && user) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase
      .from("orders")
      .select("id, total, status")
      .eq("id", order)
      .eq("user_id", user.id)
      .maybeSingle();
    orderData = data as OrderRow;
  }

  const displayStatus = orderData?.status ?? status ?? "pending";
  const failed = status === "failure" || displayStatus === "failed";

  return (
    <main className="subpage checkout-result">
      <ClearCart />

      {failed ? (
        <>
          <h1 className="section-title">Payment not completed</h1>
          <p className="catalog-state">
            The payment could not be processed. You can try again from your cart.
          </p>
          <Link href="/cart" className="btn-primary">
            Back to cart
          </Link>
        </>
      ) : (
        <>
          <div className="result-check" aria-hidden="true">
            ✓
          </div>
          <h1 className="section-title">
            Thanks for your <em>purchase</em>!
          </h1>
          <p className="catalog-state">
            {displayStatus === "paid"
              ? "Your payment was confirmed."
              : "We received your order. The payment status will update shortly."}
          </p>

          {orderData && (
            <div className="result-order">
              <div>
                <span>Order</span>
                <strong className="admin-mono">{orderData.id}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{formatPrice(orderData.total)}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong className={`order-status order-status--${displayStatus}`}>
                  {displayStatus}
                </strong>
              </div>
            </div>
          )}

          <Link href="/products" className="btn-primary">
            Keep exploring
          </Link>
        </>
      )}
    </main>
  );
}
