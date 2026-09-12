# Daily Supabase database health check

The workflow `.github/workflows/supabase-health-check.yml` reads at most one
public product ID each day at 09:47 IST. It does not modify data or log the
response. Failed requests fail the workflow, with timeouts and limited retries.
The existing `Public read products` RLS policy permits this query.

## Activate

1. Push the workflow to this repository's default branch (`main`).
2. Open https://github.com/adityaIITG1/debuggers_squad_website/settings/secrets/actions
   and add a repository secret named `SUPABASE_ANON_KEY`. Use the restored
   project's public anon key or publishable key from Supabase Settings > API Keys
   (the app's `NEXT_PUBLIC_SUPABASE_ANON_KEY` value, if configured).
   Do not use a service-role key or commit environment files.
3. Open GitHub Actions > Supabase database health check > Run workflow and
   confirm the run succeeds. Ensure Actions is enabled for the repository.
4. Enable GitHub Actions failure notifications in your GitHub notification
   settings so a broken database connection is visible.

The schedule runs on GitHub, so your laptop can be off. Adding the file locally
does not activate it: the default-branch push and Actions secret are required.

## Limits

This provides a daily database availability check and activity; it does not
guarantee that Supabase's free project will never pause. Supabase guarantees
protection from inactivity pausing on Pro:
https://supabase.com/docs/guides/deployment/going-into-prod

GitHub schedules can be delayed. In public repositories, GitHub disables scheduled
workflows after 60 days without repository activity. Check Actions periodically
and re-enable the workflow if disabled:
https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
