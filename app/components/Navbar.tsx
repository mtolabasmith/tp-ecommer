"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/is-admin")
      .then((r) => (r.ok ? r.json() : { admin: false }))
      .then((d) => {
        if (active) setIsAdmin(Boolean(d.admin));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!accountOpen) return;
    function onDown(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [accountOpen]);

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
        <Link href="/about">About</Link>
        {isAdmin ? (
          <div className="nav-account" ref={accountRef}>
            <button
              type="button"
              className="nav-account-trigger"
              aria-haspopup="true"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((o) => !o)}
            >
              Account <span className="nav-caret" aria-hidden="true">▾</span>
            </button>
            {accountOpen && (
              <div className="nav-account-menu" role="menu">
                <Link href="/account" role="menuitem" onClick={() => setAccountOpen(false)}>
                  My account
                </Link>
                <Link
                  href="/admin"
                  role="menuitem"
                  className="nav-admin"
                  onClick={() => setAccountOpen(false)}
                >
                  Admin panel
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link href="/account">Account</Link>
        )}
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
        <Link href="/about" onClick={close}>
          About
        </Link>
        <Link href="/faq" onClick={close}>
          FAQ
        </Link>
        <Link href="/account" onClick={close}>
          Account
        </Link>
        {isAdmin && (
          <Link href="/admin" onClick={close}>
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}
