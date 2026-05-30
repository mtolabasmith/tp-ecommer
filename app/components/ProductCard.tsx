"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice, categoryLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="jersey-card product-card">
      <Link
        href={`/products/${product.id}`}
        className="product-card-media"
        aria-label={`View ${product.name}`}
      >
        <div className="jersey-card-image">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="jersey-photo"
              loading="lazy"
            />
          ) : (
            <span className="product-card-noimg" aria-hidden="true">
              The Archive
            </span>
          )}
        </div>
      </Link>

      <div className="jersey-card-info">
        <Link href={`/products/${product.id}`} className="product-card-title">
          <h3 className="jersey-card-player">{product.name}</h3>
        </Link>
        <div className="jersey-card-detail">{categoryLabel(product.category)}</div>
        <div className="product-price">{formatPrice(product.price)}</div>
        <button
          type="button"
          className="btn-add-cart"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
