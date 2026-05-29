"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { count, openCart } = useCart();

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <Link href="/" className="nav-brand">
        The <span>Archive</span>
      </Link>

      <ul className="nav-links" role="list">
        <li>
          <Link href="/products">Catálogo</Link>
        </li>
        <li>
          <Link href="/products?category=leyendas">Leyendas</Link>
        </li>
        <li>
          <Link href="/products?category=finales">Finales</Link>
        </li>
        <li>
          <Link href="/products?category=drops-iconicos">Drops</Link>
        </li>
      </ul>

      <div className="nav-utils">
        <Link href="/account">Cuenta</Link>
        <button
          type="button"
          className="nav-cart-btn"
          onClick={openCart}
          aria-label={`Abrir carrito, ${count} ${count === 1 ? "artículo" : "artículos"}`}
        >
          Carrito ({count})
        </button>
      </div>
    </nav>
  );
}
