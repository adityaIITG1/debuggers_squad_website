import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not configured" }, { status: 503 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Supabase is not configured" }, { status: 503 });
  }

  // A real database read, independent of cookies and visitor traffic.
  // Retry transient failures without retrieving or returning table contents.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(new URL("/rest/v1/app_releases?select=id&limit=1", url), {
        method: "HEAD",
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) {
        return NextResponse.json({
          ok: true,
          checked: "app_releases",
          timestamp: new Date().toISOString(),
        }, { headers: { "Cache-Control": "no-store" } });
      }
      console.error("Supabase keepalive failed", { attempt: attempt + 1, status: response.status });
      if (response.status < 500 && response.status !== 429) break;
    } catch {
      console.error("Supabase keepalive network failure", { attempt: attempt + 1 });
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return NextResponse.json({ ok: false, error: "Database check failed; inspect the cron logs" }, { status: 502 });
}
