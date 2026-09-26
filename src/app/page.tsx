import { Hero } from "@/components/hero/Hero";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { DishMarquee } from "@/components/sections/DishMarquee";
import { Story } from "@/components/sections/Story";
import { Stats } from "@/components/sections/Stats";
import { CategoryBento } from "@/components/sections/CategoryBento";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { DeliveryAreas } from "@/components/sections/DeliveryAreas";
import { Faq } from "@/components/sections/Faq";
import { InstagramCta } from "@/components/sections/InstagramCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faq";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <SignatureDishes />
      <DishMarquee />
      <Story />
      <Stats />
      <CategoryBento />
      <HowItWorks />
      <DeliveryAreas />
      <section className="pb-24 md:pb-32" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <SectionHeading align="center" title={<span id="faq-title">Questions, answered</span>} />
          </Reveal>
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <InstagramCta />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
