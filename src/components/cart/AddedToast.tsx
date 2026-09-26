"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";
import { useCart } from "@/store/cart";

export function AddedToast() {
  const lastAdded = useCart((s) => s.lastAdded);
  const isOpen = useCart((s) => s.isOpen);
  const open = useCart((s) => s.open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, [lastAdded]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 md:bottom-10">
      <AnimatePresence>
        {visible && !isOpen && lastAdded && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-ink py-2 pl-4 pr-2 text-sm text-white shadow-2xl"
          >
            <CheckCircle size={20} weight="fill" className="text-[#fb923c]" />
            <span className="max-w-[46vw] truncate">{lastAdded.name} added</span>
            <button type="button" onClick={open} className="rounded-full bg-white px-4 py-1.5 font-medium text-ink hover:bg-accent hover:text-white">
              View order
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
