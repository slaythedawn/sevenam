/* Renders one social card per page into og/.

   Every page shipped with no og:image, so a shared link rendered as a bare grey
   box with a URL under it. These are the picture.

   Unlike the rest of the tooling this needs Playwright, because the cards are
   rendered from HTML in a real browser to get Inter Tight and the exact brand
   colours rather than approximating both. It is not part of check.js and does
   not run on a normal build — run it when a headline changes:

     node tools/build-og.js

   The cards are written as JPEG. WebP is smaller but LinkedIn's crawler is
   unreliable with it, and a card that does not render is worse than a large one. */

const fs = require('fs');
const path = require('path');
const { chromium } = require('/tmp/node_modules/playwright-core');

const ROOT = path.join(__dirname, '..');
/* Deliberately not under img/, which vercel.json serves immutable for a year.
   A card is regenerated whenever its headline changes and keeps the same
   filename, so a year-long cache is exactly the wrong header for it. */
const OUT = path.join(ROOT, 'og');

const INK = '#0A0A0A';
const RAISED = '#161613';
const HAIRLINE = '#232320';
const VOLT = '#D8FF00';
const PAPER = '#F7F7F5';
const MUTED = '#B5B5AD';

const strip = (s) => s.replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* The headline is what makes the card worth looking at, so it comes from the
   page's own h1 rather than a generic brand line. */
function pageCopy(file) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  return {
    headline: h1 ? strip(h1[1]) : 'Sevenam',
    support: desc ? strip(desc[1]) : '',
  };
}

function card({ headline, support }) {
  /* Long headlines drop a step rather than wrapping to four lines. */
  const size = headline.length > 46 ? 58 : headline.length > 30 ? 68 : 78;
  const trimmed = support.length > 128 ? support.slice(0, 125).replace(/\s+\S*$/, '') + '…' : support;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${INK};color:${PAPER};
       font-family:'Inter Tight',ui-sans-serif,system-ui,sans-serif;
       display:flex;flex-direction:column;justify-content:space-between;
       padding:72px 80px;position:relative;overflow:hidden}
  .glow{position:absolute;right:-160px;top:-160px;width:620px;height:620px;border-radius:50%;
        background:radial-gradient(circle,rgba(216,255,0,0.16) 0%,rgba(216,255,0,0) 68%)}
  .top{display:flex;align-items:center;gap:16px;position:relative}
  .badge{background:${VOLT};color:${INK};font-size:20px;font-weight:600;letter-spacing:0.04em;
         font-variant-numeric:tabular-nums;padding:7px 12px;border-radius:5px}
  .mark{font-size:24px;font-weight:600;letter-spacing:-0.02em;color:${PAPER}}
  h1{font-size:${size}px;font-weight:600;letter-spacing:-0.035em;line-height:1.04;
     max-width:19ch;position:relative;text-wrap:balance}
  .support{margin-top:22px;font-size:23px;line-height:1.45;color:${MUTED};max-width:52ch}
  .foot{display:flex;align-items:center;justify-content:space-between;
        border-top:1px solid ${HAIRLINE};padding-top:26px;position:relative}
  .url{font-size:21px;font-weight:500;color:${PAPER}}
  .tag{font-size:19px;color:${MUTED}}
  .rule{position:absolute;left:0;top:-1px;width:132px;height:2px;background:${VOLT}}
</style></head><body>
  <div class="glow"></div>
  <div class="top"><span class="badge">07:00</span><span class="mark">sevenam</span></div>
  <div>
    <h1>${esc(headline)}</h1>
    <p class="support">${esc(trimmed)}</p>
  </div>
  <div class="foot"><span class="rule"></span>
    <span class="url">sevenam.com.au</span>
    <span class="tag">Meta advertising systems · Sydney</span>
  </div>
</body></html>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  /* The shell is loaded once and only its text swapped per card. Calling
     setContent for each page re-fetched Inter Tight from Google 58 times, which
     cost about seven seconds a card for no benefit. */
  await page.setContent(card({ headline: 'Sevenam', support: '' }), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  for (const file of files) {
    const slug = file.replace(/\.html$/, '');
    await page.evaluate(({ headline, support }) => {
      const h1 = document.querySelector('h1');
      h1.textContent = headline;
      h1.style.fontSize = (headline.length > 46 ? 58 : headline.length > 30 ? 68 : 78) + 'px';
      document.querySelector('.support').textContent = support.length > 128
        ? support.slice(0, 125).replace(/\s+\S*$/, '') + '\u2026'
        : support;
    }, pageCopy(file));
    await page.screenshot({ path: path.join(OUT, slug + '.jpg'), type: 'jpeg', quality: 84 });
  }

  await browser.close();
  const total = fs.readdirSync(OUT).reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0);
  console.log(`wrote ${files.length} cards to og/ — ${Math.round(total / 1024)}KB total`);
})();
