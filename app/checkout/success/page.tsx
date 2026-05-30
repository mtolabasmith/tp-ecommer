import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/app/components/ClearCart";
import { createAdminClient, isAdminConfigured } from "@/utils/supabase/admin";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order — The Archive",
};

type SearchParams = {
  searchParams: Promise<{ order?: string; demo?: string; status?: string }>;
};

type OrderRow = { id: string; total: number; status: string } | null;

export default async function CheckoutSuccessPage({ searchParams }: SearchParams) {
  const { order, demo, status } = await searchParams;

  let orderData: OrderRow = null;
  let displayStatus = status ?? "pending";

  if (order && isAdminConfigured) {
    const supabase = createAdminClient();
    // Demo mode (no Mercado Pago): confirm the order here.
    if (demo === "1") {
      await supabase
        .from("orders")
        .update({ status: "paid", payment_id: "DEMO" })
        .eq("id", order)
        .eq("status", "pending");
    }
    const { data } = await supabase
      .from("orders")
      .select("id, total, status")
      .eq("id", order)
      .maybeSingle();
    orderData = data as OrderRow;
    if (orderData) displayStatus = orderData.status;
  } else if (demo === "1") {
    displayStatus = "paid";
  }

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
