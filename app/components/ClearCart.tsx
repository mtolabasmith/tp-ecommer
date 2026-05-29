"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

/** Vacía el carrito al montarse. Se usa en la página de éxito del checkout. */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
