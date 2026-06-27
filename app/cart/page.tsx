"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/components/CartProvider";
import { formatPrice, categoryLabel } from "@/lib/format";

export default function CartPage() {
  const { items, total, count, updateQuantity, removeItem, clear } = useCart();

  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Your cart
        </div>
        <h1 className="section-title">
          The <em>Cart</em>
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="cart-page-empty">
          <p>Your cart is empty.</p>
          <Link href="/products" className="btn-primary">
            Go to catalog
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <ul className="cart-page-list" role="list">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="cart-page-item">
                <Link href={`/products/${item.id}`} className="cart-page-thumb">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill sizes="80px" />
                  ) : null}
                </Link>

                <div className="cart-page-info">
                  <Link href={`/products/${item.id}`} className="cart-page-name">
                    {item.name}
                  </Link>
                  <div className="cart-page-cat">{categoryLabel(item.category)}</div>
                  <div className="cart-page-size">Size {item.size}</div>
                  <div className="cart-page-unit">{formatPrice(item.price)} each</div>
                </div>

                <div className="cart-page-qty">
                  <div className="qty-controls" role="group" aria-label={`Quantity of ${item.name}`}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-page-line">{formatPrice(item.price * item.quantity)}</div>

                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id, item.size)}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <aside className="cart-page-summary" aria-label="Order summary">
            <h2 className="cart-summary-title">Summary</h2>
            <div className="cart-summary-row">
              <span>Items</span>
              <span>{count}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="btn-primary cart-summary-checkout">
              Checkout
            </Link>
            <button type="button" className="cart-summary-clear" onClick={clear}>
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
