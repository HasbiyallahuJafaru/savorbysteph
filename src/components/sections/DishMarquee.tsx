import Image from "next/image";
import { menu } from "@/data/menu";

export function DishMarquee() {
  const items = menu.slice(0, 12);
  const row = [...items, ...items];
  return (
    <section aria-hidden className="overflow-hidden border-y border-line py-7">
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-4xl italic text-ink md:text-5xl">{item.name}</span>
            <span className="relative block size-14 overflow-hidden rounded-full ring-4 ring-white md:size-16">
              <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
