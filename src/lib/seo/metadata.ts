import type { Metadata } from "next";
import { validateSeoCopy, type SeoPath } from "./catalog";

export async function seoMetadata(path: SeoPath, fallback: Metadata): Promise<Metadata> {
  const canonical = `https://www.debuggerssquad.com${path === "/" ? "" : path}`;
  const base = { ...fallback, alternates: { ...fallback.alternates, canonical } };
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (process.env.SEO_AGENT_ENABLED !== "true" || !url || !key) return base;
  try {
    const endpoint = new URL("/rest/v1/seo_metadata", url);
    endpoint.searchParams.set("path", `eq.${path}`);
    endpoint.searchParams.set("select", "path,title,description");
    const response = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return base;
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length !== 1) return base;
    const copy = validateSeoCopy(rows[0]);
    const images = ["/images/neuropulseai/gallery/debuggers-squad-logo.jpeg"];
    return {
      ...base,
      title: { absolute: copy.title },
      description: copy.description,
      openGraph: { ...fallback.openGraph, title: copy.title, description: copy.description, url: canonical, siteName: "Debuggers Squad", images },
      twitter: { ...fallback.twitter, card: "summary_large_image", title: copy.title, description: copy.description, images },
    };
  } catch {
    return base;
  }
}
