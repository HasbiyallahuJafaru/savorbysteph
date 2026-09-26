import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, menuSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nigerian Food Menu | Order Online in Charlotte, NC",
  description:
    "Order homemade Nigerian food in Charlotte, NC. Jollof rice, egusi soup, efo riro, pepper soup, suya, puff puff and party trays for delivery or pickup.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Menu", href: "/menu" }]}
        title={
          <>
            The menu. <em className="text-accent">Homemade, every dish.</em>
          </>
        }
        intro="Nigerian rice dishes, soups, grills and small chops cooked fresh in Charlotte. Add what you love, then send your order on WhatsApp for delivery or pickup."
      />
      <MenuBrowser />
      <JsonLd data={[menuSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])]} />
    </>
  );
}
