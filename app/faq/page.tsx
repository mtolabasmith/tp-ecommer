import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ & Help — The Archive",
  description: "Shipping, returns and frequently asked questions.",
};

const FAQS = [
  {
    q: "Are the jerseys authentic?",
    a: "Every piece in the archive is selected and verified for authenticity before it is listed.",
  },
  {
    q: "How do I choose my size?",
    a: "Jerseys run true to standard adult sizing (S–XXL). If you're between sizes, we recommend sizing up.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "Payments are processed securely through Mercado Pago (cards and account balance).",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once signed in, every order and its status are available in your account.",
  },
];

export default function FaqPage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">—</span>
          Help
        </div>
        <h1 className="section-title">
          FAQ &amp; <em>Support</em>
        </h1>
      </header>

      <div className="info-prose">
        <section id="shipping">
          <h2>Shipping</h2>
          <p>
            We ship worldwide. Orders are dispatched within 2–3 business days and typically
            arrive within 5–10 business days depending on destination. Tracking is provided
            for every shipment.
          </p>
        </section>

        <section id="returns">
          <h2>Returns</h2>
          <p>
            Pieces can be returned within 30 days of delivery, provided they are unworn and in
            original condition. Start a return from your account and we&apos;ll guide you
            through the process.
          </p>
        </section>

        <section>
          <h2>Frequently asked</h2>
          {FAQS.map((item) => (
            <div key={item.q} className="faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
