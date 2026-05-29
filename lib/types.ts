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

export type CartItem = Product & { quantity: number };

export type OrderStatus = "pending" | "paid" | "failed";
