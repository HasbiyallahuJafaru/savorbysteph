// TODO(owner): replace the placeholder phone/WhatsApp number, hours and pickup area with real values.

export const site = {
  name: "Savorbysteph",
  legalName: "Savor by Steph",
  tagline: "Homemade Nigerian food in Charlotte, NC",
  description:
    "Homemade Nigerian and African food in Charlotte, North Carolina. Jollof rice, egusi, pepper soup, suya and party trays, cooked fresh by Steph for delivery or pickup.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savorbysteph.com").replace(/\/$/, ""),
  instagramHandle: "savorbysteph",
  instagram: "https://www.instagram.com/savorbysteph/",
  phoneDisplay: "+1 (704) 555-0182",
  phoneE164: "+17045550182",
  whatsapp: "17045550182",
  email: "hello@savorbysteph.com",
  city: "Charlotte",
  region: "NC",
  regionName: "North Carolina",
  country: "US",
  pickupArea: "Pickup in Charlotte, NC. Exact address shared when your order is confirmed.",
  geo: { lat: 35.2271, lng: -80.8431 },
  priceRange: "$$",
  currency: "USD",
  hours: [
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "19:00", label: "Tue - Fri", display: "11am - 7pm" },
    { days: ["Saturday"], opens: "10:00", closes: "18:00", label: "Saturday", display: "10am - 6pm" },
    { days: ["Sunday"], opens: "12:00", closes: "16:00", label: "Sunday", display: "12pm - 4pm" },
  ],
  closedNote: "Closed Mondays",
  leadTime: "Most orders are ready the next day. Party trays need 72 hours notice.",
  areasServed: [
    "Charlotte",
    "Matthews",
    "Mint Hill",
    "Pineville",
    "Huntersville",
    "Cornelius",
    "Concord",
    "Gastonia",
    "Indian Trail",
    "Fort Mill, SC",
  ],
} as const;

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our story" },
  { href: "/catering", label: "Catering" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
] as const;
