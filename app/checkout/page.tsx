"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/components/CartProvider";
import { createClient } from "@/utils/supabase/client";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, total, count, clear } = useCart();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        setUserEmail(data.user?.email ?? null);
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, []);

  async function handlePay() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            quantity: i.quantity,
            size: i.size,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start the payment");

      clear();
      if (data.url.startsWith("http")) {
        window.location.href = data.url; // external Mercado Pago
      } else {
        router.push(data.url); // internal demo mode
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout error");
      setLoading(false);
    }
  }

  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Checkout
        </div>
        <h1 className="section-title">
          Complete your <em>purchase</em>
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="cart-page-empty">
          <p>You have no products to buy.</p>
          <Link href="/products" className="btn-primary">
            Go to catalog
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-items" aria-label="Products to buy">
            <ul className="checkout-list" role="list">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="checkout-row">
                  <span className="checkout-row-name">
                    {item.name}
                    <span className="checkout-row-meta">
                      Size {item.size} · × {item.quantity}
                    </span>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="checkout-summary" aria-label="Summary and payment">
            <div className="cart-summary-row">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {!authChecked ? (
              <p className="catalog-state">Checking session…</p>
            ) : userEmail ? (
              <>
                <p className="checkout-user">Buying as {userEmail}</p>
                <button
                  type="button"
                  className="btn-primary checkout-pay"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? "Redirecting…" : "Pay with Mercado Pago"}
                </button>
              </>
            ) : (
              <>
                <p className="checkout-user">You need to sign in to pay.</p>
                <Link href="/login?redirect=/checkout" className="btn-primary checkout-pay">
                  Sign in
                </Link>
              </>
            )}

            {error && (
              <p className="auth-msg auth-msg--error" role="alert">
                {error}
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
