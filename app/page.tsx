"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

function JerseySvg({ className }: { className?: string }) {
  return (
    <svg
      className={`jersey-svg${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      viewBox="0 0 80 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 24 L14 4 Q22 0 28 10 Q32 2 40 2 Q48 2 52 10 Q58 0 66 4 L80 24 L63 37 L58 33 L58 90 L22 90 L22 33 L17 37 Z"
        fill="rgba(200,168,75,0.10)"
        stroke="rgba(200,168,75,0.28)"
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomePage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const legends = products.filter((p) => p.category === "leyendas");
  const drops = products.filter((p) => p.category === "drops-iconicos").slice(0, 4);

  const visibleCount = 3;
  const carouselPool = legends;

  const handleNext = () => {
    if (carouselPool.length === 0) return;
    setCarouselDirection("next");
    setCarouselIndex((prev) => (prev + 1) % carouselPool.length);
  };

  const handlePrev = () => {
    if (carouselPool.length === 0) return;
    setCarouselDirection("prev");
    setCarouselIndex((prev) => (prev - 1 + carouselPool.length) % carouselPool.length);
  };

  const visibleJerseys =
    carouselPool.length > 0
      ? Array.from({ length: Math.min(visibleCount, carouselPool.length) }, (_, i) =>
          carouselPool[(carouselIndex + i) % carouselPool.length]
        )
      : [];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Featured Piece — Season Edition</div>
            <h1 className="hero-headline">
              Jerseys That<br />
              Carry the<br />
              <em>Weight of Time</em>
            </h1>
            <p className="hero-body">
              Un archivo curado de las camisetas más icónicas de la historia del fútbol.
              Cada pieza guarda una historia. Cada puntada lleva el peso de un momento.
            </p>
            <div className="hero-ctas">
              <Link href="/products" className="btn-primary">
                Entrar al archivo
              </Link>
              <Link href="#legends" className="btn-ghost">
                Explorar colección
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame-wrap">
              <div className="hero-jersey-box">
                <span className="hero-ghost-num" aria-hidden="true">
                  10
                </span>
                <JerseySvg className="jersey-svg-lg" />
              </div>
            </div>
            <div className="hero-jersey-meta">
              <div className="hero-jersey-meta-player">Diego Maradona</div>
              <div className="hero-jersey-meta-detail">
                Argentina · No. 10 · World Cup 1986
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="intro">
        <div className="intro-inner">
          <p className="intro-quote">
            &ldquo;Una camiseta de fútbol no es una prenda.
            <br />
            Es un documento de lo que pasó.&rdquo;
          </p>
          <div className="intro-divider"></div>
          <p className="intro-body">
            The Archive es una colección curada de camisetas de fútbol tratadas como
            objetos históricos. Cada pieza pertenece a una historia más grande — de
            jugadores que definieron épocas, de finales inolvidables, de números que se
            volvieron mitología.
          </p>
        </div>
      </section>

      {/* ============ 01 — LEGENDS (carrusel data-driven) ============ */}
      <section className="section legends" id="legends">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">01</span>
              Legends
            </div>
            <h2 className="section-title">
              The Icons<br />
              <em>Who Defined the Game</em>
            </h2>
          </div>
          <div className="section-right">
            <Link href="/products?category=leyendas" className="section-link">
              Explorar leyendas
            </Link>
          </div>
        </div>

        <div className="legends-carousel">
          <div
            className={`legends-grid carousel-track carousel-track-${carouselDirection}`}
            key={`${carouselIndex}-${carouselDirection}`}
          >
            {visibleJerseys.map((jersey, idx) => (
              <article className="jersey-card" key={`${jersey.id}-${idx}`}>
                <Link href={`/products/${jersey.id}`} className="product-card-media">
                  <div className="jersey-card-image">
                    {jersey.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={jersey.image_url}
                        alt={jersey.name}
                        className="jersey-photo"
                        loading="lazy"
                      />
                    ) : (
                      <JerseySvg className="jersey-svg-lg" />
                    )}
                  </div>
                </Link>

                <div className="jersey-card-info">
                  <Link href={`/products/${jersey.id}`} className="product-card-title">
                    <div className="jersey-card-player">{jersey.name}</div>
                  </Link>
                  <div className="jersey-card-era">{formatPrice(jersey.price)}</div>
                  <button
                    type="button"
                    onClick={() => addItem(jersey)}
                    className="btn-add-cart"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              onClick={handlePrev}
              className="carousel-arrow carousel-arrow-left"
              aria-label="Camiseta anterior"
            >
              ←
            </button>

            <span className="carousel-counter" aria-live="polite" aria-atomic="true">
              <span className="carousel-counter-current">
                {String(Math.min(carouselIndex + 1, carouselPool.length || 1)).padStart(2, "0")}
              </span>
              <span className="carousel-counter-sep"> / </span>
              <span className="carousel-counter-total">
                {String(carouselPool.length).padStart(2, "0")}
              </span>
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="carousel-arrow carousel-arrow-right"
              aria-label="Camiseta siguiente"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============ 02 — ETERNAL FINALS (editorial) ============ */}
      <section className="section finals" id="finals">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">02</span>
              Eternal Finals
            </div>
            <h2 className="section-title">
              The Matches<br />
              <em>Time Cannot Erase</em>
            </h2>
          </div>
          <div className="section-right">
            <Link href="/products?category=finales" className="section-link">
              Ver finales
            </Link>
          </div>
        </div>

        <div className="finals-layout">
          <Link href="/products?category=finales" className="jersey-card finals-feature">
            <div className="jersey-card-image">
              <span className="card-ghost-num" style={{ fontSize: "9rem" }} aria-hidden="true">
                1
              </span>
              <JerseySvg className="jersey-svg-lg" />
            </div>
            <div className="jersey-card-info">
              <div className="match-tag" style={{ display: "inline-block", marginBottom: "0.75rem" }}>
                Champions League Final · 1999
              </div>
              <div className="jersey-card-player">Manchester United</div>
              <div className="jersey-card-detail">Treble Season · Camp Nou · 26 May</div>
            </div>
          </Link>

          <div className="finals-sidebar">
            <Link href="/products?category=finales" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">5</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">World Cup Final · 2006</div>
                <div className="sidebar-player">Italy</div>
                <div className="sidebar-detail">Azzurri · Berlin · July 9</div>
              </div>
            </Link>

            <Link href="/products?category=finales" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">3</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">Champions League Final · 2005</div>
                <div className="sidebar-player">Liverpool</div>
                <div className="sidebar-detail">Istanbul · The great comeback</div>
              </div>
            </Link>

            <Link href="/products?category=finales" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">10</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">World Cup Final · 1970</div>
                <div className="sidebar-player">Brazil</div>
                <div className="sidebar-detail">Mexico City · The beautiful game</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 03 — IMMORTAL NUMBERS (editorial) ============ */}
      <section className="section numbers" id="numbers">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">03</span>
              Immortal Numbers
            </div>
            <h2 className="section-title">
              Numbers That<br />
              <em>Became Mythology</em>
            </h2>
          </div>
        </div>

        <div className="numbers-grid">
          <div className="number-card">
            <div className="number-digit">10</div>
            <div className="number-title">The Creator&apos;s Number</div>
            <p className="number-desc">
              El número que separó al genio del resto. Usado por quienes veían lo que otros
              no podían.
            </p>
            <div className="number-names">Pelé · Maradona · Zidane · Messi</div>
          </div>

          <div className="number-card">
            <div className="number-digit">7</div>
            <div className="number-title">The Number of Kings</div>
            <p className="number-desc">
              Talento. Peligro. Inevitabilidad. El número que prometía algo extraordinario
              cada vez.
            </p>
            <div className="number-names">Best · Cantona · Figo · CR7</div>
          </div>

          <div className="number-card">
            <div className="number-digit">9</div>
            <div className="number-title">The Striker&apos;s Inheritance</div>
            <p className="number-desc">
              Goles. Potencia. El arte puro y antiguo de definir. El número de los nacidos
              para convertir.
            </p>
            <div className="number-names">R9 · Van Nistelrooy · Lewandowski</div>
          </div>
        </div>
      </section>

      {/* ============ SPOTLIGHT ============ */}
      <section className="spotlight">
        <div className="spotlight-inner">
          <div>
            <div className="spotlight-jersey-box">
              <span className="spotlight-ghost-num" aria-hidden="true">10</span>
              <JerseySvg className="jersey-svg-lg" />
              <div className="spotlight-caption">
                <div className="spotlight-caption-text">
                  Argentina · World Cup 1986 · No. 10 — Ref. ARG-86-10
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="spotlight-eyebrow">Featured Exhibit</div>
            <h2 className="spotlight-headline">
              The Most Iconic<br />Jersey in<br />Football History
            </h2>
            <p className="spotlight-subtitle">Argentina · Maradona · Mexico 1986</p>
            <p className="spotlight-body">
              Ninguna camiseta carga el peso de esta. En el verano de 1986, un hombre de
              Villa Fiorito llevó casi en soledad a Argentina al título del mundo. La Mano
              de Dios. El Gol del Siglo. El número 10 dejó de ser un número: es un mito.
            </p>

            <div className="spotlight-stats">
              <div>
                <div className="stat-value">1986</div>
                <div className="stat-label">Year</div>
              </div>
              <div>
                <div className="stat-value">No. 10</div>
                <div className="stat-label">Shirt Number</div>
              </div>
              <div>
                <div className="stat-value">2</div>
                <div className="stat-label">Goals vs England</div>
              </div>
              <div>
                <div className="stat-value">Mexico</div>
                <div className="stat-label">Tournament</div>
              </div>
            </div>

            <Link href="/products?category=leyendas" className="btn-primary">
              Ver leyendas
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 05 — ICONIC DROPS (data-driven) ============ */}
      <section className="section drops" id="drops">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">04</span>
              Iconic Drops
            </div>
            <h2 className="section-title">
              Rare Pieces<br />
              <em>For the Collector</em>
            </h2>
          </div>
          <div className="section-right">
            <Link href="/products?category=drops-iconicos" className="section-link">
              Ver todos los drops
            </Link>
          </div>
        </div>

        <div className="drops-grid">
          {drops.map((drop) => (
            <article className="drop-card" key={drop.id}>
              <Link href={`/products/${drop.id}`} className="product-card-media">
                <div className="drop-card-image">
                  <span className="drop-badge">Drop</span>
                  {drop.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={drop.image_url}
                      alt={drop.name}
                      className="jersey-photo"
                      loading="lazy"
                    />
                  ) : (
                    <JerseySvg />
                  )}
                </div>
              </Link>
              <div className="drop-card-info">
                <Link href={`/products/${drop.id}`} className="product-card-title">
                  <div className="drop-player">{drop.name}</div>
                </Link>
                <div className="drop-detail">{formatPrice(drop.price)}</div>
                <button type="button" onClick={() => addItem(drop)} className="btn-add-cart">
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
