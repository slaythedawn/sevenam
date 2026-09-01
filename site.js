/* Sevenam — site behaviour.
   Ported from the Claude Design prototypes (dc-runtime) to dependency-free JS.
   Every page ships its content in the HTML; this file only adds behaviour. */
(function () {
  "use strict";

  /* ------------------------------------------------------------ lead capture
     LEAD_ENDPOINT where a finished application is POSTed. /api/lead is a
                  function in this repo that emails it on; see that file for the
                  environment variables it needs. Posted form-encoded on purpose:
                  that keeps it a "simple" CORS request, so the browser skips the
                  preflight most webhook hosts reject.

     No address appears anywhere in this file. The function knows where the lead
     goes; the browser has no reason to, and anything written here would be
     readable by everyone who opens the page source. */
  var LEAD_ENDPOINT = "/api/lead";

  var VOLT = "#D8FF00";
  var EASE = "cubic-bezier(0.2,0.7,0.2,1)";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* --------------------------------------------------------------- nav */

  /* On a phone the links were a horizontally scrolling row sharing a line with
     the button — legible, but a scroll strip is a poor way to show seven
     destinations, and the last one was always half off the edge. This collapses
     them behind a hamburger on the left.

     The button is built here, not in the HTML, and the panel styling is scoped
     to [data-nav-ready] which only this function sets. So with JS off nothing
     changes: no dead button, and the links stay the scrolling row they are
     today rather than vanishing behind a control that cannot open. */
  function setupNav() {
    var bar = q("[data-nav-bar]");
    var links = q("[data-nav-links]");
    if (!bar || !links) return;

    if (!links.id) links.id = "nav-links";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-nav-toggle", "");
    btn.setAttribute("aria-controls", links.id);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    btn.style.cssText = "order:-1; margin-right:2px; width:40px; height:40px; padding:0;" +
      "background:none; border:0; border-radius:6px; cursor:pointer; color:inherit;" +
      "align-items:center; justify-content:center; flex-shrink:0;";
    /* Three bars that become a cross. aria-hidden because the button already
       carries a label — a screen reader should not read three empty spans. */
    btn.innerHTML =
      '<span aria-hidden="true" style="position:relative; display:block; width:20px; height:14px;">' +
      ["top:0", "top:6px", "top:12px"].map(function (pos, i) {
        return '<span data-bar="' + i + '" style="position:absolute; left:0; ' + pos +
          '; width:20px; height:2px; background:currentColor; border-radius:2px;' +
          'transition:transform 0.22s ' + EASE + ', opacity 0.18s linear;"></span>';
      }).join("") + "</span>";

    bar.insertBefore(btn, bar.firstChild);
    bar.setAttribute("data-nav-ready", "");

    var bars = qa("[data-bar]", btn);
    function paint(open) {
      if (open) bar.setAttribute("data-nav-open", "");
      else bar.removeAttribute("data-nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (reduced) return;
      bars[0].style.transform = open ? "translateY(6px) rotate(45deg)" : "";
      bars[1].style.opacity = open ? "0" : "1";
      bars[2].style.transform = open ? "translateY(-6px) rotate(-45deg)" : "";
    }

    function close() { paint(false); }

    btn.addEventListener("click", function () {
      paint(!bar.hasAttribute("data-nav-open"));
    });

    /* Three ways out, because a menu you can only close with the same small
       button is a trap on a phone. */
    qa("a", links).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.addEventListener("click", function (e) {
      if (!bar.hasAttribute("data-nav-open")) return;
      if (!bar.contains(e.target)) close();
    });
    /* Crossing the breakpoint with the panel open would leave the desktop nav in
       a state it has no styling for. */
    var WIDE = window.matchMedia("(min-width: 940px)");
    if (WIDE.addEventListener) WIDE.addEventListener("change", close);

    paint(false);
  }

  /* ---------------------------------------------------------------- reveals */
  /* Elements ship visible. We hide only what is below the fold, then animate it
     in. The reveal list is re-queried on every sweep and a safety sweep runs on
     scroll, resize and first frame, so nothing can be left permanently hidden. */
  function setupReveals() {
    if (reduced || !("IntersectionObserver" in window)) return;
    var io, groups = new Map();

    function all() { return qa("[data-reveal]"); }

    function arm() {
      var vh = window.innerHeight;
      all().forEach(function (el) {
        if (el.dataset.armed) return;
        el.dataset.armed = "1";
        if (el.getBoundingClientRect().top < vh * 0.9) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(22px)";
        el.dataset.pending = "1";
        io.observe(el);
      });
    }

    function show(el, stagger) {
      if (!el.dataset.pending) return;
      delete el.dataset.pending;
      io.unobserve(el);
      var parent = el.parentElement;
      var n = groups.get(parent) || 0;
      groups.set(parent, n + 1);
      var delay = stagger ? Math.min(n * 70, 420) : 0;
      function paint() {
        el.style.transition = "opacity 0.7s " + EASE + ", transform 0.7s " + EASE;
        el.style.opacity = "1";
        el.style.transform = "none";
      }
      if (delay) later(paint, delay); else paint();
    }

    function sweep() {
      arm();
      all().forEach(function (el) {
        if (!el.dataset.pending) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show(el, false);
      });
    }

    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) show(e.target, true); });
      sweep();
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    arm();
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    requestAnimationFrame(sweep);
  }

  /* ------------------------------------------------------- parallax + drift */
  function setupParallax() {
    var bg = q("[data-parallax]");
    if (!bg || reduced) return;
    var section = bg.parentElement;
    var raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = section.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        bg.style.setProperty("translate", "0 " + ((p - 0.5) * -70).toFixed(1) + "px");
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupDrift() {
    var drifts = qa("[data-ad-drift]");
    if (!drifts.length || reduced) return;
    var raf = null;
    function onDrift() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        drifts.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
          var p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          var speed = parseFloat(el.dataset.speed) || 0.1;
          el.style.transform = "translate3d(0," + ((p - 0.5) * -120 * speed).toFixed(1) + "px,0)";
        });
      });
    }
    window.addEventListener("scroll", onDrift, { passive: true });
    window.addEventListener("resize", onDrift, { passive: true });
    onDrift();
  }

  /* ------------------------------------------------- header 07:00 announcement */
  /* Real local time: the band shows for the five minutes after 7am. ?seven forces it. */
  function setupNavBand() {
    var header = q("header");
    if (!header || q("[data-seven-band]")) return;
    var demo = false;
    try { demo = new URLSearchParams(location.search).has("seven"); } catch (e) {}
    function check() {
      var t = new Date();
      var secs = t.getHours() * 3600 + t.getMinutes() * 60 + t.getSeconds();
      var on = demo || (secs >= 25200 && secs < 25500);
      var band = q("[data-seven-band]");
      if (on && !band) {
        band = document.createElement("div");
        band.setAttribute("data-seven-band", "");
        band.style.cssText = "background:" + VOLT + "; color:#0A0A0A; padding:9px 32px; text-align:center;" +
          "font-size:13px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase;" +
          (reduced ? "" : "animation:chipIn 0.5s " + EASE + " both;");
        band.textContent = "07:00 — today's decisions are ready";
        header.appendChild(band);
      } else if (!on && band) {
        band.remove();
      }
    }
    check();
    setInterval(check, 30000);
  }

  /* ------------------------------------------------------ the 7am hero moment */
  /* The sequence loops. Every element it mutates is snapshotted before the first
     run and restored between cycles, so a repeat starts from exactly the state
     the HTML shipped in rather than from wherever the last cycle left off. It
     only advances while the hero is on screen and the tab is visible. */
  function setupHero() {
    var clock = q("[data-clock]");
    if (!clock) return;
    var label = q("[data-clock-label]");
    var approved = false;

    var hTimers = [];
    function hLater(fn, ms) { hTimers.push(setTimeout(fn, ms)); }
    function clearHero() { hTimers.forEach(clearTimeout); hTimers = []; }

    /* Snapshot inline style for everything the sequence touches, and text only
       for the leaves whose text it rewrites. Restoring textContent on a element
       that has children would destroy them — the card and the rows are
       containers, so they get their style back and nothing else. */
    var snap = [];
    function collect() {
      function add(el, withText) {
        if (el) snap.push({ el: el, text: withText ? el.textContent : null, style: el.getAttribute("style") });
      }
      add(clock, true);
      add(label, true);
      add(q("[data-approve]"), true);
      add(q("[data-badge]"), true);
      add(q("[data-foot]"), true);
      add(q("[data-approve-card]"), false);
      qa("[data-act]").forEach(function (row) {
        add(row, false);
        add(q("[data-tick]", row), true);
        add(q("[data-state]", row), true);
      });
    }
    function restore() {
      snap.forEach(function (s) {
        if (s.text !== null) s.el.textContent = s.text;
        if (s.style === null) s.el.removeAttribute("style");
        else s.el.setAttribute("style", s.style);
      });
      approved = false;
    }

    function settle(instant) {
      clock.style.color = VOLT;
      if (label) { label.textContent = "Today's decisions are ready"; label.style.color = VOLT; }
      var btn = q("[data-approve]");
      if (btn) { btn.style.background = VOLT; btn.style.color = "#0A0A0A"; btn.style.cursor = "pointer"; }
      if (instant) {
        var badge = q("[data-badge]");
        if (badge) { badge.textContent = "3 to approve"; badge.style.color = VOLT; }
      }
    }

    function approveAll() {
      if (approved) return;
      approved = true;
      var btn = q("[data-approve]"), badge = q("[data-badge]"), foot = q("[data-foot]");
      if (btn) {
        btn.style.animation = "none";
        btn.textContent = "Approved";
        btn.style.background = "#161613";
        btn.style.color = VOLT;
        btn.style.cursor = "default";
      }
      qa("[data-act]").forEach(function (row, i) {
        hLater(function () {
          var tick = q("[data-tick]", row), state = q("[data-state]", row);
          if (tick) {
            tick.style.transition = "background 0.3s ease, border-color 0.3s ease, transform 0.3s " + EASE;
            tick.style.background = VOLT;
            tick.style.borderColor = VOLT;
            tick.textContent = "✓";
            tick.style.transform = "scale(1.12)";
            hLater(function () { tick.style.transform = "scale(1)"; }, 220);
          }
          if (state) { state.textContent = "Actioned"; state.style.color = "#8A8A82"; }
        }, 220 + i * 320);
      });
      hLater(function () {
        if (badge) { badge.textContent = "Done · 07:04"; badge.style.color = "#8A8A82"; }
        if (foot) {
          foot.textContent = "All three changes are live in your account. Nothing else to do today.";
          foot.style.color = "#B5B5AD";
        }
      }, 1300);
    }

    function fireSeven() {
      var flash = q("[data-flash]"), ring = q("[data-ring]"),
          card = q("[data-approve-card]"), badge = q("[data-badge]");
      if (flash) {
        flash.style.transition = "opacity 0.22s ease-out";
        flash.style.opacity = "1";
        hLater(function () {
          flash.style.transition = "opacity 1.1s cubic-bezier(0.3,0,0.5,1)";
          flash.style.opacity = "0";
        }, 240);
      }
      if (ring) { ring.style.animation = "none"; void ring.offsetWidth; ring.style.animation = "ringOut 1.2s " + EASE + " forwards"; }
      clock.style.transition = "color 0.3s ease, text-shadow 0.6s ease, transform 0.5s " + EASE;
      clock.style.color = VOLT;
      clock.style.textShadow = "0 0 46px rgba(216,255,0,0.45)";
      clock.style.transform = "scale(1.04)";
      hLater(function () {
        clock.style.transform = "scale(1)";
        clock.style.textShadow = "0 0 22px rgba(216,255,0,0.18)";
      }, 520);
      settle(false);
      if (badge) hLater(function () { badge.textContent = "3 to approve"; badge.style.color = VOLT; }, 420);
      if (card) {
        card.style.transition = "border-color 0.5s ease, box-shadow 0.6s ease";
        card.style.borderColor = "#3A3A32";
        hLater(function () { card.style.borderColor = "#232320"; }, 1400);
      }
      qa("[data-act]").forEach(function (row, i) {
        row.style.opacity = "0.35";
        row.style.transform = "translateY(10px)";
        hLater(function () {
          row.style.transition = "opacity 0.55s " + EASE + ", transform 0.55s " + EASE;
          row.style.opacity = "1";
          row.style.transform = "none";
          var state = q("[data-state]", row);
          if (state) state.style.color = VOLT;
        }, 260 + i * 150);
      });
      var btn = q("[data-approve]");
      if (btn) {
        hLater(function () { btn.style.animation = "voltPulse 2.4s ease-in-out infinite"; }, 900);
        btn.addEventListener("click", approveAll);
        hLater(function () { if (!approved) approveAll(); }, 4200);
      }
    }

    function setClock(v) { clock.textContent = v; }

    if (reduced) { setClock("07:00"); settle(true); return; }

    collect();

    var HOLD = 5200;          /* pause on the finished state before restarting */
    var CYCLE = 900 * 3 + 4200 + 1300;   /* ticks, then auto-approve, then the footer line */
    var visible = false, looping = false;

    function run() {
      clearHero();
      restore();
      ["06:58", "06:59", "07:00"].forEach(function (v, i) {
        hLater(function () { setClock(v); }, 900 + i * 900);
      });
      hLater(fireSeven, 900 + 2 * 900);
      hLater(next, CYCLE + HOLD);
    }

    /* Only advance while the hero is on screen and the tab is in front; a
       backgrounded tab throttles timers and would desynchronise the sequence. */
    function next() {
      if (!visible || document.hidden) { hLater(next, 1200); return; }
      run();
    }

    function start() {
      if (looping) return;
      looping = true;
      run();
    }

    if ("IntersectionObserver" in window) {
      var hio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible) start();
        });
      }, { threshold: 0.25 });
      hio.observe(clock);
    } else {
      visible = true;
      start();
    }
  }

  /* ------------------------------------------------------------ FAQ accordion */
  function setupFaq() {
    var items = qa("[data-faq-item]");
    if (!items.length) return;
    /* Scoped by parent so several accordions can share these hooks without
       fighting: opening a pricing product must not close an FAQ row further
       down the page. Items in one list still close each other. */
    function siblings(item) {
      return items.filter(function (o) { return o.parentElement === item.parentElement; });
    }
    items.forEach(function (item, i) {
      var btn = q("[data-faq-toggle]", item);
      var sign = q("[data-faq-sign]", item);
      var answer = q("[data-faq-answer]", item);
      if (!btn || !answer) return;
      var open = siblings(item)[0] === item;
      var id = "faq-a-" + i;
      answer.id = id;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-controls", id);
      function paint() {
        answer.style.display = open ? "" : "none";
        if (sign) sign.textContent = open ? "−" : "+";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      paint();
      btn.addEventListener("click", function () {
        if (!open) {
          siblings(item).forEach(function (other) {
            if (other === item) return;
            var oa = q("[data-faq-answer]", other), os = q("[data-faq-sign]", other),
                ob = q("[data-faq-toggle]", other);
            if (oa) oa.style.display = "none";
            if (os) os.textContent = "+";
            if (ob) ob.setAttribute("aria-expanded", "false");
          });
        }
        open = !open;
        paint();
      });
    });
  }

  /* --------------------------------------------------------- fee calculator */
  function setupCalculator() {
    var spendEl = q("#spend");
    if (!spendEl) return;
    var pctBlock = q("#pct-block"), flatBlock = q("#flat-block");
    var pctEl = q("#pct"), flatEl = q("#flat");
    var state = { spend: 30000, pct: 20, flat: 4500, mode: "pct" };

    function fmt(n) { return "$" + Math.round(n).toLocaleString("en-AU"); }
    function out(name) { return q('[data-out="' + name + '"]'); }
    function set(name, v) { var el = out(name); if (el) el.textContent = v; }

    function tabStyle(btn, active) {
      btn.style.background = active ? VOLT : "transparent";
      btn.style.color = active ? "#0A0A0A" : "#B5B5AD";
      btn.style.border = "1px solid " + (active ? VOLT : "#6B6B63");
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    }

    function render() {
      var spend = Number(state.spend) || 0;
      var pct = Number(state.pct) || 0;
      var isPct = state.mode === "pct";
      var monthly = isPct ? spend * pct / 100 : (Number(state.flat) || 0);
      var annual = monthly * 12;
      var impliedPct = spend > 0 ? (monthly / spend * 100) : 0;

      if (pctBlock) pctBlock.style.display = isPct ? "" : "none";
      if (flatBlock) flatBlock.style.display = isPct ? "none" : "";
      qa("[data-tab]").forEach(function (b) { tabStyle(b, b.dataset.tab === state.mode); });

      set("note", isPct
        ? "We ask you for the percentage rather than assuming one, so the number is yours and not ours."
        : "A flat retainer at this spend works out at " + impliedPct.toFixed(1) +
          "% of your media. Worth checking what happens to it the next time you scale.");
      set("annual", fmt(annual));
      set("monthly", fmt(monthly));
      set("doubledLabel", "If you double your spend");
      set("doubled", isPct ? fmt(annual * 2) : fmt(annual));
      set("doubledNote", isPct
        ? fmt(annual) + " more a year, for the same work"
        : "Unchanged on paper — until the retainer is renegotiated");
      set("threeYear", fmt(annual * 3));
    }

    function bind(el, key) {
      if (!el) return;
      el.addEventListener("input", function () {
        state[key] = el.value;
        qa('[data-range="' + key + '"]').forEach(function (r) { if (r !== el) r.value = el.value; });
        var num = q("#" + key);
        if (num && num !== el) num.value = el.value;
        render();
      });
    }

    bind(spendEl, "spend");
    bind(pctEl, "pct");
    bind(flatEl, "flat");
    ["spend", "pct", "flat"].forEach(function (k) {
      qa('[data-range="' + k + '"]').forEach(function (r) { bind(r, k); });
    });
    qa("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () { state.mode = btn.dataset.tab; render(); });
    });
    render();
  }

  /* ---------------------------------------------------- creative calculator
     The companion to the fee calculator. That one prices the agency; this one
     prices the thing the agency does not cover, and the number almost nobody
     has to hand: what one finished concept costs before a cent of media. */
  function setupCreativeCost() {
    var conceptsEl = q("#concepts");
    if (!conceptsEl) return;

    var state = { concepts: 6, rate: 800, days: 2, shoot: 4000, perShoot: 8 };

    function fmt(n) { return "$" + Math.round(n).toLocaleString("en-AU"); }
    function set(name, v) {
      var el = q('[data-cc="' + name + '"]');
      if (el) el.textContent = v;
    }

    function render() {
      var concepts = Math.max(0, Number(state.concepts) || 0);
      var rate = Math.max(0, Number(state.rate) || 0);
      var days = Math.max(0, Number(state.days) || 0);
      var shoot = Math.max(0, Number(state.shoot) || 0);
      var perShoot = Math.max(1, Number(state.perShoot) || 1);

      var labour = rate * days;
      /* A shoot is bought in batches, so its cost is spread across what comes
         out of it rather than charged to whichever concept triggered it. */
      var shootShare = shoot / perShoot;
      var perConcept = labour + shootShare;
      var monthly = perConcept * concepts;

      set("perConcept", fmt(perConcept));
      set("labour", fmt(labour));
      set("shootShare", fmt(shootShare));
      set("monthly", fmt(monthly));
      set("annual", fmt(monthly * 12));
      set("doubled", fmt(monthly * 12));
      set("volume", concepts + (concepts === 1 ? " concept" : " concepts") + " a month");
      set("days", days + (days === 1 ? " day" : " days"));

      /* The point of the tool. Fatigue is answered with volume, and volume on
         this cost base is what stops people — so the number is worth seeing. */
      set("note", concepts >= 20
        ? "At this volume the production line is the business. Worth knowing what each concept costs before deciding how many you can run."
        : "Doubling to " + (concepts * 2) + " concepts a month costs " + fmt(monthly * 12) +
          " more a year on these numbers — which is usually the real reason creative volume stays where it is.");
    }

    function bind(el, key) {
      if (!el) return;
      el.addEventListener("input", function () {
        state[key] = el.value;
        qa('[data-ccrange="' + key + '"]').forEach(function (r) { if (r !== el) r.value = el.value; });
        var num = q("#" + key);
        if (num && num !== el) num.value = el.value;
        render();
      });
    }

    ["concepts", "rate", "days", "shoot", "perShoot"].forEach(function (k) {
      bind(q("#" + k), k);
      qa('[data-ccrange="' + k + '"]').forEach(function (r) { bind(r, k); });
    });
    render();
  }

  /* The four products on /pricing were four tall cards side by side: 3,634px of
     one section on a phone, and a page 13 screens deep. They are now a stacked
     accordion — eyebrow, name and one-line summary always visible, the detail
     behind a toggle, one open at a time.

     Built here rather than in the markup because the cards are hand-authored and
     each has a different fill; restructuring them with a regex broke the nesting
     twice. This reads the existing DOM and rearranges it, so without JS the page
     still renders as the four cards it always was. */
  /* The four products on /pricing behave differently by width, because the two
     jobs are different. On a phone four tall cards were 3,634px of one section
     and a page 13 screens deep, so they collapse to an accordion. On a desktop
     the job is comparison — four equal tiers side by side, everything visible,
     footers on the same line, the way anyone reads a set of plans.

     Both structures come out of one pass over the existing DOM, and the mode is
     switched by a media query rather than rebuilt. Without JS the page still
     renders as the four cards it has always been; the only markup change is a
     data-product hook. */
  /* The four products on /pricing are one component with two modes.

     Above 900px the job is comparison: four equal columns, headings aligned,
     each card showing its name, its summary and the top of its spec list, with
     "See more" pinned to the bottom of every card so the four controls sit on
     one line. Fully expanded they were 787px tall, which is more than anyone
     reads before deciding which column they are in. Expanding is per card and
     does not close the others — that is the whole point of a comparison.

     Below 900px the job is getting past it: four cards were 3,634px of one
     section, so the header becomes the toggle and one opens at a time.

     Both come from a single pass over the existing DOM; the mode is a matchMedia
     switch, not a rebuild. Without JS the page renders as the four cards it has
     always been. */
  function setupProducts() {
    var list = q("[data-product-list]");
    if (!list) return;
    var cards = qa("[data-product]", list);
    if (!cards.length) return;

    var STACK = window.matchMedia("(max-width: 900px)");
    var parts = [];

    cards.forEach(function (card, i) {
      var kids = Array.prototype.slice.call(card.children);
      var summary = kids.filter(function (el) { return el.tagName === "P"; })[0];
      if (!summary) return;
      var cut = kids.indexOf(summary) + 1;
      var rest = kids.slice(cut);
      if (!rest.length) return;

      /* Read the painted background, not the style string. Card four has a black
         BORDER on a white fill, so matching rgb(10,10,10) anywhere in the inline
         style called it dark and faded it to black over white — a hard grey band
         across the card. */
      var face = getComputedStyle(card).backgroundColor;
      var rgb = (face.match(/\d+/g) || [255, 255, 255]).map(Number);
      var dark = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 128;
      card.style.padding = "0";
      card.style.display = "flex";
      card.style.flexDirection = "column";

      var head = document.createElement("button");
      head.type = "button";
      /* color:inherit is load-bearing. A <button> does not inherit colour from
         its parent — the UA sheet gives it buttontext, i.e. black — so anything
         moved into this head that carries no colour of its own renders black on
         a black card. That is exactly how the $5,000 on the dark tier shipped
         invisible at 1.06:1. */
      head.style.cssText = "width:100%; background:none; border:0; font-family:inherit; text-align:left;" +
        "color:inherit;" +
        "padding:28px 30px 0; display:grid; grid-template-columns:1fr auto; gap:10px 18px; align-items:start;";

      var left = document.createElement("span");
      left.style.cssText = "display:flex; flex-direction:column; gap:10px; min-width:0;";
      kids.slice(0, cut).forEach(function (el) {
        el.style.minHeight = "0"; el.style.margin = "0";
        left.appendChild(el);
      });

      var sign = document.createElement("span");
      sign.setAttribute("aria-hidden", "true");
      sign.style.cssText = "font-size:26px; font-weight:500; line-height:1.2; color:" +
        (dark ? "#B5B5AD" : "#55554F") + ";";

      head.appendChild(left); head.appendChild(sign);
      var rows = Array.prototype.slice.call(left.children);

      /* The clip wrapper is what shortens the card. The panel inside keeps its
         own layout, so nothing reflows when the clip height changes. */
      var clip = document.createElement("div");
      clip.style.cssText = "position:relative; overflow:hidden; flex:0 0 auto;";
      var panel = document.createElement("div");
      panel.id = "product-" + i;
      panel.style.cssText = "padding:20px 30px 8px;";
      rest.forEach(function (el) { panel.appendChild(el); });
      clip.appendChild(panel);

      /* A hard cut looks like a bug; a fade reads as "there is more". */
      var fade = document.createElement("span");
      fade.setAttribute("aria-hidden", "true");
      fade.style.cssText = "position:absolute; left:0; right:0; bottom:0; height:56px;" +
        "pointer-events:none; background:linear-gradient(to bottom, rgba(0,0,0,0), " + face + ");";
      clip.appendChild(fade);

      var more = document.createElement("button");
      more.type = "button";
      more.setAttribute("aria-controls", panel.id);
      more.style.cssText = "margin-top:auto; align-self:flex-start; background:none; border:0;" +
        "font-family:inherit; font-size:15px; font-weight:600; cursor:pointer; padding:16px 30px 26px;" +
        "color:" + (dark ? "#D8FF00" : "#0A0A0A") + ";";

      /* The CTA lives in the card's own footer, outside the collapsible panel,
         so every tier carries an action whether it is open or shut. Grouping it
         with See more in one row and pushing that row down keeps all four
         actions on the same line across the set. */
      var foot = document.createElement("div");
      foot.style.cssText = "margin-top:auto; display:flex; flex-direction:column;" +
        "align-items:flex-start; gap:2px; padding:4px 30px 26px;";
      /* Built here rather than authored into the markup: inserting an element
         before each card's closing tag needs the tag walk that has now put
         content in the wrong place twice on this file. createElement cannot
         land in the wrong parent. */
      var cta = document.createElement("a");
      cta.href = "/apply";
      cta.textContent = "Apply";
      cta.className = "scp0";
      cta.style.cssText = "background:#D8FF00; color:#0A0A0A; font-size:15px; font-weight:600;" +
        "padding:13px 22px; border-radius:999px; align-self:flex-start; text-decoration:none;";
      more.style.marginTop = "0";
      more.style.padding = "10px 0 12px";
      foot.appendChild(more);
      foot.appendChild(cta);

      card.appendChild(head); card.appendChild(clip); card.appendChild(foot);
      parts.push({ card: card, head: head, sign: sign, clip: clip, panel: panel,
                   fade: fade, more: more, rows: rows, open: false });
    });

    /* One state for all four on desktop. Expanding a single column left the
       other three padded out to match it, and made a comparison you could only
       read one column of at a time. On a phone they stay independent — that is
       an accordion, and opening all four is the height problem again. */
    var shared = false;

    function paint() {
      var stacked = STACK.matches;
      list.style.display = stacked ? "flex" : "grid";
      list.style.flexDirection = stacked ? "column" : "";
      list.style.gridTemplateColumns = stacked ? "" : "repeat(4, minmax(0, 1fr))";
      /* stretch. start left the collapsed row ragged — 380/380/388/380 — and the
         four See more controls off one line, which breaks the default view. That
         view matters more than the dead space in the other three cards when one
         is expanded, which is a deliberate act and reads as a spacious card
         rather than a broken one. */
      list.style.alignItems = stacked ? "" : "stretch";
      list.style.gap = stacked ? "12px" : "18px";

      parts.forEach(function (p, i) {
        if (stacked) {
          p.clip.style.height = p.open ? "auto" : "0px";
          p.fade.style.display = "none";
          p.more.style.display = "none";
          p.sign.style.display = "";
          p.sign.textContent = p.open ? "−" : "+";
          p.head.style.cursor = "pointer";
          p.head.style.paddingBottom = "26px";
          p.head.removeAttribute("tabindex");
          p.head.setAttribute("aria-expanded", p.open ? "true" : "false");
        } else {
          /* The cut is at the end of the summary, before the spec list starts —
             a card showing two of four spec rows is still too tall to scan, and
             half a list reads as truncation rather than a summary. */
          p.clip.style.height = shared ? p.panel.scrollHeight + "px" : "0px";
          p.fade.style.display = "none";
          p.more.style.display = "";
          p.more.textContent = shared ? "See less" : "See more";
          p.more.setAttribute("aria-expanded", shared ? "true" : "false");
          p.sign.style.display = "none";
          p.head.style.cursor = "default";
          p.head.style.paddingBottom = "0";
          p.head.setAttribute("tabindex", "-1");
          p.head.removeAttribute("aria-expanded");
        }
      });

      /* Summaries wrap to three, four or five lines, so without this the spec
         list starts at a different height in every card and the row stops
         reading as a set. Equalising the header block puts the boundary — and
         the first spec row under it — on one line across all four. Desktop only:
         stacked, it would just be dead space. */
      parts.forEach(function (p) {
        p.head.style.minHeight = "0px";
        p.rows.forEach(function (r) { r.style.minHeight = "0px"; });
      });
      if (!stacked) {
        /* Equalising the header as a whole only lines up its bottom edge. The
           lines inside still drifted, because "The daily decisions." is one line
           where the other three headings are two — so that card's price sat 45px
           above its neighbours, and the subtitle and summary under it followed.
           The four cards share a row structure (eyebrow, heading, price,
           qualifier, summary), so each row is levelled against the tallest of
           its own index. Measured rather than hard-coded, so it survives a
           rewrite or a rewrap. */
        var depth = 0;
        parts.forEach(function (p) { depth = Math.max(depth, p.rows.length); });
        for (var k = 0; k < depth; k++) {
          var tallestRow = 0;
          parts.forEach(function (p) {
            if (p.rows[k]) tallestRow = Math.max(tallestRow, p.rows[k].getBoundingClientRect().height);
          });
          parts.forEach(function (p) {
            if (p.rows[k]) p.rows[k].style.minHeight = tallestRow.toFixed(2) + "px";
          });
        }

        /* getBoundingClientRect, not offsetHeight: offsetHeight rounds to whole
           pixels, which left one card's spec list starting 4px below the other
           three — visible as a broken line across the row. */
        var tallest = 0;
        parts.forEach(function (p) {
          tallest = Math.max(tallest, p.head.getBoundingClientRect().height);
        });
        parts.forEach(function (p) { p.head.style.minHeight = tallest.toFixed(2) + "px"; });

        /* Equal headers get the boundary onto one line, but the first spec row
           still landed a few pixels low in one card — the rows sit inside a
           wrapper whose own box differs slightly per card. Rather than chase it
           through the nesting, measure where each first row actually lands and
           pad the short ones down to match. Measured, so it holds at any width
           and however the copy rewraps. */
        parts.forEach(function (p) { p.panel.style.paddingTop = "20px"; });
        var lowest = 0, tops = [];
        parts.forEach(function (p) {
          var row = p.panel.firstElementChild;
          var top = row ? row.getBoundingClientRect().top : 0;
          tops.push(top);
          lowest = Math.max(lowest, top);
        });
        parts.forEach(function (p, n) {
          var pad = 20 + (lowest - tops[n]);
          if (pad > 20.05) p.panel.style.paddingTop = pad.toFixed(2) + "px";
        });
      }
    }

    parts.forEach(function (p) {
      /* On a phone the header is the toggle and one opens at a time. On desktop
         the header is inert and each card expands on its own — closing a
         neighbour would defeat the comparison. */
      p.head.addEventListener("click", function () {
        if (!STACK.matches) return;
        if (!p.open) parts.forEach(function (o) { if (o !== p) o.open = false; });
        p.open = !p.open;
        paint();
      });
      p.more.addEventListener("click", function () { shared = !shared; paint(); });
    });

    paint();
    if (STACK.addEventListener) STACK.addEventListener("change", paint);
    else if (STACK.addListener) STACK.addListener(paint);
    window.addEventListener("resize", paint);
  }

  /* ----------------------------------------------------- glossary filter */

  /* Twenty terms in one flat list and no way to reach one without scanning the
     lot. The field is built here rather than in the HTML so the page without JS
     is exactly what it always was — a complete, readable list — instead of a
     search box that does nothing.

     Matching is on the whole row, term and definition together: somebody who
     half-remembers "the one about the unstable period after a change" finds
     Learning phase without knowing its name. */
  function setupGlossary() {
    var rows = qa("[data-term]");
    if (rows.length < 2) return;

    var list = rows[0].parentNode;
    if (!list) return;

    var wrap = document.createElement("div");
    wrap.style.cssText = "margin: 0 0 8px; display: flex; flex-wrap: wrap; gap: 12px;" +
      "align-items: center;";

    var input = document.createElement("input");
    input.type = "search";
    input.setAttribute("aria-label", "Filter the glossary");
    input.placeholder = "Filter " + rows.length + " terms…";
    input.style.cssText = "flex: 1 1 260px; min-width: 0; background: #FFFFFF;" +
      "border: 1px solid #6B6B63; border-radius: 4px; color: #0A0A0A;" +
      "font-family: inherit; font-size: 17px; padding: 13px 15px; box-sizing: border-box;";

    var count = document.createElement("span");
    count.setAttribute("aria-live", "polite");
    count.style.cssText = "font-size: 14px; color: #55554F; font-variant-numeric: tabular-nums;";

    var empty = document.createElement("p");
    empty.style.cssText = "margin: 20px 0 0; font-size: 17px; line-height: 1.6; color: #55554F; display: none;";

    wrap.appendChild(input);
    wrap.appendChild(count);
    list.parentNode.insertBefore(wrap, list);
    list.parentNode.insertBefore(empty, list.nextSibling);

    /* Read the text once. Doing it per keystroke walks the DOM twenty times for
       a list that never changes. */
    var haystack = rows.map(function (r) {
      return (r.textContent || "").toLowerCase().replace(/\s+/g, " ");
    });

    function apply() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (r, i) {
        var hit = !q || haystack[i].indexOf(q) > -1;
        r.style.display = hit ? "" : "none";
        if (hit) shown++;
      });
      count.textContent = q ? shown + " of " + rows.length : "";
      empty.style.display = shown ? "none" : "";
      empty.textContent = shown ? "" :
        "Nothing matches “" + input.value.trim() + "”. Every term is listed above when the field is empty.";
    }

    input.addEventListener("input", apply);
    /* Escape clears, which is what a search field is expected to do and what the
       native clear button fires anyway. */
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; apply(); }
    });
    apply();
  }

  /* ---------------------------------------------------------- calculators */

  /* Three pages carry one. The markup is identical and built by layout.js; the
     only thing that differs is the arithmetic, so COMPUTE here mirrors COMPUTE
     there, keyed by the same id. layout.js renders the defaults at build time so
     the page is correct before this file lands, and this recomputes on input.

     The two copies are kept honest by a test that loads each page with
     JavaScript disabled and diffs every output against the scripted render — if
     they ever drift, that fails rather than shipping two different answers.

     Nothing leaves the browser. It is arithmetic on three sliders. */
  function money(n) {
    var r = Math.round(n);
    return (r < 0 ? "-$" : "$") + Math.abs(r).toLocaleString("en-AU");
  }

  var COMPUTE = {
    roas: function (d) {
      var marginFrac = (Number(d.margin) || 1) / 100;
      var roasX = (Number(d.roas) || 0) / 10;
      var spend = Number(d.spend) || 0;
      var breakeven = 1 / marginFrac;
      var revenue = spend * roasX;
      var grossProfit = revenue * marginFrac;
      var netOfMedia = grossProfit - spend;
      return {
        labels: { margin: d.margin + "%", roas: roasX.toFixed(1) + "x", spend: money(spend) },
        breakeven: breakeven.toFixed(2) + "x",
        breakevenNote: "At a " + d.margin + "% margin you need " + breakeven.toFixed(2) +
          "x just to cover the cost of the goods.",
        profit: money(netOfMedia),
        profitNote: netOfMedia >= 0
          ? roasX.toFixed(1) + "x on " + money(spend) + " is " + money(revenue) +
            " of revenue and " + money(grossProfit) + " of gross profit, less the " +
            money(spend) + " you spent."
          : roasX.toFixed(1) + "x on " + money(spend) + " returns " + money(grossProfit) +
            " of gross profit against " + money(spend) + " of media. You are below break-even.",
        headroom: money(0.5 * spend * marginFrac),
        headroomNote: "A month, at this spend and margin, without buying any more media.",
        /* The headline changes meaning below break-even, not just value. */
        breakevenTone: roasX >= breakeven ? "good" : "bad"
      };
    },

    cpr: function (d) {
      var cpm = (Number(d.cpm) || 0) / 10;
      var ctr = (Number(d.ctr) || 0) / 100;
      var cvr = (Number(d.cvr) || 0) / 100;
      var clicks = 1000 * (ctr / 100);
      var results = clicks * (cvr / 100);
      var cpc = clicks > 0 ? cpm / clicks : 0;
      var cpa = results > 0 ? cpm / results : 0;
      var betterCtr = 1000 * ((ctr + 0.2) / 100) * (cvr / 100);
      var cpaCtr = betterCtr > 0 ? cpm / betterCtr : 0;
      var cpaCpm = results > 0 ? Math.max(0, cpm - 2) / results : 0;
      return {
        labels: { cpm: "$" + cpm.toFixed(2), ctr: ctr.toFixed(2) + "%", cvr: cvr.toFixed(2) + "%" },
        cpa: money(cpa),
        cpaNote: "At a $" + cpm.toFixed(2) + " CPM, " + ctr.toFixed(2) +
          "% of impressions click and " + cvr.toFixed(2) + "% of those convert.",
        cpc: "$" + cpc.toFixed(2),
        cpcNote: clicks.toFixed(1) + " clicks per thousand impressions.",
        lever: money(cpa - cpaCtr) + " vs " + money(cpa - cpaCpm),
        leverNote: "What a fifth of a point of CTR saves per result, against what taking " +
          "$2.00 off the CPM saves. Creative moves the first number; nothing in the " +
          "account reliably moves the second."
      };
    },

    retainer: function (d) {
      var retainer = Number(d.retainer) || 0;
      var spend = Number(d.spend) || 0;
      var paidMonthly = retainer * ((Number(d.paid) || 0) / 100);
      var restMonthly = retainer - paidMonthly;
      var effective = spend > 0 ? (paidMonthly / spend) * 100 : 0;
      return {
        labels: { retainer: money(retainer), spend: money(spend), paid: d.paid + "%" },
        effective: effective.toFixed(1) + "%",
        effectiveNote: money(paidMonthly) + " a month to manage " + money(spend) +
          " of media is the same as a " + effective.toFixed(1) +
          "% fee, whatever the invoice calls it.",
        paid: money(paidMonthly * 12),
        paidNote: "A year on the paid line — the only part with a clean revenue trace.",
        rest: money(restMonthly * 12),
        restNote: "A year on content, scheduling and community. Judge this on brand goals, " +
          "not on sales it did not make."
      };
    }
  };

  function setupCalculators() {
    qa("[data-calc]").forEach(function (root) {
      var id = root.dataset.calc;
      var compute = COMPUTE[id];
      if (!compute) return;

      var S = {};
      qa("[data-roas]", root).forEach(function (el) { S[el.dataset.roas] = Number(el.value); });

      function set(name, v) {
        var el = q('[data-rout="' + name + '"]', root);
        if (el) el.textContent = v;
      }

      function render() {
        var r = compute(S);
        Object.keys(r.labels || {}).forEach(function (k) { set(k + "Label", r.labels[k]); });
        Object.keys(r).forEach(function (k) {
          if (k === "labels" || /Tone$/.test(k)) return;
          set(k, r[k]);
        });
        Object.keys(r).forEach(function (k) {
          var m = /^(.*)Tone$/.exec(k);
          if (!m) return;
          var el = q('[data-rout="' + m[1] + '"]', root);
          if (el) el.style.color = r[k] === "bad" ? "#FF6B5A" : VOLT;
        });
      }

      qa("[data-roas]", root).forEach(function (el) {
        el.addEventListener("input", function () {
          S[el.dataset.roas] = Number(el.value);
          render();
        });
      });

      render();
    });
  }

  /* ------------------------------------------------- ad library search */

  /* The guide used to describe the Ad Library and then leave the reader to go
     and find it. This builds the real prefilled URL, because the two things
     that make a search fail are both in the query string: no country (it
     defaults to the viewer's, so an AU advertiser searched from elsewhere looks
     dormant) and no active filter (so you read ads that stopped a year ago).

     It opens Meta, so nothing here is submitted anywhere and nothing is stored.
     The link is a real anchor, not a window.open, so it survives a popup
     blocker and can be middle-clicked like any other link. */
  function setupAdLibrary() {
    var root = q("#adlib-root");
    if (!root) return;

    var COUNTRIES = [["AU", "Australia"], ["NZ", "New Zealand"], ["GB", "United Kingdom"],
      ["US", "United States"], ["CA", "Canada"], ["IE", "Ireland"], ["SG", "Singapore"], ["ALL", "All countries"]];
    var S = { brand: "", country: "AU" };

    function url() {
      return "https://www.facebook.com/ads/library/?" + [
        "active_status=active", "ad_type=all", "media_type=all",
        "country=" + encodeURIComponent(S.country),
        "search_type=keyword_unordered",
        "q=" + encodeURIComponent(S.brand.trim())
      ].join("&");
    }

    var INPUT = "background:#0A0A0A; border:1px solid #6B6B63; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px; width:100%; min-width:0; box-sizing:border-box;";
    var LABEL = "font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#B5B5AD;";

    function render() {
      var ready = S.brand.trim().length > 0;
      root.innerHTML =
        '<span style="' + LABEL + '">Open it prefilled</span>' +
        '<div style="margin-top:18px; display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end;">' +
        '<label style="display:flex; flex-direction:column; gap:8px; flex:2 1 260px; min-width:0;">' +
        '<span style="' + LABEL + '">Competitor</span>' +
        '<input type="text" data-adlib="brand" value="' + esc(S.brand) + '" placeholder="Their business name" style="' + INPUT + '">' +
        '</label>' +
        '<label style="display:flex; flex-direction:column; gap:8px; flex:1 1 180px; min-width:0;">' +
        '<span style="' + LABEL + '">Country</span>' +
        '<select data-adlib="country" style="' + INPUT + '">' +
        COUNTRIES.map(function (c) {
          return '<option value="' + c[0] + '"' + (S.country === c[0] ? " selected" : "") + '>' + esc(c[1]) + '</option>';
        }).join("") + '</select>' +
        '</label>' +
        '<a data-adlib-go href="' + esc(url()) + '" target="_blank" rel="noopener nofollow"' +
        ' style="background:' + (ready ? VOLT : "#232320") + '; color:' + (ready ? "#0A0A0A" : "#8A8A82") + ';' +
        'font-size:17px; font-weight:600; padding:16px 26px; border-radius:4px; text-decoration:none;' +
        'white-space:nowrap;' + (ready ? "" : " pointer-events:none;") + '">Search the Ad Library</a>' +
        '</div>' +
        '<p style="margin:16px 0 0; max-width:62ch; font-size:14px; line-height:1.65; color:#B5B5AD;">' +
        (ready
          ? "Opens Meta in a new tab, filtered to ads running now."
          : "Type a business name to build the link. It opens Meta — nothing is sent to us.") +
        '</p>';
      qa("[data-adlib]", root).forEach(function (el) {
        el.addEventListener("input", function () { S[el.dataset.adlib] = el.value; sync(); });
        el.addEventListener("change", function () { S[el.dataset.adlib] = el.value; sync(); });
      });
    }

    /* Update the href in place rather than re-rendering: rebuilding the markup
       on every keystroke would take the focus out of the field being typed in. */
    function sync() {
      var go = q("[data-adlib-go]", root);
      var ready = S.brand.trim().length > 0;
      if (!go) return;
      go.href = url();
      go.style.background = ready ? VOLT : "#232320";
      go.style.color = ready ? "#0A0A0A" : "#8A8A82";
      go.style.pointerEvents = ready ? "" : "none";
      var note = q("p", root);
      if (note) note.textContent = ready
        ? "Opens Meta in a new tab, filtered to ads running now."
        : "Type a business name to build the link. It opens Meta — nothing is sent to us.";
    }

    render();
  }

  /* ------------------------------------------------- short lead capture */

  /* The five-question quiz at /apply is the considered door. This is the quick
     one: email, website, budget, and which product they're after. Four fields
     on one screen, no steps, no progress bar. It exists because the numbers are
     published now — somebody who has read the price and wants a time should not
     have to answer five questions to ask for one.

     Same endpoint, same honeypot, same first-touch as the long form, so a lead
     from here is indistinguishable downstream except by `source`. */
  function setupShortForm(root, source) {
    if (!root) return;

    var SPENDS = ["Under $3,000", "$3,000 – $10,000", "$10,000 – $30,000",
      "$30,000 – $100,000", "Over $100,000"];
    var WANTS = ["Not sure yet — talk it through", "The setup, $19,500",
      "The daily decisions, $2,500 a month", "Creative packages, from $5,000",
      "Custom, end to end", "Marketing automation, quoted",
      "The free systems audit — see if I qualify"];

    var S = { email: "", website: "", spend: "", want: "", hp: "",
      tried: false, sending: false, sent: false, failed: false };

    /* Two columns of four fields is comfortable on a laptop and cramped on a
       phone, so the grid collapses rather than shrinking the inputs. */
    var ONE_COL = window.matchMedia("(max-width: 620px)");

    var INPUT = "background:#161613; border:1px solid #6B6B63; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px; width:100%; min-width:0;" +
      "box-sizing:border-box;";
    var LABEL = "font-size:12px; font-weight:600; letter-spacing:0.08em;" +
      "text-transform:uppercase; color:#B5B5AD;";

    function field(label, inner) {
      return '<div style="display:flex; flex-direction:column; gap:8px; min-width:0;">' +
        '<span style="' + LABEL + '">' + esc(label) + '</span>' + inner + '</div>';
    }
    function select(key, placeholder, list) {
      return '<select data-call-field="' + key + '" style="' + INPUT + '">' +
        '<option value="">' + esc(placeholder) + '</option>' +
        list.map(function (o) {
          return '<option' + (S[key] === o ? ' selected' : '') + '>' + esc(o) + '</option>';
        }).join("") + '</select>';
    }

    function render() {
      if (S.sent) {
        root.innerHTML = '<p style="margin:0; max-width:52ch; font-size:19px; line-height:1.6; color:#F7F7F5;">' +
          'Got it. Josh replies within a business day with a time.</p>';
        return;
      }
      var ok = /.+@.+\..+/.test(S.email);
      root.innerHTML =
        '<div style="display:grid; grid-template-columns:repeat(' + (ONE_COL.matches ? 1 : 2) + ',minmax(0,1fr)); gap:18px;">' +
        field("Work email", '<input type="email" data-call-field="email" value="' + esc(S.email) +
          '" placeholder="you@yourbusiness.com.au" autocomplete="email" style="' + INPUT + '">') +
        field("Website", '<input type="text" data-call-field="website" value="' + esc(S.website) +
          '" placeholder="yourbusiness.com.au" autocomplete="url" style="' + INPUT + '">') +
        field("Monthly ad spend", select("spend", "Choose a range", SPENDS)) +
        field("What you're after", select("want", "Choose one", WANTS)) +
        '</div>' +
        '<div aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;">' +
        '<input type="text" tabindex="-1" autocomplete="off" data-call-field="hp" name="hp-no-autofill"></div>' +
        '<div style="margin-top:24px; display:flex; flex-wrap:wrap; gap:16px; align-items:center;">' +
        '<button type="button" data-call-send' + (S.sending ? " disabled" : "") +
        ' style="background:' + VOLT + '; color:#0A0A0A; border:none; font-family:inherit;' +
        'font-size:17px; font-weight:600; padding:16px 28px; border-radius:4px; cursor:' +
        (S.sending ? "default" : "pointer") + ';">' +
        (S.sending ? "Sending…" : S.failed ? "Try again" : "Apply") + '</button>' +
        '<span style="font-size:14px; line-height:1.6; color:#B5B5AD;">Takes about twenty seconds.</span>' +
        '</div>' +
        '<p style="margin:16px 0 0; max-width:56ch; font-size:14px; line-height:1.6; color:' +
        (S.tried && !ok ? "#D8FF00" : S.failed ? "#FF6B5A" : "#B5B5AD") + ';">' +
        (S.tried && !ok
          ? "That email address does not look right — it is the only way we can reply."
          : S.failed
            ? "That did not go through. Try again in a moment."
            : "One reply from a person. No sequence, no newsletter, no calendar to wrestle with.") +
        '</p>';
      wire();
    }

    function wire() {
      qa("[data-call-field]", root).forEach(function (el) {
        if (el.value && !S[el.dataset.callField]) S[el.dataset.callField] = el.value;
        el.addEventListener("input", function () { S[el.dataset.callField] = el.value; });
        el.addEventListener("change", function () { S[el.dataset.callField] = el.value; });
      });
      var btn = q("[data-call-send]", root);
      if (btn) btn.addEventListener("click", function () {
        qa("[data-call-field]", root).forEach(function (el) { S[el.dataset.callField] = el.value; });
        S.tried = true;
        if (!/.+@.+\..+/.test(S.email)) return render();
        S.sending = true; S.failed = false; render();
        var body = new URLSearchParams({
          email: S.email, website: S.website, spend: S.spend, want: S.want,
          source: source, partial: "no",
          page: location.href,
          landing: firstTouch().landing || "",
          referrer: firstTouch().referrer || "",
          utm: firstTouch().utm || "",
          company_url: S.hp
        });
        fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString()
        }).then(function (res) {
          if (!res.ok) { S.sending = false; S.failed = true; return render(); }
          S.sending = false; S.sent = true; render();
        }).catch(function () { S.sending = false; S.failed = true; render(); });
      });
    }

    render();
    if (ONE_COL.addEventListener) ONE_COL.addEventListener("change", function () { if (!S.sent) render(); });
  }

  function setupPricingCall() {
    setupShortForm(q("#pricing-call-root"), "pricing-call");
    setupShortForm(q("#book-root"), "book");
  }

  /* --------------------------------------------------------- first touch */

  /* A lead used to arrive saying "Submitted from: /apply", because that is where
     the form is. It said nothing about which of the sixty-odd pages actually
     earned the application, which made it impossible to tell whether the work
     was paying off anywhere in particular.

     So the first page of a visit is recorded once, in sessionStorage, and
     travels with the application. sessionStorage rather than a cookie because
     it needs no banner, dies with the tab, and never leaves the browser except
     as three short strings attached to an application the person chose to send.

     Wrapped in try/catch throughout: private windows and locked-down browsers
     throw on the accessor itself, and a lead is worth more than its source. */
  var TOUCH = "sevenam:first-touch";

  function recordFirstTouch() {
    try {
      if (sessionStorage.getItem(TOUCH)) return;
      var q = new URLSearchParams(location.search);
      var utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map(function (k) { return q.get(k); })
        .filter(Boolean)
        .join(" / ");
      sessionStorage.setItem(TOUCH, JSON.stringify({
        landing: location.pathname,
        /* Same-origin referrers are internal navigation, not a source. */
        referrer: (document.referrer && document.referrer.indexOf(location.origin) !== 0)
          ? document.referrer : "",
        utm: utm
      }));
    } catch (e) { /* storage unavailable — the lead still sends without it */ }
  }

  function firstTouch() {
    try { return JSON.parse(sessionStorage.getItem(TOUCH)) || {}; }
    catch (e) { return {}; }
  }

  /* ------------------------------------------------------- case study cards */
  /* Forcing the case-study strip to one column stopped Safari slicing the second
     card off the screen, and replaced that bug with a worse one: 2,606px of
     stacked cards on a 390px phone, which is most of a thumb-scroll of the same
     three stories. Shorter cards were the actual ask.

     So below the strip's own breakpoint each card keeps its name and its headline
     number — the part worth scanning — and folds the paragraph and the stat rows
     behind a toggle. The two shapes on the page are handled by counting children
     rather than by adding markup hooks: the small cards are
     [header, figure, paragraph, stats] and fold from index 2, the wide panel is
     [body, stats sub-panel] and folds its second half. index.html is
     hand-authored and this is presentation, so it is built here and the HTML
     stays as it is — which also means with JS off every card is simply whole.

     Everything is restored above the breakpoint, because on a desktop the cards
     are already short and a click to read three lines is friction, not a saving. */
  function setupCaseCards() {
    var cards = qa('[data-placeholder="case-study"]');
    if (!cards.length || !window.matchMedia) return;
    var mq = window.matchMedia("(max-width: 719px)");

    /* Each entry is [parent, children-to-fold]. Folding has to happen inside the
       element the content already sits in, or it loses that element's padding and
       renders full-bleed — which is why this returns groups rather than a flat
       list. Two known shapes; anything else is left whole rather than guessed at. */
    function groupsOf(card) {
      var kids = [].slice.call(card.children);
      if (kids.length === 4) {
        /* Small card: header, headline figure, paragraph, stat rows. */
        return [[card, kids.slice(2)]];
      }
      if (kids.length === 2) {
        /* Wide panel: a padded text half and a stats sub-panel. Keep the name and
           the headline, fold the paragraph, the stat rows and the source line,
           then fold the whole second half. */
        var inner = [].slice.call(kids[0].children);
        var out = [];
        if (inner.length > 2) out.push([kids[0], inner.slice(2)]);
        out.push([card, [kids[1]]]);
        return out;
      }
      return [];
    }

    function build(card, i) {
      if (card._csBtn) return;
      var groups = groupsOf(card);
      if (!groups.length) return;
      /* A dark card needs light text on the button. A button does not inherit
         colour — the UA sheet gives it buttontext — so it is set explicitly. */
      var dark = /rgb\(10, 10, 10\)/.test(card.style.background || "");
      var wraps = [];
      groups.forEach(function (g, n) {
        var wrap = document.createElement("div");
        wrap.id = "cs-body-" + i + "-" + n;
        /* The parents are flex columns with a gap, and a stats block inside one of
           them carries margin-top: auto. Re-parenting into a plain div would lose
           both, so the wrapper repeats the column and the gap. */
        wrap.style.cssText = "display: flex; flex-direction: column; gap: 18px;";
        g[1].forEach(function (el) { wrap.appendChild(el); });
        g[0].appendChild(wrap);
        wraps.push(wrap);
      });
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-controls", wraps.map(function (w) { return w.id; }).join(" "));
      btn.style.cssText =
        "width: 100%; background: none; border: none; padding: 12px 0px 0px; margin: 0px;" +
        "font-family: inherit; font-size: 15px; font-weight: 600; text-align: left;" +
        "cursor: pointer; display: flex; align-items: center; justify-content: space-between;" +
        "gap: 16px; color: " + (dark ? "rgb(216, 255, 0)" : "rgb(10, 10, 10)") + ";";
      var label = document.createElement("span");
      var sign = document.createElement("span");
      sign.setAttribute("aria-hidden", "true");
      sign.style.cssText = "font-size: 20px; font-weight: 400; line-height: 1;";
      btn.appendChild(label);
      btn.appendChild(sign);
      /* On the wide panel the button belongs beside the headline it expands, not
         under a sub-panel that is itself folded away. */
      (card.children.length === 2 ? card.children[0] : card).appendChild(btn);
      card._csBtn = btn;
      card._csWraps = wraps;

      var open = false;
      function paint() {
        wraps.forEach(function (w) { w.style.display = open ? "" : "none"; });
        label.textContent = open ? "Show less" : "Read what happened";
        sign.textContent = open ? "\u2212" : "+";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      paint();
      btn.addEventListener("click", function () { open = !open; paint(); });
    }

    function teardown(card) {
      if (!card._csBtn) return;
      /* Put every folded child back where it was, in order, before its wrapper. */
      card._csWraps.forEach(function (wrap) {
        var parent = wrap.parentElement;
        while (wrap.firstChild) parent.insertBefore(wrap.firstChild, wrap);
        parent.removeChild(wrap);
      });
      card._csBtn.parentElement.removeChild(card._csBtn);
      card._csBtn = null;
      card._csWraps = null;
    }

    function apply() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (r, i) {
        var hit = !q || haystack[i].indexOf(q) > -1;
        r.style.display = hit ? "" : "none";
        if (hit) shown++;
      });
      count.textContent = q ? shown + " of " + rows.length : "";
      empty.style.display = shown ? "none" : "";
      empty.textContent = shown ? "" :
        "Nothing matches “" + input.value.trim() + "”. Every term is listed above when the field is empty.";
    }

    input.addEventListener("input", apply);
    /* Escape clears, which is what a search field is expected to do and what the
       native clear button fires anyway. */
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; apply(); }
    });
    apply();
  }

  /* ---------------------------------------------------------- calculators */

  /* Three pages carry one. The markup is identical and built by layout.js; the
     only thing that differs is the arithmetic, so COMPUTE here mirrors COMPUTE
     there, keyed by the same id. layout.js renders the defaults at build time so
     the page is correct before this file lands, and this recomputes on input.

     The two copies are kept honest by a test that loads each page with
     JavaScript disabled and diffs every output against the scripted render — if
     they ever drift, that fails rather than shipping two different answers.

     Nothing leaves the browser. It is arithmetic on three sliders. */
  function money(n) {
    var r = Math.round(n);
    return (r < 0 ? "-$" : "$") + Math.abs(r).toLocaleString("en-AU");
  }

  var COMPUTE = {
    roas: function (d) {
      var marginFrac = (Number(d.margin) || 1) / 100;
      var roasX = (Number(d.roas) || 0) / 10;
      var spend = Number(d.spend) || 0;
      var breakeven = 1 / marginFrac;
      var revenue = spend * roasX;
      var grossProfit = revenue * marginFrac;
      var netOfMedia = grossProfit - spend;
      return {
        labels: { margin: d.margin + "%", roas: roasX.toFixed(1) + "x", spend: money(spend) },
        breakeven: breakeven.toFixed(2) + "x",
        breakevenNote: "At a " + d.margin + "% margin you need " + breakeven.toFixed(2) +
          "x just to cover the cost of the goods.",
        profit: money(netOfMedia),
        profitNote: netOfMedia >= 0
          ? roasX.toFixed(1) + "x on " + money(spend) + " is " + money(revenue) +
            " of revenue and " + money(grossProfit) + " of gross profit, less the " +
            money(spend) + " you spent."
          : roasX.toFixed(1) + "x on " + money(spend) + " returns " + money(grossProfit) +
            " of gross profit against " + money(spend) + " of media. You are below break-even.",
        headroom: money(0.5 * spend * marginFrac),
        headroomNote: "A month, at this spend and margin, without buying any more media.",
        /* The headline changes meaning below break-even, not just value. */
        breakevenTone: roasX >= breakeven ? "good" : "bad"
      };
    },

    cpr: function (d) {
      var cpm = (Number(d.cpm) || 0) / 10;
      var ctr = (Number(d.ctr) || 0) / 100;
      var cvr = (Number(d.cvr) || 0) / 100;
      var clicks = 1000 * (ctr / 100);
      var results = clicks * (cvr / 100);
      var cpc = clicks > 0 ? cpm / clicks : 0;
      var cpa = results > 0 ? cpm / results : 0;
      var betterCtr = 1000 * ((ctr + 0.2) / 100) * (cvr / 100);
      var cpaCtr = betterCtr > 0 ? cpm / betterCtr : 0;
      var cpaCpm = results > 0 ? Math.max(0, cpm - 2) / results : 0;
      return {
        labels: { cpm: "$" + cpm.toFixed(2), ctr: ctr.toFixed(2) + "%", cvr: cvr.toFixed(2) + "%" },
        cpa: money(cpa),
        cpaNote: "At a $" + cpm.toFixed(2) + " CPM, " + ctr.toFixed(2) +
          "% of impressions click and " + cvr.toFixed(2) + "% of those convert.",
        cpc: "$" + cpc.toFixed(2),
        cpcNote: clicks.toFixed(1) + " clicks per thousand impressions.",
        lever: money(cpa - cpaCtr) + " vs " + money(cpa - cpaCpm),
        leverNote: "What a fifth of a point of CTR saves per result, against what taking " +
          "$2.00 off the CPM saves. Creative moves the first number; nothing in the " +
          "account reliably moves the second."
      };
    },

    retainer: function (d) {
      var retainer = Number(d.retainer) || 0;
      var spend = Number(d.spend) || 0;
      var paidMonthly = retainer * ((Number(d.paid) || 0) / 100);
      var restMonthly = retainer - paidMonthly;
      var effective = spend > 0 ? (paidMonthly / spend) * 100 : 0;
      return {
        labels: { retainer: money(retainer), spend: money(spend), paid: d.paid + "%" },
        effective: effective.toFixed(1) + "%",
        effectiveNote: money(paidMonthly) + " a month to manage " + money(spend) +
          " of media is the same as a " + effective.toFixed(1) +
          "% fee, whatever the invoice calls it.",
        paid: money(paidMonthly * 12),
        paidNote: "A year on the paid line — the only part with a clean revenue trace.",
        rest: money(restMonthly * 12),
        restNote: "A year on content, scheduling and community. Judge this on brand goals, " +
          "not on sales it did not make."
      };
    }
  };

  function setupCalculators() {
    qa("[data-calc]").forEach(function (root) {
      var id = root.dataset.calc;
      var compute = COMPUTE[id];
      if (!compute) return;

      var S = {};
      qa("[data-roas]", root).forEach(function (el) { S[el.dataset.roas] = Number(el.value); });

      function set(name, v) {
        var el = q('[data-rout="' + name + '"]', root);
        if (el) el.textContent = v;
      }

      function render() {
        var r = compute(S);
        Object.keys(r.labels || {}).forEach(function (k) { set(k + "Label", r.labels[k]); });
        Object.keys(r).forEach(function (k) {
          if (k === "labels" || /Tone$/.test(k)) return;
          set(k, r[k]);
        });
        Object.keys(r).forEach(function (k) {
          var m = /^(.*)Tone$/.exec(k);
          if (!m) return;
          var el = q('[data-rout="' + m[1] + '"]', root);
          if (el) el.style.color = r[k] === "bad" ? "#FF6B5A" : VOLT;
        });
      }

      qa("[data-roas]", root).forEach(function (el) {
        el.addEventListener("input", function () {
          S[el.dataset.roas] = Number(el.value);
          render();
        });
      });

      render();
    });
  }

  /* ------------------------------------------------- ad library search */

  /* The guide used to describe the Ad Library and then leave the reader to go
     and find it. This builds the real prefilled URL, because the two things
     that make a search fail are both in the query string: no country (it
     defaults to the viewer's, so an AU advertiser searched from elsewhere looks
     dormant) and no active filter (so you read ads that stopped a year ago).

     It opens Meta, so nothing here is submitted anywhere and nothing is stored.
     The link is a real anchor, not a window.open, so it survives a popup
     blocker and can be middle-clicked like any other link. */
  function setupAdLibrary() {
    var root = q("#adlib-root");
    if (!root) return;

    var COUNTRIES = [["AU", "Australia"], ["NZ", "New Zealand"], ["GB", "United Kingdom"],
      ["US", "United States"], ["CA", "Canada"], ["IE", "Ireland"], ["SG", "Singapore"], ["ALL", "All countries"]];
    var S = { brand: "", country: "AU" };

    function url() {
      return "https://www.facebook.com/ads/library/?" + [
        "active_status=active", "ad_type=all", "media_type=all",
        "country=" + encodeURIComponent(S.country),
        "search_type=keyword_unordered",
        "q=" + encodeURIComponent(S.brand.trim())
      ].join("&");
    }

    var INPUT = "background:#0A0A0A; border:1px solid #6B6B63; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px; width:100%; min-width:0; box-sizing:border-box;";
    var LABEL = "font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#B5B5AD;";

    function render() {
      var ready = S.brand.trim().length > 0;
      root.innerHTML =
        '<span style="' + LABEL + '">Open it prefilled</span>' +
        '<div style="margin-top:18px; display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end;">' +
        '<label style="display:flex; flex-direction:column; gap:8px; flex:2 1 260px; min-width:0;">' +
        '<span style="' + LABEL + '">Competitor</span>' +
        '<input type="text" data-adlib="brand" value="' + esc(S.brand) + '" placeholder="Their business name" style="' + INPUT + '">' +
        '</label>' +
        '<label style="display:flex; flex-direction:column; gap:8px; flex:1 1 180px; min-width:0;">' +
        '<span style="' + LABEL + '">Country</span>' +
        '<select data-adlib="country" style="' + INPUT + '">' +
        COUNTRIES.map(function (c) {
          return '<option value="' + c[0] + '"' + (S.country === c[0] ? " selected" : "") + '>' + esc(c[1]) + '</option>';
        }).join("") + '</select>' +
        '</label>' +
        '<a data-adlib-go href="' + esc(url()) + '" target="_blank" rel="noopener nofollow"' +
        ' style="background:' + (ready ? VOLT : "#232320") + '; color:' + (ready ? "#0A0A0A" : "#8A8A82") + ';' +
        'font-size:17px; font-weight:600; padding:16px 26px; border-radius:4px; text-decoration:none;' +
        'white-space:nowrap;' + (ready ? "" : " pointer-events:none;") + '">Search the Ad Library</a>' +
        '</div>' +
        '<p style="margin:16px 0 0; max-width:62ch; font-size:14px; line-height:1.65; color:#B5B5AD;">' +
        (ready
          ? "Opens Meta in a new tab, filtered to ads running now."
          : "Type a business name to build the link. It opens Meta — nothing is sent to us.") +
        '</p>';
      qa("[data-adlib]", root).forEach(function (el) {
        el.addEventListener("input", function () { S[el.dataset.adlib] = el.value; sync(); });
        el.addEventListener("change", function () { S[el.dataset.adlib] = el.value; sync(); });
      });
    }

    /* Update the href in place rather than re-rendering: rebuilding the markup
       on every keystroke would take the focus out of the field being typed in. */
    function sync() {
      var go = q("[data-adlib-go]", root);
      var ready = S.brand.trim().length > 0;
      if (!go) return;
      go.href = url();
      go.style.background = ready ? VOLT : "#232320";
      go.style.color = ready ? "#0A0A0A" : "#8A8A82";
      go.style.pointerEvents = ready ? "" : "none";
      var note = q("p", root);
      if (note) note.textContent = ready
        ? "Opens Meta in a new tab, filtered to ads running now."
        : "Type a business name to build the link. It opens Meta — nothing is sent to us.";
    }

    render();
  }

  /* ------------------------------------------------- short lead capture */

  /* The five-question quiz at /apply is the considered door. This is the quick
     one: email, website, budget, and which product they're after. Four fields
     on one screen, no steps, no progress bar. It exists because the numbers are
     published now — somebody who has read the price and wants a time should not
     have to answer five questions to ask for one.

     Same endpoint, same honeypot, same first-touch as the long form, so a lead
     from here is indistinguishable downstream except by `source`. */
  function setupShortForm(root, source) {
    if (!root) return;

    var SPENDS = ["Under $3,000", "$3,000 – $10,000", "$10,000 – $30,000",
      "$30,000 – $100,000", "Over $100,000"];
    var WANTS = ["Not sure yet — talk it through", "The setup, $19,500",
      "The daily decisions, $2,500 a month", "Creative packages, from $5,000",
      "Custom, end to end", "Marketing automation, quoted",
      "The free systems audit — see if I qualify"];

    var S = { email: "", website: "", spend: "", want: "", hp: "",
      tried: false, sending: false, sent: false, failed: false };

    /* Two columns of four fields is comfortable on a laptop and cramped on a
       phone, so the grid collapses rather than shrinking the inputs. */
    var ONE_COL = window.matchMedia("(max-width: 620px)");

    var INPUT = "background:#161613; border:1px solid #6B6B63; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px; width:100%; min-width:0;" +
      "box-sizing:border-box;";
    var LABEL = "font-size:12px; font-weight:600; letter-spacing:0.08em;" +
      "text-transform:uppercase; color:#B5B5AD;";

    function field(label, inner) {
      return '<div style="display:flex; flex-direction:column; gap:8px; min-width:0;">' +
        '<span style="' + LABEL + '">' + esc(label) + '</span>' + inner + '</div>';
    }
    function select(key, placeholder, list) {
      return '<select data-call-field="' + key + '" style="' + INPUT + '">' +
        '<option value="">' + esc(placeholder) + '</option>' +
        list.map(function (o) {
          return '<option' + (S[key] === o ? ' selected' : '') + '>' + esc(o) + '</option>';
        }).join("") + '</select>';
    }

    function render() {
      if (S.sent) {
        root.innerHTML = '<p style="margin:0; max-width:52ch; font-size:19px; line-height:1.6; color:#F7F7F5;">' +
          'Got it. Josh replies within a business day with a time.</p>';
        return;
      }
      var ok = /.+@.+\..+/.test(S.email);
      root.innerHTML =
        '<div style="display:grid; grid-template-columns:repeat(' + (ONE_COL.matches ? 1 : 2) + ',minmax(0,1fr)); gap:18px;">' +
        field("Work email", '<input type="email" data-call-field="email" value="' + esc(S.email) +
          '" placeholder="you@yourbusiness.com.au" autocomplete="email" style="' + INPUT + '">') +
        field("Website", '<input type="text" data-call-field="website" value="' + esc(S.website) +
          '" placeholder="yourbusiness.com.au" autocomplete="url" style="' + INPUT + '">') +
        field("Monthly ad spend", select("spend", "Choose a range", SPENDS)) +
        field("What you're after", select("want", "Choose one", WANTS)) +
        '</div>' +
        '<div aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;">' +
        '<input type="text" tabindex="-1" autocomplete="off" data-call-field="hp" name="hp-no-autofill"></div>' +
        '<div style="margin-top:24px; display:flex; flex-wrap:wrap; gap:16px; align-items:center;">' +
        '<button type="button" data-call-send' + (S.sending ? " disabled" : "") +
        ' style="background:' + VOLT + '; color:#0A0A0A; border:none; font-family:inherit;' +
        'font-size:17px; font-weight:600; padding:16px 28px; border-radius:4px; cursor:' +
        (S.sending ? "default" : "pointer") + ';">' +
        (S.sending ? "Sending…" : S.failed ? "Try again" : "Apply") + '</button>' +
        '<span style="font-size:14px; line-height:1.6; color:#B5B5AD;">Takes about twenty seconds.</span>' +
        '</div>' +
        '<p style="margin:16px 0 0; max-width:56ch; font-size:14px; line-height:1.6; color:' +
        (S.tried && !ok ? "#D8FF00" : S.failed ? "#FF6B5A" : "#B5B5AD") + ';">' +
        (S.tried && !ok
          ? "That email address does not look right — it is the only way we can reply."
          : S.failed
            ? "That did not go through. Try again in a moment."
            : "One reply from a person. No sequence, no newsletter, no calendar to wrestle with.") +
        '</p>';
      wire();
    }

    function wire() {
      qa("[data-call-field]", root).forEach(function (el) {
        if (el.value && !S[el.dataset.callField]) S[el.dataset.callField] = el.value;
        el.addEventListener("input", function () { S[el.dataset.callField] = el.value; });
        el.addEventListener("change", function () { S[el.dataset.callField] = el.value; });
      });
      var btn = q("[data-call-send]", root);
      if (btn) btn.addEventListener("click", function () {
        qa("[data-call-field]", root).forEach(function (el) { S[el.dataset.callField] = el.value; });
        S.tried = true;
        if (!/.+@.+\..+/.test(S.email)) return render();
        S.sending = true; S.failed = false; render();
        var body = new URLSearchParams({
          email: S.email, website: S.website, spend: S.spend, want: S.want,
          source: source, partial: "no",
          page: location.href,
          landing: firstTouch().landing || "",
          referrer: firstTouch().referrer || "",
          utm: firstTouch().utm || "",
          company_url: S.hp
        });
        fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString()
        }).then(function (res) {
          if (!res.ok) { S.sending = false; S.failed = true; return render(); }
          S.sending = false; S.sent = true; render();
        }).catch(function () { S.sending = false; S.failed = true; render(); });
      });
    }

    render();
    if (ONE_COL.addEventListener) ONE_COL.addEventListener("change", function () { if (!S.sent) render(); });
  }

  function setupPricingCall() {
    setupShortForm(q("#pricing-call-root"), "pricing-call");
    setupShortForm(q("#book-root"), "book");
  }

  /* --------------------------------------------------------- first touch */

  /* A lead used to arrive saying "Submitted from: /apply", because that is where
     the form is. It said nothing about which of the sixty-odd pages actually
     earned the application, which made it impossible to tell whether the work
     was paying off anywhere in particular.

     So the first page of a visit is recorded once, in sessionStorage, and
     travels with the application. sessionStorage rather than a cookie because
     it needs no banner, dies with the tab, and never leaves the browser except
     as three short strings attached to an application the person chose to send.

     Wrapped in try/catch throughout: private windows and locked-down browsers
     throw on the accessor itself, and a lead is worth more than its source. */
  var TOUCH = "sevenam:first-touch";

  function recordFirstTouch() {
    try {
      if (sessionStorage.getItem(TOUCH)) return;
      var q = new URLSearchParams(location.search);
      var utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map(function (k) { return q.get(k); })
        .filter(Boolean)
        .join(" / ");
      sessionStorage.setItem(TOUCH, JSON.stringify({
        landing: location.pathname,
        /* Same-origin referrers are internal navigation, not a source. */
        referrer: (document.referrer && document.referrer.indexOf(location.origin) !== 0)
          ? document.referrer : "",
        utm: utm
      }));
    } catch (e) { /* storage unavailable — the lead still sends without it */ }
  }

  function firstTouch() {
    try { return JSON.parse(sessionStorage.getItem(TOUCH)) || {}; }
    catch (e) { return {}; }
  }

  /* ------------------------------------------------------- case study cards */
  /* Forcing the case-study strip to one column stopped Safari slicing the second
     card off the screen, and replaced that bug with a worse one: 2,606px of
     stacked cards on a 390px phone, which is most of a thumb-scroll of the same
     three stories. Shorter cards were the actual ask.

     So below the strip's own breakpoint each card keeps its name and its headline
     number — the part worth scanning — and folds the paragraph and the stat rows
     behind a toggle. The two shapes on the page are handled by counting children
     rather than by adding markup hooks: the small cards are
     [header, figure, paragraph, stats] and fold from index 2, the wide panel is
     [body, stats sub-panel] and folds its second half. index.html is
     hand-authored and this is presentation, so it is built here and the HTML
     stays as it is — which also means with JS off every card is simply whole.

     Everything is restored above the breakpoint, because on a desktop the cards
     are already short and a click to read three lines is friction, not a saving. */
  function setupCaseCards() {
    var cards = qa('[data-placeholder="case-study"]');
    if (!cards.length || !window.matchMedia) return;
    var mq = window.matchMedia("(max-width: 719px)");

    /* Each entry is [parent, children-to-fold]. Folding has to happen inside the
       element the content already sits in, or it loses that element's padding and
       renders full-bleed — which is why this returns groups rather than a flat
       list. Two known shapes; anything else is left whole rather than guessed at. */
    function groupsOf(card) {
      var kids = [].slice.call(card.children);
      if (kids.length === 4) {
        /* Small card: header, headline figure, paragraph, stat rows. */
        return [[card, kids.slice(2)]];
      }
      if (kids.length === 2) {
        /* Wide panel: a padded text half and a stats sub-panel. Keep the name and
           the headline, fold the paragraph, the stat rows and the source line,
           then fold the whole second half. */
        var inner = [].slice.call(kids[0].children);
        var out = [];
        if (inner.length > 2) out.push([kids[0], inner.slice(2)]);
        out.push([card, [kids[1]]]);
        return out;
      }
      return [];
    }

    function build(card, i) {
      if (card._csBtn) return;
      var groups = groupsOf(card);
      if (!groups.length) return;
      /* A dark card needs light text on the button. A button does not inherit
         colour — the UA sheet gives it buttontext — so it is set explicitly. */
      var dark = /rgb\(10, 10, 10\)/.test(card.style.background || "");
      var wraps = [];
      groups.forEach(function (g, n) {
        var wrap = document.createElement("div");
        wrap.id = "cs-body-" + i + "-" + n;
        /* The parents are flex columns with a gap, and a stats block inside one of
           them carries margin-top: auto. Re-parenting into a plain div would lose
           both, so the wrapper repeats the column and the gap. */
        wrap.style.cssText = "display: flex; flex-direction: column; gap: 18px;";
        g[1].forEach(function (el) { wrap.appendChild(el); });
        g[0].appendChild(wrap);
        wraps.push(wrap);
      });
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-controls", wraps.map(function (w) { return w.id; }).join(" "));
      btn.style.cssText =
        "width: 100%; background: none; border: none; padding: 12px 0px 0px; margin: 0px;" +
        "font-family: inherit; font-size: 15px; font-weight: 600; text-align: left;" +
        "cursor: pointer; display: flex; align-items: center; justify-content: space-between;" +
        "gap: 16px; color: " + (dark ? "rgb(216, 255, 0)" : "rgb(10, 10, 10)") + ";";
      var label = document.createElement("span");
      var sign = document.createElement("span");
      sign.setAttribute("aria-hidden", "true");
      sign.style.cssText = "font-size: 20px; font-weight: 400; line-height: 1;";
      btn.appendChild(label);
      btn.appendChild(sign);
      /* On the wide panel the button belongs beside the headline it expands, not
         under a sub-panel that is itself folded away. */
      (card.children.length === 2 ? card.children[0] : card).appendChild(btn);
      card._csBtn = btn;
      card._csWraps = wraps;

      var open = false;
      function paint() {
        wraps.forEach(function (w) { w.style.display = open ? "" : "none"; });
        label.textContent = open ? "Show less" : "Read what happened";
        sign.textContent = open ? "\u2212" : "+";
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
      paint();
      btn.addEventListener("click", function () { open = !open; paint(); });
    }

    function teardown(card) {
      if (!card._csBtn) return;
      /* Put the children back where they were, in order, before the button. */
      while (card._csWrap.firstChild) card.insertBefore(card._csWrap.firstChild, card._csWrap);
      card.removeChild(card._csWrap);
      card.removeChild(card._csBtn);
      card._csBtn = null;
      card._csWrap = null;
    }

    function apply() {
      cards.forEach(function (card, i) {
        if (mq.matches) build(card, i); else teardown(card);
      });
    }
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (mq.addListener) mq.addListener(apply);
  }

  /* ------------------------------------------------------------------- init */
  function init() {
    recordFirstTouch();
    setupNavBand();
    setupReveals();
    setupParallax();
    setupDrift();
    setupHero();
    setupFaq();
    setupCalculator();
    setupCreativeCost();
    setupProducts();
    setupPricingCall();
    setupAdLibrary();
    setupNav();
    setupCalculators();
    setupGlossary();
    setupCaseCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
