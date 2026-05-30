"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

const SECTION_LINKS = [
  { href: "/#legends", label: "Legends" },
  { href: "/#finals", label: "Eternal Finals" },
  { href: "/#numbers", label: "Immortal Numbers" },
  { href: "/#history", label: "Made History" },
  { href: "/#drops", label: "Iconic Drops" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link href="/" className="nav-brand" onClick={close}>
        The <span>Archive</span>
      </Link>

      <ul className="nav-links" role="list">
        {SECTION_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
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
        <button
          type="button"
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile ${menuOpen ? "is-open" : ""}`}>
        {SECTION_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>
            {l.label}
          </Link>
        ))}
        <Link href="/products" onClick={close}>
          Catalog
        </Link>
        <Link href="/account" onClick={close}>
          Account
        </Link>
      </div>
    </nav>
  );
}
