import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { menu } from "@/data/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/menu", priority: 0.95 },
    { path: "/catering", priority: 0.8 },
    { path: "/delivery", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: "weekly" as const, priority: p.priority })),
    ...menu.map((m) => ({
      url: `${site.url}/menu/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [`${site.url}${m.image}`],
    })),
  ];
}
