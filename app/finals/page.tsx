import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eternal Finals — The Archive",
  description: "The jerseys of the finals that time cannot erase.",
};

export default function FinalsPage() {
  return (
    <CategoryPage
      category="finales"
      num="02"
      label="Eternal Finals"
      titleLead="The Matches"
      titleEm="Time Cannot Erase"
      desc="World Cups, Champions League, Libertadores. The jerseys of the decisive matches — those ninety minutes etched forever into football's memory."
    />
  );
}
