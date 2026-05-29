import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Immortal Numbers — The Archive",
  description: "Los números que se volvieron mitología en el fútbol.",
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
          Algunos números dejaron de ser números. Se volvieron una promesa, una herencia,
          un mito que cada generación intenta honrar.
        </p>
      </header>

      <div className="numbers-grid">
        <div className="number-card">
          <div className="number-digit">10</div>
          <div className="number-title">The Creator&apos;s Number</div>
          <p className="number-desc">
            El número que separó al genio del resto. Usado por quienes veían lo que otros no
            podían.
          </p>
          <div className="number-names">Pelé · Maradona · Zidane · Messi</div>
        </div>

        <div className="number-card">
          <div className="number-digit">7</div>
          <div className="number-title">The Number of Kings</div>
          <p className="number-desc">
            Talento. Peligro. Inevitabilidad. El número que prometía algo extraordinario cada
            vez.
          </p>
          <div className="number-names">Best · Cantona · Figo · CR7</div>
        </div>

        <div className="number-card">
          <div className="number-digit">9</div>
          <div className="number-title">The Striker&apos;s Inheritance</div>
          <p className="number-desc">
            Goles. Potencia. El arte puro y antiguo de definir. El número de los nacidos para
            convertir.
          </p>
          <div className="number-names">R9 · Van Nistelrooy · Lewandowski</div>
        </div>
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/legends" className="btn-primary">
          Ver leyendas
        </Link>
      </div>
    </main>
  );
}
