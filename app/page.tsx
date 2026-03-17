import Head from 'next/head';
import './styles.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Archive — Premium Football Jerseys & Heritage Collection</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="app-layout">
        <aside className="side-nav" aria-label="Exhibition Navigation">
          <div className="side-nav-header">Archive Index</div>
          <ul>
            <li><a href="#legends" className="side-nav-link"><span className="dot"></span><span className="label">Legends</span></a></li>
            <li><a href="#final-shirts" className="side-nav-link"><span className="dot"></span><span className="label">Eternal Finals</span></a></li>
            <li><a href="#important-numbers" className="side-nav-link"><span className="dot"></span><span className="label">Immortal Numbers</span></a></li>
            <li><a href="#historic-shirts" className="side-nav-link"><span className="dot"></span><span className="label">Jerseys That Made History</span></a></li>
            <li><a href="#iconic-drops" className="side-nav-link"><span className="dot"></span><span className="label">Iconic Drops</span></a></li>
          </ul>
        </aside>
        <main className="content-shell">
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">A Museum of<br />Football Heritage</h1>
          <p className="hero-subtitle">Curated archive of iconic jerseys that shaped the beautiful game. Each piece holds a story—preserved for collectors and historians.</p>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1577223557118-7d383e1311a3?w=1200&h=800&fit=crop" alt="Premium vintage football jersey on display" />
          <span className="hero-image-credit">Featured: 1995 AC Milan Away Edition</span>
        </div>
      </section>

      {/* LEGENDS */}
      <section className="story-section" id="legends">
        <div className="section-head">
          <p className="eyebrow">Legends</p>
          <h2>Player Icons & Their Kits</h2>
          <p className="section-subtext">A close look at legendary numbers, styles, and personal eras.</p>
        </div>
        <div className="legends-layout">
          <div className="legend-block">
            <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=900&h=560&fit=crop" alt="Legendary player shirt" />
            <div><h3>Pelé 10 (1970)</h3><p>Brazil's golden era collectible with original cloth badge.</p></div>
          </div>
          <div className="legend-block">
            <img src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=900&h=560&fit=crop" alt="Legendary player shirt" />
            <div><h3>Maradona 10 (1986)</h3><p>The home shirt tied to one of football's most storied tournaments.</p></div>
          </div>
        </div>
      </section>

      {/* ETERNAL FINALS */}
      <section className="story-section" id="final-shirts">
        <div className="section-head">
          <p className="eyebrow">Eternal Finals</p>
          <h2>Decisive Match Kits</h2>
          <p className="section-subtext">Jerseys worn in title-deciding finals and championship-defining nights.</p>
        </div>
        <div className="story-row">
          <article className="story-card">
            <div className="story-image"><img src="https://images.unsplash.com/photo-1522172742817-9fceec1e10c0?w=800&h=500&fit=crop" alt="Finals shirt" /></div>
            <div className="story-content"><h3>1999 Champions League Final</h3><p>Manchester United's iconic comeback kit, preserved with match provenance.</p></div>
          </article>
          <article className="story-card">
            <div className="story-image"><img src="https://images.unsplash.com/photo-1548520020-0f8709f13f13?w=800&h=500&fit=crop" alt="Historic final shirt" /></div>
            <div className="story-content"><h3>2010 World Cup Final</h3><p>Spain home shirt from the era that cemented a generation's playing philosophy.</p></div>
          </article>
        </div>
      </section>

      {/* IMMORTAL NUMBERS */}
      <section className="story-section" id="important-numbers">
        <div className="section-head">
          <p className="eyebrow">Immortal Numbers</p>
          <h2>Kit Numbers in Football Mythos</h2>
        </div>
        <div className="numbers-row">
          <div className="number-card"><p className="number">10</p><h3>Creative Command</h3><p>From Maradona to Zidane, the number that carries the game.</p></div>
          <div className="number-card"><p className="number">7</p><h3>Flair & Legacy</h3><p>Ronaldo, Beckham, and the modern culture of celebrity kits.</p></div>
          <div className="number-card"><p className="number">9</p><h3>Finisher's Mark</h3><p>Striker shirts that defined eras with decisive impact.</p></div>
        </div>
      </section>

      {/* JERSEYS THAT MADE HISTORY */}
      <section className="story-section" id="historic-shirts">
        <div className="section-head">
          <p className="eyebrow">Jerseys That Made History</p>
          <h2>Shirts That Shaped Moments</h2>
        </div>
        <div className="history-timeline">
          <div><span>1974</span><p>West Germany home shirt in the tournament that introduced modern kit aesthetics.</p></div>
          <div><span>1999</span><p>Manchester United kit from the treble night, now in private curation.</p></div>
          <div><span>2005</span><p>Liverpool's miracle final shirt, a symbol of the greatest comeback.</p></div>
        </div>
      </section>

      {/* ICONIC DROPS */}
      <section className="story-section" id="iconic-drops">
        <div className="section-head">
          <p className="eyebrow">Iconic Drops</p>
          <h2>Culturally Resonant Releases</h2>
        </div>
        <div className="drop-grid">
          <div className="drop-card">
            <h3>AC Milan 1995 Away</h3><p>Striking graphic minimalism with global fandom impact.</p>
          </div>
          <div className="drop-card">
            <h3>Barcelona 1998 Third</h3><p>Bold color-blocking that defined the late-90s fashion intersection.</p>
          </div>
          <div className="drop-card">
            <h3>Inter 2010 Home</h3><p>Modern classic with subtle craftsmanship details.</p>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="editorial">
        <div className="editorial-header">
          <h2>Archive Chronicles</h2>
          <p className="editorial-subtitle">Deep dives into design history, manufacturing evolution, and the cultural moments that shaped football's visual identity</p>
        </div>
        <div className="editorial-grid">
          <article className="editorial-card">
            <div className="editorial-image">
              <img src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=700&h=500&fit=crop" alt="Article about vintage manufacturing" />
              <span className="editorial-category">Heritage</span>
            </div>
            <h3 className="editorial-title">The Umbro Legacy: Manufacturing Excellence Through the Decades</h3>
            <p className="editorial-excerpt">How one manufacturer shaped the aesthetic standards of European football between 1970 and 2000.</p>
            <a href="#" className="editorial-link">Read Article <span>→</span></a>
          </article>
          <article className="editorial-card">
            <div className="editorial-image">
              <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&h=500&fit=crop" alt="Design language evolution" />
              <span className="editorial-category">Design</span>
            </div>
            <h3 className="editorial-title">From Collar Geometry to Sleeve Detail: The Evolution of Jersey Grammar</h3>
            <p className="editorial-excerpt">Tracing the linguistic patterns of football kit design and how small details became identity markers.</p>
            <a href="#" className="editorial-link">Read Article <span>→</span></a>
          </article>
        </div>
      </section>

      <section className="acquisitions" id="collection">
        <div className="products-header">
          <h2>Selected Archive Acquisitions</h2>
          <a href="#" className="view-all">Full Catalogue →</a>
        </div>
        <div className="acquisition-grid">
          <article className="acquisition-card"><h3>Juventus 1988 Home</h3><p>Preserved in museum-grade packaging with authenticity dossier.</p></article>
          <article className="acquisition-card"><h3>AS Roma 1992 Away</h3><p>Original tags and provenance from the season of a first title.</p></article>
          <article className="acquisition-card"><h3>Lazio 1990 Home</h3><p>Condition one with archival box and restoration notes.</p></article>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <h2>Get in Touch</h2>
          <p className="contact-subtitle">Inquiries about acquisitions, authentication, or collaboration</p>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Archive Address</h3>
              <p>Curated collections available by appointment</p>
              <p className="contact-detail">hello@footballarchive.museum</p>
              <p className="contact-detail">+1 (555) 123-4567</p>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" rows={4} required></textarea>
              <button type="submit" className="form-submit">Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Archive</h4>
            <ul>
              <li><a href="#">Vintage Collection</a></li>
              <li><a href="#">Iconic Designs</a></li>
              <li><a href="#">Contemporary Pieces</a></li>
              <li><a href="#">Limited Editions</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Condition Guide</a></li>
              <li><a href="#">Authentication</a></li>
              <li><a href="#">Collecting Guide</a></li>
              <li><a href="#">Archive Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Curated updates on new acquisitions and collecting insights</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Archive. A Museum of Football Heritage. All rights reserved.</p>
        </div>
      </footer>
      </main>
      </div>
    </>
  );
}