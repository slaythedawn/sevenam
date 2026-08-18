#!/usr/bin/env node
/* The pricing prototype shipped FAQPage schema for four questions but never
   rendered them, so the page claimed structured content a visitor could not see.
   This renders the schema's own Q&As as a visible section, using the same FAQ
   markup as every other page. Idempotent: re-running it changes nothing. */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'pricing.html');
const HAIRLINE = 'rgb(227, 227, 221)';
const BODY = 'rgb(85, 85, 79)';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let html = fs.readFileSync(FILE, 'utf8');

if (html.includes('data-pricing-faq')) {
  console.log('pricing FAQ already present — nothing to do');
  process.exit(0);
}

const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
const faq = graph.find(n => n['@type'] === 'FAQPage');
if (!faq) throw new Error('no FAQPage node in pricing.html');

const rows = faq.mainEntity.map(q =>
  `<div style="border-top: 1px solid ${HAIRLINE}; padding: 26px 0px;">
          <h3 style="margin: 0px 0px 12px; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">${esc(q.name)}</h3>
          <p style="margin: 0px; max-width: 64ch; font-size: 17px; line-height: 1.7; color: ${BODY};">${esc(q.acceptedAnswer.text)}</p>
        </div>`).join('\n        ');

const section = `<section data-pricing-faq style="padding: 112px 32px; border-bottom: 1px solid ${HAIRLINE};">
    <div style="max-width: 1200px; margin: 0px auto;">
      <h2 style="margin: 0px 0px 40px; font-size: clamp(30px, 3.6vw, 50px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.08;">Questions people actually ask.</h2>
      <div style="display: flex; flex-direction: column; max-width: 840px;">
        ${rows}
      </div>
    </div>
  </section>

  `;

/* Insert immediately before the closing 07:00 CTA section. */
const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
const lastSectionAt = html.indexOf('<main') + main.lastIndexOf('<section');
html = html.slice(0, lastSectionAt) + section + html.slice(lastSectionAt);

fs.writeFileSync(FILE, html);
console.log(`rendered ${faq.mainEntity.length} FAQ entries onto /pricing`);
