import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Made History — The Archive",
  description: "Jerseys tied to the turning points of football.",
};

const ITEMS = [
  {
    year: "1970",
    title: "Pelé's Final World Cup Shirt",
    desc: "The last jersey worn by the greatest in his final World Cup. Brazil won 4–1. The world watched the game reach its highest point.",
    tag: "World Cup · Mexico",
  },
  {
    year: "1986",
    title: "The Hand of God",
    desc: "Maradona's Argentina shirt from the quarter-final against England. Two goals. One hand. One genius. One legend cemented forever.",
    tag: "World Cup · Mexico",
  },
  {
    year: "1994",
    title: "Baggio's Last Penalty",
    desc: "The jersey worn when Roberto Baggio stepped forward in the final. The missed penalty. The bowed head. The eternal image of football's grief.",
    tag: "World Cup Final · USA",
  },
  {
    year: "1999",
    title: "United's Treble Night",
    desc: "Two injury-time goals at the Camp Nou. The shirt of the most dramatic comeback in a Champions League final.",
    tag: "Champions League · Barcelona",
  },
];

export default function HistoryPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">04</span>
          Made History
        </div>
        <h2 className="section-title">
          Jerseys Tied
          <br />
          <em>to Turning Points</em>
        </h2>
        <p className="section-desc" style={{ maxWidth: "620px", marginTop: "1rem" }}>
          Some shirts are remembered not for who wore them, but for the moment they witnessed.
          These are the jerseys tied to the exact instant football changed.
        </p>
      </header>

      <div className="history-timeline">
        {ITEMS.map((item) => (
          <div className="history-item" key={item.year}>
            <div className="history-year">{item.year}</div>
            <div>
              <div className="history-title">{item.title}</div>
              <p className="history-desc">{item.desc}</p>
              <span className="history-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/products" className="btn-primary">
          Browse the Catalog
        </Link>
      </div>
    </main>
  );
}
