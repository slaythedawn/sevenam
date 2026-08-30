/* The depth layer.

   Injected into every page by build-pages.js as one <style id="sv-theme">
   block. It is a separate layer on purpose: the pages carry inline styles with
   no classes, so the only stable hooks are attribute-substring selectors on
   those inline styles. Keeping all of it here means the look can be tuned or
   reverted in one file rather than across 68.

   Everything is additive. Remove this block and the site renders exactly as it
   did before — flat, but correct. */

const THEME = `
/* ---------------------------------------------------------- atmosphere ---
   Ink sections get a faint Volt bloom off the top-right corner, so a dark band
   reads as lit rather than as a flat fill. Painted in a pseudo-element so it
   never sits between a section and its own content. */
section[style*="background: rgb(10, 10, 10)"] { position: relative; isolation: isolate; }
section[style*="background: rgb(10, 10, 10)"]::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(1100px 460px at 88% -12%, rgba(216, 255, 0, 0.055), transparent 62%),
    radial-gradient(900px 520px at 8% 108%, rgba(216, 255, 0, 0.028), transparent 66%);
}

/* ---------------------------------------------------------- glass tiles ---
   Cards sitting on Ink. A gradient fill plus a blurred backdrop gives the tile
   a front surface and an edge, which is what actually reads as glass — the
   inset highlight along the top is doing more work than the blur. */
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"] {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)) !important;
  backdrop-filter: blur(16px) saturate(135%);
  -webkit-backdrop-filter: blur(16px) saturate(135%);
  border-color: rgba(255, 255, 255, 0.085) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.075),
    0 18px 40px -22px rgba(0, 0, 0, 0.9);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              box-shadow 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              border-color 0.3s ease;
}
a[style*="border: 1px solid rgb(35, 35, 32)"]:hover,
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"]:hover {
  transform: translateY(-3px);
  border-color: rgba(216, 255, 0, 0.32) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 26px 54px -24px rgba(0, 0, 0, 0.95),
    0 0 0 1px rgba(216, 255, 0, 0.06);
}

/* ------------------------------------------------------------- depth -----
   Cards on Paper. Two shadows rather than one: a 1px contact shadow that keeps
   the edge crisp, and a wide soft one that gives the lift. A single blurred
   shadow always reads as a sticker. */
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"],
[style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"] {
  box-shadow:
    0 1px 2px rgba(10, 10, 10, 0.045),
    0 10px 28px -14px rgba(10, 10, 10, 0.16);
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1),
              box-shadow 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
a[style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"]:hover,
a[style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"]:hover {
  transform: translateY(-3px);
  box-shadow:
    0 1px 2px rgba(10, 10, 10, 0.05),
    0 22px 48px -18px rgba(10, 10, 10, 0.22);
}

/* Pills lift on hover too, but only a shadow — a moving pill in a wrapped row
   nudges its neighbours. */
a[style*="border-radius: 100px"] {
  transition: box-shadow 0.35s ease, border-color 0.3s ease, background 0.3s ease;
}
a[style*="border-radius: 100px"]:hover {
  box-shadow: 0 6px 18px -8px rgba(10, 10, 10, 0.28);
}

/* ------------------------------------------------------------ actions ----
   The Volt CTA gets a bloom rather than a shadow. A grey shadow under a
   saturated colour goes muddy; a coloured glow keeps it clean. */
a[style*="background: rgb(216, 255, 0)"] {
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease;
}
a[style*="background: rgb(216, 255, 0)"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px -12px rgba(216, 255, 0, 0.42);
}

/* ------------------------------------------------------------- motion ----
   Reveals are staggered by position so a row of cards arrives in sequence
   rather than as one block. site.js sets the transition; this only offsets it. */
[data-reveal] { transition-delay: 0ms; }
[data-reveal]:nth-child(2) { transition-delay: 70ms; }
[data-reveal]:nth-child(3) { transition-delay: 140ms; }
[data-reveal]:nth-child(4) { transition-delay: 210ms; }
[data-reveal]:nth-child(5) { transition-delay: 280ms; }
[data-reveal]:nth-child(6) { transition-delay: 350ms; }

/* Everything above is decoration. Under reduced motion the surfaces keep their
   depth and lose every movement — the glass is a look, not an animation. */
@media (prefers-reduced-motion: reduce) {
  [style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"],
  [style*="background: rgb(255, 255, 255)"][style*="border-radius: 6px"],
  [style*="background: rgb(255, 255, 255)"][style*="border-radius: 8px"],
  a[style*="background: rgb(216, 255, 0)"],
  a[style*="border-radius: 100px"] { transition: none !important; }
  [style*="border: 1px solid rgb(35, 35, 32)"]:hover,
  a[style*="background: rgb(255, 255, 255)"]:hover,
  a[style*="background: rgb(216, 255, 0)"]:hover { transform: none !important; }
  [data-reveal] { transition-delay: 0ms !important; }
}

/* backdrop-filter is the one expensive property here, and a printed page has no
   backdrop to filter. */
@media print {
  [style*="border: 1px solid rgb(35, 35, 32)"] {
    backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
    box-shadow: none !important;
  }
  section[style*="background: rgb(10, 10, 10)"]::before { display: none; }
}
`;

module.exports = { THEME };
