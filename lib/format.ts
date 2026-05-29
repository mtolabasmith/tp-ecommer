export function formatPrice(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

const CATEGORY_LABELS: Record<string, string> = {
  leyendas: "Leyendas",
  finales: "Finales",
  "drops-iconicos": "Drops icónicos",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
