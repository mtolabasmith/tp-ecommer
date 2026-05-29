import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Iconic Drops — The Archive",
  description: "Piezas raras y ediciones especiales para el coleccionista.",
};

export default function DropsPage() {
  return (
    <CategoryPage
      category="drops-iconicos"
      num="04"
      label="Iconic Drops"
      titleLead="Rare Pieces"
      titleEm="For the Collector"
      desc="Ediciones especiales, terceras equipaciones y colaboraciones de culto. Las camisetas más buscadas por quienes coleccionan el fútbol como patrimonio."
    />
  );
}
