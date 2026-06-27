"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, count, total, isOpen, removeItem, updateQuantity, closeCart } =
    useCart();

  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />
      )}

      <aside
        className={`cart-panel ${isOpen ? "cart-panel--open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-panel-header">
          <div>
            <div className="cart-panel-label">YOUR ARCHIVE</div>
            <h2 className="cart-panel-title">The Cart</h2>
          </div>
          <button onClick={closeCart} className="cart-close" aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="cart-panel-body">
          {items.length === 0 ? (
            <p className="cart-empty">
              No pieces in your archive yet.
              <br />
              Start curating your collection.
            </p>
          ) : (
            <ul className="cart-items" role="list">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="cart-item cart-item--product">
                  <div className="cart-item-thumb" aria-hidden="true">
                    {item.image_url ? (
                      <Image src={item.image_url} alt="" fill sizes="64px" />
                    ) : null}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-player">{item.name}</div>
                    <div className="cart-item-size">Size {item.size}</div>
                    <div className="cart-item-era">{formatPrice(item.price)}</div>
                    <div className="cart-qty-controls">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="cart-item-remove"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-panel-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">TOTAL ({count})</span>
              <span className="cart-total-value">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="cart-checkout-btn"
              onClick={closeCart}
              style={{ display: "block", textAlign: "center", textDecoration: "none" }}
            >
              Checkout
            </Link>
            <Link href="/cart" onClick={closeCart} className="cart-view-link">
              View full cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
