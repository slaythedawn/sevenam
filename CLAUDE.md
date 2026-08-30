# Working on this repository

Marketing site for Sevenam. **Static HTML, no build step, no dependencies.** Vercel
serves these files directly — pushing to `main` deploys to https://sevenam.com.au
within about a minute. There is no staging environment, so a bad push is live.

The one exception to "static" is `api/lead.js`, a Vercel Node function that receives
the finished application. It has no dependencies either — no `package.json`, global
`fetch`, `module.exports` — so the no-build-step rule still holds.

## Before you commit, always

```bash
node tools/build-pages.js && node tools/check.js
```

If you edited `site.js`, the build step is not optional — see below.

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

- **A `site.js` edit without rerunning `node tools/build-pages.js`.** `site.js` is
  served `max-age=3600`, so for an hour after a deploy a returning visitor runs the
  *previous* file against the new HTML. Anything JS-rendered then shows as an empty
  box with no error: this shipped once, and `/pricing-call` went live as a heading
  with no email field under it. Every page therefore carries `/site.js?v=<hash>`,
  stamped from the file's own content by `build-pages.js` — including the 18
  hand-authored pages, which is why the build step matters even when you changed no
  content. `check.js` fails on a stale stamp. The tag is matched on the prefix
  `<script src="/site.js` with no closing quote (`SITE_JS_TAG`); adding the quote
  back breaks the shell lift in `layout.js` and with it all 49 generated pages.
- **`"framework": null` in `vercel.json`.** The Vercel project's preset is Next.js.
  Without this override, every deploy runs `next build`, finds no `package.json`, and
  fails. Do not remove it.
- **`/img/*` is served `immutable` for a year.** Replacing an image in place is
  invisible to anyone who has already loaded the page. Give the new file a new name —
  the two homepage images carry a content hash for exactly this reason.
- **A `<button>` does not inherit `color`.** The UA sheet gives it `buttontext`,
  i.e. black. `setupProducts()` wraps each pricing card's head in one, so anything
  moved inside that carries no colour of its own renders black — which is how
  "From $5,000" shipped invisible at 1.06:1 on the dark tier. The head now sets
  `color:inherit`; don't remove it.
- **`#55554F` is the Paper body token and fails on Ink at 2.64:1.** It had leaked
  onto dark surfaces on all 68 pages. The theme layer now resolves both muted greys
  through inherited custom properties (`--sv-muted`, `--sv-faint`) set by whichever
  background-setting ancestor is nearest, so a white card inside an ink section and a
  dark card inside a paper section both come out right. That only reaches inline
  styles written as `color: rgb(85, 85, 79)` — colours built in `site.js` are hex and
  bypass it, so pick the correct one there by hand.
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
- **A price can survive in JSON-LD after the copy is changed.** `/install` still carried
  `"price": "19500"` and `/check` `"price": "1000"` in an `offers` block long after both
  numbers were taken out of the visible page. Grep the `<script type="application/ld+json">`
  line, not just the body. The only `price` values left are `"0"` on the two free
  calculators, which are true.

## Content rules — these are load-bearing

- Copy on the money pages is written against search terms. **Do not rewrite it for tone.**
- Never state a precise time for the overnight run — "Before you're up", never "02:00".
- **Three published prices, and they must agree everywhere.** The setup is
  **$19,500** one-off, the daily decisions are **$2,500 a month** once it is live, and
  creative **packages start at $5,000**. The end-to-end option is the only one still
  quoted after we read the account. These were removed site-wide and then deliberately
  put back — if you change one, change all of: `/pricing` (four cards plus the section
  copy and the FAQ answer, which also lives in the page's `FAQPage` JSON-LD),
  `/install` (the display figure and its `offers` block), `/system` (the sentence and
  its `offers` block), `/pricing-call` (in `tools/content/services.js`, not the HTML),
  and `/agency-fee`. `check.js` catches a JSON-LD answer that no longer matches the
  visible one; it cannot catch a stale number, so grep.
- **`/agency-fee` carries a derived total.** `$49,500` is the Install once ($19,500)
  plus twelve months of daily decisions ($30,000). The calculator in `site.js` computes
  only the *other* agency's side, so this figure is baked into the HTML — change the
  monthly and you must redo the arithmetic there by hand.
- No price belongs on the homepage, or in any CTA button label. "Get the numbers" was
  the CTA while nothing was published; it is now **"Book the call"**, because the
  numbers are on the page above it.
- Market rates on the cost pages are other agencies' typical ranges, attributed to the
  business that published them, and are **not** covered by the rule above — those stay.
  So do client spend ranges like "$30k–$500k a month".
- **Do not write the fee model as a vow.** "Never a percentage of spend" was removed from
  ~140 places; fees are **"priced to the work"** — full stop, no "rather than your budget"
  clause, which was itself cut from 30 places for defining us against other agencies. Absolutes foreclose
  the managed line. Grep loosely before declaring it clean — three separate sweeps missed
  phrasings like "never a share of your spend" and "your fee will never take a cut".
  Describing what *other* agencies charge is not the vow and stays — the quiz option
  "An agency on a percentage of spend", the cost-page ranges and the FAQ questions
  written in a prospect's words are all about them, not us.
- **No form on the site may discard what someone types.** `/check` carried five fields
  and a "Continue to payment" button with no `action` and no handler behind it — it
  looked live and went nowhere. It is now a panel that routes to `/apply`. The only
  real forms are built in `site.js` (`#apply-root`, `#pricing-call`) and POST to
  `/api/lead`; there is no `<form>` element in any `.html` file, and that is the check.
- Case studies: SRW, knest.ai, Online Model Academy only. Never a client's revenue.
- Sydney-based, working wherever the auction runs. Australian-based, not Australian-only:
  the AU-targeted pages keep their local copy because that is the ranking strategy, but the
  global positioning lines must not read as a limit. No phone number in body copy.
- No emoji, no "AI-powered" filler, no urgency theatre.
- Exactly one hero CTA and one closing CTA per SEO page. A mid-page CTA block was
  deliberately removed from 34 pages; do not reintroduce it. `/pricing` is the one
  exception: each of the four product cards carries its own "Get the numbers" pill,
  because a card that describes a product and shows no price is a dead end without
  one. They are built in `setupProducts()` with `createElement`, never inserted into
  `pricing.html` — placing an element before a card's closing tag needs a regex tag
  walk that has now put content in the wrong place twice on this file.
- **`/apply` is the short form now, not the quiz.** Four fields on one screen — work
  email, website, monthly spend, which product — built by `setupShortForm()` in
  `site.js` and mounted on `#book-root`. The five-question quiz still exists,
  unchanged, folded into a `<details>` below it on the same page; that is why the
  quiz's screens render `<h2>` rather than `<h1>` (the short form owns the page's one
  `<h1>`, and the quiz is on the page at the same time). `/pricing-call` mounts the
  same form on `#pricing-call-root` with `source: "pricing-call"`, so the two are
  identical downstream apart from that field. Do not put the quiz's `<h1>` back.
- **Every CTA routes to `/apply`, and now there is only one exception.**
  `/pricing-call`'s hero CTA points at its own `#pricing-call` form, because that page
  exists to answer a price query in place. Everything else — including `/pricing`'s
  hero CTA and its four card CTAs — goes to `/apply`, which is no longer the
  five-question application it was when those exceptions were written. The
  `ctaHref` / `ctaLabel` overrides in `tools/layout.js` default to `/apply` /
  "Get started"; keep it that way.
  There is still no direct calendar booking anywhere, on purpose: capture the email
  first, then Josh replies with a time.

`tools/layout.js`'s `walkthrough()` renders the one on `/meta-ad-library`: numbered
steps beside a labelled diagram of the Ad Library's three controls, plus
`#adlib-root`, which `site.js` fills with a search that builds a real prefilled
`facebook.com/ads/library` URL. The two things that make an Ad Library search fail
are both in the query string — no `country` (it defaults to the viewer's, so an
Australian advertiser searched from elsewhere looks dormant) and no
`active_status=active` — so the link sets both. The diagram is **drawn from our
tokens, not screenshotted**: Meta moves that interface, and a stale screenshot of
someone else's product ages worse than the shape of it. The block is opt-in — only
pages that set `walkthrough` render it, and `tools/content/guides.js` has to pass the
key through `build()` or it is silently dropped.

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

`sitemap.xml` carries a `<lastmod>` per URL, derived in `build-pages.js` from git
rather than mtime — every generated page is rewritten on every build, so mtime would
claim all 68 changed each time one did. A page whose only diff is the `/site.js?v=`
cache-busting stamp keeps the date of its last real edit, for the same reason: dating
everything "today" whenever one script moves is what gets `lastmod` discounted.

## Telling search engines a page changed

`node tools/indexnow.js` pings IndexNow with every URL in `sitemap.xml`, or with
just the paths you name (`node tools/indexnow.js /pricing /about`). Bing removed
its bulk URL submission page and this is what replaced it; Yandex, Seznam and
Naver read the same feed.

**Run it after the deploy is live, never before.** It tells search engines to come
and look now, so a page that has not shipped yet gets re-read as it was.

The key is `7dda69eb31274ca1af96731e66389ffa.txt` at the site root, and it is in
this repository deliberately — the key's whole job is to be publicly fetchable,
which is how it proves the domain is ours. Delete that file and IndexNow returns
403. Nothing else uses it.

## Design

`DESIGN.md` is the playbook — the type scale with its paired leading and tracking,
the surface stack, radii by element size, the component specs and the do/don't
list. Read it before designing anything, and if you genuinely need a value that
is not on the scale, add it there in the same commit.

`tools/check-design.js` runs inside `check.js` and reports drift against it:
off-scale sizes, clamp ramps, tracking, radii, off-palette colour and blurred
shadows. It **fails the build**. The backlog that once made it advisory — 30 clamp ramps,
20 font sizes, three off-palette greys — is cleared, so anything it reports now
is new drift. If you need a value it rejects, add it to `DESIGN.md` and to
`check-design.js` in the same commit, or you are back to twenty font sizes.

## Design tokens

Twelve values, listed with their measured contrast in `DESIGN.md`.

Ink `#0A0A0A` · Ink raised `#161613` · Hairline dark `#232320` · Volt `#D8FF00` ·
Volt hover `#CCFF00` · Paper `#F7F7F5` · Hairline light `#E3E3DD` · Body on ink
`#C9C9C2` · Muted on ink `#B5B5AD` · Body on paper `#55554F`.

Ink soft `#373732` · Muted on paper `#6B6B63` · Faint on paper `#8A8A82`.

`#9A9A92` (2.64:1) and `#8A8A82` (3.24:1) both fail AA as body text on paper —
`#8A8A82` is legal there only at 24px, or 19px at weight 600+. Single typeface: Inter Tight.
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

A completed `/apply` and a `/pricing-call` request also send the submitter an
automated acknowledgement. It is gated on `LEAD_FROM`: from Resend's shared
`onboarding@resend.dev` sender, mail to anyone but the account owner is not
delivered, so without a verified domain the function skips it and logs why. It is
deliberately **not** sent for a partial capture or an abandonment — those are
internal signals, and someone still mid-quiz has submitted nothing. It carries
**no booking link**; Josh qualifies first and sends a time himself. And it echoes
**nothing the submitter typed** — the function will mail any address posted to
it, so reflected content would make it a way to deliver attacker-chosen text to a
third party over our domain. Keep the body fixed.

**No email address appears anywhere on the site or in `site.js`, on purpose.**
`hello@sevenam.com.au` never had an MX record — the domain has no mail server, so it
always bounced — and rather than stand up a mailbox, contact routes through `/apply`
only. The footer Contact column links there, and the Organization schema has no
`email` property. Do not reintroduce an address without a mailbox behind it.

The function knows where a lead goes; the browser does not, and must not. A failed
POST shows "Try again" and leaves the answers on screen — there is no `mailto:`
fallback, because handing the applicant back to their own mail client is the drop-off
this whole thing was built to remove.
