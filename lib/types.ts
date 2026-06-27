export type Category = "leyendas" | "finales" | "drops-iconicos";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
};

export const PRODUCT_SIZES = ["S", "M", "L", "XL"] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];

export function isProductSize(value: unknown): value is ProductSize {
  return PRODUCT_SIZES.includes(value as ProductSize);
}

export type CartItem = Product & {
  quantity: number;
  size: ProductSize;
};

export type OrderStatus = "pending" | "paid" | "failed";
