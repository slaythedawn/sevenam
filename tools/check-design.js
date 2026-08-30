/* Design-system drift check, run from check.js.

   The site reached 20 distinct font sizes, 10 clamp ramps and 8 section
   paddings before anyone wrote the scale down. None of it was a decision; each
   value was a page being built in isolation. DESIGN.md is now the scale, and
   this fails the build on anything off it.

   The lists below must match the tables in DESIGN.md. Adding a value here
   without adding it there is how the drift starts again — change both, in the
   same commit. */

/* 15 steps. 18, 22, 24, 27 and 32 were collapsed onto their neighbours — each
   had under 40 uses against thousands, and a 1-2px step is drift, not a
   decision. */
const SIZES = [11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23, 26, 30, 34, 40];

const CLAMPS = [
  'clamp(40px, 6vw, 84px)',     // display-xl — hero h1
  'clamp(38px, 5.4vw, 74px)',   // display    — closing h2
  'clamp(34px, 4.6vw, 64px)',   // section-xl
  'clamp(32px, 4vw, 56px)',     // section-lg
  'clamp(30px, 3.6vw, 50px)',   // section    — the default h2
  'clamp(26px, 3vw, 40px)',     // section-sm — table h2
  'clamp(24px, 2.6vw, 34px)',   // section-xs
  'clamp(18px, 2vw, 24px)',     // lead
];

const TRACKING = ['0', '0.04em', '0.06em', '0.08em', '0.1em', '0.12em', '0.14em',
  '-0.01em', '-0.015em', '-0.02em', '-0.025em', '-0.03em', '-0.035em'];

const RADII = [2, 3, 4, 6, 8, 100];

/* Colour is the one thing that must never drift: the palette is nine values and
   a tenth is a brand bug, not a style choice. Stored as rgb() because that is
   what the browser serialises the design bundle to. */
const COLOURS = new Set([
  'rgb(10, 10, 10)', 'rgb(22, 22, 19)', 'rgb(35, 35, 32)',
  'rgb(216, 255, 0)', 'rgb(204, 255, 0)',
  'rgb(247, 247, 245)', 'rgb(227, 227, 221)',
  'rgb(201, 201, 194)', 'rgb(181, 181, 173)', 'rgb(85, 85, 79)',
  'rgb(154, 154, 146)', 'rgb(255, 255, 255)', 'rgb(0, 0, 0)',
  /* Promoted from strays to real tokens, each placed by measured contrast on
     Paper: Ink soft 11.16:1, Muted on paper 5.01:1, Faint on paper 3.24:1
     (large text only). See the contrast ladder in DESIGN.md. */
  'rgb(55, 55, 50)', 'rgb(107, 107, 99)', 'rgb(138, 138, 130)',
]);

function checkDesign(file, html, fail) {
  for (const [, px] of html.matchAll(/font-size: (\d+)px/g)) {
    if (!SIZES.includes(Number(px))) {
      fail(file, `off-scale font-size ${px}px — see DESIGN.md`);
    }
  }
  for (const [, c] of html.matchAll(/font-size: (clamp\([^)]*\))/g)) {
    if (!CLAMPS.includes(c)) fail(file, `off-scale ${c} — off the display ramp set in DESIGN.md`);
  }
  for (const [, t] of html.matchAll(/letter-spacing: (-?[\d.]+em)/g)) {
    if (!TRACKING.includes(t)) fail(file, `off-scale letter-spacing ${t} — see DESIGN.md`);
  }
  for (const [, px] of html.matchAll(/border-radius: (\d+)px/g)) {
    if (!RADII.includes(Number(px))) fail(file, `off-scale border-radius ${px}px — see DESIGN.md`);
  }
  /* No elevation. Blur is what makes a shadow read as height, and one lifted
     surface makes every flat one beside it look unfinished.

     A zero-blur spread is a ring, not a shadow — it is how the Volt halo on the
     7px status dot is drawn, and there is no other way to paint an outline that
     does not affect layout. Allowed; blurred shadows are not. */
  for (const [, shadow] of html.matchAll(/box-shadow: ([^;"]*)/g)) {
    if (/^\s*none\s*$/.test(shadow)) continue;
    const lengths = shadow.match(/-?[\d.]+px/g) || [];
    const blur = lengths.length >= 3 ? parseFloat(lengths[2]) : 0;
    if (blur > 0) {
      fail(file, `box-shadow with ${blur}px blur — the system has no elevation (DESIGN.md)`);
    }
  }
  for (const [, c] of html.matchAll(/(?:^|[^-])color: (rgb\([^)]*\))/g)) {
    if (!COLOURS.has(c)) fail(file, `off-palette colour ${c} — not in the DESIGN.md palette`);
  }
}

module.exports = { checkDesign };
