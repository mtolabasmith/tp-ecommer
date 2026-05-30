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
  const finals = products.filter((p) => p.category === "finales");
  const drops = products.filter((p) => p.category === "drops-iconicos").slice(0, 4);
  const spotlightProduct = products.find(
    (p) => /maradona/i.test(p.name) && p.name.includes("1986")
  );
  const spotlightImage =
    spotlightProduct?.image_url ??
    "/camisetas/leyendas/maradona/maradona-argentina-86-home.png";

  const visibleCount = 3;
  // En el home mostramos solo 10 leyendas como muestra; el catálogo completo está en /legends
  const carouselPool = legends.slice(0, 10);

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
              A curated archive of the most iconic football jerseys in history.
              Each piece holds a story. Each stitch carries the weight of a moment
              that changed how we see the game forever.
            </p>
            <div className="hero-ctas">
              <Link href="/products" className="btn-primary">
                Enter the Archive
              </Link>
              <Link href="#legends" className="btn-ghost">
                Explore Collection
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
            &ldquo;A football jersey is not a garment.
            <br />
            It is a document of what happened.&rdquo;
          </p>
          <div className="intro-divider"></div>
          <p className="intro-body">
            The Archive is a curated collection of football jerseys treated as historical
            objects. Here, every piece belongs to a larger story — of players who defined
            eras, of finals that will never be forgotten, of numbers that became mythology.
            This is not a store. This is a heritage collection.
          </p>
        </div>
      </section>

      {/* ============ 01 — LEGENDS ============ */}
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
            <Link href="/legends" className="section-link">
              Explore Legends
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
                    Add to Cart
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
              aria-label="Previous jersey"
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
              aria-label="Next jersey"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ============ 02 — ETERNAL FINALS ============ */}
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
            <Link href="/finals" className="section-link">
              Explore Finals
            </Link>
          </div>
        </div>

        <div className="finals-layout">
          {finals[0] && (
            <Link href={`/products/${finals[0].id}`} className="jersey-card finals-feature">
              <div className="jersey-card-image">
                {finals[0].image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={finals[0].image_url}
                    alt={finals[0].name}
                    className="jersey-photo"
                    loading="lazy"
                  />
                ) : (
                  <JerseySvg className="jersey-svg-lg" />
                )}
              </div>
              <div className="jersey-card-info">
                <div className="jersey-card-player">{finals[0].name}</div>
                <div className="jersey-card-era">{formatPrice(finals[0].price)}</div>
              </div>
            </Link>
          )}

          <div className="finals-sidebar">
            {finals.slice(1, 4).map((item) => (
              <Link
                href={`/products/${item.id}`}
                className="finals-sidebar-card"
                key={item.id}
              >
                <div className="finals-sidebar-image">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="jersey-photo"
                      loading="lazy"
                    />
                  ) : (
                    <JerseySvg className="jersey-svg-sm" />
                  )}
                </div>
                <div className="finals-sidebar-info">
                  <div className="sidebar-player">{item.name}</div>
                  <div className="sidebar-detail">{formatPrice(item.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03 — IMMORTAL NUMBERS ============ */}
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
          <div className="section-right">
            <Link href="/numbers" className="section-link">
              Explore Numbers
            </Link>
          </div>
        </div>

        <div className="numbers-grid">
          <div className="number-card">
            <div className="number-digit">10</div>
            <div className="number-title">The Creator&apos;s Number</div>
            <p className="number-desc">
              The number that separated genius from the rest. Worn by those who saw what
              others could not.
            </p>
            <div className="number-names">Pelé · Maradona · Zidane · Messi</div>
          </div>

          <div className="number-card">
            <div className="number-digit">7</div>
            <div className="number-title">The Number of Kings</div>
            <p className="number-desc">
              Flair. Danger. Inevitability. The number that promised something extraordinary
              every time.
            </p>
            <div className="number-names">Best · Cantona · Figo · Ronaldo CR7</div>
          </div>

          <div className="number-card">
            <div className="number-digit">9</div>
            <div className="number-title">The Striker&apos;s Inheritance</div>
            <p className="number-desc">
              Goals. Power. The pure and ancient art of finishing. The number that belongs to
              those born to score.
            </p>
            <div className="number-names">R9 · Van Nistelrooy · Lewandowski</div>
          </div>
        </div>
      </section>

      {/* ============ 04 — MADE HISTORY ============ */}
      <section className="section history" id="history">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">04</span>
              Made History
            </div>
            <h2 className="section-title">
              Jerseys Tied<br />
              <em>to Turning Points</em>
            </h2>
          </div>
          <div className="section-right">
            <Link href="/history" className="section-link">
              Explore Made History
            </Link>
          </div>
        </div>

        <div className="history-layout">
          <div className="history-timeline">
            <div className="history-item">
              <div className="history-year">1970</div>
              <div>
                <div className="history-title">Pelé&apos;s Final World Cup Shirt</div>
                <p className="history-desc">
                  The last jersey worn by the greatest in his final World Cup. Brazil won 4–1.
                  The world watched the game reach its highest point.
                </p>
                <span className="history-tag">World Cup · Mexico</span>
              </div>
            </div>

            <div className="history-item">
              <div className="history-year">1986</div>
              <div>
                <div className="history-title">The Hand of God</div>
                <p className="history-desc">
                  Maradona&apos;s Argentina shirt from the quarter-final against England.
                  Two goals. One hand. One genius. One legend cemented forever.
                </p>
                <span className="history-tag">World Cup · Mexico</span>
              </div>
            </div>

            <div className="history-item">
              <div className="history-year">1994</div>
              <div>
                <div className="history-title">Baggio&apos;s Last Penalty</div>
                <p className="history-desc">
                  The jersey worn when Roberto Baggio stepped forward in the final. The missed
                  penalty. The bowed head. The eternal image of football&apos;s grief.
                </p>
                <span className="history-tag">World Cup Final · USA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SPOTLIGHT ============ */}
      <section className="spotlight">
        <div className="spotlight-inner">
          <div>
            <div className="spotlight-jersey-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spotlightImage}
                alt="Maradona — Argentina, World Cup 1986"
                className="spotlight-photo"
              />
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
              No jersey carries the weight of this one. In the summer of 1986, a man from
              Villa Fiorito almost single-handedly guided Argentina to the World Cup title.
              The Hand of God. The Goal of the Century. The number 10 on the back of that
              jersey is no longer just a number. It is a myth.
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

            <Link
              href={spotlightProduct ? `/products/${spotlightProduct.id}` : "/legends"}
              className="btn-primary"
            >
              View This Piece
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 05 — ICONIC DROPS ============ */}
      <section className="section drops" id="drops">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">05</span>
              Iconic Drops
            </div>
            <h2 className="section-title">
              Rare Pieces<br />
              <em>For the Collector</em>
            </h2>
          </div>
          <div className="section-right">
            <Link href="/drops" className="section-link">
              Explore Drops
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
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
