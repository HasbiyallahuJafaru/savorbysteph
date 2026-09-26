"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Minus, Plus } from "@phosphor-icons/react";
import { formatPrice, type MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";

export function QuickAdd({ item, className = "" }: { item: MenuItem; className?: string }) {
  const add = useCart((s) => s.add);
  const [done, setDone] = useState(false);
  const option = item.options[0];

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug: item.slug, name: item.name, option: option.label, price: option.price, image: item.image });
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
      aria-label={`Add ${item.name} (${option.label}) to your order`}
      className={`relative grid size-11 place-items-center overflow-hidden rounded-full bg-ink text-white transition-colors hover:bg-accent active:scale-95 ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? "done" : "add"}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {done ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function AddToCartPanel({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const [optionIdx, setOptionIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const option = item.options[optionIdx];

  return (
    <div>
      {item.options.length > 1 && (
        <fieldset>
          <legend className="text-sm font-medium">Choose a size</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.options.map((o, i) => (
              <label
                key={o.label}
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-[15px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                  i === optionIdx ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                }`}
              >
                <input type="radio" name="option" className="sr-only" checked={i === optionIdx} onChange={() => setOptionIdx(i)} />
                {o.label} <span className={i === optionIdx ? "text-white/70" : "text-muted"}>{formatPrice(o.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-14 items-center rounded-full border border-line">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-14 place-items-center rounded-full hover:text-accent">
            <Minus size={18} />
          </button>
          <span aria-live="polite" className="w-6 text-center text-lg tabular-nums">
            {qty}
          </span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="grid size-14 place-items-center rounded-full hover:text-accent">
            <Plus size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            add({ slug: item.slug, name: item.name, option: option.label, price: option.price, image: item.image }, qty);
            openCart();
          }}
          className="inline-flex h-14 flex-1 items-center justify-center gap-3 rounded-full bg-accent px-8 text-[16px] font-medium text-white transition-colors hover:bg-accent-deep active:scale-[0.98] sm:flex-none"
        >
          Add to order <span className="text-white/75">{formatPrice(option.price * qty)}</span>
        </button>
      </div>
    </div>
  );
}
