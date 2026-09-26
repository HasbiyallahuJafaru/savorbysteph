import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { categories, itemsIn, type CategoryId } from "@/data/menu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const layout: Record<CategoryId, { cell: string; tone: string; img: string }> = {
  rice: { cell: "col-span-2 row-span-2",tone: "bg-accent-tint", img: "w-[70%] -right-[12%] -bottom-[14%]" },
  soups: { cell: "col-span-2", tone: "bg-ink text-white", img: "w-[44%] -right-[8%] -bottom-[30%]" },
  grills: { cell: "", tone: "bg-shell", img: "w-[62%] -right-[16%] -bottom-[22%]" },
  "small-chops": { cell: "", tone: "bg-white border border-line", img: "w-[62%] -right-[16%] -bottom-[22%]" },
  sides: { cell: "", tone: "bg-white border border-line", img: "w-[62%] -right-[16%] -bottom-[22%]" },
  drinks: { cell: "", tone: "bg-shell", img: "w-[62%] -right-[16%] -bottom-[22%]" },
  trays: { cell: "col-span-2", tone: "bg-accent text-white", img: "w-[44%] -right-[8%] -bottom-[30%]" },
};

export function CategoryBento() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="categories-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            title={<span id="categories-title">Something for every craving</span>}
            intro="From party jollof to slow cooked soups and swallow. Pick a section to jump straight in."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
          {categories.map((c, i) => {
            const l = layout[c.id];
            const dark = l.tone.includes("text-white");
            const count = itemsIn(c.id).length;
            return (
              <Reveal key={c.id} delay={i * 0.05} className={l.cell}>
                <Link
                  href={`/menu#${c.id}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] p-6 transition-transform duration-500 hover:-translate-y-1 ${l.tone}`}
                >
                  <div className="relative z-10 max-w-[80%] md:max-w-[62%]">
                    <h3 className={`font-display leading-tight ${c.id === "rice" ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>{c.name}</h3>
                    <p className={`mt-2 text-sm ${dark ? "text-white/75" : "text-muted"}`}>
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <span
                    className={`relative z-10 mt-auto grid size-11 place-items-center rounded-full transition-colors ${
                      dark ? "bg-white text-ink group-hover:bg-paper" : "bg-ink text-white group-hover:bg-accent"
                    }`}
                  >
                    <ArrowUpRight size={18} />
                  </span>
                  <div
                    className={`absolute aspect-square overflow-hidden rounded-full ring-[6px] ring-white/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[14deg] group-hover:scale-105 ${l.img}`}
                  >
                    <Image src={c.image} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
