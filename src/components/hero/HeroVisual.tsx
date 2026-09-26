"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import type { HeroPlate } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const center: HeroPlate = { slug: "jollof-rice", image: "/images/dishes/jollof-rice.webp", name: "Party Jollof Rice" };
const orbit: HeroPlate[] = [
  { slug: "egusi-soup", image: "/images/dishes/egusi-soup.webp", name: "Egusi Soup" },
  { slug: "suya", image: "/images/dishes/suya.webp", name: "Beef Suya" },
  { slug: "puff-puff", image: "/images/dishes/puff-puff.webp", name: "Puff Puff" },
  { slug: "dodo", image: "/images/dishes/dodo.webp", name: "Dodo" },
  { slug: "efo-riro", image: "/images/dishes/efo-riro.webp", name: "Efo Riro" },
  { slug: "fried-rice", image: "/images/dishes/fried-rice.webp", name: "Fried Rice" },
  { slug: "goat-pepper-soup", image: "/images/dishes/goat-pepper-soup.webp", name: "Pepper Soup" },
];

// Renders a static plate composition first, then swaps to the WebGL scene once its textures load.
// Reduced-motion users and devices without WebGL keep the static version.
export function HeroVisual() {
  const [use3d, setUse3d] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const gl = !!document.createElement("canvas").getContext("webgl2");
    if (reduce || saveData || !gl) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
    idle(() => setUse3d(true));
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[640px]">
      <motion.div
        aria-hidden
        className="absolute inset-[9%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff7f0_0%,#fbe6d6_55%,#f6d6bf_100%)]"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div aria-hidden className="absolute inset-[3%] animate-spin-slow rounded-full border border-dashed border-accent/25" />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <StaticPlates />
      </motion.div>

      {use3d && (
        <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.8 }}>
          <HeroScene center={center} orbit={orbit} onReady={onReady} />
        </motion.div>
      )}
    </div>
  );
}

function StaticPlates() {
  const spots = [
    { top: "6%", left: "58%", size: "22%" },
    { top: "58%", left: "72%", size: "20%" },
    { top: "72%", left: "14%", size: "21%" },
    { top: "10%", left: "8%", size: "19%" },
  ];
  return (
    <>
      <div className="absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_40px_80px_-30px_rgba(120,53,15,0.55)] ring-[10px] ring-white">
        <Image src={center.image} alt="Party jollof rice with fried chicken from Savorbysteph" width={640} height={640} priority sizes="(max-width: 768px) 55vw, 340px" className="aspect-square object-cover" />
      </div>
      {orbit.slice(0, 4).map((p, i) => (
        <div
          key={p.slug}
          className="absolute overflow-hidden rounded-full shadow-[0_24px_50px_-24px_rgba(120,53,15,0.5)] ring-[5px] ring-white"
          style={{ top: spots[i].top, left: spots[i].left, width: spots[i].size }}
        >
          <Image src={p.image} alt={p.name} width={240} height={240} sizes="140px" className="aspect-square object-cover" />
        </div>
      ))}
    </>
  );
}
