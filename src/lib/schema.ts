import { site } from "@/config/site";
import { categories, menu, type MenuItem } from "@/data/menu";

const abs = (path: string) => `${site.url}${path}`;
const businessId = abs("/#business");

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": businessId,
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    url: site.url,
    logo: abs("/icon.svg"),
    image: [abs("/images/dishes/jollof-rice.webp"), abs("/images/dishes/egusi-soup.webp"), abs("/images/dishes/suya.webp")],
    telephone: site.phoneE164,
    email: site.email,
    priceRange: site.priceRange,
    servesCuisine: ["Nigerian", "African", "West African"],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areasServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    hasMenu: abs("/menu"),
    acceptsReservations: false,
    sameAs: [site.instagram],
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: abs("/menu"), actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@id": businessId },
  };
}

const menuItemNode = (item: MenuItem) => ({
  "@type": "MenuItem",
  name: item.name,
  description: item.description,
  url: abs(`/menu/${item.slug}`),
  image: abs(item.image),
  offers: item.options.map((o) => ({
    "@type": "Offer",
    name: o.label,
    price: o.price.toFixed(2),
    priceCurrency: site.currency,
    availability: "https://schema.org/InStock",
  })),
  ...(item.tags.includes("Vegan") ? { suitableForDiet: "https://schema.org/VeganDiet" } : {}),
  ...(item.tags.includes("Gluten free") ? { suitableForDiet: "https://schema.org/GlutenFreeDiet" } : {}),
});

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} Nigerian food menu`,
    url: abs("/menu"),
    inLanguage: "en-US",
    provider: { "@id": businessId },
    hasMenuSection: categories.map((c) => ({
      "@type": "MenuSection",
      name: c.name,
      description: c.blurb,
      hasMenuItem: menu.filter((m) => m.category === c.id).map(menuItemNode),
    })),
  };
}

export function dishSchema(item: MenuItem) {
  return { "@context": "https://schema.org", ...menuItemNode(item), provider: { "@id": businessId } };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
  };
}
