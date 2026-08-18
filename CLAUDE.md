# Working on this repository

Marketing site for Sevenam. **Static HTML, no build step, no dependencies.** Vercel
serves these files directly — pushing to `main` deploys to https://sevenam.com.au
within about a minute. There is no staging environment, so a bad push is live.

## Before you commit, always

```bash
node tools/check.js
```

Takes about a second, needs nothing installed. It verifies every internal link and
asset resolves, `sitemap.xml` matches the pages that exist, no redirect shadows a
real page, JSON-LD parses, titles and descriptions are unique, each page has exactly
one `<h1>` and a correct canonical, and — importantly — that every FAQ answer claimed
in `FAQPage` schema is actually visible on the page. It also fails if
`vercel.json`'s `framework` is anything other than `null`. CI runs the same script.

## Two kinds of page — do not confuse them

- **16 hand-authored pages** came from a Claude Design handoff bundle. Edit their HTML
  directly: `index`, `apply`, `pricing`, `system`, `install`, `check`, `about`,
  `learn`, `glossary`, `agency-fee`, `what-are-meta-ads`, `facebook-ads-agency`,
  `ecommerce-facebook-ads-agency`, `ai-marketing-agency`, `facebook-ads-sydney`,
  `facebook-ads-for-tradies`.
- **40 generated pages** (other cities, industries, head terms, guides) are built from
  data in `tools/content/*.js`. **Editing their `.html` directly is wasted work** — the
  next `node tools/build-pages.js` overwrites it. Edit the content file, then rebuild.

`tools/build-pages.js` also rewrites `sitemap.xml` and prunes redirects that would
shadow a page. `tools/layout.js` lifts the nav, footer and stylesheet out of
`facebook-ads-sydney.html` at build time, so generated pages cannot drift from the
design — but it also means **breaking that file breaks all 35**.

## Things that will silently break the site

- **`"framework": null` in `vercel.json`.** The Vercel project's preset is Next.js.
  Without this override, every deploy runs `next build`, finds no `package.json`, and
  fails. Do not remove it.
- **`data-` attributes are behaviour hooks**, not styling: `data-reveal`,
  `data-faq-item` / `data-faq-toggle` / `data-faq-sign` / `data-faq-answer`,
  `data-clock`, `data-approve`, `data-act`, `data-ad-drift`, `data-parallax`,
  `data-out`, `data-tab`, `data-range`, `data-field`, `data-verdict`, `#apply-root`,
  `#pct-block`, `#flat-block`. Remove one while editing markup and the feature
  detaches with no error.
- **`agency-fee.html` carries the calculator's figures in the HTML**, so the page is
  correct before JS runs. Change the default percentage in `site.js` and you must
  update those baked-in numbers too, or the page flashes stale values.
- **FAQ answers must be in the HTML**, collapsed client-side rather than omitted.
  Structured data has to reflect what a visitor can see.

## Content rules — these are load-bearing

- Copy on the money pages is written against search terms. **Do not rewrite it for tone.**
- Never state a precise time for the overnight run — "Before you're up", never "02:00".
- No pricing on the homepage, and no pricing in any CTA button label.
- Two Sevenam figures are published and must stay consistent wherever they appear: the
  Install at **$19,500** (`/pricing`, `/agency-fee`, `/install`) and creative at **$750 a
  concept** (`/pricing`). Everything else — the monthly, managed scope, deal terms — is
  quoted in writing after the account is read. Market rates on the cost pages are other
  agencies' typical ranges, never ours.
- **Do not write the fee model as a vow.** "Never a percentage of spend" was removed from
  ~140 places; fees are "priced to the work rather than your budget". Absolutes foreclose
  the managed line. Grep loosely before declaring it clean — three separate sweeps missed
  phrasings like "never a share of your spend" and "your fee will never take a cut".
- Case studies: SRW, knest.ai, Online Model Academy only. Never a client's revenue.
- Sydney-based, working nationally. No phone number in body copy.
- No emoji, no "AI-powered" filler, no urgency theatre.
- Exactly one hero CTA and one closing CTA per SEO page. A mid-page CTA block was
  deliberately removed from 34 pages; do not reintroduce it.
- Every CTA routes to `/apply`. There is no direct calendar booking anywhere, on
  purpose: qualify and capture first, then Josh replies with a time.

## Design tokens

Ink `#0A0A0A` · Ink raised `#161613` · Hairline dark `#232320` · Volt `#D8FF00` ·
Volt hover `#CCFF00` · Paper `#F7F7F5` · Hairline light `#E3E3DD` · Body on ink
`#C9C9C2` · Muted on ink `#B5B5AD` · Body on paper `#55554F`.

`#9A9A92` is legal on ink only — it fails AA on white. Single typeface: Inter Tight.
All animation must be disabled under `prefers-reduced-motion: reduce`.

## What `tools/check.js` cannot see

It has no browser, so these still need looking at after changing `site.js`. Chromium and
Playwright are installed — drive them rather than guessing (launch with
`--no-proxy-server` and serve over `127.0.0.1`, or Chromium tries to proxy localhost):

- the hero clock running 06:57 → 07:00, the approve sequence completing, and the whole
  sequence **looping** — it restores from a snapshot between cycles, and restoring
  `textContent` on a container like `[data-approve-card]` or a `[data-act]` row wipes
  its children, which is exactly the bug that shipped once already
- the FAQ accordion opening and closing
- the fee calculator recalculating and switching between percentage and retainer
- the quiz reaching all six verdicts, and refusing to submit without a name and a
  valid email

The quiz's `verdict()` routing in `site.js` is order-sensitive. Two verdicts once
shared a key and routed the smallest accounts to the most expensive option, so if you
touch that function, walk all six paths by hand.

## Lead capture

`LEAD_EMAIL` at the top of `site.js` is the `mailto:` target on the quiz result screen
and is visible to anyone who finishes the quiz. `LEAD_ENDPOINT` is an optional webhook;
when set, answers POST server-side as form-encoded (deliberately, to avoid a CORS
preflight) and fall back to the `mailto:` if the request fails.
