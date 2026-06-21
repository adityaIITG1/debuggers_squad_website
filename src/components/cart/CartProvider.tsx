"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MAX_ITEM_QUANTITY,
  sanitizeCartItems,
  type CartItem,
} from "@/lib/cart";
import type { Product } from "@/lib/product";

const STORAGE_KEY = "debuggers-squad-cart";

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  itemCount: number;
  addItem: (slug: Product["slug"], quantity?: number) => void;
  setQuantity: (slug: Product["slug"], quantity: number) => void;
  removeItem: (slug: Product["slug"]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        setItems(sanitizeCartItems(stored ? JSON.parse(stored) : []));
      } catch {
        setItems([]);
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback(
    (slug: Product["slug"], quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.slug === slug);
        if (!existing) {
          return sanitizeCartItems([...current, { slug, quantity }]);
        }

        return current.map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: Math.min(
                  MAX_ITEM_QUANTITY,
                  item.quantity + Math.max(1, quantity)
                ),
              }
            : item
        );
      });
    },
    []
  );

  const setQuantity = useCallback(
    (slug: Product["slug"], quantity: number) => {
      if (quantity < 1) {
        setItems((current) => current.filter((item) => item.slug !== slug));
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.slug === slug
            ? {
                ...item,
                quantity: Math.min(
                  MAX_ITEM_QUANTITY,
                  Math.max(1, Math.trunc(quantity))
                ),
              }
            : item
        )
      );
    },
    []
  );

  const removeItem = useCallback((slug: Product["slug"]) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      ready,
      itemCount,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [items, ready, itemCount, addItem, setQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
