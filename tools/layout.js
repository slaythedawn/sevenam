/* Page shell + section builders for the generated SEO pages.
   The nav, footer and stylesheet are lifted verbatim from a page that came out
   of the design bundle, so generated pages can never drift from the design. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SHELL_SOURCE = path.join(ROOT, 'facebook-ads-sydney.html');
const ORIGIN = 'https://sevenam.com.au';

/* site.js is served with max-age=3600, so for an hour after a deploy a returning
   visitor runs the previous file against the new HTML. That shipped once:
   /pricing-call rendered its heading (HTML) with no email field (JS), and looked
   simply broken. Stamping the file's own content hash into the URL means a
   changed site.js is a changed URL, so the browser cannot serve a stale one.
   Unchanged, the URL is identical and the cache still does its job. */
const SITE_JS = 'site.js';
function siteJsSrc() {
  const hash = require('crypto')
    .createHash('sha256').update(fs.readFileSync(path.join(ROOT, SITE_JS))).digest('hex').slice(0, 8);
  return `/${SITE_JS}?v=${hash}`;
}

/* Matches the tag with or without a version stamp — do not add the closing
   quote back, or lifting the shell silently breaks every generated page. */
const SITE_JS_TAG = '<script src="/site.js';

const INK = 'rgb(10, 10, 10)';
const PAPER_TEXT = 'rgb(85, 85, 79)';
const INK_TEXT = 'rgb(181, 181, 173)';
const HAIRLINE_LIGHT = 'rgb(227, 227, 221)';
const PAPER = 'rgb(247, 247, 245)';
const HAIRLINE_DARK = 'rgb(35, 35, 32)';
const VOLT = 'rgb(216, 255, 0)';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shell() {
  const h = fs.readFileSync(SHELL_SOURCE, 'utf8');
  const styles = (h.slice(h.indexOf('<head>'), h.indexOf('</head>')).match(/<style>[\s\S]*?<\/style>/g) || []).join('\n');
  const fonts = [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" rel="stylesheet">',
  ].join('\n');
  const header = h.slice(h.indexOf('<body>') + 6, h.indexOf('<main')).trim();
  const footer = h.slice(h.indexOf('</main>') + 7, h.indexOf(SITE_JS_TAG)).trim();
  return { styles, fonts, header, footer };
}

const SHELL = shell();

/* ------------------------------------------------------------------ blocks */

function hero(p) {
  const trust = (p.trust || ['No retainer', 'No lock-in', 'Priced to the work'])
    .map(t => '<span>' + esc(t) + '</span>').join('<span>·</span>');
  return `<section style="background: ${INK}; color: rgb(247, 247, 245); padding: 110px 32px 120px;">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; color: ${VOLT};">${esc(p.eyebrow)}</span>
      <h1 style="margin: 26px 0px 0px; max-width: 22ch; font-size: clamp(40px, 6vw, 84px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.04; color: rgb(255, 255, 255); text-wrap: balance;">${esc(p.h1)}</h1>
      <p style="margin: 32px 0px 0px; max-width: 60ch; font-size: 21px; font-weight: 500; line-height: 1.5; letter-spacing: -0.01em; color: rgb(247, 247, 245);">${esc(p.lead)}</p>
      <p style="margin: 24px 0px 0px; max-width: 64ch; font-size: 17px; line-height: 1.7; color: ${INK_TEXT};">${esc(p.support)}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 44px;">
        <a href="${esc(p.ctaHref || '/apply')}" class="scp0" style="background: ${VOLT}; color: ${INK}; font-size: 16px; font-weight: 600; padding: 16px 26px; border-radius: 4px;">${esc(p.ctaLabel || 'Get started')}</a>
        <a href="${esc(p.secondaryHref || '/system')}" class="scp1" style="border: 1px solid rgb(85, 85, 79); color: rgb(247, 247, 245); font-size: 16px; font-weight: 600; padding: 15px 26px; border-radius: 4px;">${esc(p.secondaryLabel || 'See how it works')}</a>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 10px 28px; margin-top: 32px; font-size: 14px; font-weight: 500; color: ${INK_TEXT};">${trust}</div>
    </div>
  </section>`;
}

/* h2 + paragraphs + an optional hairline list of single-line statements */
function prose(s) {
  const dark = s.tone === 'ink';
  const rule = dark ? HAIRLINE_DARK : HAIRLINE_LIGHT;
  const body = dark ? INK_TEXT : PAPER_TEXT;
  const paras = (s.paras || []).map(t =>
    `<p style="margin: 28px 0px 0px; max-width: 62ch; font-size: 17px; line-height: 1.7; color: ${body};">${esc(t)}</p>`).join('\n      ');
  const items = (s.items || []).map((t, i, a) =>
    `<div style="border-top: 1px solid ${rule};${i === a.length - 1 ? ' border-bottom: 1px solid ' + rule + ';' : ''} padding: 20px 0px; font-size: 17px; line-height: 1.6;">${esc(t)}</div>`).join('\n        ');
  const list = items
    ? `<div style="margin-top: 36px; display: flex; flex-direction: column; max-width: 840px;">
        ${items}
      </div>`
    : '';
  const style = dark
    ? `background: ${INK}; color: rgb(247, 247, 245); padding: 112px 32px;`
    : `border-bottom: 1px solid ${HAIRLINE_LIGHT}; padding: 112px 32px;`;
  return `<section style="${style}">
    <div style="max-width: 1240px; margin: 0px auto;">
      <h2 style="margin: 0px; max-width: 24ch; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.08;">${esc(s.h2)}</h2>
      ${paras}
      ${list}
    </div>
  </section>`;
}

function faqSection(faqs, heading) {
  const rows = faqs.map(f =>
    `<div style="border-top: 1px solid ${HAIRLINE_LIGHT}; padding: 26px 0px;">
          <h3 style="margin: 0px 0px 12px; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">${esc(f.q)}</h3>
          <p style="margin: 0px; max-width: 64ch; font-size: 17px; line-height: 1.7; color: ${PAPER_TEXT};">${esc(f.a)}</p>
        </div>`).join('\n        ');
  return `<section style="padding: 112px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <h2 style="margin: 0px 0px 40px; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.08;">${esc(heading || 'Questions people actually ask.')}</h2>
      <div style="display: flex; flex-direction: column; max-width: 840px;">
        ${rows}
      </div>
    </div>
  </section>`;
}

/* A data table with a source line under it. Added for the CPM benchmark page,
   where the figures are third-party data and the attribution has to travel with
   them rather than sit in a footnote at the bottom of the page.

   Wrapped in overflow-x so a ten-column table scrolls inside its own box on a
   phone instead of making the whole page scroll sideways. */
function dataTable(t) {
  if (!t) return '';
  const head = t.columns.map((c, i) =>
    `<th style="text-align: ${i ? 'right' : 'left'}; padding: 0px 0px 12px; ${i ? 'padding-left: 20px;' : ''} font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${PAPER_TEXT}; white-space: nowrap;">${esc(c)}</th>`).join('');
  const body = t.rows.map(r =>
    '<tr>' + r.map((cell, i) =>
      `<td style="text-align: ${i ? 'right' : 'left'}; padding: 14px 0px; ${i ? 'padding-left: 20px;' : ''} border-top: 1px solid ${HAIRLINE_LIGHT}; font-size: 16px; line-height: 1.5; ${i ? 'font-variant-numeric: tabular-nums; white-space: nowrap;' : 'font-weight: 500;'} color: ${i ? PAPER_TEXT : INK};">${esc(cell)}</td>`).join('') + '</tr>').join('\n          ');
  const note = t.note
    ? `<p style="margin: 20px 0px 0px; max-width: 78ch; font-size: 14px; line-height: 1.65; color: ${PAPER_TEXT};">${esc(t.note)}</p>`
    : '';
  return `<section style="border-bottom: 1px solid ${HAIRLINE_LIGHT}; padding: 96px 32px;">
    <div style="max-width: 1240px; margin: 0px auto;">
      <h2 style="margin: 0px 0px 14px; max-width: 26ch; font-size: clamp(26px, 3vw, 40px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(t.h2)}</h2>
      ${t.lead ? `<p style="margin: 0px 0px 34px; max-width: 70ch; font-size: 17px; line-height: 1.7; color: ${PAPER_TEXT};">${esc(t.lead)}</p>` : ''}
      <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
        <table style="border-collapse: collapse; width: 100%; min-width: 640px;">
          <thead><tr>${head}</tr></thead>
          <tbody>
          ${body}
          </tbody>
        </table>
      </div>
      ${note}
    </div>
  </section>`;
}

/* Attribution block for pages built on third-party data. Sits at the foot,
   below the closing CTA, which is where the research's own linking policy puts
   it: a competitor's pricing page must never be linked from a comparison table
   or within reach of a lead form.

   This is the one builder that emits an anchor from content, so `href` is
   whitelisted to http(s) and the label is still escaped. Everything is
   rel="noopener nofollow" except sources marked `credit: true` — an audit we
   quote by name is worth a real link, a competitor is not. */
function sources(sr) {
  if (!sr) return '';
  const rows = sr.items.map((it) => {
    const safe = /^https?:\/\//.test(it.href || '') ? it.href : '';
    const rel = it.credit ? 'noopener' : 'noopener nofollow';
    const link = safe
      ? `<a href="${esc(safe)}" target="_blank" rel="${rel}" class="scp4" style="color: ${PAPER_TEXT}; border-bottom: 1px solid ${HAIRLINE_LIGHT};">${esc(it.name)}</a>`
      : esc(it.name);
    return `<div style="border-top: 1px solid ${HAIRLINE_LIGHT}; padding: 14px 0px; font-size: 14px; line-height: 1.6; color: ${PAPER_TEXT};">${link} \u2014 ${esc(it.note)}</div>`;
  }).join('\n        ');
  return `<section style="padding: 72px 32px; background: ${PAPER};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${PAPER_TEXT};">Sources</span>
      <p style="margin: 16px 0px 0px; max-width: 78ch; font-size: 14px; line-height: 1.7; color: ${PAPER_TEXT};">${esc(sr.method)}</p>
      <div style="margin-top: 26px; display: flex; flex-direction: column; max-width: 840px;">
        ${rows}
      </div>
      <p style="margin: 26px 0px 0px; font-size: 13px; color: ${PAPER_TEXT};">Updated ${esc(sr.updated)}.</p>
    </div>
  </section>`;
}

function pills(label, links) {
  if (!links || !links.length) return '';
  const items = links.map(l =>
    `<a href="${esc(l.href)}" class="scp2" style="border: 1px solid ${HAIRLINE_LIGHT}; background: rgb(255, 255, 255); border-radius: 100px; padding: 9px 16px; font-size: 15px; font-weight: 500;">${esc(l.label)}</a>`).join('\n          ');
  return `<section style="padding: 88px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto; display: flex; flex-direction: column; gap: 36px;">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${PAPER_TEXT};">${esc(label)}</span>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${items}
        </div>
      </div>
    </div>
  </section>`;
}

function related(cards) {
  if (!cards || !cards.length) return '';
  const items = cards.map(c =>
    `<a href="${esc(c.href)}" class="scp3" style="background: rgb(255, 255, 255); border: 1px solid ${HAIRLINE_LIGHT}; border-radius: 6px; padding: 24px; display: flex; flex-direction: column; gap: 8px;"><span style="font-size: 17px; font-weight: 600; letter-spacing: -0.02em;">${esc(c.title)}</span><span style="font-size: 15px; line-height: 1.6; color: ${PAPER_TEXT};">${esc(c.note)}</span></a>`).join('\n        ');
  return `<section style="padding: 96px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${PAPER_TEXT};">Keep reading</span>
      <div style="margin-top: 24px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 16px;">
        ${items}
      </div>
    </div>
  </section>`;
}

function closing(c) {
  return `<section style="background: ${INK}; color: rgb(247, 247, 245); padding: 130px 32px;">
    <div style="max-width: 1240px; margin: 0px auto; display: flex; flex-direction: column; align-items: flex-start; gap: 30px;">
      <span style="background: ${VOLT}; color: ${INK}; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; font-variant-numeric: tabular-nums; padding: 5px 9px; border-radius: 3px;">07:00</span>
      <h2 style="margin: 0px; max-width: 18ch; font-size: clamp(38px, 5.4vw, 74px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.05;">${esc(c.h2)}</h2>
      <p style="margin: 0px; max-width: 56ch; font-size: 19px; line-height: 1.65; color: ${INK_TEXT};">${esc(c.p)}</p>
      <a href="/apply" class="scp0" style="background: ${VOLT}; color: ${INK}; font-size: 17px; font-weight: 600; padding: 18px 30px; border-radius: 4px;">Get started</a>
        <a href="/apply" class="scp4" style="color: ${VOLT}; font-size: 16px; font-weight: 600; border-bottom: 1px solid rgb(85, 85, 79);">Four fields, twenty seconds →</a>
    </div>
  </section>`;
}

/* -------------------------------------------------------------- schema/head */

const ORG = {
  "@type": "Organization",
  "@id": ORIGIN + "/#org",
  "name": "Sevenam",
  "url": ORIGIN,
  "description": "Sevenam is a growth systems and technology company that installs Meta advertising systems on businesses' own ad accounts and runs the technology that operates them.",
  /* Named so Google can tie the company to the person behind it. There is no
     Sevenam company page on LinkedIn yet; when there is, its URL belongs on the
     Organization as sameAs, alongside this. */
  "founder": {
    "@type": "Person",
    "name": "Josh Peacock",
    "jobTitle": "Founder",
    "sameAs": ["https://www.linkedin.com/in/josh-peacock-b36b6b20/"]
  },
  "areaServed": "AU",
  "address": {
    "@type": "PostalAddress", "addressLocality": "Sydney",
    "addressRegion": "NSW", "addressCountry": "AU"
  }
};

function graph(p) {
  const url = ORIGIN + p.path;
  const nodes = [ORG, {
    "@type": "WebPage", "url": url, "name": p.title,
    "description": p.description, "isPartOf": { "@id": ORIGIN + "/#org" }
  }];
  if (p.service) {
    nodes.push({
      "@type": "Service", "name": p.service.name,
      "serviceType": p.service.type || "Meta advertising",
      "provider": { "@id": ORIGIN + "/#org" },
      "areaServed": p.service.areaServed || "AU",
      "url": url
    });
  }
  if (p.article) {
    nodes.push({
      "@type": "Article",
      "headline": p.article.headline || p.h1,
      "description": p.description,
      "author": { "@id": ORIGIN + "/#org" },
      "publisher": { "@id": ORIGIN + "/#org" },
      "mainEntityOfPage": url,
      "url": url
    });
  }
  if (p.faqs && p.faqs.length) {
    nodes.push({
      "@type": "FAQPage",
      "mainEntity": p.faqs.map(f => ({
        "@type": "Question", "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }
  if (p.breadcrumb) {
    nodes.push({
      "@type": "BreadcrumbList",
      "itemListElement": p.breadcrumb.map((b, i) => ({
        "@type": "ListItem", "position": i + 1, "name": b.name,
        "item": ORIGIN + b.path
      }))
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}

/* Optional image strip, rendered directly under the hero when a page supplies
   one. Only /ad-creative uses it: a page selling creative production that shows
   no creative is asking to be disbelieved. */
function gallery(g) {
  if (!g || !g.images || !g.images.length) return '';
  const tiles = g.images.map(im =>
    `<img loading="lazy" decoding="async" src="${esc(im.src)}" alt="${esc(im.alt)}" data-reveal="" style="display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border-radius: 4px;">`
  ).join('\n          ');
  return `<section style="background: rgb(247, 247, 245); padding: 72px 32px 8px;">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgb(85, 85, 79);">${esc(g.label)}</span>
      <div style="margin-top: 20px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(230px, 100%), 1fr)); gap: 14px;">
          ${tiles}
      </div>
      <p style="margin: 18px 0px 0px; max-width: 76ch; font-size: 14px; line-height: 1.65; color: rgb(85, 85, 79);">${esc(g.note)}</p>
    </div>
  </section>`;
}


/* A brief-to-live comparison, drawn rather than described. Two tracks on the
   same scale: the weeks a booked shoot takes, and the days the line takes. The
   segment widths are percentages of the longer track, so the shape carries the
   argument without asserting a number the page has not already published. */
function gantt(g) {
  if (!g) return '';
  function track(row, i) {
    const segs = row.segments.map(sg =>
      `<div style="flex: ${sg.w} 0 0%; min-width: 0px; padding: 11px 10px; font-size: 13px; font-weight: 500; line-height: 1.3; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: ${row.accent ? VOLT : 'rgb(255, 255, 255)'}; color: ${INK}; border-right: 1px solid ${row.accent ? 'rgba(10, 10, 10, 0.18)' : HAIRLINE_LIGHT};">${esc(sg.label)}</div>`
    ).join('');
    const pad = row.pad ? `<div style="flex: ${row.pad} 0 0%;"></div>` : '';
    /* A track this short cannot hold its own stage labels, so they run underneath
       it instead. Shrinking the bar to fit the words would undo the comparison. */
    const caption = row.caption
      ? `<div style="margin-top: 7px; font-size: 13px; line-height: 1.5; color: ${PAPER_TEXT};">${esc(row.caption)}</div>`
      : '';
    return `<div data-reveal="" style="display: grid; grid-template-columns: minmax(0, 168px) minmax(0, 1fr); gap: 0px 18px; align-items: center;${i ? ' margin-top: 20px;' : ''}">
          <div>
            <div style="font-size: 15px; font-weight: 600; letter-spacing: -0.015em;">${esc(row.label)}</div>
            <div style="font-size: 13px; color: ${PAPER_TEXT}; margin-top: 2px;">${esc(row.duration)}</div>
          </div>
          <div>
            <div style="display: flex; border: 1px solid ${HAIRLINE_LIGHT}; border-radius: 4px; overflow: hidden; background: rgb(250, 250, 248);">${segs}${pad}</div>
            ${caption}
          </div>
        </div>`;
  }
  const rows = g.rows.map(track).join('\n        ');
  return `<section style="padding: 96px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${PAPER_TEXT};">${esc(g.label)}</span>
      <h2 style="margin: 16px 0px 34px; max-width: 22ch; font-size: clamp(26px, 3vw, 40px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(g.h2)}</h2>
      <div style="max-width: 960px;">
        ${rows}
      </div>
      <p style="margin: 22px 0px 0px; max-width: 68ch; font-size: 14px; line-height: 1.65; color: ${PAPER_TEXT};">${esc(g.note)}</p>
    </div>
  </section>`;
}

/* Numbered steps on a hairline, so the ordering process is scannable without
   another block of prose. */
function steps(st) {
  if (!st) return '';
  const cards = st.items.map((it, i) =>
    `<div data-reveal="" style="border-top: 2px solid ${INK}; padding: 18px 0px 0px;">
          <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: ${PAPER_TEXT}; font-variant-numeric: tabular-nums;">0${i + 1}</span>
          <h3 style="margin: 10px 0px 6px; font-size: 17px; font-weight: 600; letter-spacing: -0.02em;">${esc(it.t)}</h3>
          <p style="margin: 0px; font-size: 15px; line-height: 1.6; color: ${PAPER_TEXT};">${esc(it.p)}</p>
        </div>`).join('\n        ');
  return `<section style="background: rgb(255, 255, 255); padding: 96px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${PAPER_TEXT};">${esc(st.label)}</span>
      <h2 style="margin: 16px 0px 40px; max-width: 22ch; font-size: clamp(26px, 3vw, 40px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(st.h2)}</h2>
      <div style="min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 28px;">
        ${cards}
      </div>
    </div>
  </section>`;
}

/* A how-to page that never shows the thing, and never links to it, is a dead
   end — /meta-ad-library explained what the Ad Library is worth and then left
   the reader to go and find it. This renders the actual steps beside a labelled
   diagram of the three controls that matter, and every step carries a real
   prefilled link, so the page ends with the reader inside the tool rather than
   agreeing with us about it.

   The diagram is drawn from our own tokens rather than screenshotted. Meta
   moves that interface every few months, and a stale screenshot of somebody
   else's product is worse than a schematic that stays true to the shape. */
function walkthrough(w) {
  if (!w) return '';
  const steps = w.steps.map((it, i) =>
    `<li style="list-style: none; margin: 0px; padding: 22px 0px; border-top: 1px solid ${HAIRLINE_DARK}; display: grid; grid-template-columns: 34px 1fr; gap: 18px;">
          <span aria-hidden="true" style="font-size: 13px; font-weight: 600; color: ${VOLT}; font-variant-numeric: tabular-nums; padding-top: 2px;">0${i + 1}</span>
          <span>
            <span style="display: block; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: rgb(247, 247, 245);">${esc(it.t)}</span>
            <span style="display: block; margin-top: 6px; font-size: 15px; line-height: 1.65; color: ${INK_TEXT};">${esc(it.p)}</span>
          </span>
        </li>`).join('\n        ');

  const controls = w.controls.map((c, i) =>
    `<div style="display: grid; grid-template-columns: 26px 1fr; gap: 14px; align-items: center; padding: 14px 16px; border-bottom: 1px solid ${HAIRLINE_DARK};">
            <span aria-hidden="true" style="font-size: 11px; font-weight: 600; color: rgb(10, 10, 10); background: ${VOLT}; border-radius: 100px; text-align: center; padding: 3px 0px; font-variant-numeric: tabular-nums;">0${i + 1}</span>
            <span style="min-width: 0px;">
              <span style="display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(181, 181, 173);">${esc(c.label)}</span>
              <span style="display: block; margin-top: 3px; font-size: 15px; font-weight: 500; color: rgb(247, 247, 245);">${esc(c.value)}</span>
            </span>
          </div>`).join('\n          ');

  return `<section style="background: rgb(10, 10, 10); color: rgb(247, 247, 245); padding: 104px 32px; border-bottom: 1px solid ${HAIRLINE_DARK};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${VOLT};">${esc(w.label)}</span>
      <h2 style="margin: 18px 0px 0px; max-width: 20ch; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(w.h2)}</h2>
      <p style="margin: 22px 0px 0px; max-width: 62ch; font-size: 17px; line-height: 1.7; color: ${INK_TEXT};">${esc(w.p)}</p>

      <div style="margin-top: 56px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap: 56px; align-items: start;">
        <ol style="margin: 0px; padding: 0px;">
        ${steps}
        </ol>

        <figure style="margin: 0px;">
          <div style="border: 1px solid ${HAIRLINE_DARK}; border-radius: 8px; overflow: hidden; background: rgb(22, 22, 19);">
            <div aria-hidden="true" style="display: flex; align-items: center; gap: 7px; padding: 13px 16px; border-bottom: 1px solid ${HAIRLINE_DARK};">
              <span style="width: 8px; height: 8px; border-radius: 100px; background: rgb(35, 35, 32);"></span>
              <span style="width: 8px; height: 8px; border-radius: 100px; background: rgb(35, 35, 32);"></span>
              <span style="width: 8px; height: 8px; border-radius: 100px; background: rgb(35, 35, 32);"></span>
              <span style="margin-left: 10px; font-size: 12px; color: rgb(181, 181, 173);">facebook.com/ads/library</span>
            </div>
          ${controls}
            <div style="padding: 18px 16px;">
              <span style="display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(181, 181, 173);">${esc(w.result.label)}</span>
              <div style="margin-top: 12px; border: 1px solid ${VOLT}; border-radius: 6px; padding: 14px 16px;">
                <span style="display: block; font-size: 15px; font-weight: 600; color: ${VOLT};">${esc(w.result.line)}</span>
                <span style="display: block; margin-top: 6px; font-size: 14px; line-height: 1.6; color: ${INK_TEXT};">${esc(w.result.note)}</span>
              </div>
            </div>
          </div>
          <figcaption style="margin: 14px 0px 0px; font-size: 14px; line-height: 1.6; color: rgb(181, 181, 173);">${esc(w.figcaption)}</figcaption>
        </figure>
      </div>

      <div id="adlib-root" style="margin-top: 56px; padding-top: 40px; border-top: 1px solid ${HAIRLINE_DARK};"></div>
      <noscript><p style="margin: 24px 0px 0px; font-size: 16px; line-height: 1.7; color: ${INK_TEXT};">Search it directly at <a href="${esc(w.fallbackHref)}" rel="noopener nofollow" target="_blank" style="color: ${VOLT}; border-bottom: 1px solid ${VOLT};">the Meta Ad Library</a>.</p></noscript>
    </div>
  </section>`;
}

/* /what-is-roas defined the metric, gave the formula in a sentence, and left the
   reader to do the arithmetic. The whole point of the page is that break-even
   ROAS is decided by margin rather than by anything in the ad account, which is
   a claim you can only feel by moving the margin and watching the number move.

   The figures below are the JS defaults, computed here at build time, so the
   page is correct before site.js runs and stays correct if it never does. Change
   a default in setupRoas() and you must change it here too. */
function roasCalc(rc) {
  if (!rc) return '';
  const field = (key, label, hint, min, max, step, value, suffix) =>
    `<div style="display: grid; gap: 10px;">
            <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 12px;">
              <label for="${key}" style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(181, 181, 173);">${esc(label)}</label>
              <span data-rout="${key}Label" style="font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; color: rgb(247, 247, 245);">${esc(value)}${esc(suffix)}</span>
            </div>
            <input id="${key}" data-roas="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${esc(String(rc.defaults[key]))}" style="width: 100%; accent-color: ${VOLT};">
            <span style="font-size: 13px; line-height: 1.55; color: rgb(181, 181, 173);">${esc(hint)}</span>
          </div>`;

  const out = (key, label, value, note, big) =>
    `<div style="border-top: 1px solid ${HAIRLINE_DARK}; padding: 22px 0px;">
            <span style="display: block; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(181, 181, 173);">${esc(label)}</span>
            <span data-rout="${key}" style="display: block; margin-top: 8px; font-size: ${big ? '40px' : '26px'}; font-weight: 600; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; color: ${big ? VOLT : 'rgb(247, 247, 245)'};">${esc(value)}</span>
            <span data-rout="${key}Note" style="display: block; margin-top: 6px; font-size: 14px; line-height: 1.6; color: rgb(181, 181, 173);">${esc(note)}</span>
          </div>`;

  /* Computed here from the same defaults the sliders carry, rather than written
     out in the content file. /agency-fee keeps its figures in the HTML by hand
     and that is a standing trap — change the default and the page flashes a
     stale number until JS lands. These cannot drift because nobody types them. */
  const d = rc.defaults;
  const marginFrac = d.margin / 100;
  const roasX = d.roas / 10;
  const money = (n) => (Math.round(n) < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-AU');
  const breakeven = 1 / marginFrac;
  const revenue = d.spend * roasX;
  const grossProfit = revenue * marginFrac;
  const netOfMedia = grossProfit - d.spend;
  const perHalfX = 0.5 * d.spend * marginFrac;
  const rendered = {
    breakeven: breakeven.toFixed(2) + 'x',
    breakevenNote: `At a ${d.margin}% margin you need ${breakeven.toFixed(2)}x just to cover the cost of the goods.`,
    profit: money(netOfMedia),
    profitNote: netOfMedia >= 0
      ? `${roasX.toFixed(1)}x on ${money(d.spend)} is ${money(revenue)} of revenue and ${money(grossProfit)} of gross profit, less the ${money(d.spend)} you spent.`
      : `${roasX.toFixed(1)}x on ${money(d.spend)} returns ${money(grossProfit)} of gross profit against ${money(d.spend)} of media. You are below break-even.`,
    headroom: money(perHalfX),
    headroomNote: `A month, at this spend and margin, without buying any more media.`,
  };

  return `<section id="roas-calculator" style="background: rgb(10, 10, 10); color: rgb(247, 247, 245); padding: 104px 32px; border-bottom: 1px solid ${HAIRLINE_DARK};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${VOLT};">${esc(rc.label)}</span>
      <h2 style="margin: 18px 0px 0px; max-width: 20ch; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(rc.h2)}</h2>
      <p style="margin: 22px 0px 0px; max-width: 62ch; font-size: 17px; line-height: 1.7; color: ${INK_TEXT};">${esc(rc.p)}</p>

      <div style="margin-top: 52px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 56px; align-items: start;">
        <div style="display: grid; gap: 34px;">
          ${field('margin', 'Gross margin', 'What is left of a sale after the cost of the goods and the cost of shipping it.', 5, 90, 1, rc.defaults.margin, '%')}
          ${field('roas', 'The ROAS you are getting', 'Whatever the account reports today. Move it and watch the profit line.', 5, 100, 1, (rc.defaults.roas / 10).toFixed(1), 'x')}
          ${field('spend', 'Monthly ad spend', 'Media only — not fees, not creative.', 5000, 200000, 1000, '$' + rc.defaults.spend.toLocaleString('en-AU'), '')}
        </div>

        <div>
          ${out('breakeven', 'Your break-even ROAS', rendered.breakeven, rendered.breakevenNote, true)}
          ${out('profit', 'Gross profit from that spend', rendered.profit, rendered.profitNote, false)}
          ${out('headroom', 'Every extra 0.5x is worth', rendered.headroom, rendered.headroomNote, false)}
        </div>
      </div>
    </div>
  </section>`;
}

/* The models the line is built on, named in type rather than borrowed marks.
   Sits with the closing links so the page ends on what it runs on. */
function toolstrip(t) {
  if (!t || !t.tools || !t.tools.length) return '';
  const tiles = t.tools.map(tool =>
    `<div style="flex: 1 1 190px; min-width: 0px; background: rgb(255, 255, 255); border: 1px solid ${HAIRLINE_LIGHT}; border-radius: 6px; padding: 20px 22px;">
          <div style="display: flex; align-items: center; gap: 9px;">
            <span aria-hidden="true" style="width: 7px; height: 7px; border-radius: 100px; background: ${VOLT}; box-shadow: 0px 0px 0px 3px rgba(216, 255, 0, 0.22);"></span>
            <span style="font-size: 17px; font-weight: 600; letter-spacing: -0.02em;">${esc(tool.name)}</span>
          </div>
          <p style="margin: 9px 0px 0px; font-size: 14px; line-height: 1.55; color: ${PAPER_TEXT};">${esc(tool.role)}</p>
        </div>`).join('\n        ');
  return `<section style="padding: 88px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${PAPER_TEXT};">${esc(t.label)}</span>
      <div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 12px;">
        ${tiles}
      </div>
      <p style="margin: 20px 0px 0px; max-width: 72ch; font-size: 14px; line-height: 1.65; color: ${PAPER_TEXT};">${esc(t.note)}</p>
    </div>
  </section>`;
}

/* A container site.js fills, the same pattern as #apply-root on /apply. The
   markup for a form does not belong in a static generator, and the behaviour
   has to live beside the other lead capture anyway. Optional: pages without a
   callForm render exactly as before. */
function callForm(c) {
  if (!c) return '';
  return `<section id="pricing-call" style="padding: 112px 32px; background: rgb(10, 10, 10); color: rgb(247, 247, 245); border-bottom: 1px solid ${HAIRLINE_DARK};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${VOLT};">${esc(c.label)}</span>
      <h2 style="margin: 20px 0px 0px; max-width: 20ch; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(c.h2)}</h2>
      <p style="margin: 22px 0px 0px; max-width: 58ch; font-size: 17px; line-height: 1.65; color: ${INK_TEXT};">${esc(c.p)}</p>
      <div id="pricing-call-root" data-call-form style="margin-top: 40px; max-width: 560px;"><noscript><p style="margin: 0px; max-width: 52ch; font-size: 17px; line-height: 1.7; color: ${INK_TEXT};">This form needs JavaScript. <a href="/apply" style="color: ${VOLT}; border-bottom: 1px solid rgb(85, 85, 79);">Use the application instead</a> — it takes a couple of minutes and reaches the same inbox.</p></noscript></div>
    </div>
  </section>`;
}

function page(p) {
  const url = ORIGIN + p.path;
  const main = [
    hero(p),
    gallery(p.gallery),
    ...(p.sections || []).map(prose),
    ...(p.tables || []).map(dataTable),
    gantt(p.gantt),
    steps(p.steps),
    walkthrough(p.walkthrough),
    roasCalc(p.roasCalc),
    callForm(p.callForm),
    p.faqs && p.faqs.length ? faqSection(p.faqs, p.faqHeading) : '',
    p.pills ? pills(p.pills.label, p.pills.links) : '',
    related(p.related),
    toolstrip(p.toolstrip),
    closing(p.closing),
    sources(p.sources),
  ].filter(Boolean).join('\n\n  ');

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.ogDescription || p.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="Sevenam">
<meta property="og:image" content="${ORIGIN}/og/${esc(p.path.replace(/^\//, '') || 'index')}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.h1)} — Sevenam">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0A0A0A">
<meta name="robots" content="index,follow,max-image-preview:large">
<script type="application/ld+json">${graph(p)}</script>
${SHELL.fonts}
${SHELL.styles}
</head>
<body>
${SHELL.header}<main style="background: rgb(247, 247, 245); color: rgb(10, 10, 10);">
  ${main}
  </main>
${SHELL.footer}
<script src="${siteJsSrc()}" defer></script>
</body>
</html>
`;
}

module.exports = { page, ORIGIN, siteJsSrc, SITE_JS_TAG };
