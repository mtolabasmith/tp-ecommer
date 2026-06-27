"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductSize } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  toast: string | null;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (id: string, size: ProductSize) => void;
  updateQuantity: (id: string, size: ProductSize, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "archive-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Cargar el carrito guardado al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Hidratación desde localStorage: caso legítimo de setState en effect
      // (se hace una vez al montar para no romper la hidratación SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage no disponible: arranca vacío
    }
    setHydrated(true);
  }, []);

  // Persistir en cada cambio (después de la hidratación inicial)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignorar errores de cuota / modo privado
    }
  }, [items, hydrated]);

  // Auto-ocultar el toast tras unos segundos
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const addItem = useCallback((product: Product, size: ProductSize, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    setToast(`${product.name} · Size ${size}`);
  }, []);

  const removeItem = useCallback((id: string, size: ProductSize) => {
    setItems((prev) => prev.filter((i) => i.id !== id || i.size !== size));
  }, []);

  const updateQuantity = useCallback((id: string, size: ProductSize, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id || i.size !== size)
        : prev.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    count,
    total,
    isOpen,
    toast,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
