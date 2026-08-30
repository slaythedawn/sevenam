/* The depth layer.

   Injected into every page by build-pages.js as one <style id="sv-theme">
   block. It is a separate layer on purpose: the pages carry inline styles with
   no classes, so the only stable hooks are attribute-substring selectors on
   those inline styles. Keeping all of it here means the look can be tuned or
   reverted in one file rather than across 68.

   Everything is additive. Remove this block and the site renders exactly as it
   did before — flat, but correct. */

const THEME = `
/* ============================================================== the nav ====
   A floating capsule rather than a bar welded to the top of the viewport. The
   header goes transparent and loses its rule; the inner row becomes a
   translucent pill that blurs whatever is behind it, so it reads over the hero
   image and over paper sections alike.

   [data-nav-bar] and [data-nav-links] are behaviour hooks for site.js and are
   only styled here, never restructured. */
header[style*="position: sticky"] {
  /* fixed, not sticky. Sticky keeps the header in flow, so a transparent one
     lets the page background show above the hero and the pill floats over a
     white strip. Fixed lifts it out, the hero fills from y=0 behind it, and the
     first section takes the height back as padding. */
  position: fixed !important;
  left: 0; right: 0;
  background: transparent !important;
  border-bottom: 0 !important;
  top: 14px !important;
  padding: 0 20px;
  pointer-events: none;
}
header[style*="position: sticky"] [data-nav-bar] {
  pointer-events: auto;
  min-height: 62px !important;
  padding: 9px 10px 9px 22px !important;
  border-radius: 999px;
  /* Near-solid. At .72 the pill went muddy grey over Paper sections and the nav
     links lost contrast — a translucent dark fill only works when what is behind
     it is reliably dark, and half these pages open on Paper. */
  background: rgba(10, 10, 10, 0.92);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 16px 40px -16px rgba(0, 0, 0, 0.8);
}

/* The hero sits under a floating nav now, so it needs the height back that the
   old sticky bar used to occupy. */
main > section:first-of-type { padding-top: 128px !important; }

/* On a phone the nav wraps to more than one line, so a fixed header of unknown
   height cannot be cleared by a fixed padding — the h1 ended up underneath it on
   several pages. Below 640px it goes back to sticky and in flow, which pushes
   content down by exactly its own height whatever that turns out to be. The
   floating capsule is a desktop flourish. */
@media (max-width: 640px) {
  header[style*="position: sticky"] {
    position: sticky !important;
    top: 0 !important; padding: 0;
    background: rgba(10, 10, 10, 0.94) !important;
    backdrop-filter: blur(18px) saturate(150%);
    -webkit-backdrop-filter: blur(18px) saturate(150%);
  }
  header[style*="position: sticky"] [data-nav-bar] {
    border-radius: 0; border: 0; background: transparent; box-shadow: none;
    min-height: 0 !important; padding: 12px 20px !important;
  }
  main > section:first-of-type { padding-top: 0 !important; }
}

/* ============================================================ atmosphere ==
   Ink sections become floating panels rather than full-bleed bands: inset from
   the page edge with a large radius, over a Volt mesh. Glass needs something
   behind it to refract, and a flat #0A0A0A gives it nothing — this is what makes
   the tiles read as glass rather than as grey rectangles.

   The hero keeps its full bleed; only the sections below float. */
main section[style*="background: rgb(10, 10, 10)"] {
  position: relative; isolation: isolate;
  border-radius: 36px;
  margin: 0 24px;
  /* clip, not hidden: overflow-clip-margin lets a card's 4px hover lift and its
     glow cross the panel edge without being sliced off, while the corners still
     clip. "hidden" cut the top off every card sitting flush to the edge. */
  overflow: clip;
  overflow-clip-margin: 16px;
}
/* A run of adjacent Ink sections is one panel, not a stack of them. Without
   this, three sections in a row each round separately and the internal seams
   read as a rendering bug. Square the inside edges; keep the outer corners. */
main > section[style*="background: rgb(10, 10, 10)"] + section[style*="background: rgb(10, 10, 10)"] {
  border-top-left-radius: 0; border-top-right-radius: 0;
}
main > section[style*="background: rgb(10, 10, 10)"]:has(+ section[style*="background: rgb(10, 10, 10)"]) {
  border-bottom-left-radius: 0; border-bottom-right-radius: 0;
}

/* The footer is full-bleed Ink and sits outside main, so a floating last section
   left a 24px notch either side of it — visible on 63 of 68 pages. The last Ink
   section merges into the footer instead: full width, with the shoulder rounded
   where it rises out of a Paper section above. Closing CTA and footer then read
   as one dark base rather than a panel dropped onto a bar. */
main > section[style*="background: rgb(10, 10, 10)"]:last-child {
  margin: 0;
  border-radius: 36px 36px 0 0;
}
/* Unless it continues a run of Ink, in which case there is no shoulder to round. */
main > section[style*="background: rgb(10, 10, 10)"] + section[style*="background: rgb(10, 10, 10)"]:last-child {
  border-radius: 0;
}

/* The hero is full bleed. Anything continuing straight out of it has to be too,
   or a full-width band flows into an inset panel and the corners look broken. */
main > section[style*="background: rgb(10, 10, 10)"]:first-of-type,
main > section[style*="background: rgb(10, 10, 10)"]:first-of-type + section[style*="background: rgb(10, 10, 10)"] {
  border-radius: 0 !important; margin: 0;
}
main section[style*="background: rgb(10, 10, 10)"]::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(880px 520px at 84% -10%, rgba(216, 255, 0, 0.22), transparent 58%),
    radial-gradient(720px 480px at 10% 106%, rgba(216, 255, 0, 0.13), transparent 60%),
    radial-gradient(1100px 700px at 50% 50%, rgba(255, 255, 255, 0.07), transparent 72%);
}

/* Grain. A flat gradient on a large dark panel bands on cheap screens and reads
   as digital; a little noise breaks the ramp and gives the surface a material.
   Generated inline so it costs no request. */
main section[style*="background: rgb(10, 10, 10)"]::after {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  opacity: 0.24; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ============================================================ glass tiles ==
   Cards on Ink. A real front surface: a bright top edge, a visible fill, a
   saturating blur, and a wide shadow so the tile sits above the panel. */
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"] {
  /* background-IMAGE, never the shorthand. The shorthand replaces the fill, and
     several cards set their own — the homepage quote is background: rgb(22,22,19)
     with #F7F7F5 text, so replacing it turned white text onto a near-white card.
     A sheen layered over whatever colour the element already has works on every
     surface. !important is still needed: the inline "background" shorthand sets
     background-image: none, which would otherwise win. */
  background-image:
    linear-gradient(160deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.025) 58%) !important;
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  border-color: rgba(255, 255, 255, 0.17) !important;
  border-radius: 16px !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    inset 0 -1px 0 rgba(0, 0, 0, 0.35),
    0 28px 60px -24px rgba(0, 0, 0, 0.95);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              box-shadow 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              border-color 0.3s ease;
}
/* Movement means clickable. A lift is a promise that something happens on click,
   and 49 of the 107 cards on this site are not links at all — hovering one and
   getting a lift is a false affordance.

   So the lift belongs to cards that ARE an <a>, where the whole surface is the
   target. Everything else gets an acknowledgement without a promise: the edge
   brightens and the sheen lifts, nothing moves, and the cursor stays an arrow. */
a[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"]:hover {
  transform: translateY(-4px);
  border-color: rgba(216, 255, 0, 0.5) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 36px 70px -26px rgba(0, 0, 0, 1),
    0 0 34px -6px rgba(216, 255, 0, 0.22);
}
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"]:not(a):hover {
  transform: none;
  border-color: rgba(255, 255, 255, 0.26) !important;
  background-image:
    linear-gradient(160deg, rgba(255, 255, 255, 0.155), rgba(255, 255, 255, 0.04) 58%) !important;
}

/* ================================================================= depth ==
   Paper cards get a larger radius and a real lift. 4-6px corners are what make
   a layout read as utilitarian; 16px is the single biggest visual change here. */
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"],
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"],
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 4px"] {
  border-radius: 16px !important;
  box-shadow:
    0 2px 4px rgba(10, 10, 10, 0.05),
    0 18px 44px -18px rgba(10, 10, 10, 0.24);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              box-shadow 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
a[style*="background: rgb(255, 255, 255)"]:hover {
  transform: translateY(-4px);
  box-shadow:
    0 2px 4px rgba(10, 10, 10, 0.06),
    0 32px 64px -20px rgba(10, 10, 10, 0.3);
}
/* Same rule on Paper: a card that is not a link does not move. */
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"]:not(a):hover,
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"]:not(a):hover {
  transform: none;
  box-shadow:
    0 2px 4px rgba(10, 10, 10, 0.06),
    0 20px 48px -18px rgba(10, 10, 10, 0.26);
}

/* Clip children to the new corner. Rounding the image itself only works when
   it is a direct child; overflow does it however the card is nested, which is
   what stops a square image corner punching through a rounded card. */
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"],
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"],
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 4px"],
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"] {
  overflow: hidden;
}

/* ============================================================== actions ===
   Pill geometry on buttons — the other half of what makes 4px corners read as
   dated. Volt CTAs bloom rather than cast grey. */
a[style*="background: rgb(216, 255, 0)"],
a[style*="border: 1px solid rgb(85, 85, 79)"],
button[style*="background: rgb(216, 255, 0)"] {
  border-radius: 999px !important;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease;
}
a[style*="background: rgb(216, 255, 0)"]:hover,
button[style*="background: rgb(216, 255, 0)"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -10px rgba(216, 255, 0, 0.55);
}
a[style*="border-radius: 100px"] { transition: box-shadow 0.35s ease, border-color 0.3s ease; }
a[style*="border-radius: 100px"]:hover { box-shadow: 0 8px 22px -8px rgba(10, 10, 10, 0.3); }

/* =============================================================== motion ===
   Reveals stagger by position so a row arrives in sequence. */
[data-reveal]:nth-child(2) { transition-delay: 80ms; }
[data-reveal]:nth-child(3) { transition-delay: 160ms; }
[data-reveal]:nth-child(4) { transition-delay: 240ms; }
[data-reveal]:nth-child(5) { transition-delay: 320ms; }
[data-reveal]:nth-child(6) { transition-delay: 400ms; }

/* Surfaces keep their depth and lose every movement. The glass is a look. */
@media (prefers-reduced-motion: reduce) {
  [style*="border: 1px solid rgb(35, 35, 32)"],
  [style*="background: rgb(255, 255, 255)"],
  a[style*="background: rgb(216, 255, 0)"],
  a[style*="border-radius: 100px"] { transition: none !important; }
  [style*="border: 1px solid rgb(35, 35, 32)"]:hover,
  a[style*="background: rgb(255, 255, 255)"]:hover,
  a[style*="background: rgb(216, 255, 0)"]:hover { transform: none !important; }
  [data-reveal] { transition-delay: 0ms !important; }
}

/* A narrow phone has no room for an inset panel. */
@media (max-width: 640px) {
  main section[style*="background: rgb(10, 10, 10)"] { margin: 0; border-radius: 0; }
}

@media print {
  [style*="border: 1px solid rgb(35, 35, 32)"] {
    backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    box-shadow: none !important;
  }
  main section[style*="background: rgb(10, 10, 10)"] { margin: 0; border-radius: 0; }
  main section[style*="background: rgb(10, 10, 10)"]::before,
  main section[style*="background: rgb(10, 10, 10)"]::after { display: none; }
}

/* ====================================================== legible muted text ==
   #55554F is the "body on paper" token. On Paper it is 7.2:1; on Ink it is
   2.64:1, which is illegible and fails AA outright — and it had leaked onto
   dark surfaces on all 68 pages, most visibly in the footer and inside the
   dark cards. The page HTML is inline styles with no classes, so the colour
   cannot be corrected per element without knowing which surface each one
   actually sits on.

   A custom property solves it the way a descendant selector cannot: it
   inherits, so the *nearest* background-setting ancestor wins. A dark card
   inside a paper section resolves dark, and a white card inside an ink section
   resolves light, with no ordering games and no :not() chains. */
:root { --sv-muted: #55554F; --sv-faint: #6B6B63; }

[style*="background: rgb(10, 10, 10)"],
[style*="background: rgb(17, 17, 16)"],
[style*="background: rgb(22, 22, 19)"],
[style*="background: rgb(35, 35, 32)"],
[style*="background:#0A0A0A"],
[style*="background:#161613"] { --sv-muted: #B5B5AD; --sv-faint: #9A9A92; }

[style*="background: rgb(255, 255, 255)"],
[style*="background: rgb(250, 250, 248)"],
[style*="background: rgb(247, 247, 245)"],
[style*="background: rgb(227, 227, 221)"],
[style*="background: rgb(216, 255, 0)"] { --sv-muted: #55554F; --sv-faint: #6B6B63; }

[style*="color: rgb(85, 85, 79)"] { color: var(--sv-muted) !important; }
[style*="color: rgb(154, 154, 146)"] { color: var(--sv-faint) !important; }
`;

module.exports = { THEME };
