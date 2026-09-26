import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AddedToast } from "@/components/cart/AddedToast";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"], display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Savorbysteph | Homemade Nigerian Food in Charlotte, NC",
    template: "%s | Savorbysteph",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Nigerian food Charlotte",
    "African food Charlotte NC",
    "Nigerian restaurant North Carolina",
    "jollof rice Charlotte",
    "egusi soup near me",
    "Nigerian food delivery Charlotte",
    "African catering Charlotte",
    "homemade African food",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Savorbysteph | Homemade Nigerian Food in Charlotte, NC",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Savorbysteph | Homemade Nigerian Food in Charlotte", description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  other: { "geo.region": "US-NC", "geo.placename": "Charlotte", "geo.position": `${site.geo.lat};${site.geo.lng}`, ICBM: `${site.geo.lat}, ${site.geo.lng}` },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="grain">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <AddedToast />
          <WhatsAppFab />
        </Providers>
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
