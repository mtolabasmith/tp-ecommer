'use client'
import { useEffect, useState } from "react";  

function JerseySvg({ className }: { className?: string }) {
  return (
    <svg
      className={`jersey-svg${className ? ` ${className}` : ''}`}
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
  useEffect(() => {
    document.title = "The Archive — Historic Football Jerseys"
  }, [])

  const [cartCount, setCartCount] = useState(0);
  const [jerseys, setJerseys] = useState<any[]>([]);
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next")

  useEffect(() => {
    async function loadJerseys() {
      try {
        const response = await fetch('/jerseys.json')
        const data = await response.json()
        setJerseys(data)
      } catch (error) {
        console.error('Error loading jerseys:', error)
      }
    }
    loadJerseys()
  }, [])

  const handleAddToCart = () => setCartCount(prev => prev + 1)

  const visibleCount = 3

  const handleNext = () => {
    if (jerseys.length === 0) return
    setCarouselDirection("next")
    setCarouselIndex((prev) => (prev + 1) % jerseys.length)
  }

  const handlePrev = () => {
    if (jerseys.length === 0) return
    setCarouselDirection("prev")
    setCarouselIndex((prev) => (prev - 1 + jerseys.length) % jerseys.length)
  }

  const visibleJerseys =
    jerseys.length > 0
      ? Array.from(
          { length: Math.min(visibleCount, jerseys.length) },
          (_, i) => jerseys[(carouselIndex + i) % jerseys.length]
        )
      : []

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setSubscribeStatus('error')
      return
    }
    if (!isValidEmail(email)) {
      setSubscribeStatus('error')
      return
    }
    setSubscribeStatus('success')
    setEmail('')
  }

  return (
    <>
      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <nav className="navbar" aria-label="Navegación principal">
        <a href="#" onClick={(e) => e.preventDefault()} className="nav-brand">
          The <span>Archive</span>
        </a>
        <ul className="nav-links" role="list">
          <li role="listitem"><a href="#legends">Legends</a></li>
          <li role="listitem"><a href="#finals">Eternal Finals</a></li>
          <li role="listitem"><a href="#numbers">Immortal Numbers</a></li>
          <li role="listitem"><a href="#history">Made History</a></li>
          <li role="listitem"><a href="#drops">Iconic Drops</a></li>
        </ul>
        <div className="nav-utils">
          <a href="#" onClick={(e) => e.preventDefault()}>Archive</a>
          <a href="#" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Cart ({cartCount})</a>
        </div>
      </nav>

      {/* ============================================================
          HERO
      ============================================================ */}
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
              <a href="#" onClick={(e) => e.preventDefault()} className="btn-primary" aria-label="Entrar al archivo de camisetas históricas">Enter the Archive</a>
              <a href="#legends" className="btn-ghost" aria-label="Explorar la colección de camisetas">Explore Collection</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame-wrap">
              <div className="hero-jersey-box">
                <span className="hero-ghost-num" aria-hidden="true">10</span>
                <JerseySvg className="jersey-svg-lg" />
              </div>
            </div>
            <div className="hero-jersey-meta">
              <div className="hero-jersey-meta-player">Diego Maradona</div>
              <div className="hero-jersey-meta-detail">Argentina · No. 10 · World Cup 1986</div>
            </div>
          </div>
        </div>

      </section>

      {/* ============================================================
          INTRO
      ============================================================ */}
      <section className="intro">
        <div className="intro-inner">
          <p className="intro-quote">
            &ldquo;A football jersey is not a garment.<br />
            It is a document of what happened.&rdquo;
          </p>
          <div className="intro-divider"></div>
          <p className="intro-body">
            The Archive is a curated collection of football jerseys treated as historical objects.
            Here, every piece belongs to a larger story — of players who defined eras,
            of finals that will never be forgotten, of numbers that became mythology.
            This is not a store. This is a heritage collection.
          </p>
        </div>
      </section>

      {/* ============================================================
          01 — LEGENDS
      ============================================================ */}
      <section className="section legends" id ="legends">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">01</span>
              Legends
            </div>
            <h2 className="section-title">
              The Icons<br /><em>Who Defined the Game</em>
            </h2>
          </div>
          <div className="section-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="section-link">Explore Legends</a>
          </div>
        </div>

        <div className="legends-carousel">
          <div
            className={`legends-grid carousel-track carousel-track-${carouselDirection}`}
            key={`${carouselIndex}-${carouselDirection}`}
          >
            {visibleJerseys.map((jersey, idx) => (
              <a
                href="#"
                className="jersey-card"
                key={`${jersey.id}-${idx}`}
                onClick={(e) => e.preventDefault()}
              >
                <div className="jersey-card-image">
                  <span className="card-ghost-num" aria-hidden="true">
                    {jersey.number}
                  </span>
                  <JerseySvg className="jersey-svg-lg" />
                </div>

                <div className="jersey-card-info">
                  <div className="jersey-card-player">{jersey.player}</div>
                  <div className="jersey-card-detail">{jersey.detail}</div>
                  <div className="jersey-card-era">{jersey.era}</div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart()
                    }}
                    className="btn-add-cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </a>
            ))}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                handlePrev()
              }}
              className="carousel-arrow carousel-arrow-left"
              aria-label="Previous jersey"
            >
              ←
            </button>

            <span className="carousel-counter" aria-live="polite" aria-atomic="true">
              <span className="carousel-counter-current">
                {String(carouselIndex + 1).padStart(2, '0')}
              </span>
              <span className="carousel-counter-sep"> / </span>
              <span className="carousel-counter-total">
                {String(jerseys.length).padStart(2, '0')}
              </span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                handleNext()
              }}
              className="carousel-arrow carousel-arrow-right"
              aria-label="Next jersey"
            >
              →
            </button>
          </div>
        </div>

       
      </section>

      {/* ============================================================
          02 — ETERNAL FINALS
      ============================================================ */}
      <section className="section finals" id="finals">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">02</span>
              Eternal Finals
            </div>
            <h2 className="section-title">
              The Matches<br /><em>Time Cannot Erase</em>
            </h2>
          </div>
          <div className="section-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="section-link">Explore Finals</a>
          </div>
        </div>

        <div className="finals-layout">
          <a href="#" onClick={(e) => e.preventDefault()} className="jersey-card finals-feature">
            <div className="jersey-card-image">
              <span className="card-ghost-num" style={{ fontSize: '9rem' }} aria-hidden="true">1</span>
              <JerseySvg className="jersey-svg-lg" />
            </div>
            <div className="jersey-card-info">
              <div className="match-tag" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
                Champions League Final · 1999
              </div>
              <div className="jersey-card-player">Manchester United</div>
              <div className="jersey-card-detail">Treble Season · Camp Nou · 26 May</div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
            </div>
          </a>

          <div className="finals-sidebar">
            <a href="#" onClick={(e) => e.preventDefault()} className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">5</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">World Cup Final · 2006</div>
                <div className="sidebar-player">Italy</div>
                <div className="sidebar-detail">Azzurri · Berlin · July 9</div>
              </div>
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">3</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">Champions League Final · 2005</div>
                <div className="sidebar-player">Liverpool</div>
                <div className="sidebar-detail">Istanbul · The great comeback</div>
              </div>
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num" aria-hidden="true">10</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">World Cup Final · 1970</div>
                <div className="sidebar-player">Brazil</div>
                <div className="sidebar-detail">Mexico City · The beautiful game</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 — IMMORTAL NUMBERS
      ============================================================ */}
      <section className="section numbers" id="numbers">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">03</span>
              Immortal Numbers
            </div>
            <h2 className="section-title">
              Numbers That<br /><em>Became Mythology</em>
            </h2>
          </div>
          <div className="section-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="section-link">Explore Numbers</a>
          </div>
        </div>

        <div className="numbers-grid">
          <a href="#" onClick={(e) => e.preventDefault()} className="number-card">
            <div className="number-digit">10</div>
            <div className="number-title">The Creator&apos;s Number</div>
            <p className="number-desc">
              The number that separated genius from the rest.
              Worn by those who saw what others could not.
            </p>
            <div className="number-names">Pelé · Maradona · Zidane · Messi</div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="number-card">
            <div className="number-digit">7</div>
            <div className="number-title">The Number of Kings</div>
            <p className="number-desc">
              Flair. Danger. Inevitability.
              The number that promised something extraordinary every time.
            </p>
            <div className="number-names">Best · Cantona · Figo · Ronaldo CR7</div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="number-card">
            <div className="number-digit">9</div>
            <div className="number-title">The Striker&apos;s Inheritance</div>
            <p className="number-desc">
              Goals. Power. The pure and ancient art of finishing.
              The number that belongs to those born to score.
            </p>
            <div className="number-names">R9 · Van Nistelrooy · Lewandowski</div>
          </a>
        </div>
      </section>

      {/* ============================================================
          04 — JERSEYS THAT MADE HISTORY
      ============================================================ */}
      <section className="section history" id="history">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">04</span>
              Made History
            </div>
            <h2 className="section-title">
              Jerseys Tied<br /><em>to Turning Points</em>
            </h2>
          </div>
        </div>

        <div className="history-layout">
          <div className="section-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="section-link" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              View Full Archive
            </a>
          </div>

          <div className="history-timeline">
            <a href="#" onClick={(e) => e.preventDefault()} className="history-item">
              <div className="history-year">1970</div>
              <div>
                <div className="history-title">Pelé&apos;s Final World Cup Shirt</div>
                <p className="history-desc">
                  The last jersey worn by the greatest in his final World Cup.
                  Brazil won 4–1. The world watched the game reach its highest point.
                </p>
                <span className="history-tag">World Cup · Mexico</span>
              </div>
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="history-item">
              <div className="history-year">1986</div>
              <div>
                <div className="history-title">The Hand of God</div>
                <p className="history-desc">
                  Maradona&apos;s Argentina shirt from the quarter-final against England.
                  Two goals. One hand. One genius. One legend cemented forever.
                </p>
                <span className="history-tag">World Cup · Mexico</span>
              </div>
            </a>

            <a href="#" onClick={(e) => e.preventDefault()} className="history-item">
              <div className="history-year">1994</div>
              <div>
                <div className="history-title">Baggio&apos;s Last Penalty</div>
                <p className="history-desc">
                  The jersey worn when Roberto Baggio stepped forward in the final.
                  The missed penalty. The bowed head. The eternal image of football&apos;s grief.
                </p>
                <span className="history-tag">World Cup Final · USA</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SPOTLIGHT — FEATURED STORY
      ============================================================ */}
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
              No jersey carries the weight of this one. In the summer of 1986,
              a man from Villa Fiorito almost single-handedly guided Argentina
              to the World Cup title. The light-blue and white stripes of that
              tournament shirt witnessed two of football&apos;s most defining moments
              in the span of four minutes — both scored by the same man,
              in the same match, in the same shirt.
            </p>
            <p className="spotlight-body">
              The Hand of God. The Goal of the Century.
              The number 10 on the back of that jersey is no longer just a number.
              It is a myth.
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

            <a href="#" onClick={(e) => e.preventDefault()} className="btn-primary">View This Piece</a>
          </div>
        </div>
      </section>

      {/* ============================================================
          05 — ICONIC DROPS
      ============================================================ */}
      <section className="section drops" id="drops">
        <div className="section-header">
          <div>
            <div className="section-label">
              <span className="section-label-num">05</span>
              Iconic Drops
            </div>
            <h2 className="section-title">
              Rare Pieces<br /><em>For the Collector</em>
            </h2>
          </div>
          <div className="section-right">
            <a href="#" onClick={(e) => e.preventDefault()} className="section-link">View All Drops</a>
          </div>
        </div>

        <div className="drops-grid">
          <a href="#" onClick={(e) => e.preventDefault()} className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Rare</span>
              <span className="drop-ghost-num" aria-hidden="true">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Zidane</div>
              <div className="drop-detail">Real Madrid · 2001–02 · No. 10</div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
            </div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Archive</span>
              <span className="drop-ghost-num" aria-hidden="true">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Ronaldinho</div>
              <div className="drop-detail">Barcelona · 2005–06 · No. 10</div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
            </div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Icon</span>
              <span className="drop-ghost-num" aria-hidden="true">3</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Maldini</div>
              <div className="drop-detail">AC Milan · 2002–03 · No. 3</div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
            </div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Collector</span>
              <span className="drop-ghost-num" aria-hidden="true">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Bergkamp</div>
              <div className="drop-detail">Netherlands · 1998 · No. 10</div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleAddToCart()
                }}
                className="btn-add-cart"
              >
                Add to Cart
              </button>
            </div>
          </a>
        </div>
      </section>

      

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand-col">
              <a href="#" onClick={(e) => e.preventDefault()} className="footer-brand" aria-label="The Archive - Volver al inicio">
                The <span>Archive</span>
              </a>
              <p className="footer-tagline">
                A heritage collection of football&apos;s most iconic jerseys.
                Each piece holds a story. Each stitch carries a moment.
              </p>
            </div>

            <div className="footer-links-col">
              <div className="footer-col-title">Collection</div>
              <nav aria-label="Links de colección">
                <ul className="footer-links">
                  <li><a href="#legends">Legends</a></li>
                  <li><a href="#finals">Eternal Finals</a></li>
                  <li><a href="#numbers">Immortal Numbers</a></li>
                  <li><a href="#history">Made History</a></li>
                  <li><a href="#drops">Iconic Drops</a></li>
                </ul>
              </nav>
            </div>

            <div className="footer-links-col">
              <div className="footer-col-title">Account</div>
              <nav aria-label="Links de cuenta">
                <ul className="footer-links">
                  <li><a href="#" onClick={(e) => e.preventDefault()}>My Account</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>My Orders</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Wishlist</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>About The Archive</a></li>
                </ul>
              </nav>
            </div>

            <div className="footer-newsletter-col">
              <div className="footer-col-title">The Archive Letter</div>
              <p className="footer-newsletter-desc">
                New pieces. Rare drops. Stories behind the jerseys.
                No noise. Only heritage.
              </p>
              <form className="footer-form" onSubmit={handleSubscribe} noValidate>
                <div className="footer-input-wrap">
                  <input
                    type="email"
                    className="footer-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Tu dirección de email"
                  />
                  <button type="submit" className="footer-submit">
                    Subscribe
                  </button>
                </div>
                {subscribeStatus === 'success' && (
                  <p className="footer-msg footer-msg--success">
                    You&apos;re in. Welcome to The Archive.
                  </p>
                )}
                {subscribeStatus === 'error' && (
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
      <style>{`
        .btn-add-cart {
          margin-top: 0.85rem;
          display: inline-block;
          padding: 0.55rem 1.4rem;
          border: 1px solid rgba(200, 168, 75, 0.35);
          color: #c8a84b;
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .btn-add-cart:hover {
          background: #c8a84b;
          color: #0d0c0a;
        }

        .footer {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: 5.5rem 4rem 3rem;
        }

        .footer-inner {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 4rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2.5rem;
        }

        .footer-brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--text);
          text-decoration: none;
          display: block;
          margin-bottom: 1.25rem;
        }

        .footer-brand span { color: var(--gold); }

        .footer-tagline {
          font-size: 0.78rem;
          color: var(--text-3);
          line-height: 1.85;
          max-width: 240px;
        }

        .footer-col-title {
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-2);
          margin-bottom: 1.5rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-links a {
          font-size: 0.78rem;
          color: var(--text-3);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover { color: var(--text-2); }

        .footer-newsletter-desc {
          font-size: 0.75rem;
          color: var(--text-3);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .footer-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-input-wrap {
          display: flex;
          gap: 0;
        }

        .footer-input {
          flex: 1;
          background: var(--bg-3);
          border: 1px solid var(--border-2);
          border-right: none;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .footer-input::placeholder { color: var(--text-3); }
        .footer-input:focus { border-color: var(--gold-dim); }

        .footer-submit {
          background: transparent;
          border: 1px solid var(--gold-dim);
          color: var(--gold);
          font-family: 'Inter', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          white-space: nowrap;
        }

        .footer-submit:hover {
          background: var(--gold);
          color: var(--bg);
        }

        .footer-msg {
          font-size: 0.7rem;
          letter-spacing: 0.05em;
        }

        .footer-msg--success { color: #6abf6a; }
        .footer-msg--error { color: #bf6a6a; }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy {
          font-size: 0.65rem;
          color: var(--text-3);
          letter-spacing: 0.04em;
          opacity: 0.6;
        }

        .footer-note {
          font-size: 0.65rem;
          color: var(--text-3);
          font-style: italic;
          font-family: 'Cormorant Garamond', Georgia, serif;
          opacity: 0.5;
        }

        @media (max-width: 1100px) {
          .footer { padding: 5rem 2.5rem 3rem; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }

        @media (max-width: 768px) {
          .footer { padding: 4rem 1.5rem 2.5rem; }
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; gap: 0.75rem; text-align: center; }
          .footer-tagline { max-width: 100%; }
        }
      `}</style>
    </>
  );
}
