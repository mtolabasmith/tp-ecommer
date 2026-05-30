"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { count, openCart } = useCart();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link href="/" className="nav-brand">
        The <span>Archive</span>
      </Link>

      <ul className="nav-links" role="list">
        <li>
          <Link href="/#legends">Legends</Link>
        </li>
        <li>
          <Link href="/#finals">Eternal Finals</Link>
        </li>
        <li>
          <Link href="/#numbers">Immortal Numbers</Link>
        </li>
        <li>
          <Link href="/#history">Made History</Link>
        </li>
        <li>
          <Link href="/#drops">Iconic Drops</Link>
        </li>
      </ul>

      <div className="nav-utils">
        <Link href="/account">Account</Link>
        <button
          type="button"
          className="nav-cart-btn"
          onClick={openCart}
          aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
        >
          Cart ({count})
        </button>
      </div>
    </nav>
  );
}
