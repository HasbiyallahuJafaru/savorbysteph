import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { imageCredits } from "@/data/credits";

export const metadata: Metadata = {
  title: "Photo credits",
  robots: { index: false, follow: true },
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Photo credits", href: "/credits" }]} title="Photo credits" intro="Some photos on this site come from Wikimedia Commons contributors and are used under the licenses below. Images were cropped to fit." />
      <section className="mx-auto max-w-4xl px-5 pb-16 md:px-8">
        <ul className="divide-y divide-line border-y border-line">
          {imageCredits.map((c) => (
            <li key={c.image} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {c.file}
              </a>
              <span className="text-sm text-muted">{c.license}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
