import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { HeroText } from "@/components/hero/HeroText";

type Props = {
  title: React.ReactNode;
  intro?: string;
  crumbs: { name: string; href: string }[];
  children?: React.ReactNode;
};

export function PageHeader({ title, intro, crumbs, children }: Props) {
  return (
    <header className="relative overflow-hidden pt-[72px]">
      <div aria-hidden className="absolute -right-40 -top-40 size-[520px] rounded-full bg-accent-tint md:-right-24" />
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <CaretRight size={12} aria-hidden />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-accent">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <HeroText>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
          {intro ? <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">{intro}</p> : null}
          {children}
        </HeroText>
      </div>
    </header>
  );
}
