/* The depth layer.

   Injected into every page by build-pages.js as one <style id="sv-theme">
   block. It is a separate layer on purpose: the pages carry inline styles with
   no classes, so the only stable hooks are attribute-substring selectors on
   those inline styles. Keeping all of it here means the look can be tuned or
   reverted in one file rather than across 68.

   Everything is additive. Remove this block and the site renders exactly as it
   did before — flat, but correct. */

const THEME = `
/* ============================================================ atmosphere ==
   Ink sections become floating panels rather than full-bleed bands: inset from
   the page edge with a large radius, over a Volt mesh. Glass needs something
   behind it to refract, and a flat #0A0A0A gives it nothing — this is what makes
   the tiles read as glass rather than as grey rectangles.

   The hero keeps its full bleed; only the sections below float. */
main section[style*="background: rgb(10, 10, 10)"] {
  position: relative; isolation: isolate;
  border-radius: 32px;
  margin: 0 20px;
  overflow: hidden;
}
main section[style*="background: rgb(10, 10, 10)"]:first-of-type {
  border-radius: 0; margin: 0;
}
main section[style*="background: rgb(10, 10, 10)"]::before {
  content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(900px 520px at 82% -8%,  rgba(216, 255, 0, 0.15), transparent 60%),
    radial-gradient(700px 460px at 12% 104%, rgba(216, 255, 0, 0.09), transparent 62%),
    radial-gradient(600px 400px at 50% 40%,  rgba(255, 255, 255, 0.045), transparent 70%);
}

/* ============================================================ glass tiles ==
   Cards on Ink. A real front surface: a bright top edge, a visible fill, a
   saturating blur, and a wide shadow so the tile sits above the panel. */
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"] {
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.04) 55%) !important;
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
[style*="border: 1px solid rgb(35, 35, 32)"][style*="border-radius"]:hover {
  transform: translateY(-4px);
  border-color: rgba(216, 255, 0, 0.5) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 36px 70px -26px rgba(0, 0, 0, 1),
    0 0 34px -6px rgba(216, 255, 0, 0.22);
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
  main section[style*="background: rgb(10, 10, 10)"]::before { display: none; }
}
`;

module.exports = { THEME };
