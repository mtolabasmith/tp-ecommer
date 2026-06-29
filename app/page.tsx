"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const HISTORY_MOMENTS = [
  {
    year: "1958",
    title: "The Youngest King",
    description:
      "Pelé arrived in Sweden at seventeen and left as the youngest World Cup winner in history. A debut that announced football's new king.",
    meta: "World Cup · Sweden",
    query: "Pelé",
    productMatch: /pel[eé].*1958/i,
    fallbackImage: "/camisetas/leyendas/pele/brazil-1958-58-home.png",
  },
  {
    year: "1986",
    title: "The Hand of God",
    description:
      "Maradona's Argentina shirt from the quarter-final against England. Two goals. One hand. One genius. One legend cemented forever.",
    meta: "World Cup · Mexico",
    query: "Maradona",
    productMatch: /maradona.*1986/i,
    fallbackImage: "/camisetas/leyendas/maradona/maradona-argentina-86-home.png",
  },
  {
    year: "2010",
    title: "The Goal That Changed Spain",
    description:
      "In the 116th minute, Iniesta found the corner and gave Spain its first World Cup. One strike turned a generation into champions.",
    meta: "World Cup Final · South Africa",
    query: "Iniesta",
    productMatch: /iniesta.*2010/i,
    fallbackImage: "/camisetas/camisetad-finales/iniesta-españa-2010-finaldelmundo.png",
  },
] as const;

function rarityFor(price: number): { key: string; label: string } {
  if (price >= 125) return { key: "grail", label: "Grail" };
  if (price >= 115) return { key: "epic", label: "Epic" };
  if (price >= 105) return { key: "rare", label: "Rare" };
  return { key: "classic", label: "Classic" };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [drops, setDrops] = useState<Product[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next");
  const [revealedDrops, setRevealedDrops] = useState<Set<string>>(new Set());

  function revealDrop(id: string) {
    setRevealedDrops((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => {
        setProducts(data);
        // Surtido random de drops (estilo Night Market), barajado al cargar
        const pool = data.filter((p) => p.category === "drops-iconicos");
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        setDrops(pool.slice(0, 4));
      })
      .catch(() => setProducts([]));
  }, []);

  const legends = products.filter((p) => p.category === "leyendas");
  const finals = products.filter((p) => p.category === "finales");
  const finalsPreview = finals.slice(0, 3);
  const [selectedFinalId, setSelectedFinalId] = useState<string | null>(null);
  const selectedFinal =
    finalsPreview.find((product) => product.id === selectedFinalId) ?? finalsPreview[0];
  const [selectedHistoryYear, setSelectedHistoryYear] = useState("1958");
  const historyMoments = HISTORY_MOMENTS.map((moment) => ({
    ...moment,
    product: products.find((product) => moment.productMatch.test(product.name)),
  }));
  const selectedHistory =
    historyMoments.find((moment) => moment.year === selectedHistoryYear) ?? historyMoments[0];
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
                <Image
                  src="/camisetas/leyendas/maradona/maradona-argentina-86-home.png"
                  alt="Diego Maradona Argentina 1986 jersey"
                  width={800}
                  height={800}
                  className="hero-jersey-image"
                  priority
                />
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
          <div className="intro-statement">
            <blockquote className="intro-quote">
              &ldquo;A football jersey is not a garment.
              <br />
              <em>It is a document of what happened.</em>&rdquo;
            </blockquote>
          </div>

          <div className="intro-context">
            <p className="intro-body">
              The Archive is a curated collection of football jerseys treated as historical
              objects. Every piece belongs to a larger story: players who defined eras,
              finals that cannot be forgotten, and numbers that became mythology.
            </p>
          </div>
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
                      <Image
                        src={jersey.image_url}
                        alt={jersey.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="jersey-photo"
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
                  <Link href={`/products/${jersey.id}`} className="btn-add-cart">
                    Choose Size
                  </Link>
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

        {selectedFinal && (
          <div className="finals-layout">
            <article className="finals-feature">
              <Link
                href={`/products/${selectedFinal.id}`}
                className="finals-feature-visual"
                aria-label={`View ${selectedFinal.name}`}
              >
                <span className="finals-feature-label">Featured Final</span>
                <span className="finals-feature-year" aria-hidden="true">
                  {selectedFinal.name.match(/(?:19|20)\d{2}|\d{2}\/\d{2}/)?.[0] ?? "Final"}
                </span>
                {selectedFinal.image_url ? (
                  <Image
                    key={selectedFinal.id}
                    src={selectedFinal.image_url}
                    alt={selectedFinal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="finals-feature-image"
                  />
                ) : (
                  <JerseySvg className="jersey-svg-lg" />
                )}
              </Link>

              <div className="finals-feature-copy" key={`${selectedFinal.id}-copy`}>
                <div className="finals-feature-meta">
                  <span>{selectedFinal.name.split("·").slice(1).join(" · ").trim()}</span>
                  <span>{formatPrice(selectedFinal.price)}</span>
                </div>
                <h3>{selectedFinal.name.split("·")[0].trim()}</h3>
                <p>{selectedFinal.description}</p>
                <Link href={`/products/${selectedFinal.id}`} className="finals-view-link">
                  View Piece
                </Link>
              </div>
            </article>

            <div className="finals-index" aria-label="Featured finals">
              {finalsPreview.map((item, index) => {
                const isActive = item.id === selectedFinal.id;
                const nameParts = item.name.split("·").map((part) => part.trim());

                return (
                  <Link
                    href={`/products/${item.id}`}
                    className={`finals-index-item${isActive ? " is-active" : ""}`}
                    key={item.id}
                    onMouseEnter={() => setSelectedFinalId(item.id)}
                    onFocus={() => setSelectedFinalId(item.id)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="finals-index-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="finals-index-image">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt=""
                          fill
                          sizes="110px"
                          className="jersey-photo"
                        />
                      ) : (
                        <JerseySvg className="jersey-svg-sm" />
                      )}
                    </div>
                    <div className="finals-index-copy">
                      <span>{nameParts.slice(2).join(" · ") || "Historic Final"}</span>
                      <h3>{nameParts[0]}</h3>
                      <div>
                        <span>{nameParts[1]}</span>
                        <span>{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <span className="finals-index-arrow" aria-hidden="true">↗</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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

        <div className="numbers-formation">
          <div className="formation-row forwards">
            <Link
              href="/products?q=Ronaldinho"
              className="formation-player left-wing"
            >
              <div className="formation-pos">Left Wing</div>
              <div className="formation-number">11</div>
              <div className="formation-name">Ronaldinho</div>
            </Link>
            <Link
              href="/products?q=Ronaldo%20Naz%C3%A1rio"
              className="formation-player striker"
            >
              <div className="formation-pos">Striker</div>
              <div className="formation-number">9</div>
              <div className="formation-name">R. Nazário</div>
            </Link>
            <Link
              href="/products?q=Cristiano%20Ronaldo"
              className="formation-player right-wing"
            >
              <div className="formation-pos">Right Wing</div>
              <div className="formation-number">7</div>
              <div className="formation-name">Cristiano</div>
            </Link>
          </div>
          <div className="formation-row midfield">
            <Link
              href="/products?q=Messi"
              className="formation-player attacking-mid"
            >
              <div className="formation-pos">Attacking Mid</div>
              <div className="formation-number">10</div>
              <div className="formation-name">Messi</div>
            </Link>
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
            {historyMoments.map((moment, index) => {
              const isActive = moment.year === selectedHistory.year;
              const href = moment.product
                ? `/products/${moment.product.id}`
                : `/products?q=${encodeURIComponent(moment.query)}`;
              const image = moment.product?.image_url ?? moment.fallbackImage;

              return (
                <Link
                  href={href}
                  className={`history-item${isActive ? " is-active" : ""}`}
                  key={moment.year}
                  onMouseEnter={() => setSelectedHistoryYear(moment.year)}
                  onFocus={() => setSelectedHistoryYear(moment.year)}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="history-marker" aria-hidden="true" />
                  <div className="history-year">{moment.year}</div>
                  <div className="history-content">
                    <span className="history-index">
                      Archive {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="history-title">{moment.title}</h3>
                    <p className="history-desc">{moment.description}</p>
                    <span className="history-meta">{moment.meta}</span>
                    <div className="history-mobile-piece">
                      <Image
                        src={image}
                        alt={`${moment.title} jersey`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1px"
                        className="history-piece-image"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <aside className="history-evidence" aria-live="polite">
            <Link
              href={
                selectedHistory.product
                  ? `/products/${selectedHistory.product.id}`
                  : `/products?q=${encodeURIComponent(selectedHistory.query)}`
              }
              className="history-evidence-frame"
              aria-label={`View ${selectedHistory.title}`}
            >
              <span className="history-evidence-label">Archive Evidence</span>
              <span className="history-evidence-year" aria-hidden="true">
                {selectedHistory.year}
              </span>
              <Image
                key={selectedHistory.year}
                src={selectedHistory.product?.image_url ?? selectedHistory.fallbackImage}
                alt={`${selectedHistory.title} jersey`}
                fill
                sizes="(max-width: 768px) 1px, 42vw"
                className="history-piece-image"
              />
            </Link>
            <div className="history-evidence-caption" key={`${selectedHistory.year}-caption`}>
              <div>
                <span>{selectedHistory.meta}</span>
                <strong>{selectedHistory.title}</strong>
              </div>
              <span>{selectedHistory.year}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ SPOTLIGHT ============ */}
      <section className="spotlight">
        <div className="spotlight-inner">
          <div>
            <div className="spotlight-jersey-box">
              <Image
                src={spotlightImage}
                alt="Maradona — Argentina, World Cup 1986"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
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
          {drops.map((drop) => {
            const isRevealed = revealedDrops.has(drop.id);
            const rarity = rarityFor(drop.price);
            return (
              <article
                className={`drop-card ${isRevealed ? "is-revealed" : ""}`}
                key={drop.id}
              >
                <span className={`drop-rarity drop-rarity--${rarity.key}`}>
                  {rarity.label}
                </span>

                <button
                  type="button"
                  className="drop-cover"
                  aria-hidden={isRevealed}
                  tabIndex={isRevealed ? -1 : 0}
                  aria-label={`Reveal ${rarity.label.toLowerCase()} drop`}
                  onClick={() => revealDrop(drop.id)}
                >
                  <span className="drop-cover-mark" aria-hidden="true">
                    ?
                  </span>
                  <span className="drop-cover-hint">Tap to reveal</span>
                </button>

                <Link href={`/products/${drop.id}`} className="product-card-media">
                  <div className="drop-card-image">
                    <span className="drop-badge">Drop</span>
                    {drop.image_url ? (
                      <Image
                        src={drop.image_url}
                        alt={drop.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="jersey-photo"
                      />
                    ) : (
                      <JerseySvg />
                    )}
                  </div>
                </Link>

                <div className="drop-card-info">
                  {isRevealed ? (
                    <>
                      <Link href={`/products/${drop.id}`} className="product-card-title">
                        <div className="drop-player">{drop.name}</div>
                      </Link>
                      <div className="drop-detail">{formatPrice(drop.price)}</div>
                      <Link href={`/products/${drop.id}`} className="btn-add-cart">
                        Choose Size
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="drop-player drop-player--locked">
                        {rarity.label} Piece
                      </div>
                      <div className="drop-detail">Hidden until revealed</div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
