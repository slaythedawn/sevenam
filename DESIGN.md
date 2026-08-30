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

Elevation is carried entirely by `tools/theme.js`, injected into every page as
one `<style id="sv-theme">` block. The pages have no classes, so it hooks on
attribute-substring selectors against their inline styles — which is also why it
lives in one file rather than across 68. It is additive: delete the block and the
site renders flat and correct.

**The nav is a floating capsule.** On desktop the header is `fixed` and
transparent, and the inner row becomes a near-solid dark pill that blurs what is
behind it, so it reads over the hero image and over Paper sections alike. It is
`fixed` rather than `sticky` because a transparent sticky header stays in flow
and lets the page background show above the hero — the pill then floats over a
white strip. The fill is `rgba(10,10,10,.92)`, near-solid: at `.72` it went muddy
grey over Paper and the links lost contrast.

Below 640px it reverts to an in-flow sticky bar. The nav wraps to more than one
line on a phone, so a fixed header of unknown height cannot be cleared by a fixed
padding, and the `h1` ended up underneath it.

**Ink sections float.** Below the hero, every dark band is inset 24px from the
page edge with a 36px radius, over a Volt mesh painted in a `::before`, plus a
fine grain in an `::after` — a flat gradient across a large dark panel bands on
cheap screens and reads as digital; noise breaks the ramp and gives it material.

**A run of adjacent Ink sections is one panel.** Three sections in a row each
rounding separately makes the internal seams look like a rendering bug, so the
inside edges square and only the outer corners round. The hero is full bleed, and
anything continuing straight out of it stays full bleed too — a full-width band
flowing into an inset panel is the same defect in reverse. The mesh
matters more than it looks: glass needs something behind it to refract, and a
flat `#0A0A0A` gives it nothing. Full bleed returns below 640px, where there is
no room for an inset panel.

**Corners carry the era.** Cards are 16px, buttons are full pills. 4–6px corners
are the single strongest signal that a layout is utilitarian, and moving them was
a bigger visual change than any amount of shadow. Cards also take
`overflow: hidden` so images clip to the corner rather than punching through it.

**Glass, on Ink.** Cards on a dark ground take a gradient fill, a blurred
backdrop and a 1px inset highlight along the top edge. The highlight does more
work than the blur — it is what gives the tile a front surface.

```
background: linear-gradient(160deg, rgba(255,255,255,.13), rgba(255,255,255,.04) 55%);
backdrop-filter: blur(22px) saturate(150%);
border: 1px solid rgba(255,255,255,.17);
box-shadow: inset 0 1px 0 rgba(255,255,255,.24),
            inset 0 -1px 0 rgba(0,0,0,.35),
            0 28px 60px -24px rgba(0,0,0,.95);
```

These alphas are deliberately high. A first pass at .055 over near-black was
invisible on a real screen — on a dark ground, restraint reads as nothing at
all.

**Depth, on Paper.** Two shadows, never one: a 1px contact shadow to keep the
edge crisp, and a wide soft one for the lift. A single blurred shadow reads as a
sticker.

```
box-shadow: 0 2px 4px rgba(10,10,10,.05), 0 18px 44px -18px rgba(10,10,10,.24);
```

**Atmosphere.** Ink sections carry a faint Volt bloom off the top-right in a
`::before`, so a dark band reads as lit rather than as fill.

**Movement means clickable.** A lift is a promise that a click does something, so
it belongs only to cards that are themselves an `<a>` — where the whole surface is
the target. Of 107 cards on this site, 49 are not links at all; those get an
acknowledgement without a promise, brightening their edge and sheen with no
movement and no pointer cursor. If a static card ought to lead somewhere, the fix
is to make it a link, not to give it a lift.

**Hover.** Link cards lift 4px and their border warms toward Volt. The Volt CTA takes
a coloured bloom rather than a grey shadow, which would go muddy under a
saturated fill. Pills take a shadow only — a moving pill nudges its neighbours in
a wrapped row.

**Under `prefers-reduced-motion: reduce` the surfaces keep their depth and lose
every transform and transition.** The glass is a look, not an animation.

Outside that block: separation comes from the Ink/Paper alternation and from
hairline borders, never from ad-hoc height. This is the fastest way to tell a Sevenam
section from a generic SaaS section — if you are reaching for a shadow, you want
a hairline or a tone change instead.

Inline `box-shadow` in page markup is still a bug — elevation belongs in the
theme layer, so it stays consistent. The one exception is a **zero-blur spread**,
which is a ring rather than a shadow: `0 0 0 3px rgba(216, 255, 0, 0.22)` draws
the Volt halo on the 7px status dot, and it is the only way to paint an outline
that does not affect layout.

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

- Don't hand-roll elevation in a page's inline styles. Depth comes from `tools/theme.js` so every surface lifts the same amount; a one-off shadow is what makes the rest look unfinished.
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
