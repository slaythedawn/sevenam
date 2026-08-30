#!/usr/bin/env node
/* Generates the SEO pages that were not in the design bundle, then refreshes
   sitemap.xml and the pending-page redirects in vercel.json.

   The 16 pages that came out of the design bundle are committed static HTML and
   are never touched by this script. Run it from the repo root:  node tools/build-pages.js */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { page, ORIGIN, siteJsSrc, SITE_JS_TAG } = require('./layout');
const { THEME } = require('./theme');

const ROOT = path.join(__dirname, '..');
const GENERATED = [].concat(
  require('./content/cities').build(),
  require('./content/industries').build(),
  require('./content/services').build(),
  require('./content/guides').build(),
);

/* Pages that came from the design bundle. Priorities for the sitemap. */
const PRIORITY = {
  '/': '1.0', '/apply': '0.9', '/pricing': '0.9', '/facebook-ads-agency': '0.9',
  '/ecommerce-facebook-ads-agency': '0.9', '/meta-ads-agency': '0.9',
  '/system': '0.8', '/check': '0.8', '/install': '0.8', '/facebook-ads-sydney': '0.8',
  '/facebook-ads-melbourne': '0.8', '/agency-fee': '0.8', '/learn': '0.8',
};

function write() {
  const written = [];
  for (const p of GENERATED) {
    const file = path.join(ROOT, p.path.replace(/^\//, '') + '.html');
    fs.writeFileSync(file, page(p));
    written.push({ path: p.path, bytes: fs.statSync(file).size });
  }
  return written;
}

/* The 18 hand-authored pages carry their own script tag, so generating the 49
   is not enough — a hash that only lands on generated pages leaves exactly the
   stale-cache hole this is here to close. Restamp every page from the current
   file, hand-authored included. */
/* The depth layer, injected into every page including the 18 hand-authored
   ones. Replaced wholesale each build, so editing tools/theme.js and rebuilding
   is the only way it changes. */
function stampTheme() {
  let changed = 0;
  const block = '<style id="sv-theme">' + THEME + '</style>';
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
    const file = path.join(ROOT, f);
    const html = fs.readFileSync(file, 'utf8');
    const next = html.includes('<style id="sv-theme">')
      ? html.replace(/<style id="sv-theme">[\s\S]*?<\/style>/, block)
      : html.replace('</head>', block + '\n</head>');
    if (next !== html) { fs.writeFileSync(file, next); changed++; }
  }
  return changed;
}

function stampSiteJs() {
  const src = siteJsSrc();
  let changed = 0;
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
    const file = path.join(ROOT, f);
    const html = fs.readFileSync(file, 'utf8');
    const next = html.replace(/<script src="\/site\.js(?:\?v=[a-f0-9]+)?" defer><\/script>/g,
      `<script src="${src}" defer></script>`);
    if (next !== html) { fs.writeFileSync(file, next); changed++; }
  }
  return { src, changed };
}

function allPages() {
  return fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .map(f => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, '')))
    .sort();
}

/* lastmod, from git rather than mtime: every generated page is rewritten on
   every build, so mtime would tell search engines all 68 pages changed each
   time we touch one — which is exactly the signal that gets lastmod ignored.
   A file with uncommitted edits is dated today, since it is about to ship. */
function lastmodFor(file) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const diff = execFileSync('git', ['diff', 'HEAD', '-U0', '--', file],
      { cwd: ROOT, encoding: 'utf8' });
    /* A site.js edit re-stamps the cache-busting query on all 68 pages. Those
       bytes did change, but dating every page "today" every time one script
       moves is the exact signal that gets lastmod discounted — so a page whose
       only change is the stamp keeps the date of its last real edit. */
    const real = diff.split('\n').filter(l =>
      (l.startsWith('+') || l.startsWith('-')) &&
      !l.startsWith('+++') && !l.startsWith('---') &&
      !l.includes('/site.js?v='));
    if (real.length) return today;
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', file],
      { cwd: ROOT, encoding: 'utf8' }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today;
  } catch (e) {
    return today;
  }
}

function writeSitemap(paths) {
  const rows = paths.map(u => {
    const file = u === '/' ? 'index.html' : u.slice(1) + '.html';
    return `  <url><loc>${ORIGIN}${u === '/' ? '/' : u}</loc>` +
      `<lastmod>${lastmodFor(file)}</lastmod>` +
      `<priority>${PRIORITY[u] || '0.7'}</priority></url>`;
  }).join('\n');
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows + '\n</urlset>\n');
}

/* Drop 302s for any page that now exists — a redirect would shadow the real file. */
function pruneRedirects(paths) {
  const file = path.join(ROOT, 'vercel.json');
  const cfg = JSON.parse(fs.readFileSync(file, 'utf8'));
  const have = new Set(paths);
  const before = cfg.redirects.length;
  cfg.redirects = cfg.redirects.filter(r => !(r.permanent === false && have.has(r.source)));
  fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n');
  return before - cfg.redirects.length;
}

const written = write();
const themed = stampTheme();
const stamped = stampSiteJs();
const paths = allPages();
writeSitemap(paths);
const pruned = pruneRedirects(paths);

console.log(`generated ${written.length} pages`);
console.log(`site now has ${paths.length} pages`);
console.log(`removed ${pruned} placeholder redirects`);
console.log(`site.js stamped ${stamped.src} — ${stamped.changed} page(s) updated`);
console.log(`theme injected into ${themed} page(s)`);
