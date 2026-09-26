"use client";

import { Children } from "react";
import { motion } from "motion/react";

export function HeroText({ children }: { children: React.ReactNode }) {
  return (
    <>
      {Children.toArray(children).map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
