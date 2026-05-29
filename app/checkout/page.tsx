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
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago");

      clear();
      if (data.url.startsWith("http")) {
        window.location.href = data.url; // Mercado Pago externo
      } else {
        router.push(data.url); // modo demo interno
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el checkout");
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
          Finalizar <em>compra</em>
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="cart-page-empty">
          <p>No tenés productos para comprar.</p>
          <Link href="/products" className="btn-primary">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section className="checkout-items" aria-label="Productos a comprar">
            <ul className="checkout-list" role="list">
              {items.map((item) => (
                <li key={item.id} className="checkout-row">
                  <span className="checkout-row-name">
                    {item.name} <span className="checkout-row-qty">× {item.quantity}</span>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="checkout-summary" aria-label="Resumen y pago">
            <div className="cart-summary-row">
              <span>Artículos</span>
              <span>{count}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            {!authChecked ? (
              <p className="catalog-state">Verificando sesión…</p>
            ) : userEmail ? (
              <>
                <p className="checkout-user">Comprando como {userEmail}</p>
                <button
                  type="button"
                  className="btn-primary checkout-pay"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? "Redirigiendo…" : "Pagar con Mercado Pago"}
                </button>
              </>
            ) : (
              <>
                <p className="checkout-user">Necesitás iniciar sesión para pagar.</p>
                <Link href="/login?redirect=/checkout" className="btn-primary checkout-pay">
                  Iniciar sesión
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
