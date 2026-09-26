"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { InstagramLogo, List, ShoppingBagOpen, X } from "@phosphor-icons/react";
import { nav, site } from "@/config/site";
import { cartCount, useCart } from "@/store/cart";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCart((s) => cartCount(s.lines));
  const openCart = useCart((s) => s.open);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[45] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled || menuOpen ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[15px]">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`relative py-2 transition-colors hover:text-accent ${active ? "text-accent" : "text-ink-soft"}`}>
                    {item.label}
                    {active && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Savorbysteph on Instagram"
            className="hidden size-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-shell hover:text-accent sm:grid"
          >
            <InstagramLogo size={22} weight="light" />
          </a>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open your order, ${count} items`}
            className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-shell"
          >
            <ShoppingBagOpen size={23} weight="light" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-5 text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link
            href="/menu"
            className="ml-2 hidden h-11 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-white transition-colors hover:bg-accent lg:inline-flex"
          >
            Order now
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full hover:bg-shell lg:hidden"
          >
            {menuOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-[calc(100dvh-72px)] flex-col overflow-hidden bg-paper px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} className="block border-b border-line py-[1.6dvh] font-display text-[clamp(1.5rem,4.4dvh,2.25rem)] leading-tight">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link href="/menu" className="grid h-[clamp(2.75rem,6.5dvh,3.5rem)] place-items-center rounded-full bg-accent text-lg font-medium text-white">
                Order now
              </Link>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="grid h-[clamp(2.75rem,6.5dvh,3.5rem)] place-items-center rounded-full border border-line text-lg">
                @{site.instagramHandle}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
