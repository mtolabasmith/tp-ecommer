import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — The Archive",
  description: "The story behind The Archive: football jerseys treated as heritage.",
};

export default function AboutPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          About
        </div>
        <h1 className="section-title">
          Where football
          <br />
          <em>becomes heritage</em>
        </h1>
      </header>

      <div className="info-prose">
        <p>
          The Archive is a curated collection of football jerseys treated as historical
          objects. We don&apos;t sell shirts — we preserve moments. Every piece in the
          collection belongs to a larger story: of players who defined eras, of finals that
          will never be forgotten, of numbers that became mythology.
        </p>

        <h2>Our mission</h2>
        <p>
          To keep the memory of the game alive through the garments that witnessed it. From
          Maradona&apos;s 1986 shirt to the rarest modern drops, each jersey is selected for
          what it represents, not just how it looks.
        </p>

        <h2>What we curate</h2>
        <p>
          Three collections guide the archive: <strong>Legends</strong>, the icons who
          defined the game; <strong>Eternal Finals</strong>, the matches time cannot erase;
          and <strong>Iconic Drops</strong>, rare pieces for the collector.
        </p>

        <Link href="/products" className="btn-primary">
          Explore the collection
        </Link>
      </div>
    </main>
  );
}
