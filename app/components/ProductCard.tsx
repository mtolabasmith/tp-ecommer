"use client";

import Link from "next/link";
import Image from "next/image";
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
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw"
              className="jersey-photo"
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
