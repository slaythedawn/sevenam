/* Page shell + section builders for the generated SEO pages.
   The nav, footer and stylesheet are lifted verbatim from a page that came out
   of the design bundle, so generated pages can never drift from the design. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SHELL_SOURCE = path.join(ROOT, 'facebook-ads-sydney.html');
const ORIGIN = 'https://sevenam.com.au';

const INK = 'rgb(10, 10, 10)';
const PAPER_TEXT = 'rgb(85, 85, 79)';
const INK_TEXT = 'rgb(181, 181, 173)';
const HAIRLINE_LIGHT = 'rgb(227, 227, 221)';
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
  const footer = h.slice(h.indexOf('</main>') + 7, h.indexOf('<script src="/site.js"')).trim();
  return { styles, fonts, header, footer };
}

const SHELL = shell();

/* ------------------------------------------------------------------ blocks */

function hero(p) {
  const trust = (p.trust || ['No retainer', 'No lock-in', 'No fee that climbs with your budget'])
    .map(t => '<span>' + esc(t) + '</span>').join('<span>·</span>');
  return `<section style="background: ${INK}; color: rgb(247, 247, 245); padding: 110px 32px 120px;">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; color: ${VOLT};">${esc(p.eyebrow)}</span>
      <h1 style="margin: 26px 0px 0px; max-width: 22ch; font-size: clamp(40px, 6vw, 84px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.04; color: rgb(255, 255, 255);">${esc(p.h1)}</h1>
      <p style="margin: 32px 0px 0px; max-width: 60ch; font-size: 21px; font-weight: 500; line-height: 1.5; letter-spacing: -0.01em; color: rgb(247, 247, 245);">${esc(p.lead)}</p>
      <p style="margin: 24px 0px 0px; max-width: 64ch; font-size: 17px; line-height: 1.7; color: ${INK_TEXT};">${esc(p.support)}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 44px;">
        <a href="/apply" class="scp0" style="background: ${VOLT}; color: ${INK}; font-size: 16px; font-weight: 600; padding: 16px 26px; border-radius: 4px;">Get started</a>
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
      <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
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
        <a href="/apply" class="scp4" style="color: ${VOLT}; font-size: 16px; font-weight: 600; border-bottom: 1px solid rgb(85, 85, 79);">Five questions, two minutes →</a>
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
      <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px;">
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
    return `<div data-reveal="" style="display: grid; grid-template-columns: 168px 1fr; gap: 0px 18px; align-items: center;${i ? ' margin-top: 20px;' : ''}">
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
      <h2 style="margin: 16px 0px 34px; max-width: 22ch; font-size: clamp(26px, 3vw, 38px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(g.h2)}</h2>
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
          <h3 style="margin: 10px 0px 6px; font-size: 18px; font-weight: 600; letter-spacing: -0.02em;">${esc(it.t)}</h3>
          <p style="margin: 0px; font-size: 15px; line-height: 1.6; color: ${PAPER_TEXT};">${esc(it.p)}</p>
        </div>`).join('\n        ');
  return `<section style="background: rgb(255, 255, 255); padding: 96px 32px; border-bottom: 1px solid ${HAIRLINE_LIGHT};">
    <div style="max-width: 1240px; margin: 0px auto;">
      <span style="font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${PAPER_TEXT};">${esc(st.label)}</span>
      <h2 style="margin: 16px 0px 40px; max-width: 22ch; font-size: clamp(26px, 3vw, 38px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1;">${esc(st.h2)}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px;">
        ${cards}
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

function page(p) {
  const url = ORIGIN + p.path;
  const main = [
    hero(p),
    gallery(p.gallery),
    ...(p.sections || []).map(prose),
    gantt(p.gantt),
    steps(p.steps),
    p.faqs && p.faqs.length ? faqSection(p.faqs, p.faqHeading) : '',
    p.pills ? pills(p.pills.label, p.pills.links) : '',
    related(p.related),
    toolstrip(p.toolstrip),
    closing(p.closing),
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
<script src="/site.js" defer></script>
</body>
</html>
`;
}

module.exports = { page, ORIGIN };
