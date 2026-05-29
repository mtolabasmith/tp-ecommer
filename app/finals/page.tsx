import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eternal Finals — The Archive",
  description: "Las camisetas de las finales que el tiempo no puede borrar.",
};

export default function FinalsPage() {
  return (
    <CategoryPage
      category="finales"
      num="02"
      label="Eternal Finals"
      titleLead="The Matches"
      titleEm="Time Cannot Erase"
      desc="Mundiales, Champions, Libertadores. Las camisetas de los partidos decisivos, esos noventa minutos que quedaron grabados para siempre en la memoria del fútbol."
    />
  );
}
