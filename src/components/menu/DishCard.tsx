import Image from "next/image";
import Link from "next/link";
import { formatPrice, fromPrice, type MenuItem } from "@/data/menu";
import { QuickAdd } from "@/components/cart/AddToCart";
import { SpiceLevel } from "./SpiceLevel";

export function DishCard({ item, priority }: { item: MenuItem; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col items-center pt-2 text-center">
      <Link href={`/menu/${item.slug}`} className="relative block w-[78%]" aria-label={`${item.name} details`}>
        <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_28px_50px_-26px_rgba(120,53,15,0.55)] ring-[6px] ring-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-[8deg]">
          <Image
            src={item.image}
            alt={`${item.name}, homemade Nigerian food in Charlotte`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="mt-5 flex w-full flex-1 flex-col items-center px-2">
        <h3 className="font-display text-xl leading-tight">
          <Link href={`/menu/${item.slug}`} className="hover:text-accent">
            {item.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 max-w-[28ch] text-sm leading-relaxed text-muted">{item.short}</p>
        <div className="mt-auto flex w-full items-center justify-between gap-3 pt-5">
          <div className="text-left">
            <p className="text-lg font-medium tabular-nums">
              {item.options.length > 1 && <span className="mr-1 text-xs font-normal text-muted">from</span>}
              {formatPrice(fromPrice(item))}
            </p>
            <SpiceLevel level={item.spice} />
          </div>
          <QuickAdd item={item} />
        </div>
      </div>
    </article>
  );
}
