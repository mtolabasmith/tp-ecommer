"use client";

import { useState } from "react";
import Link from "next/link";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand" aria-label="The Archive - Back to home">
              The <span>Archive</span>
            </Link>
            <p className="footer-tagline">
              A heritage collection of football&apos;s most iconic jerseys. Each piece holds
              a story. Each stitch carries a moment.
            </p>
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Collection</div>
            <nav aria-label="Collection links">
              <ul className="footer-links">
                <li>
                  <Link href="/products">Full Catalog</Link>
                </li>
                <li>
                  <Link href="/legends">Legends</Link>
                </li>
                <li>
                  <Link href="/finals">Eternal Finals</Link>
                </li>
                <li>
                  <Link href="/drops">Iconic Drops</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Account</div>
            <nav aria-label="Account links">
              <ul className="footer-links">
                <li>
                  <Link href="/account">My Account</Link>
                </li>
                <li>
                  <Link href="/cart">My Cart</Link>
                </li>
                <li>
                  <Link href="/login">Sign In</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-newsletter-col">
            <div className="footer-col-title">The Archive Letter</div>
            <p className="footer-newsletter-desc">
              New pieces. Rare drops. The stories behind the jerseys.
            </p>
            <form className="footer-form" onSubmit={handleSubscribe} noValidate>
              <div className="footer-input-wrap">
                <label htmlFor="newsletter-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className="footer-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                />
                <button type="submit" className="footer-submit">
                  Subscribe
                </button>
              </div>
              {status === "success" && (
                <p className="footer-msg footer-msg--success" role="status">
                  You&apos;re in. Welcome to The Archive.
                </p>
              )}
              {status === "error" && (
                <p className="footer-msg footer-msg--error" role="alert">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 The Archive. All rights reserved.</p>
          <p className="footer-note">Where football becomes heritage.</p>
        </div>
      </div>
    </footer>
  );
}
