import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight, Clock, Truck } from "@phosphor-icons/react/dist/ssr";
import { categories, formatPrice, fromPrice, getItem, menu } from "@/data/menu";
import { site } from "@/config/site";
import { AddToCartPanel } from "@/components/cart/AddToCart";
import { CircleImage } from "@/components/ui/CircleImage";
import { DishCard } from "@/components/menu/DishCard";
import { SpiceLevel } from "@/components/menu/SpiceLevel";
import { HeroText } from "@/components/hero/HeroText";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, dishSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getItem((await params).slug);
  if (!item) return {};
  const title = `${item.name} in Charlotte, NC`;
  const description = `${item.description} Order homemade ${item.name.toLowerCase()} from ${site.name} for delivery or pickup in Charlotte. From ${formatPrice(fromPrice(item))}.`;
  return {
    title,
    description,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description, images: [{ url: item.image, width: 800, height: 800, alt: item.name }] },
  };
}

export default async function DishPage({ params }: Params) {
  const item = getItem((await params).slug);
  if (!item) notFound();

  const category = categories.find((c) => c.id === item.category)!;
  const paired = (item.pairsWith ?? []).map(getItem).filter((m) => m !== undefined);
  const related = (paired.length ? paired : menu.filter((m) => m.category === item.category && m.slug !== item.slug)).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden pt-[72px]">
        <div aria-hidden className="absolute -left-48 top-24 size-[560px] rounded-full bg-accent-tint" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 md:px-8 lg:grid-cols-2 lg:gap-20 lg:pt-16">
          <Reveal className="mx-auto w-[82%] max-w-[520px] lg:w-full">
            <CircleImage src={item.image} alt={`${item.name} from Savorbysteph, homemade Nigerian food in Charlotte`} sizes="(max-width: 1024px) 80vw, 520px" priority />
          </Reveal>

          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li>
                  <Link href="/menu" className="hover:text-accent">
                    Menu
                  </Link>
                </li>
                <li className="flex items-center gap-1.5">
                  <CaretRight size={12} aria-hidden />
                  <Link href={`/menu#${category.id}`} className="hover:text-accent">
                    {category.name}
                  </Link>
                </li>
              </ol>
            </nav>
            <HeroText>
              <h1 className="mt-5 text-5xl leading-[1.05] md:text-6xl">{item.name}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <SpiceLevel level={item.spice} />
                {item.tags.map((t) => (
                  <span key={t} className="rounded-full bg-shell px-3 py-1 text-xs text-ink-soft">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{item.description}</p>
              <div className="mt-8">
                <AddToCartPanel item={item} />
              </div>
              <ul className="mt-8 space-y-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Truck size={18} className="text-accent" /> Delivery across Charlotte or pickup
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={18} className="text-accent" /> {site.leadTime}
                </li>
              </ul>
            </HeroText>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line py-20" aria-labelledby="related-title">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 id="related-title" className="text-4xl">
              {paired.length ? "Goes well with" : `More ${category.name.toLowerCase()}`}
            </h2>
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 0.06}>
                  <DishCard item={r} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          dishSchema(item),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: item.name, path: `/menu/${item.slug}` },
          ]),
        ]}
      />
    </>
  );
}
