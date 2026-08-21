# Working on this repository

Marketing site for Sevenam. **Static HTML, no build step, no dependencies.** Vercel
serves these files directly — pushing to `main` deploys to https://sevenam.com.au
within about a minute. There is no staging environment, so a bad push is live.

The one exception to "static" is `api/lead.js`, a Vercel Node function that receives
the finished application. It has no dependencies either — no `package.json`, global
`fetch`, `module.exports` — so the no-build-step rule still holds.

## Before you commit, always

```bash
node tools/check.js
```

Takes about a second, needs nothing installed. It verifies every internal link and
asset resolves, `sitemap.xml` matches the pages that exist, no redirect shadows a
real page, JSON-LD parses, titles and descriptions are unique, each page has exactly
one `<h1>` and a correct canonical, and — importantly — that every FAQ answer claimed
in `FAQPage` schema is actually visible on the page. It also fails if
`vercel.json`'s `framework` is anything other than `null`, that every file in `api/`
loads and exports a handler, and that none of them contains what looks like a
hard-coded API key. CI runs the same script.

## Two kinds of page — do not confuse them

- **16 hand-authored pages** came from a Claude Design handoff bundle. Edit their HTML
  directly: `index`, `apply`, `pricing`, `system`, `install`, `check`, `about`,
  `learn`, `glossary`, `agency-fee`, `what-are-meta-ads`, `facebook-ads-agency`,
  `ecommerce-facebook-ads-agency`, `ai-marketing-agency`, `facebook-ads-sydney`,
  `facebook-ads-for-tradies`, `tools`, `creative-cost`.
- **42 generated pages** (other cities, industries, head terms, guides) are built from
  data in `tools/content/*.js`. **Editing their `.html` directly is wasted work** — the
  next `node tools/build-pages.js` overwrites it. Edit the content file, then rebuild.

`tools/build-pages.js` also rewrites `sitemap.xml` and prunes redirects that would
shadow a page. `tools/layout.js` lifts the nav, footer and stylesheet out of
`facebook-ads-sydney.html` at build time, so generated pages cannot drift from the
design — but it also means **breaking that file breaks all 42**.

## Things that will silently break the site

- **`"framework": null` in `vercel.json`.** The Vercel project's preset is Next.js.
  Without this override, every deploy runs `next build`, finds no `package.json`, and
  fails. Do not remove it.
- **`/img/*` is served `immutable` for a year.** Replacing an image in place is
  invisible to anyone who has already loaded the page. Give the new file a new name —
  the two homepage images carry a content hash for exactly this reason.
- **`data-` attributes are behaviour hooks**, not styling: `data-reveal`,
  `data-faq-item` / `data-faq-toggle` / `data-faq-sign` / `data-faq-answer`,
  `data-clock`, `data-approve`, `data-act`, `data-ad-drift`, `data-parallax`,
  `data-out`, `data-tab`, `data-range`, `data-field`, `data-verdict`, `#apply-root`, `#concepts` and the `data-cc` / `data-ccrange` hooks on the creative
  calculator,
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
- One Sevenam figure is published and must stay consistent wherever it appears: the
  Install at **$19,500** (`/pricing`, `/agency-fee`, `/install`). Creative is sold per
  concept and `/pricing` says so, but the per-concept figure is deliberately **not**
  published — do not add one back. Everything else — the monthly, managed scope, deal
  terms — is quoted in writing after the account is read. Market rates on the cost pages
  are other agencies' typical ranges, never ours.
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

## Icons and social cards

`img/favicon.svg` is the source — volt square, ink 7. The PNGs beside it
(`favicon-32`, `apple-touch-icon`, `icon-192`, `icon-512`) are rasterised from it,
and `site.webmanifest` points at the last two.

`og/<slug>.jpg` is one 1200x630 social card per page, built from that page's own
`h1` and meta description by `node tools/build-og.js`. **Rerun it after changing a
headline**, or the card and the page disagree. It is the one tool that needs
Playwright, it is not part of `check.js`, and the cards live in `og/` rather than
`img/` precisely because `img/*` is served immutable for a year.

`check.js` fails a page with no `og:image` or one pointing at a file that is not
there — a card that 404s renders as a blank box, which is worse than none.

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

A finished application POSTs to `/api/lead` (`api/lead.js`), form-encoded on purpose —
that keeps it a "simple" CORS request, so the browser skips a preflight. The function
validates, drops honeypot submissions, `console.log`s the lead so it survives in the
Vercel runtime logs whatever happens next, then delivers by the first route configured:

| Variable | Effect |
| --- | --- |
| `RESEND_API_KEY` | Emails the lead via Resend. `reply_to` is the applicant. |
| `LEAD_TO` | Who it goes to. **Required** alongside the key — there is no default, because this repository is public and a default would be an address on display. |
| `LEAD_WEBHOOK` | POSTs the lead as JSON instead. |
| `LEAD_FROM` | Sender. Defaults to Resend's `onboarding@resend.dev` until the domain is verified there. |

**These live in the Vercel project, never in the repo.** With none of them set the
function returns 503 rather than claiming success.

**Vercel only exposes an environment variable to deployments built after it was
added.** Setting a key changes nothing until the next deploy — so after adding one,
push something or redeploy, then confirm with a real POST rather than assuming.

Only a 200 counts as delivered. On 503 or 502 the result screen says plainly that it
did not go through and opens the `mailto:` in `LEAD_EMAIL` with the answers already
written out. That address is the failure path only; nothing on the page invites it.

**No email address appears anywhere on the site or in `site.js`, on purpose.**
`hello@sevenam.com.au` never had an MX record — the domain has no mail server, so it
always bounced — and rather than stand up a mailbox, contact routes through `/apply`
only. The footer Contact column links there, and the Organization schema has no
`email` property. Do not reintroduce an address without a mailbox behind it.

The function knows where a lead goes; the browser does not, and must not. A failed
POST shows "Try again" and leaves the answers on screen — there is no `mailto:`
fallback, because handing the applicant back to their own mail client is the drop-off
this whole thing was built to remove.
