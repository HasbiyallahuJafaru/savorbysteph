import { ForkKnife, Storefront, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const moves = [
  { icon: ForkKnife, title: "Pick your dishes", text: "Add soups, rice, grills or trays to your order from the menu." },
  { icon: Storefront, title: "Choose delivery or pickup", text: "Tell us the day and time that works. We cover Charlotte and nearby towns." },
  { icon: WhatsappLogo, title: "Send it on WhatsApp", text: "Your order goes straight to Steph, who confirms the total and timing." },
];

export function HowItWorks() {
  return (
    <section className="bg-shell/70 py-24 md:py-32" aria-labelledby="how-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading align="center" title={<span id="how-title">Ordering takes a minute</span>} intro={site.leadTime} />
        </Reveal>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden border-t border-dashed border-accent/40 md:block" />
          {moves.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.12} className="relative flex flex-col items-center text-center">
              <span className="relative grid size-20 place-items-center rounded-full bg-paper text-accent shadow-[0_18px_40px_-20px_rgba(120,53,15,0.45)] ring-8 ring-shell">
                <Icon size={32} weight="light" />
              </span>
              <h3 className="mt-7 text-2xl">{title}</h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
