"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/order";

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink(`Hi ${site.name}! I have a question about ordering.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Savorbysteph on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-[0_16px_40px_-12px_rgba(31,157,85,0.6)] md:bottom-8 md:right-8"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsappLogo size={28} weight="fill" />
    </motion.a>
  );
}
