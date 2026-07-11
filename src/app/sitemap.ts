import type { MetadataRoute } from "next";

const baseUrl = "https://www.debuggerssquad.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ["", "weekly", 1],
    ["/about", "monthly", 0.9],
    ["/product", "weekly", 0.9],
    ["/paratalk", "monthly", 0.8],
    ["/demo", "monthly", 0.7],
    ["/media-kit", "monthly", 0.7],
    ["/contact", "monthly", 0.6],
    ["/policies/shipping", "yearly", 0.4],
    ["/policies/refunds", "yearly", 0.4],
    ["/policies/privacy", "yearly", 0.4],
    ["/policies/terms", "yearly", 0.4],
    ["/policies/disclaimer", "yearly", 0.4],
  ] as const;

  return routes.map(([route, changeFrequency, priority]) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
