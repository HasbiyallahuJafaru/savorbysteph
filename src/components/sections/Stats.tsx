import { CookingPot, ForkKnife, MapPin, Fire } from "@phosphor-icons/react/dist/ssr";
import { menu } from "@/data/menu";
import { site } from "@/config/site";
import { CountUp } from "@/components/ui/CountUp";

export function Stats() {
  const stats = [
    { icon: ForkKnife, value: menu.length, suffix: "", label: "Dishes on the menu" },
    { icon: CookingPot, value: menu.filter((m) => m.category === "soups").length, suffix: "", label: "Soups cooked from scratch" },
    { icon: MapPin, value: site.areasServed.length, suffix: "", label: "Towns we deliver to" },
    { icon: Fire, value: 100, suffix: "%", label: "Homemade, no shortcuts" },
  ];
  return (
    <section aria-label="Savorbysteph in numbers" className="border-y border-line bg-white/60">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-14 md:px-8 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <li key={label} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left lg:justify-center">
            <Icon size={40} weight="thin" className="text-accent" />
            <div>
              <p className="font-display text-5xl leading-none">
                <CountUp to={value} />
                {suffix}
              </p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
