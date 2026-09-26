"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  option: string;
  price: number;
  qty: number;
  image: string;
};

export type Fulfillment = "delivery" | "pickup";

export type OrderDetails = {
  fulfillment: Fulfillment;
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  notes: string;
};

type CartState = {
  lines: CartLine[];
  details: OrderDetails;
  isOpen: boolean;
  lastAdded: { name: string; at: number } | null;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setDetails: (patch: Partial<OrderDetails>) => void;
  open: () => void;
  close: () => void;
};

const emptyDetails: OrderDetails = {
  fulfillment: "delivery",
  name: "",
  phone: "",
  address: "",
  date: "",
  time: "",
  notes: "",
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      details: emptyDetails,
      isOpen: false,
      lastAdded: null,
      add: (line, qty = 1) =>
        set((s) => {
          const key = `${line.slug}::${line.option}`;
          const existing = s.lines.find((l) => l.key === key);
          const lines = existing
            ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { ...line, key, qty }];
          return { lines, lastAdded: { name: line.name, at: Date.now() } };
        }),
      setQty: (key, qty) =>
        set((s) => ({
          lines: qty <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
        })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      setDetails: (patch) => set((s) => ({ details: { ...s.details, ...patch } })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "savorbysteph-cart",
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines, details: s.details }),
    },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartTotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.price, 0);
