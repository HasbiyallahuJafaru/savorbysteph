import { CircleImage } from "@/components/ui/CircleImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxCircle } from "./ParallaxCircle";

export function Story() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="story-title">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6">
          <Reveal>
            <CircleImage src="/images/dishes/story-pot.webp" alt="A pot of egusi soup simmering in Steph's kitchen" sizes="(max-width: 1024px) 80vw, 480px" className="w-[82%]" />
          </Reveal>
          <ParallaxCircle className="absolute -right-2 bottom-[6%] w-[36%]" speed={-40}>
            <CircleImage src="/images/dishes/pounded-yam.webp" alt="Pounded yam" sizes="200px" />
          </ParallaxCircle>
          <ParallaxCircle className="absolute right-[12%] top-[-4%] w-[24%]" speed={30}>
            <CircleImage src="/images/dishes/zobo.webp" alt="Zobo hibiscus drink" sizes="140px" />
          </ParallaxCircle>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <SectionHeading
              title={
                <span id="story-title">
                  A taste of home, <em className="text-accent">cooked in Charlotte.</em>
                </span>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-[58ch] space-y-4 text-[17px] leading-relaxed text-muted">
              <p>
                Savorbysteph started with Sunday pots of soup shared with friends who missed food from home. Now Steph cooks for families
                across Charlotte who want Nigerian food that tastes like it came from a mother&apos;s kitchen.
              </p>
              <p>Every soup is cooked from scratch, every jollof gets its smoky bottom, and nothing is rushed.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9">
              <Button href="/about" variant="ghost">
                Read our story
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
