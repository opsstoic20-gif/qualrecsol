import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://qualrecsol.vercel.app";
  const routes = ["", "/about", "/services", "/industries", "/global", "/global/usa", "/global/india", "/global/mexico", "/case-studies", "/careers", "/contact", "/privacy", "/terms"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : r === "/careers" || r === "/contact" ? 0.8 : 0.6,
  }));
}
