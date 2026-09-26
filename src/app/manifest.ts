import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | Nigerian food in Charlotte`,
    short_name: site.name,
    description: site.description,
    start_url: "/menu",
    display: "standalone",
    background_color: "#fcfbf9",
    theme_color: "#c2410c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
