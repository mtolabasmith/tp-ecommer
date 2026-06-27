"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import {
  PRODUCT_SIZES,
  type Product,
  type ProductSize,
} from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<ProductSize | null>(null);
  const outOfStock = product.stock <= 0;

  return (
    <div className="detail-actions">
      <fieldset className="size-select">
        <legend className="option-label">Size</legend>
        <div className="size-options">
          {PRODUCT_SIZES.map((option) => (
            <button
              type="button"
              key={option}
              className={size === option ? "is-selected" : ""}
              aria-pressed={size === option}
              onClick={() => setSize(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="qty-select">
        <span className="option-label">Quantity</span>
        <div className="qty-controls" role="group" aria-label="Select quantity">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary detail-add-btn"
        disabled={outOfStock || !size}
        onClick={() => size && addItem(product, size, qty)}
      >
        {outOfStock ? "Out of stock" : size ? "Add to Cart" : "Choose a Size"}
      </button>
    </div>
  );
}
