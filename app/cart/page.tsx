"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import { formatPrice, categoryLabel } from "@/lib/format";

export default function CartPage() {
  const { items, total, count, updateQuantity, removeItem, clear } = useCart();

  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Tu carrito
        </div>
        <h1 className="section-title">
          The <em>Cart</em>
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="cart-page-empty">
          <p>Tu carrito está vacío.</p>
          <Link href="/products" className="btn-primary">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <ul className="cart-page-list" role="list">
            {items.map((item) => (
              <li key={item.id} className="cart-page-item">
                <Link href={`/products/${item.id}`} className="cart-page-thumb">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.name} loading="lazy" />
                  ) : null}
                </Link>

                <div className="cart-page-info">
                  <Link href={`/products/${item.id}`} className="cart-page-name">
                    {item.name}
                  </Link>
                  <div className="cart-page-cat">{categoryLabel(item.category)}</div>
                  <div className="cart-page-unit">{formatPrice(item.price)} c/u</div>
                </div>

                <div className="cart-page-qty">
                  <div className="qty-controls" role="group" aria-label={`Cantidad de ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Restar uno"
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Sumar uno"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-page-line">{formatPrice(item.price * item.quantity)}</div>

                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Quitar ${item.name}`}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <aside className="cart-page-summary" aria-label="Resumen de compra">
            <h2 className="cart-summary-title">Resumen</h2>
            <div className="cart-summary-row">
              <span>Artículos</span>
              <span>{count}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="btn-primary cart-summary-checkout">
              Finalizar compra
            </Link>
            <button type="button" className="cart-summary-clear" onClick={clear}>
              Vaciar carrito
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
