"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const outOfStock = product.stock <= 0;

  return (
    <div className="detail-actions">
      <div className="qty-select">
        <span className="qty-label">Cantidad</span>
        <div className="qty-controls" role="group" aria-label="Seleccionar cantidad">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Restar uno"
          >
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Sumar uno"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary detail-add-btn"
        disabled={outOfStock}
        onClick={() => addItem(product, qty)}
      >
        {outOfStock ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
