import { timingSafeEqual } from "node:crypto";
import { runSeoAgent } from "@/lib/seo/agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const reply = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  const secret = process.env.SEO_AGENT_SECRET;
  if (!secret) return reply({ ok: false, error: "SEO_AGENT_SECRET is not configured" }, 503);
  const actual = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return reply({ ok: false, error: "Unauthorized" }, 401);
  if (process.env.SEO_AGENT_ENABLED !== "true") return reply({ ok: true, skipped: "SEO agent disabled" });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return reply({ ok: false, error: "SEO agent requires Supabase server credentials" }, 503);
  }
  try { return reply(await runSeoAgent()); }
  catch (error) {
    console.error("SEO agent:", error instanceof Error ? error.message : "Run failed");
    return reply({ ok: false, error: "SEO run failed; check seo_agent_runs and function logs" }, 502);
  }
}
