import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { signatureItems } from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SignatureDishes() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="signature-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            title={<span id="signature-title">Signature dishes</span>}
            intro="The plates our Charlotte regulars order again and again. Tap the plus to add one to your order."
          />
        </Reveal>

        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-14 md:overflow-visible md:px-0 xl:grid-cols-6">
          {signatureItems.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 0.07} className="w-[68%] shrink-0 snap-center sm:w-[42%] md:w-auto">
              <DishCard item={item} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link href="/menu" className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-accent">
            See the full menu
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
