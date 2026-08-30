# Sevenam — Design System

> Instrument panel at first light.

**Theme:** dark-led. Ink sections carry the argument, paper sections carry the
detail, and the two alternate down the page. One accent, used only where a
decision is being asked for.

This file is the reference for anything designed for Sevenam — a page, a
section, an email, a social card. It describes the system that already exists,
measured from the 68 pages in this repository, so it can be applied
consistently rather than reinvented. `tools/check-design.js` runs inside `check.js` and **fails the build** on
anything off the scale — sizes, ramps, tracking, radii, palette and elevation.

The single rule behind everything below: **type tightens as it grows.** Tracking
goes more negative and leading compresses as size increases. That is what makes
a headline read as one object rather than a row of words, and it is the whole
reason the site looks designed rather than assembled.

---

## Tokens — Colour

Twelve values. Nothing else is legal, and `check-design.js` fails the build on a
thirteenth.

| Name | Value | Role |
|---|---|---|
| Ink | `#0A0A0A` | Dark section ground, primary text on paper |
| Ink raised | `#161613` | Input fills, a surface lifted off Ink |
| Hairline dark | `#232320` | Borders and dividers on Ink |
| Volt | `#D8FF00` | Primary action, eyebrows, the live value in a calculator |
| Volt hover | `#CCFF00` | Hover state for Volt fills only |
| Paper | `#F7F7F5` | Light section ground |
| Hairline light | `#E3E3DD` | Borders and dividers on Paper |
| Body on ink | `#C9C9C2` | Body copy on Ink |
| Muted on ink | `#B5B5AD` | Secondary copy on Ink |
| Ink soft | `#373732` | Strong text and heavy borders on Paper |
| Body on paper | `#55554F` | Body copy on Paper |
| Muted on paper | `#6B6B63` | Secondary copy on Paper |
| Faint on paper | `#8A8A82` | Large text and inactive borders on Paper |

**The contrast ladder.** Measured against Paper `#F7F7F5`. Pick by the ratio the
text needs, not by how the swatch looks in isolation.

| Grey | On Paper | On Ink | Legal for |
|---|---|---|---|
| `#373732` | **11.16:1** | 1.65:1 | Anything on Paper |
| `#55554F` | **7.00:1** | 2.64:1 | Body on Paper |
| `#6B6B63` | **5.01:1** | 3.68:1 | Body on Paper, just clears AA |
| `#8A8A82` | 3.24:1 | **5.69:1** | Large text only on Paper. Body on Ink |
| `#9A9A92` | 2.64:1 | **6.99:1** | Ink only. Never on Paper |

Large text means 24px, or 19px at weight 600 and above. Below `#8A8A82` on
Paper is a bug, and `#9A9A92` on Paper is the one that keeps recurring.

**Volt is rationed.** It marks the action, the eyebrow, and the one number a
calculator is currently computing. It is never a background wash, never body
text, and never decorative. If a page has more than one Volt fill above the
fold, one of them is wrong.

---

## Tokens — Typography

**Inter Tight.** One family, weights 400/500/600. No second typeface, no mono.

### The scale

Each step pairs a size with its leading and tracking. They are not independent —
picking a size means taking its pair.

| Role | Size | Leading | Tracking | Where |
|---|---|---|---|---|
| Micro | 11–12px | 1.5 | `0.14em` upper | Eyebrows, table headers, legal |
| Label | 12px | 1.5 | `0.08em` upper | Section labels, form labels |
| Small | 13–14px | 1.6 | `0` | Footnotes, source lines, nav |
| UI | 15px | 1.5 | `0` | Buttons, inputs, nav links, cards |
| Body | 17px | **1.7** | `0` | All running prose |
| Lead | 19–21px | 1.6 | `-0.01em` | Section intros, hero support |
| Card heading | 20px | 1.4 | `-0.02em` | Card and row titles |
| Heading | 23px | 1.3 | `-0.02em` | Sub-section headings |
| Section | `clamp(30px, 3.6vw, 50px)` | 1.08 | `-0.03em` | The default `h2` |
| Closing | `clamp(38px, 5.4vw, 74px)` | 1.05 | `-0.035em` | Closing CTA `h2` |
| Display | `clamp(40px, 6vw, 84px)` | 1.04 | `-0.035em` | Hero `h1` only |

### Fixed sizes

`11 · 12 · 13 · 14 · 15 · 16 · 17 · 19 · 20 · 21 · 23 · 26 · 30 · 34 · 40`

Fifteen steps. 18, 22, 24, 27 and 32 were collapsed onto their neighbours — each
had under 40 uses against thousands, and a 1–2px step is drift, not a decision.

### Display ramps

Eight, down from thirty. Pick by role; do not invent a ninth.

| Ramp | Value | Role |
|---|---|---|
| display-xl | `clamp(40px, 6vw, 84px)` | Hero `h1` |
| display | `clamp(38px, 5.4vw, 74px)` | Closing CTA `h2` |
| section-xl | `clamp(34px, 4.6vw, 64px)` | Oversized section |
| section-lg | `clamp(32px, 4vw, 56px)` | Large section |
| section | `clamp(30px, 3.6vw, 50px)` | **Default `h2`** |
| section-sm | `clamp(26px, 3vw, 40px)` | Table and sub-section `h2` |
| section-xs | `clamp(24px, 2.6vw, 34px)` | Small section |
| lead | `clamp(18px, 2vw, 24px)` | Oversized lead paragraph |

**Weight discipline.** 600 for headings and buttons, 500 for lead and labels, 400
for body. Never 700 — Inter Tight at 600 is already dense, and 700 at display
size reads as shouting.

**Measure.** Prose caps at `62ch`. Lists and table notes cap at `78ch`. A
paragraph running the full 1240px column is the most common readability failure
on a wide screen.

---

## Tokens — Spacing and shape

**Base unit: 8px.** Everything is a multiple, with 4px permitted for micro-gaps.

### Section rhythm

| Step | Use |
|---|---|
| `72px 32px` | Compact band, related links |
| `88px 32px` | Pills, secondary strip |
| `96px 32px` | Table section, tool strip |
| `112px 32px` | **The default.** Standard prose section |
| `130px 32px` | Closing CTA only |

Horizontal padding is always `32px`. Max content width is always `1240px`.

### Radius

| Value | Use |
|---|---|
| `2px` | Micro-elements 4px tall or less — progress bar fills |
| `3px` | Small inline chips |
| `4px` | **The default.** Buttons, inputs, cards, images |
| `6px` | Larger panels and gallery tiles |
| `8px` | Calculator blocks and the largest surfaces |
| `100px` | Pills only — related-link chips, trust badges |

Small radii are correct on small objects. A 3px-tall bar with a 4px radius
renders as a lozenge. Match the radius to the height.

### Elevation

**There is none.** Separation comes from the Ink/Paper alternation and from
hairline borders, never from height. This is the fastest way to tell a Sevenam
section from a generic SaaS section — if you are reaching for a shadow, you want
a hairline or a tone change instead.

The one permitted `box-shadow` is a **zero-blur spread**, which is a ring rather
than a shadow: `0 0 0 3px rgba(216, 255, 0, 0.22)` draws the Volt halo on the
7px status dot, and it is the only way to paint an outline that does not affect
layout. Any non-zero blur is elevation and is a bug.

---

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#F7F7F5` | Default page ground |
| 1 | Ink | `#0A0A0A` | Argument sections, hero, closing |
| 2 | Ink raised | `#161613` | Inputs and fills sitting on Ink |

Sections alternate Paper and Ink down the page. Two Ink sections never touch —
if the builder produces that, insert a Paper section or merge them.

---

## Components

**Hero.** Ink. Eyebrow in Volt at 14px `0.08em` upper, `h1` at Display, lead at
21px, support at 17px, then exactly one Volt CTA and one bordered secondary.
Trust line last at 14px muted. `padding: 110px 32px 120px`.

**Prose section.** `h2` at Section scale capped `24ch`, paragraphs at Body capped
`62ch`, then an optional hairline list where each row is `20px 0` with a top
border and the last row also takes a bottom border.

**Data table.** Header row at Micro upper. First column left, all others right
with `tabular-nums` and `white-space: nowrap`. Rows separated by a top hairline,
never by fill. Always inside `overflow-x: auto` with `min-width: 640px` on the
table, so a wide table scrolls in its own box and the page never scrolls
sideways. Source note under it at 14px.

**Closing CTA.** Ink, `130px 32px`, `h2` at Closing scale capped `18ch`, one Volt
button plus one Volt text link with a `#55554F` underline.

**Form field.** `#161613` fill, `#232320` border, `4px` radius, `15px 16px`
padding, 17px text. Error text in Volt, never red — the palette has no red, and
introducing one to signal an error is how a second accent gets in.

---

## Do

- Pair every size with its leading and tracking from the scale. They travel together.
- Alternate Ink and Paper down the page.
- Use hairlines and tone changes for separation.
- Cap prose at `62ch` regardless of container width.
- Keep Volt for the action, the eyebrow, and the live number.
- Put every wide table in its own horizontal scroll box.
- Disable all animation under `prefers-reduced-motion: reduce`.

## Don't

- Don't add a blurred shadow. The system has no elevation, and one lifted surface makes every flat one beside it look unfinished. Zero-blur spread rings are not shadows and are fine.
- Don't invent a ninth display ramp. Eight cover 30px to 84px.
- Don't use weight 700.
- Don't put `#9A9A92` or `#8A8A82` on Paper as body text — 2.64:1 and 3.24:1 both fail AA. Use `#6B6B63` or darker.
- Don't use Volt as a background wash or for body text.
- Don't introduce a second accent, including a red for errors.
- Don't let a paragraph run the full 1240px column.
- Don't add a mid-page CTA. One hero CTA, one closing CTA.
- Don't style with `data-` attributes — they are behaviour hooks and removing one detaches a feature silently.

---

## Adding anything new

1. Pick the closest existing component above and copy its values.
2. If a size is not on the scale, use the nearest one that is.
3. Run `node tools/build-pages.js && node tools/check.js` before committing.
4. It fails on off-scale values. That is the point — it is cheaper to argue with
   the check than to find the twenty-first font size two years from now.

The scale is deliberately short. If something genuinely needs a value that is
not here, add it to this file in the same commit — an undocumented value is how
20 font sizes happened in the first place.
