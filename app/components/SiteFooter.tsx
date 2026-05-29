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
            <Link href="/" className="footer-brand" aria-label="The Archive - Volver al inicio">
              The <span>Archive</span>
            </Link>
            <p className="footer-tagline">
              Una colección patrimonial de las camisetas más icónicas del fútbol.
              Cada pieza guarda una historia.
            </p>
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Colección</div>
            <nav aria-label="Links de colección">
              <ul className="footer-links">
                <li>
                  <Link href="/products">Catálogo completo</Link>
                </li>
                <li>
                  <Link href="/products?category=leyendas">Leyendas</Link>
                </li>
                <li>
                  <Link href="/products?category=finales">Finales</Link>
                </li>
                <li>
                  <Link href="/products?category=drops-iconicos">Drops icónicos</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-links-col">
            <div className="footer-col-title">Cuenta</div>
            <nav aria-label="Links de cuenta">
              <ul className="footer-links">
                <li>
                  <Link href="/login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link href="/cart">Mi carrito</Link>
                </li>
                <li>
                  <Link href="/admin">Panel admin</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-newsletter-col">
            <div className="footer-col-title">The Archive Letter</div>
            <p className="footer-newsletter-desc">
              Nuevas piezas. Drops raros. Las historias detrás de las camisetas.
            </p>
            <form className="footer-form" onSubmit={handleSubscribe} noValidate>
              <div className="footer-input-wrap">
                <label htmlFor="newsletter-email" className="sr-only">
                  Tu dirección de email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className="footer-input"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                />
                <button type="submit" className="footer-submit">
                  Suscribirme
                </button>
              </div>
              {status === "success" && (
                <p className="footer-msg footer-msg--success" role="status">
                  Listo. Bienvenido a The Archive.
                </p>
              )}
              {status === "error" && (
                <p className="footer-msg footer-msg--error" role="alert">
                  Ingresá un email válido.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 The Archive. Todos los derechos reservados.</p>
          <p className="footer-note">Donde el fútbol se vuelve patrimonio.</p>
        </div>
      </div>
    </footer>
  );
}
