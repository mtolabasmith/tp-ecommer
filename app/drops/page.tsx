import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Iconic Drops — The Archive",
  description: "Rare pieces and special editions for the collector.",
};

export default function DropsPage() {
  return (
    <CategoryPage
      category="drops-iconicos"
      num="04"
      label="Iconic Drops"
      titleLead="Rare Pieces"
      titleEm="For the Collector"
      desc="Special editions, third kits and cult collaborations. The most sought-after jerseys for those who collect football as heritage."
    />
  );
}
