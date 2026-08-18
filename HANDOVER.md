# Sevenam site handover

Everything needed to run, edit and deploy **sevenam.com.au**.

| | |
|---|---|
| Status | Live |
| Repository | `slaythedawn/sevenam` |
| Host | Vercel, watching `main` |
| Pages | 51 |
| Stack | Static HTML, no build step, no dependencies |

A companion document, `CLAUDE.md`, holds the same rules in the form a Claude
session reads automatically. This file is the human-facing version.

## How it deploys

Any commit to `main` is live in about a minute. **There is no staging environment
and no build step** — the HTML in the repository is exactly what visitors get.

> **The Vercel project's Framework Preset is set to Next.js.** This site has no
> `package.json`, so any deploy honouring that preset runs `next build`, finds no
> Next.js, and fails with `Error: No Next.js version detected`. The line
> `"framework": null` in `vercel.json` overrides the dashboard and restores static
> serving. **Do not remove it.**

`vercel.json` also carries clean URLs (`/pricing` works, `/pricing.html` redirects
to it), ten canonical redirects, immutable caching on `/img/`, and security headers.

## Two kinds of page

The most important thing to know before editing, because getting it wrong means
your work is silently overwritten.

| Kind | Count | How to edit |
|---|---|---|
| Hand-authored | 16 | Edit the `.html` directly. Bespoke layouts from the design bundle. |
| Generated | 35 | Edit `tools/content/*.js`, then run `node tools/build-pages.js`. **Editing their `.html` is wasted work.** |

The hand-authored sixteen: home, `apply`, `pricing`, `system`, `install`, `check`,
`about`, `learn`, `glossary`, `agency-fee`, `what-are-meta-ads`,
`facebook-ads-agency`, `ecommerce-facebook-ads-agency`, `ai-marketing-agency`,
`facebook-ads-sydney`, `facebook-ads-for-tradies`. Everything else is generated.

`tools/layout.js` lifts the nav, footer and stylesheet out of
`facebook-ads-sydney.html` at build time, so generated pages cannot drift from the
design — but breaking that one file breaks all 35.

## Making a change

1. **Edit the right file.** Generated page → `tools/content/`. Hand-authored → the HTML.
2. **Rebuild** if you touched generated content: `node tools/build-pages.js`. This also
   rewrites `sitemap.xml` and prunes redirects that would shadow a real page.
3. **Run the checks:** `node tools/check.js`. No dependencies, about a second. Fails on
   broken links, missing images, a sitemap that disagrees with reality, unparseable or
   unmatched schema, duplicate titles, and a `framework` that is no longer `null`.
4. **Look at what a headless check cannot see** — only if you changed `site.js`: the hero
   clock running 06:57 → 07:00 and completing the approve sequence, the FAQ opening and
   closing, the calculator recalculating and switching modes, and the quiz reaching all
   six verdicts while refusing an empty form.
5. **Commit to `main`.** That is the deploy. CI runs the same checks on the push.

## Page inventory

56 pages. Every URL in
`sitemap.xml` resolves and no internal link 404s.

| Group | Count |
|---|---|
| Core (home, apply, pricing, system, install, check, about, learn, glossary, growth) | 10 |
| Tools (fee calculator) | 1 |
| Cities | 8 |
| Industries | 6 |
| Head terms | 9 |
| Cost and pricing | 4 |
| Guides | 13 |

City and industry pages deliberately argue different points rather than swapping a
place name — near-duplicate location pages are a ranking liability.

## Interactive parts

All behaviour is in `site.js`. Every page ships its content in the HTML; the script
only adds behaviour, so the site reads fine with JavaScript off.

| Feature | Where | Hooks |
|---|---|---|
| The 7am moment | Homepage hero | `data-clock`, `data-flash`, `data-ring`, `data-act`, `data-approve` |
| Scroll reveals | All pages | `data-reveal` |
| Parallax and drift | Homepage | `data-parallax`, `data-ad-drift` |
| FAQ accordion | Homepage | `data-faq-item`, `-toggle`, `-sign`, `-answer` |
| Fee calculator | `/agency-fee` | `#pct-block`, `#flat-block`, `data-out`, `data-tab` |
| Qualifying quiz | `/apply` | `#apply-root`, `data-field`, `data-verdict` |

The hero clock is a scripted three-second demo starting at 06:57, not a live clock.
The 07:00 header band *is* real local time, showing for five minutes after 7am;
append `?seven` to any URL to force it.

The quiz asks five qualifying questions plus contact details and returns one of six
verdicts. Two of them, `tooSmall` and `playbook`, decline the sale on purpose — the
page's promise of a straight answer depends on them staying reachable.

> **The verdict routing is order-sensitive.** Two verdicts once shared a key and sent
> the smallest accounts to the most expensive option. If you touch `verdict()` in
> `site.js`, walk all six paths by hand.

## What breaks silently

None of these throw an error.

- **Removing a `data-` attribute while editing markup.** They are behaviour hooks, not
  styling. The feature detaches with no console error.
- **Editing a generated page's HTML.** The next build overwrites it.
- **Changing the calculator default without updating `agency-fee.html`.** The figures are
  baked into the HTML so the page is correct before JS runs; leave them stale and the
  page visibly flashes the old numbers.
- **Adding `FAQPage` schema without visible answers.** Structured data must reflect what a
  visitor can see. This shipped broken twice in the source material.
- **Adding a `vercel.json` redirect whose source matches a real page.** The redirect wins
  and the page becomes unreachable.

## Content rules

From the brief, and load-bearing rather than stylistic.

- Copy on the money pages is written against search terms. **Do not rewrite it for tone.**
- Never state a precise time for the overnight run — "Before you're up", never "02:00".
- No pricing on the homepage, and none in any CTA button label.
- Two figures are published: the Install at **$19,500** and creative at **$750 a concept**.
  Everything else is quoted in writing after the account is read. Market rates on the cost
  pages are other agencies' typical ranges, never ours.
- The fee model is an argument, not a vow: "priced to the work rather than your budget",
  never an absolute promise about percentages.
- Case studies: SRW, knest.ai and Online Model Academy only. Never a client's revenue.
- Sydney-based, working nationally. No phone number in body copy.
- No emoji, no "AI-powered" filler, no urgency theatre.
- Exactly one hero CTA and one closing CTA per SEO page. A mid-page CTA block was
  deliberately removed from 34 pages; do not reintroduce it.
- Every CTA routes to `/apply`. No direct calendar booking anywhere, by design.

## Design tokens

Ink `#0A0A0A` · Raised `#161613` · Hairline dark `#232320` · Volt `#D8FF00` ·
Volt hover `#CCFF00` · Paper `#F7F7F5` · Hairline light `#E3E3DD` · Body on ink
`#C9C9C2` · Muted on ink `#B5B5AD` · Body on paper `#55554F`.

One typeface throughout: Inter Tight, 400–700. **Every container caps at 1240px**, on the
homepage and inner pages alike — they used to differ by 20px, which made the content jump
sideways on every nav click. `#9A9A92` is legal on ink only — it fails AA on white, so use
`#55554F` for labels on light and nothing lighter than `#6B6B63` for fine print. All
animation must be disabled under `prefers-reduced-motion: reduce`.

## Lead capture

```js
var LEAD_EMAIL    = "joshuapcck@gmail.com";  // mailto target on the quiz result screen
var LEAD_ENDPOINT = "";                      // optional webhook
```

Applications POST to `/api/lead`, which emails them via Resend. The recipient is set
server-side; `site.js` contains no address at all. A failed POST shows "Try again"
rather than opening a mail client.

The site publishes no email address anywhere: `sevenam.com.au` has no MX record, so
any address on the domain bounces. Contact routes through `/apply` only.

`LEAD_ENDPOINT` is more reliable, because the `mailto:` depends on the visitor having a
mail client configured. When set, answers POST server-side as form-encoded —
deliberately, to keep it a simple CORS request that skips the preflight most webhook
hosts reject — and fall back to the `mailto:` if the request fails.

## Outstanding

**Needs a decision**

- **Placeholder imagery.** The campaign stills and background art in `img/` are
  AI-generated stand-ins from the design bundle. Replace with real campaign creative.
  The founder portrait is real and already in place.
- **Lead webhook.** Not wired.
- **The published setup fee.** The homepage FAQ and the Sydney page both refer to a setup
  fee being published, but no figure appears anywhere on the site. Either publish it or
  adjust that wording. Both are bundle copy that the handoff said not to rewrite.
- **No Open Graph images.** No page sets `og:image`, so social shares render without a
  card image.

**Blocked**

Claude cannot push to this repository. Cloud sessions send no git credentials at all —
verified against a second repository, so it is not specific to this one — which is why
changes have been delivered as files for manual upload. Per Anthropic's documentation,
cloud session access comes from the GitHub authorization on the Claude account, not from
GitHub App repository selection; reconnecting GitHub when starting a session at
claude.ai/code is the documented fix.

## How it was built

The site began as a Claude Design handoff bundle: 16 HTML prototypes running on a
bespoke React-based runtime never meant to ship. Each page was rendered headlessly with
timers frozen, captured as static HTML, and the runtime stripped — then its behaviour was
reimplemented in dependency-free JavaScript.

Four defects in the source material were fixed rather than shipped:

| Defect | Consequence |
|---|---|
| Collapsed FAQ answers absent from the DOM | Schema claimed content the page never served; no-JS visitors saw one answer of seven |
| `/pricing` schema with no matching markup | Four FAQ entries declared, none visible on the page |
| 19.1MB of PNG imagery | Converted to 0.8MB of WebP, lazy-loaded below the fold |
| 35 internal links to pages that did not exist | Nine of them in the global footer, on every page |

The 35 missing pages were then written and generated, and the calculator was recalibrated
from a 12% default with no floor to a 20% default with a 10% floor, matching the range
Australian agencies actually charge.
