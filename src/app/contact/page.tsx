import type { Metadata } from "next";
import { EnvelopeSimple, InstagramLogo, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/order";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Savorbysteph | Nigerian Food in Charlotte, NC",
  description: "Get in touch with Savorbysteph for orders, catering quotes and questions. WhatsApp, text, email or Instagram. Charlotte, North Carolina.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: WhatsappLogo, label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(`Hi ${site.name}!`), note: "Fastest reply", external: true },
    { icon: Phone, label: "Call or text", value: site.phoneDisplay, href: `tel:${site.phoneE164}`, note: "During kitchen hours" },
    { icon: InstagramLogo, label: "Instagram", value: `@${site.instagramHandle}`, href: site.instagram, note: "Specials and new dishes", external: true },
    { icon: EnvelopeSimple, label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Catering and events" },
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", href: "/contact" }]}
        title={
          <>
            Say hello. <em className="text-accent">We&apos;re hungry to hear from you.</em>
          </>
        }
        intro={`Questions about the menu, a custom order or catering in ${site.city}? Reach Steph on any of these.`}
      />
      <section className="pb-8">
        <ul className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 md:px-8">
          {channels.map(({ icon: Icon, label, value, href, note, external }, i) => (
            <Reveal as="li" key={label} delay={i * 0.06}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-5 rounded-[var(--radius-panel)] border border-line bg-white p-6 transition-colors hover:border-ink md:p-8"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-tint text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon size={26} weight="light" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">
                    {label} · {note}
                  </span>
                  <span className="mt-1 block truncate font-display text-2xl">{value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-3xl">Kitchen hours</h2>
            <ul className="mt-5 space-y-2 text-muted">
              {site.hours.map((h) => (
                <li key={h.label}>
                  {h.label}: {h.display}
                </li>
              ))}
              <li>{site.closedNote}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl">Pickup</h2>
            <p className="mt-5 max-w-[48ch] text-muted">{site.pickupArea}</p>
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </>
  );
}
