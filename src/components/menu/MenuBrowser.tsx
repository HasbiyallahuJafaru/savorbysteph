"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { categories, menu, type CategoryId } from "@/data/menu";
import { DishCard } from "./DishCard";

export function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>(categories[0].id);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? menu.filter((m) => `${m.name} ${m.short} ${m.tags.join(" ")}`.toLowerCase().includes(q)) : menu),
    [q],
  );

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id as CategoryId);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    document.querySelectorAll("[data-menu-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [q]);

  useEffect(() => {
    document.getElementById(`tab-${active}`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="sticky top-[72px] z-30 -mx-5 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Menu sections" className="no-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex gap-1.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    id={`tab-${c.id}`}
                    href={`#${c.id}`}
                    onClick={() => setQuery("")}
                    className={`relative isolate block whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] transition-colors ${
                      active === c.id && !q ? "text-white" : "text-ink-soft hover:text-accent"
                    }`}
                  >
                    {active === c.id && !q && (
                      <motion.span layoutId="menu-tab" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <label className="relative block md:w-72">
            <span className="sr-only">Search the menu</span>
            <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search egusi, suya, vegan"
              className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-10 text-[15px] text-ink placeholder:text-[#8a8990] outline-none focus:border-ink"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-shell">
                <X size={14} />
              </button>
            )}
          </label>
        </div>
      </div>

      {q ? (
        <section aria-live="polite" className="py-14">
          <h2 className="text-3xl">
            {filtered.length} {filtered.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </h2>
          {filtered.length ? (
            <DishGrid items={filtered} />
          ) : (
            <p className="mt-6 max-w-[50ch] text-muted">
              Nothing matches that yet. Try &ldquo;soup&rdquo;, &ldquo;rice&rdquo; or &ldquo;spicy&rdquo;, or send Steph a message to ask for a special request.
            </p>
          )}
        </section>
      ) : (
        categories.map((c, ci) => {
          const items = filtered.filter((m) => m.category === c.id);
          return (
            <section key={c.id} id={c.id} data-menu-section aria-labelledby={`${c.id}-title`} className="scroll-mt-40 border-b border-line py-16 last:border-b-0 md:py-20">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h2 id={`${c.id}-title`} className="text-4xl md:text-5xl">
                  {c.name}
                </h2>
                <p className="text-muted">{c.blurb}</p>
              </div>
              <DishGrid items={items} eager={ci === 0} />
            </section>
          );
        })
      )}
    </div>
  );
}

function DishGrid({ items, eager }: { items: typeof menu; eager?: boolean }) {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.li
            key={item.slug}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <DishCard item={item} priority={eager && i < 2} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
