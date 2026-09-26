import type { Metadata } from "next";
import { CalendarCheck, Confetti, Users, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { CircleImage } from "@/components/ui/CircleImage";
import { DishCard } from "@/components/menu/DishCard";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { getItem } from "@/data/menu";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/order";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nigerian & African Catering in Charlotte, NC | Party Trays",
  description:
    "Nigerian party trays and African catering in Charlotte, NC. Jollof rice, fried rice, small chops, suya and soups for birthdays, weddings, church and office events.",
  alternates: { canonical: "/catering" },
};

const occasions = [
  { icon: Confetti, title: "Birthdays & parties", text: "Jollof, small chops and asun that disappear before the cake comes out." },
  { icon: Users, title: "Church & community", text: "Generous trays for fellowship, naming ceremonies and gatherings." },
  { icon: CalendarCheck, title: "Office lunches", text: "Delivered on time, labeled, and easy to serve buffet style." },
];

const trayPicks = ["party-jollof-tray", "puff-puff", "asun", "meat-pie"];

export default function CateringPage() {
  const trays = trayPicks.map(getItem).filter((m) => m !== undefined);
  const enquiry = whatsappLink(`Hi ${site.name}! I'd like a catering quote.\n\nEvent date:\nNumber of guests:\nDelivery area:\nDishes I'm interested in:`);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Catering", href: "/catering" }]}
        title={
          <>
            Party trays for <em className="text-accent">every celebration.</em>
          </>
        }
        intro="Nigerian and African catering in Charlotte for 10 guests or 200. Tell us about your event and we will put together a menu and quote."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={enquiry} external>
            <WhatsappLogo size={20} weight="fill" /> Get a catering quote
          </Button>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24" aria-labelledby="occasions-title">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="occasions-title" className="text-4xl md:text-5xl">
              Built for a crowd
            </h2>
            <ul className="mt-10 space-y-8">
              {occasions.map(({ icon: Icon, title, text }, i) => (
                <Reveal as="li" key={title} delay={i * 0.08} className="flex gap-5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-tint text-accent">
                    <Icon size={26} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-2xl">{title}</h3>
                    <p className="mt-2 max-w-[48ch] leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-10 rounded-2xl bg-shell p-5 text-[15px] text-ink-soft">{site.leadTime}</p>
          </div>
          <Reveal className="mx-auto w-[80%] max-w-[440px] lg:col-span-5 lg:w-full">
            <CircleImage src="/images/dishes/party-tray.webp" alt="Party trays of jollof and fried rice with chicken" sizes="(max-width: 1024px) 80vw, 440px" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-20" aria-labelledby="trays-title">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 id="trays-title" className="text-4xl">
            Popular for events
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
            {trays.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.06}>
                <DishCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Catering", path: "/catering" }])} />
    </>
  );
}
