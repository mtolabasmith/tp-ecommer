"use client";

import { useCart } from "./CartProvider";

export default function Toast() {
  const { toast } = useCart();
  return (
    <div
      className={`toast ${toast ? "toast--show" : ""}`}
      role="status"
      aria-live="polite"
    >
      {toast && (
        <>
          ✓ Added <strong>{toast}</strong> to cart
        </>
      )}
    </div>
  );
}
