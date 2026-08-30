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
          if (state) { state.textContent = "Actioned"; state.style.color = "#55554F"; }
        }, 220 + i * 320);
      });
      hLater(function () {
        if (badge) { badge.textContent = "Done · 07:04"; badge.style.color = "#55554F"; }
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
      btn.style.border = "1px solid " + (active ? VOLT : "#232320");
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

  /* ------------------------------------------------------------- apply quiz */
  var QUESTIONS = [
    {
      key: "spend", label: "Ad spend",
      q: "What are you spending on Meta ads a month?",
      helper: "Media only — not fees, not creative. Round to the nearest ten thousand; we're sizing whether a daily decision has enough information to be worth making.",
      options: [
        { v: "under-3k", label: "Under $3,000", note: "Or nothing at the moment" },
        { v: "3-10k", label: "$3,000 – $10,000", note: "Enough to learn monthly, not daily" },
        { v: "10-30k", label: "$10,000 – $30,000", note: "Where a daily decision starts to pay" },
        { v: "30-100k", label: "$30,000 – $100,000", note: "Fees are now a real line item" },
        { v: "100k+", label: "Over $100,000", note: "A percentage fee is costing you six figures" }
      ]
    },
    {
      key: "who", label: "Who runs it",
      q: "Who runs the account today?",
      helper: "We're not asking so we can pitch against them. Plenty of checks end with us telling you to keep who you've got.",
      options: [
        { v: "agency-pct", label: "An agency on a percentage of spend", note: "The fee grew every time you scaled" },
        { v: "agency-flat", label: "An agency on a flat retainer", note: "Better structure, worth checking the effective rate" },
        { v: "freelancer", label: "A freelancer or contractor", note: "Usually cheap and usually part-time" },
        { v: "inhouse", label: "Someone in-house", note: "The system is built for exactly this" },
        { v: "nobody", label: "Nobody — it's paused or unmanaged", note: "Spending without anyone deciding" }
      ]
    },
    {
      key: "problems", label: "What's in the way", multi: true,
      q: "What's actually in the way?",
      helper: "Pick everything that's true. This decides what we'd fix in the first fortnight, not just what we'd sell you.",
      options: [
        { v: "creative", label: "We can't make creative fast enough", note: "Two concepts a month, if that" },
        { v: "decisions", label: "Nobody's making decisions daily", note: "Changes wait for a weekly meeting" },
        { v: "tracking", label: "We don't trust the numbers", note: "Tracking, attribution or reporting we can't verify" },
        { v: "fees", label: "Fees are eating the budget", note: "Paying a percentage on money you scaled yourself" },
        { v: "stalled", label: "Scaling has stalled", note: "More budget stopped producing more sales" },
        { v: "blind", label: "We don't know if any of it works", note: "No honest read on incrementality" }
      ]
    },
    {
      key: "operator", label: "Who approves",
      q: "Who approves the 7am decisions?",
      helper: "Each morning the system drafts the day's changes and somebody taps approve — about a minute. We action them from there. This one question decides which option we quote you.",
      options: [
        { v: "named", label: "A named person in-house", note: "Marketing coordinator, ecommerce manager, similar" },
        { v: "founder", label: "Me, the founder", note: "Common — it's a minute on your phone" },
        { v: "hiring", label: "We're hiring for it", note: "We can install ahead of them starting" },
        { v: "nobody", label: "Nobody — you decide and act", note: "Then the end-to-end option is what we'd quote" }
      ]
    },
    {
      key: "category", label: "Business",
      q: "What kind of business is it?",
      helper: "Ecommerce is where most of our work sits, but the system runs on any account with enough daily volume.",
      options: [
        { v: "ecom", label: "Ecommerce / DTC", note: "Shopify, WooCommerce, marketplace" },
        { v: "services", label: "Home services or trades", note: "Leads and booked jobs" },
        { v: "regulated", label: "Healthcare, NDIS or education", note: "Compliance shapes the creative" },
        { v: "retail", label: "Multi-location retail", note: "Local delivery across sites" },
        { v: "other", label: "B2B or something else", note: "Tell us in the notes" }
      ]
    }
  ];

  var VERDICTS = {
    fit: {
      tag: "Strong fit",
      title: "Start with a check, then install.",
      body: "Your spend is high enough for a daily decision to be worth making, and somebody will be there to approve it. That's the whole precondition.",
      why: "Send us these answers and Josh replies within a business day with a time to talk. On that call we look at the account, tell you what the setup would cost and whether you need a creative batch alongside it, and you leave with every figure in writing. Nothing to pay to have that conversation.",
      ctaLabel: "Read what's involved", ctaHref: "/install"
    },
    studio: {
      tag: "Strong fit · creative-led",
      title: "You have a production problem, not a targeting problem.",
      body: "At your spend, the binding constraint is how much distinct creative you can put in market. The system fixes the decisions; the monthly creative batch fixes the supply.",
      why: "We'd start with the check so the creative brief is built on what the account actually shows, then install, then run creative alongside it. We size the batch to your spend and quote one fixed monthly figure.",
      ctaLabel: "Read what's involved", ctaHref: "/install"
    },
    fees: {
      tag: "Strong fit · fee-led",
      title: "The first saving is on your invoice.",
      body: "You're paying a percentage on a budget you scaled yourself, and the work behind it didn't change. That's a structural problem no amount of optimisation fixes.",
      why: "Run the calculator to see the number in dollars a year, then send us your answers — we'll come back with what a fixed fee looks like against it, and whether the performance case is as strong as the fee case.",
      ctaLabel: "Read what's involved", ctaHref: "/install"
    },
    playbook: {
      tag: "Too early for the full system",
      title: "Start smaller than the setup.",
      body: "At this spend there isn't enough daily volume for a daily decision to earn its keep. We could sell you the setup and it still wouldn't be the right purchase.",
      why: "Send your answers anyway: usually the answer is a one-off batch of creative and two or three structural fixes, not a system. We'll tell you the spend level at which the rest becomes worth buying.",
      ctaLabel: "How to run it yourself", ctaHref: "/how-to-run-meta-ads-yourself"
    },
    endToEnd: {
      tag: "End to end",
      title: "You want the end-to-end option.",
      body: "Nobody in-house has the twenty minutes a day, so the decisions would arrive and nothing would happen. The end-to-end option exists for exactly this: we buy the media, make the creative and do the daily execution on your account.",
      why: "It's quoted after we've read the account, as one fixed monthly figure, priced to the work rather than your media budget, with no lock-in and your Business Manager staying yours. If you'd rather name an internal operator instead, the self-run version is cheaper and we'll say so.",
      ctaLabel: "Read what's involved", ctaHref: "/install"
    },
    tooSmall: {
      tag: "Not yet — and not from us",
      title: "None of this is the right purchase yet.",
      body: "Under about $3,000 a month there isn't enough daily volume for any of it to pay for itself. A system that reads your account every morning needs something to read.",
      why: "The honest answer is to spend the next few months on creative and offer, run the account yourself off our free guides, and come back when media spend is consistently past $10,000 a month. Send your answers if you'd like Josh to point you at the two or three things worth doing first — there's nothing to buy at the end of it.",
      ctaLabel: "How to run it yourself", ctaHref: "/how-to-run-meta-ads-yourself"
    }
  };

  function setupApply() {
    var root = q("#apply-root");
    if (!root) return;

    var S = {
      step: 0, answers: {}, problems: [],
      name: "", company: "", site: "", email: "", phone: "", note: "",
      /* hp is the honeypot: hidden from people, irresistible to bots. */
      hp: "",
      /* The email step comes first and posts on its own, so somebody who
         abandons at question three is a lead rather than nothing. Before this,
         five questions stood between a visitor and any data capture at all. */
      emailed: false, emailTried: false, skipped: false,
      tried: false, done: false, sent: false, sending: false, failed: false
    };
    var TOTAL = QUESTIONS.length + 2;

    function verdict() {
      var a = S.answers, p = S.problems;
      if (a.spend === "under-3k") return VERDICTS.tooSmall;
      if (a.operator === "nobody") return VERDICTS.endToEnd;
      if (a.spend === "3-10k") return VERDICTS.playbook;
      if (a.who === "agency-pct" && (a.spend === "30-100k" || a.spend === "100k+")) return VERDICTS.fees;
      if (p.indexOf("creative") > -1 && p.indexOf("fees") === -1) return VERDICTS.studio;
      if (p.indexOf("fees") > -1) return VERDICTS.fees;
      return VERDICTS.fit;
    }

    function labelFor(key, v) {
      var question = QUESTIONS.filter(function (x) { return x.key === key; })[0];
      var o = question && question.options.filter(function (x) { return x.v === v; })[0];
      return o ? o.label : "—";
    }

    function summary() {
      return [
        { k: "Monthly ad spend", v: labelFor("spend", S.answers.spend) },
        { k: "Runs the account", v: labelFor("who", S.answers.who) },
        { k: "In the way", v: S.problems.length
            ? S.problems.map(function (x) { return labelFor("problems", x); }).join(", ")
            : "Nothing selected" },
        { k: "Twenty minutes a day", v: labelFor("operator", S.answers.operator) },
        { k: "Business type", v: labelFor("category", S.answers.category) },
        { k: "Contact", v: (S.name || "—") + (S.company ? " · " + S.company : "") }
      ];
    }

    var OPT_BASE = "display:flex; flex-direction:column; gap:6px; align-items:flex-start; text-align:left;" +
      "border-radius:6px; padding:20px 22px; cursor:pointer; color:#F7F7F5; min-height:44px;" +
      "font-family:inherit; transition:border-color 0.2s ease, background 0.2s ease;";
    var INPUT = "background:#161613; border:1px solid #232320; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px;";
    var LABEL = "font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#B5B5AD;";
    var H1 = "margin:0; max-width:24ch; font-size:clamp(32px,4.6vw,58px); font-weight:600;" +
      "letter-spacing:-0.035em; line-height:1.05; color:#FFFFFF; text-wrap:balance;";
    var LINK_BTN = "background:none; border:none; color:#B5B5AD; font-size:15px; font-weight:500;" +
      "padding:12px 0; cursor:pointer; font-family:inherit; text-decoration:underline;";
    var STEP_IN = reduced ? "" : "animation:stepIn 0.45s " + EASE + " both;";
    /* Named so no browser autofill heuristic recognises it. A honeypot that
       autofill populates would silently discard real applications. Rendered on
       both posting steps, since the email step now posts on its own. */
    var HONEYPOT = '<div aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;">' +
      '<input type="text" tabindex="-1" autocomplete="off" data-field="hp" name="hp-no-autofill">' +
      '</div>';

    function chrome(stepLabel, stepCount, pct) {
      return '<div style="display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:14px;">' +
        '<span style="font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:' + VOLT + ';">' + esc(stepLabel) + '</span>' +
        '<span style="font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#55554F; font-variant-numeric:tabular-nums;">' + esc(stepCount) + '</span>' +
        '</div>' +
        '<div style="height:3px; background:#161613; border-radius:2px; overflow:hidden; margin-bottom:56px;">' +
        '<div style="height:3px; background:' + VOLT + '; border-radius:2px; transition:width 0.45s ' + EASE + '; width:' + pct + ';"></div>' +
        '</div>';
    }

    function render() {
      var emailOk = /.+@.+\..+/.test(S.email);
      var siteOk = (S.site || "").trim().length > 0;
      var onEmail = !S.emailed && !S.done;
      var onQuestion = S.emailed && S.step < QUESTIONS.length && !S.done;
      var onDetails = S.emailed && S.step === QUESTIONS.length && !S.done;
      var question = QUESTIONS[S.step];
      /* Nothing after the email step can block anything: the lead was captured
         the moment they pressed Start, so every field from here is enrichment. */
      var ready = true;
      var html;

      if (onEmail) {
        html = chrome("Get started", "Step 1 of " + TOTAL, Math.round((1 / TOTAL) * 100) + "%");
        html += '<div style="' + STEP_IN + '">' +
          '<h1 style="' + H1 + ' max-width:20ch;">Give us your email and we\'ll get started.</h1>' +
          '<p style="margin:20px 0 0; max-width:56ch; font-size:17px; line-height:1.7; color:#B5B5AD;">' +
          'That\'s all we need \u2014 you\'re through. Five optional questions after this get you a straight ' +
          'read on which product fits, or whether none of them do.</p>' +
          '<div style="margin-top:44px; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px;">' +
          field("email", "Email", "email", "you@yourstore.com.au") +
          field("name", "First name", "text", "Jordan", true) +
          '</div>' + HONEYPOT +
          '<div style="margin-top:36px; display:flex; align-items:center; gap:16px; flex-wrap:wrap;">' +
          '<button type="button" data-capture style="background:' + VOLT + ';' +
          'color:#0A0A0A; border:none; font-family:inherit; font-size:17px;' +
          'font-weight:600; padding:18px 28px; border-radius:4px; cursor:pointer;">Start</button>' +
          '</div>' +
          '<p style="margin:22px 0 0; max-width:58ch; font-size:14px; line-height:1.6; color:' +
          (S.emailTried && !emailOk ? "#D8FF00" : "#55554F") + ';">' +
          (S.emailTried && !emailOk
            ? "That email address does not look right \u2014 we have no other way to reply."
            : "One reply from a person. No list, no sequence, no sharing.") +
          '</p></div>';

      } else if (onQuestion) {
        html = chrome(question.label, "Step " + (S.step + 2) + " of " + TOTAL,
          Math.round(((S.step + 1) / TOTAL) * 100) + "%");
        html += '<div style="' + STEP_IN + '">' +
          '<h1 style="' + H1 + '">' + esc(question.q) + '</h1>' +
          '<p style="margin:20px 0 0; max-width:56ch; font-size:17px; line-height:1.7; color:#B5B5AD;">' + esc(question.helper) + '</p>' +
          '<div style="margin-top:44px; display:flex; flex-direction:column; gap:10px;">';
        question.options.forEach(function (o, i) {
          var active = question.multi
            ? S.problems.indexOf(o.v) > -1
            : S.answers[question.key] === o.v;
          html += '<button type="button" data-pick="' + esc(o.v) + '" ' +
            (question.multi ? 'aria-pressed="' + (active ? "true" : "false") + '" ' : "") +
            'style="' + OPT_BASE +
            "background:" + (active ? "#1C1F0A" : "#161613") + ";" +
            "border:1px solid " + (active ? VOLT : "#232320") + ';">' +
            '<span style="font-size:18px; font-weight:600; letter-spacing:-0.015em;">' + esc(o.label) + '</span>' +
            '<span style="font-size:15px; line-height:1.5; color:#B5B5AD;">' + esc(o.note) + '</span>' +
            '</button>';
        });
        html += '</div><div style="margin-top:36px; display:flex; align-items:center; gap:16px; flex-wrap:wrap;">';
        if (question.multi) {
          html += '<button type="button" data-next style="background:' + VOLT + '; color:#0A0A0A; border:none;' +
            'font-family:inherit; font-size:16px; font-weight:600; padding:16px 26px; border-radius:4px; cursor:pointer;">Continue</button>';
        }
        html += '<button type="button" data-back style="' + LINK_BTN + '">Back</button>';
        html += '<button type="button" data-skip style="' + LINK_BTN + '">Skip the questions</button>';
        html += '</div></div>';

      } else if (onDetails) {
        html = chrome("Your details", "Step " + (S.step + 2) + " of " + TOTAL,
          Math.round(((S.step + 1) / TOTAL) * 100) + "%");
        html += '<div style="' + STEP_IN + '">' +
          '<h1 style="' + H1 + ' max-width:22ch;">Where do we send the answer?</h1>' +
          '<p style="margin:20px 0 0; max-width:56ch; font-size:17px; line-height:1.7; color:#B5B5AD;">One reply within a business day, from a person, with a straight read on whether this fits. No sequence, no newsletter, no call booked without asking.</p>' +
          '<div style="margin-top:44px; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px;">' +
          field("site", "Website", "text", "yourstore.com.au") +
          field("email", "Email", "email", "you@yourstore.com.au") +
          field("company", "Business", "text", "Business name", true) +
          field("name", "Your name", "text", "Jordan Reid", true) +
          field("phone", "Phone", "tel", "04xx xxx xxx", true) +
          '</div>' +
          HONEYPOT +
          '<label style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">' +
          '<span style="' + LABEL + '">Anything we should know <span style="color:#55554F; font-weight:500; letter-spacing:0; text-transform:none;">optional</span></span>' +
          '<textarea rows="4" data-field="note" placeholder="Contract dates, who else is involved, what you\'ve already tried." ' +
          'style="' + INPUT + ' line-height:1.6; resize:vertical;">' + esc(S.note) + '</textarea>' +
          '</label>' +
          '<div style="margin-top:36px; display:flex; align-items:center; gap:16px; flex-wrap:wrap;">' +
          /* Always live. Browser autofill populates an input without firing the
             events this state is built from, so a button greyed out from that
             state told an applicant with every field filled that they could not
             continue — while the click handler, which reads the DOM, would have
             accepted it. Validation happens on click and says what is missing. */
          '<button type="button" data-submit style="background:' + VOLT + ';' +
          'color:#0A0A0A; border:none; font-family:inherit; font-size:17px;' +
          'font-weight:600; padding:18px 28px; border-radius:4px; cursor:pointer;">See what fits</button>' +
          '<button type="button" data-back style="' + LINK_BTN + '">Back</button>' +
          '</div>' +
          '<p style="margin:22px 0 0; max-width:58ch; font-size:14px; line-height:1.6; color:' +
          '#55554F;">' +
          "All optional — we already have your email. Anything you add here just means a sharper reply." +
          '</p></div>';

      } else if (S.skipped) {
        /* Skipping means no answers, and verdict() falls through to "Strong fit"
           when nothing is set — showing that to somebody who answered nothing
           would be telling them something we have not established. The lead was
           already captured at the email step, so there is nothing left to send:
           this is a confirmation, not a result. */
        html = chrome("You're in", "Complete", "100%");
        html += '<div style="' + (reduced ? "" : "animation:stepIn 0.5s " + EASE + " both;") + '">' +
          '<h1 style="' + H1 + ' max-width:22ch;">That\'s you through.</h1>' +
          '<p style="margin:24px 0 0; max-width:58ch; font-size:19px; line-height:1.65; color:#F7F7F5;">' +
          'Josh has your email and reads every one himself. Expect a reply within a business day.</p>' +
          '<p style="margin:20px 0 0; max-width:58ch; font-size:17px; line-height:1.7; color:#B5B5AD;">' +
          'If you would rather he arrived knowing something about the account, the five questions ' +
          'take under a minute and change what he can tell you.</p>' +
          '<div style="margin-top:44px; display:flex; flex-wrap:wrap; gap:12px;">' +
          '<button type="button" data-unskip style="background:' + VOLT + '; color:#0A0A0A; font-size:17px;' +
          'font-family:inherit; font-weight:600; padding:18px 28px; border-radius:4px; border:none; cursor:pointer;">' +
          'Answer them anyway</button>' +
          '<a href="/learn" style="border:1px solid #55554F; color:#F7F7F5; font-size:17px;' +
          'font-weight:600; padding:17px 28px; border-radius:4px;">Read something useful instead</a>' +
          '</div></div>';

      } else {
        var v = verdict();
        html = chrome("Your result", "Complete", "100%");
        html += '<div style="' + (reduced ? "" : "animation:stepIn 0.5s " + EASE + " both;") + '">' +
          '<span data-verdict style="display:inline-flex; align-items:center; gap:10px; background:' + VOLT + '; color:#0A0A0A;' +
          'font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; padding:7px 11px; border-radius:3px;">' + esc(v.tag) + '</span>' +
          '<h1 style="' + H1 + ' margin:26px 0 0; max-width:22ch;">' + esc(v.title) + '</h1>' +
          '<p style="margin:24px 0 0; max-width:58ch; font-size:19px; line-height:1.65; color:#F7F7F5;">' + esc(v.body) + '</p>' +
          '<p style="margin:20px 0 0; max-width:58ch; font-size:17px; line-height:1.7; color:#B5B5AD;">' + esc(v.why) + '</p>' +
          '<div style="margin-top:44px; border:1px solid #232320; border-radius:6px; padding:28px; background:#161613;">' +
          '<span style="' + LABEL + '">What you told us</span>' +
          '<div style="margin-top:18px; display:flex; flex-direction:column;">';
        summary().forEach(function (row) {
          html += '<div style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:8px 24px; border-top:1px solid #232320; padding:14px 0;">' +
            '<span style="font-size:15px; color:#B5B5AD;">' + esc(row.k) + '</span>' +
            '<span style="font-size:15px; font-weight:600; text-align:right;">' + esc(row.v) + '</span>' +
            '</div>';
        });
        html += '</div></div>' +
          '<div style="margin-top:36px; display:flex; flex-wrap:wrap; gap:12px;">' +
          '<button type="button" data-send' + (S.sent || S.sending ? ' disabled' : '') +
          ' style="background:' + VOLT + '; color:#0A0A0A; font-size:17px; font-family:inherit;' +
          'font-weight:600; padding:18px 28px; border-radius:4px; border:none; cursor:' +
          (S.sent || S.sending ? 'default' : 'pointer') + ';">' +
          (S.sent ? "Sent — thank you" : S.sending ? "Sending…" : S.failed ? "Try again" : "Send this to Josh") + '</button>' +
          '<a href="' + esc(v.ctaHref) + '" style="border:1px solid #55554F; color:#F7F7F5; font-size:17px;' +
          'font-weight:600; padding:17px 28px; border-radius:4px;">' + esc(v.ctaLabel) + '</a>' +
          '</div>' +
          '<p style="margin:24px 0 0; max-width:58ch; font-size:14px; line-height:1.6; color:#55554F;">' +
          (S.sent
            ? "Your answers are with Josh. He reads every one himself and replies within a business day with a time to talk — or a straight no."
            : S.failed
              ? "That did not go through. Your answers are still here — try again in a moment."
              : "Your answers stay in this browser until you send them. Josh reads every one himself and replies within a business day with a time to talk — or a straight no.") +
          '</p></div>';
      }

      root.innerHTML = html;
      wire();
    }

    function field(key, label, type, placeholder, optional) {
      return '<label style="display:flex; flex-direction:column; gap:10px;">' +
        '<span style="' + LABEL + '">' + esc(label) +
        (optional ? ' <span style="color:#55554F; font-weight:500; letter-spacing:0; text-transform:none;">optional</span>' : "") +
        '</span>' +
        '<input type="' + type + '" data-field="' + key + '" value="' + esc(S[key]) + '" placeholder="' + esc(placeholder) + '" style="' + INPUT + '">' +
        '</label>';
    }

    /* Nothing to fall back to and nothing lost by saying so: the answers stay on
       screen, and a request that reached the function at all was written to its
       log before delivery was attempted. */
    function failed() {
      S.sending = false;
      S.failed = true;
      render();
    }

    /* Fired the moment we have an email, before any question is asked. Somebody
       who abandons at question three is then still a lead rather than nothing,
       which is the entire reason the email step comes first.

       Deliberately fire-and-forget: a failed capture must never block the person
       from continuing, and the full submit at the end carries everything anyway.
       Marked partial so a half-finished enquiry is never mistaken for a
       completed one. */
    function capture() {
      var payload = new URLSearchParams({
        partial: "yes", email: S.email, name: S.name,
        page: location.href,
        landing: firstTouch().landing || "",
        referrer: firstTouch().referrer || "",
        utm: firstTouch().utm || "",
        company_url: S.hp
      });
      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString()
      }).catch(function () {});
    }

    function send(btn, v) {
      if (S.sent || S.sending) return;
      S.sending = true;
      render();

      var payload = new URLSearchParams({
        name: S.name, company: S.company, website: S.site, email: S.email,
        phone: S.phone, notes: S.note, verdict: v.tag, partial: "no",
        spend: labelFor("spend", S.answers.spend),
        who: labelFor("who", S.answers.who),
        problems: S.problems.map(function (x) { return labelFor("problems", x); }).join(", "),
        operator: labelFor("operator", S.answers.operator),
        category: labelFor("category", S.answers.category),
        page: location.href,
        landing: firstTouch().landing || "",
        referrer: firstTouch().referrer || "",
        utm: firstTouch().utm || "",
        company_url: S.hp
      });

      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString()
      }).then(function (res) {
        /* A 200 is the only thing that counts as delivered. Anything else —
           503 with no mail provider configured, 502 if the provider refused —
           means the lead is not with Josh, and saying otherwise loses it. */
        if (!res.ok) return failed();
        S.sending = false; S.sent = true; render();
      }).catch(function () {
        failed();
      });
    }

    /* Where somebody stopped, sent once as the tab goes away.

       navigator.sendBeacon rather than fetch: the browser commits to delivering
       a beacon during unload, where an ordinary request is routinely cancelled
       mid-flight — which would lose precisely the people this is measuring.
       visibilitychange and pagehide rather than beforeunload, which mobile
       Safari and Chrome on Android largely ignore.

       Only fires for somebody who started and did not finish. A completed
       application and a deliberate skip are both endings, not drop-offs. */
    var beaconSent = false;
    function beaconDropOff() {
      if (beaconSent || !S.emailed || S.sent || S.skipped) return;
      if (!navigator.sendBeacon) return;
      beaconSent = true;
      var label = S.step < QUESTIONS.length
        ? "Question " + (S.step + 1) + " — " + QUESTIONS[S.step].label
        : "Your details";
      var body = new URLSearchParams({
        partial: "yes", abandoned: "yes",
        step_reached: String(S.step + 2), step_label: label,
        email: S.email, name: S.name, page: location.href,
        landing: firstTouch().landing || "",
        referrer: firstTouch().referrer || "",
        utm: firstTouch().utm || ""
      }).toString();
      try {
        navigator.sendBeacon(LEAD_ENDPOINT,
          new Blob([body], { type: "application/x-www-form-urlencoded" }));
      } catch (e) { /* nothing to recover: the tab is going */ }
    }
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") beaconDropOff();
    });
    window.addEventListener("pagehide", beaconDropOff);

    function wire() {
      var question = QUESTIONS[S.step];
      qa("[data-pick]", root).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var v = btn.dataset.pick;
          if (question && question.multi) {
            var i = S.problems.indexOf(v);
            if (i > -1) S.problems.splice(i, 1); else S.problems.push(v);
          } else {
            S.answers[question.key] = v;
            S.step += 1;
          }
          render();
        });
      });
      var next = q("[data-next]", root);
      if (next) next.addEventListener("click", function () { S.step += 1; render(); });
      var capBtn = q("[data-capture]", root);
      if (capBtn) capBtn.addEventListener("click", function () {
        qa("[data-field]", root).forEach(function (el) { S[el.dataset.field] = el.value; });
        S.emailTried = true;
        if (!/.+@.+\..+/.test(S.email)) { render(); return; }
        S.emailed = true;
        capture();
        render();
      });
      var skip = q("[data-skip]", root);
      if (skip) skip.addEventListener("click", function () {
        S.skipped = true; S.done = true; render();
        root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
      var unskip = q("[data-unskip]", root);
      if (unskip) unskip.addEventListener("click", function () {
        S.skipped = false; S.done = false; render();
      });
      var back = q("[data-back]", root);
      if (back) back.addEventListener("click", function () {
        S.done = false;
        if (S.step === 0) S.emailed = false; else S.step -= 1;
        render();
      });
      qa("[data-field]", root).forEach(function (el) {
        /* Autofill can land before this runs and fires no event, so whatever is
           already in the field is adopted rather than assumed empty. */
        if (el.value && !S[el.dataset.field]) S[el.dataset.field] = el.value;
        el.addEventListener("input", function () { S[el.dataset.field] = el.value; });
        el.addEventListener("change", function () { S[el.dataset.field] = el.value; });
      });
      var submit = q("[data-submit]", root);
      if (submit) submit.addEventListener("click", function () {
        qa("[data-field]", root).forEach(function (el) { S[el.dataset.field] = el.value; });
        S.tried = true;
        S.done = true;
        render();
        root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
      var sendBtn = q("[data-send]", root);
      if (sendBtn) sendBtn.addEventListener("click", function () {
        send(sendBtn, verdict());
      });
    }

    render();
  }

  /* --------------------------------------------------- pricing call form */

  /* One field, because the whole point of this page is that it is not /apply.
     Somebody searching "facebook advertising packages" wants a price, not a
     five-question survey, and the fastest honest route to a price is a person
     replying. Same endpoint and same honeypot as /apply; `source` is what keeps
     the two apart in the inbox. */
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
      head.style.cssText = "width:100%; background:none; border:0; font-family:inherit; text-align:left;" +
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

      card.appendChild(head); card.appendChild(clip); card.appendChild(more);
      parts.push({ card: card, head: head, sign: sign, clip: clip, panel: panel,
                   fade: fade, more: more, open: false });
    });

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
          p.clip.style.height = p.open ? p.panel.scrollHeight + "px" : "0px";
          p.fade.style.display = "none";
          p.more.style.display = "";
          p.more.textContent = p.open ? "See less" : "See more";
          p.more.setAttribute("aria-expanded", p.open ? "true" : "false");
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
      parts.forEach(function (p) { p.head.style.minHeight = "0px"; });
      if (!stacked) {
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
      p.more.addEventListener("click", function () { p.open = !p.open; paint(); });
    });

    paint();
    if (STACK.addEventListener) STACK.addEventListener("change", paint);
    else if (STACK.addListener) STACK.addListener(paint);
    window.addEventListener("resize", paint);
  }

  function setupPricingCall() {
    var root = q("#pricing-call-root");
    if (!root) return;

    var S = { email: "", hp: "", tried: false, sending: false, sent: false, failed: false };
    var INPUT = "background:#161613; border:1px solid #232320; border-radius:4px; color:#F7F7F5;" +
      "font-family:inherit; font-size:17px; padding:15px 16px; flex:1 1 260px; min-width:0;";

    function render() {
      if (S.sent) {
        root.innerHTML = '<p style="margin:0; max-width:52ch; font-size:19px; line-height:1.6; color:#F7F7F5;">' +
          'Got it. Josh replies within a business day with a time \u2014 and the numbers ready.</p>';
        return;
      }
      var ok = /.+@.+\..+/.test(S.email);
      root.innerHTML =
        '<div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch;">' +
        '<input type="email" data-call-field="email" value="' + esc(S.email) + '" ' +
        'placeholder="you@yourbusiness.com.au" autocomplete="email" style="' + INPUT + '">' +
        '<button type="button" data-call-send' + (S.sending ? " disabled" : "") +
        ' style="background:' + VOLT + '; color:#0A0A0A; border:none; font-family:inherit;' +
        'font-size:17px; font-weight:600; padding:16px 28px; border-radius:4px; cursor:' +
        (S.sending ? "default" : "pointer") + ';">' +
        (S.sending ? "Sending\u2026" : S.failed ? "Try again" : "Request a call") + '</button>' +
        '</div>' +
        '<div aria-hidden="true" style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;">' +
        '<input type="text" tabindex="-1" autocomplete="off" data-call-field="hp" name="hp-no-autofill"></div>' +
        '<p style="margin:16px 0 0; max-width:52ch; font-size:14px; line-height:1.6; color:' +
        (S.tried && !ok ? "#D8FF00" : S.failed ? "#FF6B5A" : "#9A9A92") + ';">' +
        (S.tried && !ok
          ? "That email address does not look right \u2014 it is the only way we can reply."
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
          email: S.email, source: "pricing-call", partial: "no",
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
    setupApply();
    setupProducts();
    setupPricingCall();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
