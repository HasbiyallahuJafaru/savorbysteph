import type { Metadata } from "next";
import { Clock, MapPin, Storefront, Truck } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { faqs } from "@/data/faq";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nigerian Food Delivery & Pickup in Charlotte, NC",
  description: `African and Nigerian food delivery in Charlotte, ${site.areasServed.slice(1, 6).join(", ")} and nearby. Pickup available in Charlotte. See areas, hours and how to order.`,
  alternates: { canonical: "/delivery" },
};

const deliveryFaqs = faqs.filter((f) => /deliver|ahead|pay/i.test(f.q));

export default function DeliveryPage() {
  const cards = [
    { icon: Truck, title: "Delivery", text: "Brought to your home or office across the Charlotte area. The fee depends on distance and is confirmed with your order." },
    { icon: Storefront, title: "Pickup", text: site.pickupArea },
    { icon: Clock, title: "Timing", text: site.leadTime },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Delivery", href: "/delivery" }]}
        title={
          <>
            Nigerian food delivery <em className="text-accent">in Charlotte.</em>
          </>
        }
        intro="Hot, homemade African food delivered across Charlotte and nearby towns, or picked up fresh from our kitchen."
      />

      <section className="pb-20">
        <ul className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 md:px-8">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="rounded-[var(--radius-panel)] border border-line bg-white p-8">
              <Icon size={34} weight="light" className="text-accent" />
              <h2 className="mt-6 text-3xl">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-shell/70 py-20 md:py-28" aria-labelledby="areas-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <h2 id="areas-title" className="text-4xl md:text-5xl">
              Where we deliver
            </h2>
            <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
              Not on the list? Message us. If you are within reach of Charlotte, we can usually work something out.
            </p>
            <div className="mt-8">
              <Button href="/menu">Order now</Button>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {site.areasServed.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-2xl bg-paper px-4 py-4">
                <MapPin size={18} className="shrink-0 text-accent" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="hours-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <h2 id="hours-title" className="text-4xl">
              Kitchen hours
            </h2>
            <dl className="mt-8 max-w-sm divide-y divide-line border-y border-line">
              {site.hours.map((h) => (
                <div key={h.label} className="flex justify-between py-4">
                  <dt>{h.label}</dt>
                  <dd className="text-muted">{h.display}</dd>
                </div>
              ))}
              <div className="flex justify-between py-4">
                <dt>Monday</dt>
                <dd className="text-muted">Closed</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-4xl">Good to know</h2>
            <div className="mt-8">
              <Faq items={deliveryFaqs} />
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={[faqSchema(deliveryFaqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Delivery", path: "/delivery" }])]} />
    </>
  );
}
