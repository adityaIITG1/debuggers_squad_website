-- Run once in the Supabase SQL editor. No customer data is used by the agent.
begin;
create table if not exists public.seo_metadata (
  path text primary key check (path in ('/', '/about', '/product', '/paratalk')),
  title text not null check (length(title) between 20 and 70),
  description text not null check (length(description) between 80 and 170),
  source_hash text not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.seo_agent_runs (
  id uuid primary key default gen_random_uuid(),
  hour timestamptz not null unique,
  status text not null check (status in ('running', 'published', 'unchanged', 'failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  checks jsonb not null default '[]',
  before_copy jsonb,
  after_copy jsonb,
  error text
);
alter table public.seo_metadata enable row level security;
alter table public.seo_agent_runs enable row level security;
revoke all on public.seo_metadata, public.seo_agent_runs from anon, authenticated;
grant select on public.seo_metadata to anon, authenticated;
grant all on public.seo_metadata, public.seo_agent_runs to service_role;
drop policy if exists "Public SEO metadata" on public.seo_metadata;
create policy "Public SEO metadata" on public.seo_metadata for select to anon, authenticated using (true);

create or replace function public.publish_seo_run(run_id uuid, updates jsonb, checks jsonb)
returns void language plpgsql security invoker set search_path = public as $$
declare previous jsonb;
begin
  perform 1 from public.seo_agent_runs where id = run_id and status = 'running'
    and started_at > now() - interval '2 minutes' for update;
  if not found then raise exception 'Run missing, completed or expired'; end if;
  select coalesce(jsonb_agg(to_jsonb(m)), '[]'::jsonb) into previous from public.seo_metadata m;
  insert into public.seo_metadata(path, title, description, source_hash)
    select x.path, x.title, x.description, x.source_hash
    from jsonb_to_recordset(updates) as x(path text, title text, description text, source_hash text)
    on conflict (path) do update set title = excluded.title, description = excluded.description,
      source_hash = excluded.source_hash, updated_at = now();
  update public.seo_agent_runs set
    status = case when jsonb_array_length(updates) = 0 then 'unchanged' else 'published' end,
    finished_at = now(), checks = publish_seo_run.checks, before_copy = previous,
    after_copy = (select coalesce(jsonb_agg(to_jsonb(m)), '[]'::jsonb) from public.seo_metadata m)
    where id = run_id;
end;
$$;
revoke all on function public.publish_seo_run(uuid, jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.publish_seo_run(uuid, jsonb, jsonb) to service_role;
commit;
