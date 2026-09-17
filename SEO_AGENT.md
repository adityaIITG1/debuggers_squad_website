# DEBUGGERS SQUAD automated SEO

The hosted agent checks `/`, `/about`, `/product`, and `/paratalk` hourly via GitHub
Actions. It automatically publishes search titles, descriptions and matching social
metadata from reviewed templates, with no AI API or API key. Existing page metadata remains the fallback.

This is rule-based automation, not a generative AI service. It uses reviewed facts
and metadata in `src/lib/seo/catalog.ts`. Update its titles and descriptions alongside
changes to page copy. Publication happens on the first run and when the catalog changes.
Public page availability is checked every run. It does not measure Google rankings,
access Search Console, write blog posts, or edit prices, checkout or legal text.
Output validation reduces bad output but cannot guarantee accuracy or rankings.

## Activation

1. Run `supabase_seo_migration.sql` in the existing Supabase SQL editor. It creates
   public read-only metadata, private history, and a service-role publication function.
2. In Vercel **Production**, configure:
   - `SEO_AGENT_ENABLED=true`
   - `SEO_AGENT_SECRET`: a random secret of at least 32 characters
   - Existing `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
     `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy this code to `https://www.debuggerssquad.com`.
4. In GitHub repository Actions settings, add secret `SEO_AGENT_SECRET` with the same
   value, and Actions variable `SEO_AGENT_ENABLED=true`.
5. Put the workflow on the default branch and enable Actions. Manually run
   **Debuggers Squad SEO agent**. Confirm success with `updated: 4`, then check live
   HTML metadata after the five-minute cache refresh.
6. Confirm the next scheduled execution. Runs are scheduled at minute 17 each hour
   UTC. GitHub may delay/drop runs and may disable public-repository schedules after
   60 days without activity. Monitor Actions failures and database run timestamps.

This is recurring hosted automation, not a guaranteed continuous process. Your
computer can be off. No AI subscription is required and no AI API calls are made.
Existing Vercel/Supabase usage still counts toward their plan limits.

GitHub standard runners are free for public repositories. Private repositories use
shared free minutes and can incur overage charges if billing is enabled. This workflow
skips private repositories by default. For a private repository, first ensure Actions
cannot bill beyond the free quota (for example, no payment method configured), then
set repository variable `SEO_FREE_RUNNER_CONFIRMED=true`. Do not change repository
visibility just for this. If the shared allowance runs out, let the job stop instead
of enabling paid usage. This code does not change account billing settings or upload
Actions artifacts/caches.

The workflow calls a fixed production URL and does not follow redirects with the
secret. Domain changes require updating workflow and agent URLs. Vercel Hobby only
supports daily Vercel cron jobs, so GitHub supplies the hourly schedule. The existing
Supabase keepalive remains unchanged. Use the GitHub scheduler for this endpoint;
its authentication uses the dedicated SEO_AGENT_SECRET.

## Monitoring and rollback

Endpoint: `GET /api/cron/seo-agent`, authenticated with
`Authorization: Bearer <SEO_AGENT_SECRET>`. Responses: 401 invalid authorization, 503
missing setup, 502 failed run, 200 success/skip. A disabled agent returns a skip.

Inspect history in the Supabase SQL editor:

```sql
select id, hour, status, checks, error, started_at, finished_at
from public.seo_agent_runs order by started_at desc limit 48;
```

A unique UTC hour prevents duplicate attempts. Failed runs retry next hour.
Host-terminated runs can remain `running`; treat rows older than two minutes as
interrupted. Each completed run stores before/after snapshots. Metadata and history
commit together. Rejected template copy leaves current metadata intact. Database read
failures render source fallbacks. History remains until explicitly pruned.

To stop changes, set the GitHub Actions variable `SEO_AGENT_ENABLED=false`. To also
restore original source metadata, set Vercel's `SEO_AGENT_ENABLED=false` and redeploy.

To restore a saved revision: disable the scheduler, wait two minutes for in-flight
runs to finish, inspect the desired run's `before_copy`, then execute this transaction
with a real published run UUID. Keep Vercel's enable flag true to render restored copy.

```sql
begin;
create temporary table seo_restore as
select before_copy from public.seo_agent_runs
where id = 'REPLACE_WITH_RUN_UUID'::uuid and status = 'published';
do $$ begin
  if not exists (select 1 from seo_restore) then
    raise exception 'Published revision not found';
  end if;
end $$;
delete from public.seo_metadata;
insert into public.seo_metadata(path, title, description, source_hash, updated_at)
select x.path, x.title, x.description, x.source_hash, x.updated_at
from seo_restore r,
jsonb_to_recordset(r.before_copy) x(path text, title text, description text,
source_hash text, updated_at timestamptz);
drop table seo_restore;
commit;
```

An empty snapshot restores source fallbacks. Allow five minutes for cache refresh.
Review the catalog and bad copy before restarting the scheduler.

## Verification

Run `node --test tests/seo-agent.test.cjs`, `npx tsc --noEmit`, and `npm run build`.
Tests mock providers/database and incur no API charges. Production activation still
requires the migration and a live end-to-end run.

References: [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions),
[Vercel scheduling limits](https://vercel.com/docs/cron-jobs/usage-and-pricing),
[GitHub schedules](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
