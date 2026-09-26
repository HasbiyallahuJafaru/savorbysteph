import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CircleImage } from "@/components/ui/CircleImage";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ParallaxCircle } from "@/components/sections/ParallaxCircle";
import { Stats } from "@/components/sections/Stats";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Story | Homemade Nigerian Cooking in Charlotte",
  description:
    "Meet Steph, the home cook behind Savorbysteph. Family Nigerian recipes, cooked from scratch in small batches for Charlotte, North Carolina.",
  alternates: { canonical: "/about" },
};

// TODO(owner): replace this copy with Steph's own story and a real portrait.
const values = [
  { title: "Cooked from scratch", text: "Stews start with fresh peppers blended in the kitchen. Stock is made from the meat, not a cube alone." },
  { title: "Small batches", text: "We cook to order so every soup reaches you at its best, not after days on a shelf." },
  { title: "Real Nigerian taste", text: "Locust beans, uziza, scent leaf and palm oil. The ingredients that make it taste like home." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Our story", href: "/about" }]}
        title={
          <>
            Food that tastes like <em className="text-accent">somebody&apos;s mother</em> made it.
          </>
        }
        intro="Savorbysteph is a home kitchen in Charlotte, North Carolina, cooking Nigerian and West African food for people who miss home and people discovering it for the first time."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[520px]">
            <Reveal>
              <CircleImage src="/images/dishes/egusi-soup.webp" alt="Egusi soup with pounded yam" sizes="(max-width: 1024px) 80vw, 460px" className="w-[85%]" />
            </Reveal>
            <ParallaxCircle className="absolute -bottom-4 right-0 w-[38%]" speed={-36}>
              <CircleImage src="/images/dishes/efo-riro.webp" alt="Efo riro" sizes="200px" />
            </ParallaxCircle>
          </div>
          <Reveal className="max-w-[58ch] space-y-5 text-[17px] leading-relaxed text-muted">
            <h2 className="text-4xl text-ink md:text-5xl">From Sunday pots to your table</h2>
            <p>
              It started the way a lot of good food does: a big pot of soup on a Sunday, and friends who kept asking for another plate. Word got
              around, the orders grew, and Savorbysteph was born.
            </p>
            <p>
              Steph cooks the dishes she grew up with. Party jollof with the smoky bottom everyone fights over. Egusi thick with assorted meat.
              Pepper soup that clears your head on a cold Carolina evening.
            </p>
            <p>Every order is cooked fresh in small batches and packed to travel, whether it is dinner for two or trays for a hundred guests.</p>
            <div className="pt-3">
              <Button href="/menu">Order now</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-shell/70 py-20 md:py-28" aria-labelledby="values-title">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 id="values-title" className="text-4xl md:text-5xl">
            What goes into every pot
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.1} className="border-t border-ink/15 pt-6">
                <h3 className="text-2xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Stats />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our story", path: "/about" }])} />
    </>
  );
}
