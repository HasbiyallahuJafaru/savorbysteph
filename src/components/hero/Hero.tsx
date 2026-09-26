import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { HeroText } from "./HeroText";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl items-center gap-6 px-5 pb-12 pt-8 md:px-8 lg:grid-cols-12 lg:gap-4 lg:pb-16">
        <div className="lg:col-span-7">
          <HeroText>
            <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-accent">Charlotte, NC · Delivery & pickup</p>
            <h1 className="mt-5 pb-1 text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
              Homemade Nigerian food, <em className="text-accent">made fresh in Charlotte.</em>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted md:text-lg">
              Jollof, egusi, pepper soup and suya from Steph&apos;s kitchen. Order online for delivery or pickup across Charlotte.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/menu">
                Order now <ArrowRight size={18} />
              </Button>
              <Button href="/catering" variant="ghost">
                Party trays
              </Button>
            </div>
          </HeroText>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
