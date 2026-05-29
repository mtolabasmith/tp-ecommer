import Link from "next/link";

export default function NotFound() {
  return (
    <main className="subpage checkout-result">
      <h1 className="section-title">
        404 — <em>Pieza no encontrada</em>
      </h1>
      <p className="catalog-state">La página que buscás no existe en el archivo.</p>
      <Link href="/products" className="btn-primary">
        Ir al catálogo
      </Link>
    </main>
  );
}
