import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Legends — The Archive",
  description: "The jerseys of the icons who defined football.",
};

export default function LegendsPage() {
  return (
    <CategoryPage
      category="leyendas"
      num="01"
      label="Legends"
      titleLead="The Icons"
      titleEm="Who Defined the Game"
      desc="The jerseys of the players who wrote history. From Maradona to Messi, from Pelé to Cristiano — each piece belongs to someone who changed how the game is understood."
    />
  );
}
