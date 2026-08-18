# sevenam

Marketing site for **Sevenam** — a growth systems and technology company selling
Meta advertising systems to Australian ecommerce brands. Sydney, working nationally.

Production: https://sevenam.com.au (Vercel, deployed from this repository)

## What this is

A dependency-free static site. No build step, no framework, no package install —
Vercel serves these files directly. Every page ships its content in the HTML;
`site.js` only adds behaviour on top.

58 pages, all committed as static HTML.

```
index.html      homepage              apply.html      the qualifying quiz
pricing.html    how it works to buy   system.html     overnight → 7am
install.html    the four-week setup   check.html      account check
about.html      about Josh            growth.html     the thesis
learn.html      guide index           glossary.html   Meta ads terms
agency-fee.html fee calculator

facebook-ads-{sydney,melbourne,brisbane,perth,adelaide,canberra,
              gold-coast,sunshine-coast}.html        8 city pages
facebook-ads-for-{tradies,healthcare,hotels,schools,
                  real-estate-agents}.html
ndis-facebook-ads.html                               6 industry pages
{meta,instagram,facebook,social-media-advertising,
 digital-marketing}-…agency.html, facebook-ads-consultant.html,
 best-facebook-ads-agencies-australia.html          head-term pages
facebook-ads-{packages,cost-australia,strategy,audit}.html,
what-facebook-ads-agencies-charge.html,
social-media-management-cost.html                    commercial-intent
what-are-meta-ads.html, are-facebook-ads-worth-it.html,
google-ads-vs-facebook-ads.html, how-to-run-meta-ads-yourself.html,
meta-ad-library.html, meta-advantage-plus.html, scaling-meta-ads.html,
shopify-facebook-ads.html, facebook-ad-creative-testing.html,
gst-on-facebook-advertising.html                     guides

site.js       all interactive behaviour
img/          imagery (WebP)
tools/        generator for the SEO pages (see below)
vercel.json   clean URLs, redirects, cache and security headers
sitemap.xml   generated; every URL in it resolves
robots.txt
```

## The tools/ directory

16 of these pages came out of the Claude Design handoff bundle and are
hand-authored static HTML — **`tools/` never touches them.** The other 35 (cities,
industries, head terms, guides) are generated from content data so they stay
structurally identical to the designed templates:

```
node tools/build-pages.js
```

That regenerates those 35 pages, rewrites `sitemap.xml`, and drops any redirect
that would shadow a page which now exists. Edit copy in `tools/content/*.js` and
re-run it; editing those generated `.html` files directly means your change is
lost on the next build. `tools/layout.js` lifts the nav, footer and stylesheet
from `facebook-ads-sydney.html` at build time, so the generated pages cannot
drift away from the design.

`tools/fix-pricing-faq.js` is a one-off repair, already applied and idempotent —
see "Fixes applied" below.

## Conversion flow

Every CTA routes to `/apply`. That page runs five qualifying questions plus a
details step, then shows one of six verdicts — two of which (`tooSmall`,
`playbook`) decline the sale on purpose. There is deliberately **no direct
calendar booking anywhere**: qualify and capture first, then Josh replies with a
time to talk.

Verdict routing is order-sensitive and covered by the checks below. Two verdicts
sharing a key previously routed the smallest accounts to the most expensive
option — if you edit `verdict()` in `site.js`, re-run the verification.

### Lead delivery

`site.js` holds one setting and no address:

```js
var LEAD_ENDPOINT = "/api/lead";
```

A finished application POSTs there. `api/lead.js` emails it on via Resend, to
whichever address `LEAD_TO` names in the Vercel project. **No recipient is
hard-coded** — this repository is public, so an address in either file would be
an address on display.

Delivery needs both `RESEND_API_KEY` and `LEAD_TO` set for Production. With
either missing the function returns 503 and the result screen says the
submission did not go through, rather than claiming it did.

`LEAD_ENDPOINT` is the more reliable path, because it does not depend on the
visitor having a mail client configured. Point it at a Zapier/Make catch hook or
a CRM endpoint and the answers are posted server-side on submit. The POST is
`application/x-www-form-urlencoded` on purpose — that keeps it a "simple" CORS
request so the browser skips the preflight most webhook hosts reject. If the
request fails, the page falls back to `mailto:` rather than stranding a lead.

## Editing

Content is plain HTML with inline styles, matching the design system in the
handoff bundle (Ink `#0A0A0A`, Volt `#D8FF00`, Paper `#F7F7F5`, Inter Tight).
Behaviour hooks are `data-` attributes — `data-reveal`, `data-faq-item`,
`data-clock`, `data-ad-drift`, `data-out`, `data-field`. Keep them when editing
markup or the behaviour detaches silently.

Content rules that are load-bearing:

- Never state a fake precise time for the overnight run ("Before you're up", not "02:00").
- No pricing on the homepage; no pricing in any CTA button label.
- Case studies: SRW, knest.ai, Online Model Academy only. Never a client's revenue.
- Exactly one hero CTA and one closing CTA per SEO page.
- Copy on the money pages is written against search terms — don't rewrite it for tone.

## Fixes applied during the build

Worth knowing about, because each one was a defect in the source material:

- **Collapsed FAQ answers were absent from the DOM.** The homepage accordion
  rendered only the open item, so the `FAQPage` schema claimed content the page
  never served. All answers now ship in the HTML and collapse client-side.
- **`/pricing` declared four FAQ entries it never displayed** — the prototype had
  the schema but no markup for it. `tools/fix-pricing-faq.js` rendered the
  schema's own Q&As as a visible section. Structured data must reflect visible
  content; it is worth re-checking if you edit that page.
- **Imagery was 19.1MB of PNG**, converted to 0.72MB of WebP.
- **35 internal links pointed at pages that did not exist**, 9 of them from the
  global footer. Those pages now exist.
- **The fee calculator defaulted to 12% with a floor of 0%.** It now defaults to
  20% and will not go below 10%, matching the range Australian agencies actually
  charge. If you change the default, update the figures baked into
  `agency-fee.html` too — they are what a visitor sees before JS runs.

## Still to do

The campaign stills and background art in `img/` are AI-generated placeholders
from the design bundle — replace them with real campaign creative before launch.
`img/josh-portrait.webp` is the real founder portrait and is already in place.

## Verifying changes

The site has no test runner. After changing `site.js`, check in a browser that:
the hero clock runs 06:57 → 07:00 and the approve sequence completes; the FAQ
opens and closes; the fee calculator recalculates and switches modes; and the
quiz reaches all six verdicts and blocks submission without a name and a valid
email.

After running `tools/build-pages.js`, check that every URL in `sitemap.xml`
resolves, that no `vercel.json` redirect shadows a real page, and that any
`FAQPage` schema you added has its answers visible in the page text.
