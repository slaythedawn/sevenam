#!/usr/bin/env node
/* Generates the SEO pages that were not in the design bundle, then refreshes
   sitemap.xml and the pending-page redirects in vercel.json.

   The 16 pages that came out of the design bundle are committed static HTML and
   are never touched by this script. Run it from the repo root:  node tools/build-pages.js */
const fs = require('fs');
const path = require('path');
const { page, ORIGIN } = require('./layout');

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

function allPages() {
  return fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .map(f => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, '')))
    .sort();
}

function writeSitemap(paths) {
  const rows = paths.map(u =>
    `  <url><loc>${ORIGIN}${u === '/' ? '/' : u}</loc><priority>${PRIORITY[u] || '0.7'}</priority></url>`
  ).join('\n');
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
const paths = allPages();
writeSitemap(paths);
const pruned = pruneRedirects(paths);

console.log(`generated ${written.length} pages`);
console.log(`site now has ${paths.length} pages`);
console.log(`removed ${pruned} placeholder redirects`);
