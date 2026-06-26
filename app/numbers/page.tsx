import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immortal Numbers — The Archive",
  description: "The eternal XI: football's most mythical numbers, in formation.",
};

type Row = "forwards" | "cam" | "midfield" | "defense" | "gk";

type Player = {
  number: number;
  name: string;
  position: string;
  row: Row;
  href: string;
};

const PLAYERS: Player[] = [
  {
    number: 11,
    name: "Ronaldinho",
    position: "Left Wing",
    row: "forwards",
    href: "/products/50fff7fc-e10b-421a-b5d0-8d96b0713e7e",
  },
  {
    number: 9,
    name: "R. Nazário",
    position: "Striker",
    row: "forwards",
    href: "/products/1f9e108d-55c1-41bc-85a5-4866f5ba9b27",
  },
  {
    number: 7,
    name: "Cristiano",
    position: "Right Wing",
    row: "forwards",
    href: "/products/59843f2b-043a-4018-9fd4-13f9a839c6f6",
  },
  {
    number: 10,
    name: "Messi",
    position: "Attacking Mid",
    row: "cam",
    href: "/products/fb6e84c6-ca14-4715-8f1f-4ad66956bfa1",
  },
  {
    number: 8,
    name: "Iniesta",
    position: "Center Mid",
    row: "midfield",
    href: "/products/b472bd71-9f0a-4985-90ca-e93f8ca6a821",
  },
  {
    number: 4,
    name: "Pirlo",
    position: "Center Mid",
    row: "midfield",
    href: "/products?q=pirlo",
  },
  {
    number: 3,
    name: "R. Carlos",
    position: "Left Back",
    row: "defense",
    href: "/products/af92a365-025e-42a8-8853-b90f34dd88ae",
  },
  {
    number: 5,
    name: "Beckenbauer",
    position: "Center Back",
    row: "defense",
    href: "/products/c7086961-48e7-4159-80cb-1620a937295d",
  },
  {
    number: 6,
    name: "Baresi",
    position: "Center Back",
    row: "defense",
    href: "/products?q=baresi",
  },
  {
    number: 2,
    name: "Cafu",
    position: "Right Back",
    row: "defense",
    href: "/products?q=cafu",
  },
  {
    number: 1,
    name: "Yashin",
    position: "Goalkeeper",
    row: "gk",
    href: "/products?q=yashin",
  },
];

const ROW_ORDER: Row[] = ["forwards", "cam", "midfield", "defense", "gk"];

export default function NumbersPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Immortal Numbers
        </div>
        <h1 className="section-title">
          The Eternal <em>XI</em>
        </h1>
      </header>

      <div className="pitch">
        <svg
          className="pitch-svg"
          viewBox="0 0 300 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
            {/* outer touchlines */}
            <rect x="6" y="6" width="288" height="388" />
            {/* halfway line */}
            <line x1="6" y1="200" x2="294" y2="200" />
            {/* center circle */}
            <circle cx="150" cy="200" r="42" />
            {/* top penalty area */}
            <rect x="80" y="6" width="140" height="54" />
            {/* bottom penalty area */}
            <rect x="80" y="340" width="140" height="54" />
          </g>
          {/* center spot */}
          <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.07)" />
        </svg>

        <div className="pitch-formation">
          {ROW_ORDER.map((row) => (
            <div className={`pitch-row pitch-row--${row}`} key={row}>
              {PLAYERS.filter((p) => p.row === row).map((p) => (
                <Link
                  className="pitch-player"
                  href={p.href}
                  key={p.number}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span className="pitch-pos">{p.position}</span>
                  <span className="pitch-number">{p.number}</span>
                  <span className="pitch-name">{p.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <Link href="/legends" className="btn-primary">
          Shop the Legends
        </Link>
      </div>
    </main>
  );
}
