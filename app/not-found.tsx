import Link from "next/link";

export default function NotFound() {
  return (
    <main className="subpage checkout-result">
      <h1 className="section-title">
        404 — <em>Piece not found</em>
      </h1>
      <p className="catalog-state">The page you&apos;re looking for doesn&apos;t exist in the archive.</p>
      <Link href="/products" className="btn-primary">
        Go to catalog
      </Link>
    </main>
  );
}
