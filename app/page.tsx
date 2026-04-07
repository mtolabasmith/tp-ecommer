function JerseySvg({ className }: { className?: string }) {
  return (
    <svg
      className={`jersey-svg${className ? ` ${className}` : ''}`}
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
  return (
    <>
      {/* ============================================================
          NAVBAR
      ============================================================ */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          The <span>Archive</span>
        </a>
        <ul className="nav-links">
          <li><a href="#legends">Legends</a></li>
          <li><a href="#finals">Eternal Finals</a></li>
          <li><a href="#numbers">Immortal Numbers</a></li>
          <li><a href="#history">Made History</a></li>
          <li><a href="#drops">Iconic Drops</a></li>
        </ul>
        <div className="nav-utils">
          <a href="#">Archive</a>
          <a href="#">About</a>
          <a href="#">Cart (0)</a>
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
              <a href="#" className="btn-primary">Enter the Archive</a>
              <a href="#legends" className="btn-ghost">Explore Collection</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame-wrap">
              <div className="hero-jersey-box">
                <span className="hero-ghost-num">10</span>
                <JerseySvg className="jersey-svg-lg" />
              </div>
            </div>
            <div className="hero-jersey-meta">
              <div className="hero-jersey-meta-player">Diego Maradona</div>
              <div className="hero-jersey-meta-detail">Argentina · No. 10 · World Cup 1986</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line"></div>
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
            <p className="section-desc">
              From Buenos Aires to Turin, from Amsterdam to Madrid.
              These are the jerseys worn by those who transcended football
              and became symbols of an entire era.
            </p>
            <a href="#" className="section-link">Explore Legends</a>
          </div>
        </div>

        <div className="legends-grid">
          <a href="#" className="jersey-card">
            <div className="jersey-card-image">
              <span className="card-ghost-num" style={{ fontSize: '9rem' }}>10</span>
              <JerseySvg className="jersey-svg-lg" />
            </div>
            <div className="jersey-card-info">
              <div className="jersey-card-player">Messi</div>
              <div className="jersey-card-detail">Argentina · No. 10 · 2022</div>
              <div className="jersey-card-era">World Cup Qatar</div>
            </div>
          </a>

          <a href="#" className="jersey-card">
            <div className="jersey-card-image">
              <span className="card-ghost-num">7</span>
              <JerseySvg />
            </div>
            <div className="jersey-card-info">
              <div className="jersey-card-player">Cristiano</div>
              <div className="jersey-card-detail">Manchester United · No. 7 · 2008</div>
              <div className="jersey-card-era">Premier League</div>
            </div>
          </a>

          <a href="#" className="jersey-card">
            <div className="jersey-card-image">
              <span className="card-ghost-num">9</span>
              <JerseySvg />
            </div>
            <div className="jersey-card-info">
              <div className="jersey-card-player">Ronaldo R9</div>
              <div className="jersey-card-detail">Brazil · No. 9 · 2002</div>
              <div className="jersey-card-era">World Cup Korea / Japan</div>
            </div>
          </a>
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
            <p className="section-desc">
              Some matches belong to history. The jerseys worn in those
              defining ninety minutes carry an emotion no record or
              photograph can fully capture.
            </p>
            <a href="#" className="section-link">Explore Finals</a>
          </div>
        </div>

        <div className="finals-layout">
          <a href="#" className="jersey-card finals-feature">
            <div className="jersey-card-image">
              <span className="card-ghost-num" style={{ fontSize: '9rem' }}>1</span>
              <JerseySvg className="jersey-svg-lg" />
            </div>
            <div className="jersey-card-info">
              <div className="match-tag" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
                Champions League Final · 1999
              </div>
              <div className="jersey-card-player">Manchester United</div>
              <div className="jersey-card-detail">Treble Season · Camp Nou · 26 May</div>
            </div>
          </a>

          <div className="finals-sidebar">
            <a href="#" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num">5</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">World Cup Final · 2006</div>
                <div className="sidebar-player">Italy</div>
                <div className="sidebar-detail">Azzurri · Berlin · July 9</div>
              </div>
            </a>

            <a href="#" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num">3</span>
                <JerseySvg className="jersey-svg-sm" />
              </div>
              <div className="finals-sidebar-info">
                <div className="match-tag">Champions League Final · 2005</div>
                <div className="sidebar-player">Liverpool</div>
                <div className="sidebar-detail">Istanbul · The great comeback</div>
              </div>
            </a>

            <a href="#" className="finals-sidebar-card">
              <div className="finals-sidebar-image">
                <span className="finals-sidebar-num">10</span>
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
            <p className="section-desc">
              Some shirt numbers are no longer just numbers. They are symbols.
              Passed from giant to giant, they carry the weight
              of entire footballing lineages.
            </p>
            <a href="#" className="section-link">Explore Numbers</a>
          </div>
        </div>

        <div className="numbers-grid">
          <a href="#" className="number-card">
            <div className="number-digit">10</div>
            <div className="number-title">The Creator&apos;s Number</div>
            <p className="number-desc">
              The number that separated genius from the rest.
              Worn by those who saw what others could not.
            </p>
            <div className="number-names">Pelé · Maradona · Zidane · Messi</div>
          </a>

          <a href="#" className="number-card">
            <div className="number-digit">7</div>
            <div className="number-title">The Number of Kings</div>
            <p className="number-desc">
              Flair. Danger. Inevitability.
              The number that promised something extraordinary every time.
            </p>
            <div className="number-names">Best · Cantona · Figo · Ronaldo CR7</div>
          </a>

          <a href="#" className="number-card">
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
          <div>
            <p className="section-desc">
              Some jerseys mark the exact moment when football changed forever.
              These pieces are not simply worn — they are kept. They are evidence
              of what the game once was, and what it made us feel.
            </p>
            <a href="#" className="section-link" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              View Full Archive
            </a>
          </div>

          <div className="history-timeline">
            <a href="#" className="history-item">
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

            <a href="#" className="history-item">
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

            <a href="#" className="history-item">
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
              <span className="spotlight-ghost-num">10</span>
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

            <a href="#" className="btn-primary">View This Piece</a>
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
            <p className="section-desc">
              Limited. Cultured. Coveted. These are the jerseys that serious
              collectors pursue — pieces where rarity, cultural significance,
              and collector&apos;s value converge in a single object.
            </p>
            <a href="#" className="section-link">View All Drops</a>
          </div>
        </div>

        <div className="drops-grid">
          <a href="#" className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Rare</span>
              <span className="drop-ghost-num">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Zidane</div>
              <div className="drop-detail">Real Madrid · 2001–02 · No. 10</div>
            </div>
          </a>

          <a href="#" className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Archive</span>
              <span className="drop-ghost-num">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Ronaldinho</div>
              <div className="drop-detail">Barcelona · 2005–06 · No. 10</div>
            </div>
          </a>

          <a href="#" className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Icon</span>
              <span className="drop-ghost-num">3</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Maldini</div>
              <div className="drop-detail">AC Milan · 2002–03 · No. 3</div>
            </div>
          </a>

          <a href="#" className="drop-card">
            <div className="drop-card-image">
              <span className="drop-badge">Collector</span>
              <span className="drop-ghost-num">10</span>
              <JerseySvg />
            </div>
            <div className="drop-card-info">
              <div className="drop-player">Bergkamp</div>
              <div className="drop-detail">Netherlands · 1998 · No. 10</div>
            </div>
          </a>
        </div>
      </section>

      

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">The <span>Archive</span></div>
            <p className="footer-tagline">
              A curated collection of football&apos;s most iconic jerseys.
              History, preserved in cloth.
            </p>
          </div>

          <div>
            <div className="footer-col-title">The Archive</div>
            <ul className="footer-links">
              <li><a href="#">Legends</a></li>
              <li><a href="#">Eternal Finals</a></li>
              <li><a href="#">Immortal Numbers</a></li>
              <li><a href="#">Made History</a></li>
              <li><a href="#">Iconic Drops</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Information</div>
            <ul className="footer-links">
              <li><a href="#">About the Archive</a></li>
              <li><a href="#">Authentication</a></li>
              <li><a href="#">Collecting Guide</a></li>
              <li><a href="#">Shipping &amp; Care</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="#">Inquiries</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Consignments</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 The Archive. All rights reserved.</div>
          <div className="footer-note">Football heritage, preserved in cloth.</div>
        </div>
      </footer>
    </>
  );
}
