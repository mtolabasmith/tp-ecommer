import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immortal Numbers — The Archive",
  description: "The numbers that became mythology in football.",
};

export default function NumbersPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">03</span>
          Immortal Numbers
        </div>
        <h2 className="section-title">
          Numbers That
          <br />
          <em>Became Mythology</em>
        </h2>
        <p className="section-desc" style={{ maxWidth: "620px", marginTop: "1rem" }}>
          Some numbers stopped being numbers. They became a promise, an inheritance, a myth
          that each generation tries to honor.
        </p>
      </header>

      <div className="numbers-grid">
        <div className="number-card">
          <div className="number-digit">10</div>
          <div className="number-title">The Creator&apos;s Number</div>
          <p className="number-desc">
            The number that separated genius from the rest. Worn by those who saw what others
            could not.
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

      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/legends" className="btn-primary">
          View Legends
        </Link>
      </div>
    </main>
  );
}
