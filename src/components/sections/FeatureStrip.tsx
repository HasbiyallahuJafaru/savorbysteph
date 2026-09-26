import { ChefHat, Leaf, Truck, HandHeart } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  { icon: Leaf, title: "Fresh every batch", text: "Real peppers, palm oil and spices, never from a jar." },
  { icon: ChefHat, title: "Family recipes", text: "Dishes Steph grew up eating across Nigeria." },
  { icon: Truck, title: "Delivery or pickup", text: "Hot food brought to your door in Charlotte." },
  { icon: HandHeart, title: "Made with love", text: "Cooked in small batches, like Sunday at home." },
];

export function FeatureStrip() {
  return (
    <section aria-label="Why Savorbysteph" className="border-y border-line bg-white/60">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-5 py-10 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {features.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 0.08} className="flex items-start gap-4 lg:px-8 lg:first:pl-0">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
              <Icon size={24} weight="light" />
            </span>
            <div>
              <p className="font-medium">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
