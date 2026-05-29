import type { Metadata } from "next";
import CategoryPage from "@/app/components/CategoryPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Legends — The Archive",
  description: "Las camisetas de los íconos que definieron el fútbol.",
};

export default function LegendsPage() {
  return (
    <CategoryPage
      category="leyendas"
      num="01"
      label="Legends"
      titleLead="The Icons"
      titleEm="Who Defined the Game"
      desc="Las camisetas de los jugadores que escribieron la historia. De Maradona a Messi, de Pelé a Cristiano: cada pieza pertenece a quien cambió la forma de entender el juego."
    />
  );
}
