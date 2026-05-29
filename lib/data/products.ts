export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image_url: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Básica",
    price: 29.99,
    description: "Camiseta de algodón 100% en varios colores.",
    stock: 50,
    image_url: "/images/camiseta-basica.jpg",
    category: "leyendas",
  },
  {
    id: "2",
    name: "Pantalón Cargo",
    price: 59.99,
    description: "Pantalón cargo con múltiples bolsillos.",
    stock: 30,
    image_url: "/images/pantalon-cargo.jpg",
    category: "leyendas",
  },
  {
    id: "3",
    name: "Zapatillas Urbanas",
    price: 89.99,
    description: "Zapatillas cómodas para uso diario.",
    stock: 20,
    image_url: "/images/zapatillas-urbanas.jpg",
    category: "leyendas",
  },
];
