import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { seoPages, validateSeoCopy } from "./catalog";

export async function runSeoAgent() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(5000) }) },
  });
  // A unique hour reserves the run before publication; duplicate cron deliveries are harmless.
  const hour = new Date().toISOString().slice(0, 13) + ":00:00Z";
  const { data: run, error: claimError } = await db.from("seo_agent_runs")
    .insert({ hour, status: "running" }).select("id").single();
  if (claimError?.code === "23505") return { ok: true, skipped: "Already attempted this hour" };
  if (claimError || !run) throw new Error("Cannot reserve SEO run; check database migration");

  let checks: { path: string; status: number; ok: boolean }[] = [];
  try {
    const { data: existing, error } = await db.from("seo_metadata").select("*");
    if (error) throw new Error("Cannot read SEO metadata");
    checks = await Promise.all(seoPages.map(async (page) => {
      try {
        const response = await fetch(`https://www.debuggerssquad.com${page.path}`, {
          redirect: "error", cache: "no-store", signal: AbortSignal.timeout(6000),
        });
        const ok = response.ok && (response.headers.get("content-type") || "").includes("text/html");
        await response.body?.cancel();
        return { path: page.path, status: response.status, ok };
      } catch { return { path: page.path, status: 0, ok: false }; }
    }));
    if (checks.some((check) => !check.ok)) throw new Error("A public page failed its availability check");

    const pages = seoPages.map((page) => ({
      ...page,
      source_hash: createHash("sha256").update(JSON.stringify(page)).digest("hex"),
    })).filter((page) => {
      const current = existing?.find((row) => row.path === page.path);
      try { validateSeoCopy(current); } catch { return true; }
      return current?.source_hash !== page.source_hash;
    });

    // Reviewed templates keep this automation independent of paid AI providers.
    const publications = pages.map(validateSeoCopy);
    const allCopy = [...(existing ?? []).filter((row) => !publications.some((page) => page.path === row.path)), ...publications];
    if (new Set(allCopy.map((row) => row.title.toLowerCase())).size !== allCopy.length ||
        new Set(allCopy.map((row) => row.description.toLowerCase())).size !== allCopy.length) throw new Error("Duplicate SEO copy");
    const updates = publications.map((copy) => ({ ...copy, source_hash: pages.find((page) => page.path === copy.path)!.source_hash }));
    const { error: publishError } = await db.rpc("publish_seo_run", { run_id: run.id, updates, checks });
    if (publishError) throw new Error("SEO publication transaction failed");
    return { ok: true, runId: run.id, checked: checks.length, updated: updates.length };
  } catch (error) {
    // Only known operational messages are persisted, never provider response bodies or secrets.
    const message = error instanceof Error && /^(Cannot |A public |Duplicate |SEO |Invalid |Unknown |Product )/.test(error.message)
      ? error.message : "SEO run failed; previous metadata retained";
    await db.from("seo_agent_runs").update({ status: "failed", error: message, checks, finished_at: new Date().toISOString() }).eq("id", run.id);
    throw new Error(message);
  }
}
