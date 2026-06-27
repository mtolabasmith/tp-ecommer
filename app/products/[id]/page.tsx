import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/lib/products";
import { formatPrice, categoryLabel } from "@/lib/format";
import AddToCartButton from "@/app/components/AddToCartButton";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found — The Archive" };
  return {
    title: `${product.name} — The Archive`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image_url,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/products" className="back-link">
        ← Back to catalog
      </Link>

      <div className="detail-layout">
        <div className="detail-media">
          <div className="jersey-card-image">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="jersey-photo"
                priority
              />
            ) : (
              <span className="product-card-noimg" aria-hidden="true">
                The Archive
              </span>
            )}
          </div>
        </div>

        <div className="detail-info">
          <div className="section-label">
            <span className="section-label-num">—</span>
            {categoryLabel(product.category)}
          </div>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="detail-desc">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
