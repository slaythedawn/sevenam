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

- **18 hand-authored pages** came from a Claude Design handoff bundle. Edit their HTML
  directly: `index`, `apply`, `pricing`, `system`, `install`, `check`, `about`,
  `learn`, `glossary`, `agency-fee`, `what-are-meta-ads`, `facebook-ads-agency`,
  `ecommerce-facebook-ads-agency`, `ai-marketing-agency`, `facebook-ads-sydney`,
  `facebook-ads-for-tradies`, `tools`, `creative-cost`.
- **67 generated pages** (other cities, industries, head terms, guides, markets) are built from
  data in `tools/content/*.js`. **Editing their `.html` directly is wasted work** — the
  next `node tools/build-pages.js` overwrites it. Edit the content file, then rebuild.

`tools/build-pages.js` also rewrites `sitemap.xml` and prunes redirects that would
shadow a page. `tools/layout.js` lifts the nav, footer and stylesheet out of
`facebook-ads-sydney.html` at build time, so generated pages cannot drift from the
design — but it also means **breaking that file breaks all 67**.

## Things that will silently break the site

- **Never splice `site.js` by index on a generic function name.** An edit that
  did `s.index("    function apply() {")` matched `setupGlossary`'s copy, which
  appears earlier in the file, and spliced across it — leaving **two** copies of
  `setupCaseCards`, `setupCalculators`, `money()` and `COMPUTE`, and 2,025 lines
  where there should have been 1,328. Declarations hoist, so the *second* copy
  won and the fix that was supposed to have shipped never ran. `node -c` passes
  on a file like that, and so does `check.js`. The guard is to count:
  `grep -c "function setupX()" site.js` should be 1 for every function, and
  `COMPUTE` must appear once because it is already mirrored in `layout.js`.
- **Test the JS path with the theme stylesheet neutralised.** The case-study
  one-column rule exists in both CSS and JS on purpose, so a Chromium check
  cannot tell you which one is working — that is how a broken JS fix was
  reported as verified. The harness blanks `#sv-theme`'s `minmax(min(` rules
  before asserting.
- **A `site.js` edit without rerunning `node tools/build-pages.js`.** `site.js` is
  served `max-age=3600`, so for an hour after a deploy a returning visitor runs the
  *previous* file against the new HTML. Anything JS-rendered then shows as an empty
  box with no error: this shipped once, and `/pricing-call` went live as a heading
  with no email field under it. Every page therefore carries `/site.js?v=<hash>`,
  stamped from the file's own content by `build-pages.js` — including the 18
  hand-authored pages, which is why the build step matters even when you changed no
  content. `check.js` fails on a stale stamp. The tag is matched on the prefix
  `<script src="/site.js` with no closing quote (`SITE_JS_TAG`); adding the quote
  back breaks the shell lift in `layout.js` and with it all 67 generated pages.
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
- **Contrast is not only text.** WCAG 1.4.11 wants 3:1 on the boundary of a
  control that its outline is the only marker for. The dark form inputs were
  `#232320` on Ink at 1.26:1 and the secondary hero button `#55554F` at 2.64:1 —
  both now resolve through `--sv-control-edge` (or `#6B6B63` where `site.js`
  builds them). Card hairlines are deliberately left alone: a card with its own
  fill is not identified by its border, and decoration is exempt. Text-only audits
  will not catch any of this — check placeholders, borders and both viewports.
- **`#55554F` is the Paper body token and fails on Ink at 2.64:1.** It had leaked
  onto dark surfaces on all 85 pages. The theme layer now resolves both muted greys
  through inherited custom properties (`--sv-muted`, `--sv-faint`) set by whichever
  background-setting ancestor is nearest, so a white card inside an ink section and a
  dark card inside a paper section both come out right. That only reaches inline
  styles written as `color: rgb(85, 85, 79)` — colours built in `site.js` are hex and
  bypass it, so pick the correct one there by hand.
- **A grid item will not shrink below its own min-content width** unless told it
  may, and a track that cannot shrink pushes the grid past its container. Chromium
  resolved the homepage case-study strip to one column on a phone; Safari widened
  the layout viewport instead and rendered two columns with the second sliced off
  screen, the visible card wrapping one word per line. `min-width: 0` on every
  grid child in `main` is the engine-independent fix, and `grid-column: span 2` is
  neutralised below 829px so `auto-fit` cannot be asked for a second track it did
  not create. Reported from a real iPhone; it does not reproduce in Chromium at
  any width, so do not "simplify" either rule away because a desktop check passes.
  **`min-width: 0` was not the whole fix.** It shipped, and the two-column slice
  came back from the same phone. Those grids are `minmax(min(240px, 100%), 1fr)`,
  and WebKit will not resolve that `100%` against a container it does not yet
  treat as definite — it keeps the pixel floor, fits two tracks it has no room
  for, and overflows. So `theme.js` now names one column outright below the width
  where a second could honestly fit: `[style*="minmax(min(3"]` at ≤719px and
  `[style*="minmax(min(2"]` at ≤599px. That substring hits the ~100 card grids and
  **none** of the small stat grids, which are `minmax(180px, 1fr)` and are meant to
  sit two-up on a phone — forcing those to one column is what made the page longer
  last time. Verified 390→1280: 1 / 2 / 3-4 tracks, no overflow at any width.
- **Section padding is not the lever on page height.** It is 1,228px of an
  18,856px homepage — 6.5%. A blanket `padding: 80px` on mobile sections made the
  page *longer* (19,176px), because most sections deliberately carry
  `padding-top: 0` so a stacked run does not double up. Measured and reverted.
- **The nav has three coupled numbers and they must stay equal.** The page
  stylesheet's media query, the one in `tools/theme.js`, and the `matchMedia` in
  `setupNav()` are all **939/940px**, because 940 is the first width where the logo,
  **eight** links and the button fit on one line. It was 830 with seven; adding the
  Automation tab moved it. **Add or rename a nav link and you must re-measure and
  move all three** — the measurement is a 20px sweep of `[data-nav-bar]` height,
  looking for where it stops being 103px and becomes 65px.
  They were once 780 and 640, and in the 140px between them the nav was a fixed
  999px-radius pill wrapped to three rows and 152px tall: the capsule broke, and
  since the hero only takes back a fixed 128px, the nav sat on the `h1`.
- **Below that width the nav is a hamburger**, built by `setupNav()` in `site.js`
  and never in the HTML. All of its styling is scoped to `[data-nav-ready]`, an
  attribute only that function sets, so with JS off there is no dead button and the
  links stay the scrolling row they were. The panel closes on link click, Escape,
  an outside click, and on crossing the breakpoint.
- **`data-` attributes are behaviour hooks**, not styling: `data-reveal`,
  `data-faq-item` / `data-faq-toggle` / `data-faq-sign` / `data-faq-answer`,
  `data-clock`, `data-approve`, `data-act`, `data-ad-drift`, `data-parallax`,
  `data-out`, `data-tab`, `data-range`, `#book-root`, `#pricing-call-root`, `#adlib-root`, `#concepts` and the `data-cc` / `data-ccrange` hooks on the creative
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
  real forms are built in `site.js` (`#book-root`, `#pricing-call-root`) and POST to
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
- **Every primary CTA carries `AUDIT_LINE`** — one constant in `tools/layout.js`
  rendered under the hero and closing buttons, plus 28 hand-written copies across
  the 18 hand-authored pages and one above the form on `/apply`. It says what four
  fields buys: whether you qualify for a free marketing technology, systems and
  performance audit. The wording is legally deliberate — **"whether you qualify"**
  and **"at our discretion and in limited numbers"** keep it an invitation to be
  assessed rather than an offer to supply, the same discretion the audit table on
  `/marketing-automation` is written to preserve. Do not soften it to "get your
  free audit". All 85 pages carry it; grep before assuming a new one does.
- **The three published prices exclude GST, and say so.** `/pricing` (the section
  copy, three card sub-labels and the FAQ answer, which means the JSON-LD copy of
  it too), `/install`, `/system`, `/agency-fee` and `/pricing-call`. A new price
  mention needs the treatment stated or the page contradicts the others.
- **`/apply` is the short form, and it is the only form.** Four fields on one
  screen — work email, website, monthly spend, which product — built by
  `setupShortForm()` in `site.js` and mounted on `#book-root`. `/pricing-call`
  mounts the same form on `#pricing-call-root`; `source` is the only thing that
  tells the two apart downstream.
- **The five-question quiz was deleted, on purpose.** It was 524 lines of
  `site.js` — `QUESTIONS`, `VERDICTS`, `verdict()`, `#apply-root` — served on all
  every page, and it stood between a visitor and any capture at all before a single
  lead had come in. Removing it took `site.js` from 79KB to 47KB. It is in git if
  it is ever wanted back; **do not resurrect it from memory**, and do not add
  qualifying questions to the short form without being asked — reducing friction
  was the whole point. Nothing on the site may say "five questions" any more; that
  phrasing was the default secondary CTA in `tools/layout.js`, so it was on 60-odd
  pages and had to be swept.
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

Three pages carry a calculator — `/what-is-roas`, `/facebook-ads-cost-australia`
and `/social-media-management-cost`. The markup is built once by `roasCalc()` in
`tools/layout.js` and driven entirely by the page's `fields` and `outputs`; the
only thing that differs per page is the arithmetic, which lives in a `COMPUTE`
map keyed by `id`. **That map is mirrored in `site.js`** — layout renders the
defaults at build time so the page is right before JS lands, and `site.js`
recomputes on input. Two copies of the same formula is a drift risk, so the guard
is a test that loads each page with JavaScript disabled and diffs every output
against the scripted render; run it after touching either copy. `data-calc` on
the section picks the formula, `data-roas` marks an input, `data-rout` an output,
and a `<key>Tone` field in the result recolours `<key>` (that is how break-even
goes red). Adding a fourth calculator means a `COMPUTE` entry in both files and
nothing else.

`dataTable()` has two modes. The default right-aligns every column after the
first, holds each cell on one line and uses tabular figures — right for money,
wrong for sentences. `wrap: true` gives a prose comparison: left-aligned, cells
allowed to break, no tabular figures. Both keep the `overflow-x: auto` container,
so a wide table scrolls inside itself rather than pushing the page sideways on a
phone. Six pages use the wrapping mode.

`setupGlossary()` builds the filter on `/glossary` from `[data-term]` rows. The
field is created in `site.js`, never in the HTML, so a visitor without JS gets the
complete list rather than a search box that does nothing. It matches the whole
row — term and definition — because someone half-remembering "the unstable period
after a change" should find Learning phase without knowing its name.

`systemMap()` in `tools/layout.js` draws the three-part diagram on
`/marketing-automation` — in, repository, out, with the approval gate under it. It
is a CSS grid rather than an SVG so the text reflows and stays selectable, and it
is **drawn from our own tokens rather than a wall of vendor logos**: the tools
underneath a build differ for every client, so a fixed logo wall would be wrong for
most of them and stale the moment anyone rebrands. Same call as the Ad Library
walkthrough. Opt-in like the other blocks — only a page that sets `systemMap`
renders it, and `services.js` must pass the key through `build()`.

`phases()` and `qualifier()` are the two components that turned the rest of
`/marketing-automation` from copy into process. `phases()` draws the engagement
as a four-phase rail — workshop, audit, build, training and handover — each with
its duration and the things that actually change hands in it; it replaced seven
flat numbered cards. `qualifier()` replaced the audit `dataTable`: same
sentences, arranged as what-it-covers chips over two contrasting columns, because
a table is right for figures and wrong for an offer somebody has to decide about.
**The discretion paragraph travels with that block** — "at our discretion, in
limited numbers" and "nothing on this page is an offer to supply it" are what
keep it an invitation to be assessed.

Both are written in the homepage hub's language — a dark panel on paper, volt
eyebrows, hairline nodes — deliberately. That diagram is the part of the site
people report understanding immediately, and a second visual vocabulary would be
a worse answer than reusing the one that works. The rails and columns are plain
grids with no absolute widths, so they collapse to a stack on a phone with
nothing to redraw.

`explainer()` and `accordion()` in `tools/layout.js` are the other two blocks on
`/marketing-automation`, added because the page was one dense diagram and two long
prose sections. The explainer is three before/after cards under the hero — by hand
today, once it is built, why that is worth money — and it renders **above** the
prose on purpose. `systemMap` moved up with it: it used to render after the tables,
which put the only picture on the page below everything it introduces.

`columns()` is `prose()` in two columns, and a section opts into it with
`render: 'columns'`. Auto-flow puts the heading and first paragraph on the top
row and the second paragraph and the list on the second, which fills a 1240px
container that a 62ch prose column leaves half empty. Three variants keep the
three uses on `/marketing-automation` from reading as the same block three
times: plain dots, `numbered: true`, and `accent: true` for volt. **Do not wrap
the prose in a column div.** The direct children of `[data-fold]` have to stay
`h2, p, p, list`, because `setupFolds()` keeps the first two and folds
`slice(2)`; a wrapper leaves two children, `slice(2)` comes back empty, and
every fold on the page stops working with no error. For the same reason nothing
is pinned with `grid-row: 1 / -1` — `theme.js` collapses the grid by rewriting
`grid-template-columns`, and a pinned item would then sit on top of the heading.
The track minimum is 380px because 1240px fits three tracks of anything under
371px, and a two-child grid with three tracks leaves a dead column.

`sectionsSplit` is how many sections render above `phases()` instead of below
it. Only `/marketing-automation` sets it, to 1: `systemMap` and `phases` are
both ink, and stacked they read as one long dark run with a notch cut in it.
The page's `s2` is `tone: 'paper'` for the same reason — four ink blocks cannot
alternate with two paper ones. It defaults to 0, so every other page keeps the
order it had.

**The one-column rule for the case-study strip is enforced in `site.js`, not
just in CSS.** The theme stylesheet names one column below 720px via an attribute
selector on the inline style; that rule is in the shipped HTML and Chromium obeys
it, and the strip still came back two-up from a real iPhone with the cards
squeezed to 131px and 206px. Whether that is a stale cached document or WebKit
reading the selector differently, the stylesheet is not something to depend on
here — `setupCaseCards()` now sets `gridTemplateColumns` directly, which beats an
inline style without needing a selector to match, and `site.js` is content-hash
stamped so it is never the stale half of a deploy. The CSS rule stays for the
no-JS case. Do not remove either.

Two more collapses, both in `site.js` and both keyed to the same **719px** the
card grids use. `setupCaseCards()` folds the homepage case studies on a phone —
each keeps its name and headline number, the rest goes behind a toggle, and it
comes back whole above the breakpoint. Forcing one column had cut the slicing
bug and left 2,606px of stacked cards; this takes that to 688px. `setupFolds()`
does the same for any prose section rendered with `fold: true` — heading and
first paragraph stay, the rest folds — and only `/marketing-automation` sets it,
via `foldProse` in `services.js`. Both build their toggles in JS and touch no
markup, so with JS off every section is simply whole, and both handle the two
card shapes by counting children rather than by adding hooks. **Fold inside the
element the content already sits in**, or it loses that element's padding and
renders full-bleed.

**The images on `/marketing-automation` are not in the repo yet, and that is the
one open item on that page.** Two slots exist — `figure` (the whiteboard system
sketch, after `systemMap`) and `workshopFigure` (Josh running the mapping
workshop, after the deliverables). Both were generated but the CDN they live on
is blocked from the build container, and binary cannot be moved through the
agent's context economically, so Josh has to download them. Drop the files in as
`img/automation-whiteboard-a1.jpg` and `img/automation-workshop-a1.jpg`, rebuild,
and both appear. Do not swap the slots for a hotlink to someone else's CDN.

**Both slots are `.jpg` on purpose.** The generated sources are 5.8MB and 8MB
PNGs — a photographic render has no business being a PNG, and `img/*` is served
immutable for a year, so shipping the original would put that weight on the page
permanently. Resize to about 1600px and convert before committing; macOS has
`sips` built in and needs nothing installed. And the extension has to match the
actual encoding: saving a PNG as `.jpg` makes Vercel serve `image/jpeg` for a
file that is not one.

`figure()` renders an image **only if the file exists on disk** at build time.
That is how `/marketing-automation` carries a slot for a whiteboard render the
build container cannot fetch: drop the file into `img/` and rebuild, and it
appears with no code change. Never reference an image that is not there —
`check.js` fails a missing asset, and a broken image is worse than none.

`dataTable` takes an optional `cta` — one inline link under the note, not a
button. The audit block described something free and offered no way to ask for
it, the same dead end `/pricing`'s cards had. A text link fixes that without
reintroducing the mid-page CTA block that was deleted from 34 pages. `topTables`
renders a table high, just under the explainer, instead of after the prose;
only the audit block uses it, because an offer four screens down is not an offer.

The accordion **reuses the FAQ hooks** (`data-faq-item` / `-toggle` / `-sign` /
`-answer`) rather than inventing its own. `setupFaq()` in `site.js` already scopes
open/close by `parentElement`, so several accordions coexist on one page with no new
JavaScript, and with JS off every answer is simply visible. Both blocks are opt-in
and only the automation pillar sets them.

**Six market pages** cover New Zealand, Singapore and Malaysia, two each: a
performance/Meta page and a marketing-automation page. They are written to real
structural differences — NZ saturates because the audience is small, Singapore is a
small audience with well-funded regional competitors, Malaysia has cheap media and
a marketplace habit that eats margin — **not one template with the country swapped**,
which is thin content and reads like it. Every one of them says plainly that Sevenam
is Sydney-based and remote with no local office; do not soften that into implying a
local presence.

`/marketing-automation` is the second service pillar and the only page with a
**bespoke** price — there is deliberately no figure on it, because the work depends
entirely on the client's existing stack. Do not give it one. It also carries the
**free systems audit**, which is offered at Sevenam's discretion and in limited
numbers: the table and its note are written so the page is not an offer to supply,
and the fifteen-minute call is where qualifying is decided. If that copy is
softened, the discretion has to survive it. Josh should have a lawyer read it if it
ever matters commercially — it is written carefully, not written by a solicitor.

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
- the short form refusing to submit without a valid email, keeping focus in the
  field being typed in, and posting `email`, `website`, `spend` and `want` — the
  endpoint reads `website`, so a field named `site` is dropped in silence
- the Ad Library search on `/meta-ad-library` building a link that carries both
  `country` and `active_status=active`

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
