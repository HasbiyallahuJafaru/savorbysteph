"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { useCart } from "@/store/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {reduce ? children : <ReactLenis root options={{ lerp: 0.1, anchors: true }}>{children}</ReactLenis>}
    </MotionConfig>
  );
}
