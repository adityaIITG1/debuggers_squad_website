/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test harness loads transpiled TypeScript with provider mocks. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function load(relative, mocks = {}) {
  const filename = path.resolve(relative);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const localRequire = (name) => {
    if (name in mocks) return mocks[name];
    if (name.startsWith('.')) return load(path.resolve(path.dirname(filename), name + '.ts'), mocks);
    return require(name);
  };
  new Function('require', 'module', 'exports', source)(localRequire, mod, mod.exports);
  return mod.exports;
}
const { seoPages, validateSeoCopy } = load('src/lib/seo/catalog.ts');
const copies = seoPages.map(page => ({
  path: page.path,
  title: `${page.subject} | ${page.path === '/about' ? 'Our startup story' : 'Educational technology'}`,
  description: `${page.subject} ${page.path === '/about' ? 'shares its startup story and team interests in' : 'offers educational prototype tools for'} electronics, accessible technology, learning and research projects.`,
}));

test('validation rejects unsupported claims, unknown pages and unsafe markup', () => {
  seoPages.forEach(page => validateSeoCopy(page));
  copies.forEach(copy => assert.deepEqual(validateSeoCopy(copy), copy));
  for (const patch of [
    { path: '/checkout' }, { title: '<script>Debuggers Squad</script>' },
    { description: 'Debuggers Squad offers a guaranteed cure through its clinically approved educational technology devices.' },
    { title: 'Debuggers Squad for $100' }, { description: 'Too short' },
  ]) assert.throws(() => validateSeoCopy({ ...copies[0], ...patch }));
  assert.throws(() => validateSeoCopy({ ...copies[2], description: 'NeuroPulseAI offers powerful tools for muscle-signal visualization, laboratory demonstrations and student research.' }));
});

test('metadata keeps fallback on outages and publishes absolute titles with page canonicals', async () => {
  const savedFetch = global.fetch;
  const savedEnv = { ...process.env };
  try {
    process.env.SEO_AGENT_ENABLED = 'true';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test';
    const { seoMetadata } = load('src/lib/seo/metadata.ts');
    const fallback = { title: 'Original', description: 'Original description' };
    global.fetch = async () => { throw new Error('offline'); };
    assert.equal((await seoMetadata('/product', fallback)).title, 'Original');
    global.fetch = async () => Response.json([copies[2]]);
    const published = await seoMetadata('/product', fallback);
    assert.deepEqual(published.title, { absolute: copies[2].title });
    assert.equal(published.alternates.canonical, 'https://www.debuggerssquad.com/product');
    assert.equal(published.openGraph.description, copies[2].description);
    process.env.SEO_AGENT_ENABLED = 'false';
    assert.equal((await seoMetadata('/product', fallback)).title, 'Original');
  } finally { global.fetch = savedFetch; process.env = savedEnv; }
});

test('cron authentication, disabled mode and missing credentials prevent runs', async () => {
  const savedEnv = { ...process.env };
  let calls = 0;
  try {
    const { GET } = load('src/app/api/cron/seo-agent/route.ts', {
      '@/lib/seo/agent': { runSeoAgent: async () => { calls++; return { ok: true }; } },
    });
    delete process.env.SEO_AGENT_SECRET;
    assert.equal((await GET(new Request('https://example.test'))).status, 503);
    process.env.SEO_AGENT_SECRET = 'test-secret';
    assert.equal((await GET(new Request('https://example.test'))).status, 401);
    const request = () => new Request('https://example.test', { headers: { authorization: 'Bearer test-secret' } });
    process.env.SEO_AGENT_ENABLED = 'false';
    assert.equal((await GET(request())).status, 200);
    process.env.SEO_AGENT_ENABLED = 'true';
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    assert.equal((await GET(request())).status, 503);
    assert.equal(calls, 0);
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test';
    delete process.env.OPENAI_API_KEY;
    assert.equal((await GET(request())).status, 200);
    assert.equal(calls, 1);
  } finally { process.env = savedEnv; }
});

test('agent publishes atomically, skips unchanged facts and retains data on failure', async () => {
  const savedFetch = global.fetch;
  let existing = [], claimDuplicate = false, failPublish = false, unhealthy = false, pageCalls = 0;
  const published = [], failed = [];
  const db = {
    from(table) {
      if (table === 'seo_metadata') return { select: async () => ({ data: existing }) };
      return {
        insert: () => ({ select: () => ({ single: async () => claimDuplicate
          ? { error: { code: '23505' } } : { data: { id: 'run-id' } } }) }),
        update: (value) => ({ eq: async () => { failed.push(value); return {}; } }),
      };
    },
    rpc: async (name, args) => { assert.equal(name, 'publish_seo_run'); if (failPublish) return { error: { message: 'offline' } }; published.push(args); return {}; },
  };
  try {
    const { runSeoAgent } = load('src/lib/seo/agent.ts', { '@supabase/supabase-js': { createClient: () => db } });
    global.fetch = async (url) => {
      assert.equal(new URL(url).hostname, 'www.debuggerssquad.com', 'No external AI provider may be called');
      pageCalls++;
      return new Response('', { status: unhealthy ? 503 : 200, headers: { 'content-type': 'text/html' } });
    };
    assert.equal((await runSeoAgent()).updated, 4);
    assert.equal(published.length, 1);
    existing = published[0].updates;
    assert.equal((await runSeoAgent()).updated, 0);
    assert.equal(pageCalls, 8);
    claimDuplicate = true;
    assert.equal((await runSeoAgent()).skipped, 'Already attempted this hour');
    assert.equal(published.length, 2);
    claimDuplicate = false;
    existing = [];
    failPublish = true;
    await assert.rejects(runSeoAgent, /publication transaction failed/);
    assert.equal(published.length, 2);
    assert.equal(failed.at(-1).status, 'failed');
    unhealthy = true;
    await assert.rejects(runSeoAgent, /availability/);
    assert.equal(pageCalls, 16);
  } finally { global.fetch = savedFetch; }
});
