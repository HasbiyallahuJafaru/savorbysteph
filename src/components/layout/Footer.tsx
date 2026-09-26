import Link from "next/link";
import { ChatCircleText, CookingPot, InstagramLogo, Package, Truck } from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/config/site";
import { categories } from "@/data/menu";
import { Logo } from "@/components/ui/Logo";

const promises = [
  { icon: Truck, title: "Delivery or pickup", text: "Across Charlotte and nearby towns." },
  { icon: Package, title: "Sealed packaging", text: "Leak-proof containers that reheat well." },
  { icon: CookingPot, title: "Cooked to order", text: "Small batches, never mass produced." },
  { icon: ChatCircleText, title: "Talk to Steph", text: "Questions answered on WhatsApp." },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-shell/60">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ul className="grid grid-cols-1 gap-8 border-b border-line py-12 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4">
              <Icon size={34} weight="thin" className="shrink-0 text-accent" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
              Homemade Nigerian and West African food, cooked in {site.city}, {site.regionName} for delivery and pickup.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-accent"
            >
              <InstagramLogo size={20} weight="light" /> @{site.instagramHandle}
            </a>
          </div>

          <FooterCol title="Explore">
            {nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="The menu">
            {categories.map((c) => (
              <FooterLink key={c.id} href={`/menu#${c.id}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          <div className="md:col-span-3">
            <p className="text-sm font-medium">Hours</p>
            <ul className="mt-4 space-y-2 text-[15px] text-muted">
              {site.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-6">
                  <span>{h.label}</span>
                  <span>{h.display}</span>
                </li>
              ))}
              <li>{site.closedNote}</li>
            </ul>
            <p className="mt-6 text-[15px]">
              <a href={`tel:${site.phoneE164}`} className="hover:text-accent">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Homemade Nigerian food in {site.city}, {site.region}.
          </p>
          <Link href="/credits" className="hover:text-ink">
            Photo credits
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[15px] text-muted transition-colors hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
