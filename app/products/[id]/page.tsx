import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

  return (
    <main className="subpage">
      <Link href="/products" className="back-link">
        ← Back to catalog
      </Link>

      <div className="detail-layout">
        <div className="detail-media">
          <div className="jersey-card-image">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt={product.name} className="jersey-photo" />
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
          <div className="detail-stock">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
