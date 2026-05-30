import { getProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

type Props = {
  category: string;
  num: string;
  label: string;
  titleLead: string;
  titleEm: string;
  desc: string;
};

export default async function CategoryPage({
  category,
  num,
  label,
  titleLead,
  titleEm,
  desc,
}: Props) {
  const products = await getProducts(category);

  return (
    <main className="subpage">
      <header className="subpage-header">
        <div className="section-label">
          <span className="section-label-num">{num}</span>
          {label}
        </div>
        <h2 className="section-title">
          {titleLead}
          <br />
          <em>{titleEm}</em>
        </h2>
        <p className="section-desc" style={{ maxWidth: "620px", marginTop: "1rem" }}>
          {desc}
        </p>
      </header>

      {products.length === 0 ? (
        <p className="catalog-state">No pieces in this section.</p>
      ) : (
        <>
          <p className="catalog-count">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="catalog-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
