import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DeliveryAreas() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="areas-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            title={
              <span id="areas-title">
                African food delivery <em className="text-accent">across Charlotte</em>
              </span>
            }
            intro="Fresh Nigerian soups, rice and grills delivered to homes and offices in the Charlotte area, or picked up from our kitchen."
          />
          <div className="mt-9">
            <Button href="/delivery" variant="ghost">
              Delivery details
            </Button>
          </div>
        </Reveal>

        <ul className="flex flex-wrap gap-3" aria-label="Areas we deliver to">
          {site.areasServed.map((area, i) => (
            <Reveal as="li" key={area} delay={i * 0.04} y={16}>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] ${
                  i === 0 ? "border-accent bg-accent text-white" : "border-line bg-white"
                }`}
              >
                <MapPin size={16} weight={i === 0 ? "fill" : "regular"} className={i === 0 ? "" : "text-accent"} />
                {area}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
