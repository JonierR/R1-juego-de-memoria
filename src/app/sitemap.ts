import type { MetadataRoute } from "next";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/records"].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
}
