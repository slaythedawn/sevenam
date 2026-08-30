#!/usr/bin/env node
/* Pre-commit checks for the Sevenam site. No dependencies, no browser, no network —
   runs in about a second so there is no excuse to skip it.

   Run from the repo root:   node tools/check.js
   Exits non-zero on any failure, so CI fails the build.

   What it does NOT cover: anything that needs a browser — the 7am hero sequence,
   the FAQ accordion, the calculator, the quiz. Those still need a human to look.
   See "Verifying changes" in README.md. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { checkDesign } = require('./check-design');
const STRICT = process.argv.includes('--strict');
const drifts = [];
const drift = (file, msg) => drifts.push(`${file}: ${msg}`);
const SITE_JS_HASH = require('crypto')
  .createHash('sha256').update(fs.readFileSync(path.join(ROOT, 'site.js'))).digest('hex').slice(0, 8);
const ORIGIN = 'https://sevenam.com.au';

const problems = [];
const fail = (file, msg) => problems.push(`${file}: ${msg}`);

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
const routeOf = f => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));
const routes = new Set(htmlFiles.map(routeOf));

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* Visible text: strip <script> and <style> blocks FIRST, then tags. Skipping that
   step leaves the JSON-LD's own text in the haystack, so schema appears to match
   itself and every page passes. That bug hid a real defect on /pricing once. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const attr = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const html = read(file);
  const route = routeOf(file);
  const text = visibleText(html);

  const title = attr(html, /<title>([\s\S]*?)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);

  if (!title) fail(file, 'no <title>');
  if (!desc) fail(file, 'no meta description');

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(file, `${h1s} <h1> tags, expected exactly 1`);

  const expected = ORIGIN + route;
  if (canonical !== expected) fail(file, `canonical is ${canonical}, expected ${expected}`);

  if (title) {
    if (titles.has(title)) fail(file, `duplicate <title> shared with ${titles.get(title)}`);
    else titles.set(title, file);
  }
  if (desc) {
    if (descriptions.has(desc)) fail(file, `duplicate description shared with ${descriptions.get(desc)}`);
    else descriptions.set(desc, file);
  }

  /* JSON-LD must parse, and any FAQ answer it claims must be on the page. */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail(file, 'no JSON-LD');
  for (const [, raw] of blocks) {
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) { fail(file, 'invalid JSON-LD: ' + e.message); continue; }
    const nodes = parsed['@graph'] || [parsed];
    for (const node of nodes) {
      if (node['@type'] !== 'FAQPage') continue;
      for (const q of node.mainEntity || []) {
        const answer = q.acceptedAnswer && q.acceptedAnswer.text;
        if (!answer) { fail(file, `FAQ "${q.name}" has no answer text`); continue; }
        const probe = visibleText(answer).slice(0, 60);
        if (!text.includes(probe)) {
          fail(file, `FAQ schema answer is not visible on the page: "${q.name}"`);
        }
      }
    }
  }

  /* A social card that 404s is worse than none: the platform falls back to a
     blank box and the link looks broken. */
  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!og) {
    fail(file, 'no og:image — a shared link renders as a bare box');
  } else {
    const rel = og[1].replace(ORIGIN, '');
    if (!fs.existsSync(path.join(ROOT, rel.slice(1)))) fail(file, `og:image missing: ${rel}`);
  }

  /* Every internal link and asset must resolve. An href pointing at a file on
     disk — an icon, the manifest — is an asset; anything else has to be a page. */
  const isAsset = (href) => href.startsWith('/img/') || href.startsWith('/og/')
    || /\.(js|json|webmanifest|xml|txt|svg|png|jpe?g|webp|ico)$/.test(href);
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (isAsset(href)) {
      if (!fs.existsSync(path.join(ROOT, href.slice(1)))) fail(file, `missing asset ${href}`);
    } else if (!routes.has(href)) {
      fail(file, `link to ${href}, which is not a page`);
    }
  }
  /* Query strings are cache-busting stamps, not part of the path — strip one
     before resolving, or a stamped src silently stops being checked at all. */
  for (const [, src] of html.matchAll(/src="(\/[^"]*)"/g)) {
    const rel = src.split('?')[0];
    if (!fs.existsSync(path.join(ROOT, rel.slice(1)))) fail(file, `missing asset ${rel}`);
  }

  /* The site.js stamp must match the file actually on disk. A page carrying a
     stale hash is the bug this whole mechanism exists to prevent: the browser
     keeps serving an old site.js against new HTML, and a JS-rendered block —
     the /pricing-call email field, the /apply form — renders as an empty box
     with no error anywhere. Editing site.js without rerunning build-pages.js
     fails here rather than on the live site. */
  /* Design-system drift against DESIGN.md. Reported, not fatal: the drift
     predates the scale being written down, and several fixes are colour
     decisions that are the owner's to make, not a script's. Run with --strict
     to fail on it, which is what CI should do once the backlog is cleared. */
  checkDesign(file, html, STRICT ? fail : drift);

  const stamp = html.match(/<script src="\/site\.js\?v=([a-f0-9]+)"/);
  if (!stamp) fail(file, 'site.js script tag missing or unstamped — run node tools/build-pages.js');
  else if (stamp[1] !== SITE_JS_HASH) {
    fail(file, `stale site.js stamp ${stamp[1]}, site.js is now ${SITE_JS_HASH} — run node tools/build-pages.js`);
  }
}

/* vercel.json: valid, and no redirect may shadow a page that exists. */
let cfg = null;
try {
  cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
} catch (e) {
  fail('vercel.json', 'invalid JSON: ' + e.message);
}
if (cfg) {
  if (cfg.framework !== null) {
    fail('vercel.json', '"framework" must be null — anything else makes Vercel try to build this static site');
  }
  for (const r of cfg.redirects || []) {
    if (routes.has(r.source)) {
      fail('vercel.json', `redirect for ${r.source} shadows a real page`);
    }
  }
}

/* sitemap.xml must list every page and nothing else. */
try {
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1].replace(ORIGIN, '') || '/'));
  for (const r of routes) if (!listed.has(r)) fail('sitemap.xml', `missing ${r}`);
  for (const l of listed) if (!routes.has(l)) fail('sitemap.xml', `lists ${l}, which is not a page`);
} catch (e) {
  fail('sitemap.xml', 'unreadable: ' + e.message);
}

/* Serverless functions. There is no build step and no staging, so a syntax error
   in api/ reaches production and only shows up when someone submits the form —
   by which point the lead is the thing being lost. Loading each file catches
   that here instead. */
const apiDir = path.join(ROOT, 'api');
if (fs.existsSync(apiDir)) {
  for (const f of fs.readdirSync(apiDir).filter(f => f.endsWith('.js')).sort()) {
    const rel = 'api/' + f;
    try {
      const fn = require(path.join(apiDir, f));
      if (typeof fn !== 'function') {
        fail(rel, 'must export a handler function — Vercel has nothing to call otherwise');
      }
    } catch (e) {
      fail(rel, 'does not load: ' + e.message);
    }
    /* A secret committed here would be public the moment it is pushed. */
    const src = fs.readFileSync(path.join(apiDir, f), 'utf8');
    const secret = src.match(/['"](re_[A-Za-z0-9_]{16,}|sk-[A-Za-z0-9_-]{16,}|xox[baprs]-[A-Za-z0-9-]{16,})['"]/);
    if (secret) fail(rel, 'looks like a hard-coded secret: ' + secret[1].slice(0, 8) + '… — it belongs in a Vercel environment variable');
  }
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  ' + p);
  console.error('');
  process.exit(1);
}
const fnCount = fs.existsSync(apiDir) ? fs.readdirSync(apiDir).filter(f => f.endsWith('.js')).length : 0;
console.log(`OK — ${htmlFiles.length} pages, ${fnCount} function(s), all links and assets resolve, schema matches page text.`);

/* Design drift is reported after the pass line so it never reads as a failure,
   but it is always visible. Grouped by message, because 35 instances of one
   off-palette grey is one decision to make, not 35. */
if (drifts.length) {
  const byMsg = new Map();
  for (const d of drifts) {
    const msg = d.slice(d.indexOf(': ') + 2);
    if (!byMsg.has(msg)) byMsg.set(msg, new Set());
    byMsg.get(msg).add(d.slice(0, d.indexOf(':')));
  }
  const pages = new Set(drifts.map(d => d.slice(0, d.indexOf(':'))));
  console.log(`\ndesign drift vs DESIGN.md — ${drifts.length} across ${pages.size} page(s), not failing the build:`);
  for (const [msg, files] of [...byMsg.entries()].sort((a, b) => b[1].size - a[1].size)) {
    console.log(`  ${msg}  (${files.size} page${files.size > 1 ? 's' : ''})`);
  }
  console.log('  run: node tools/check.js --strict  to fail on these');
}
