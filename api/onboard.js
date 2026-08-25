/* Receives a client onboarding intake from /onboard and delivers it to Josh.

   Sibling of api/lead.js and deliberately built the same way — no dependencies,
   global fetch, module.exports — so the repository's no-build-step rule holds.

   Two things make it different from a lead:

   1. It arrives with a token. Each client gets their own link
      (/onboard?c=<token>), the token rides along with the submission, and it is
      how a set of answers is matched to the deal it belongs to. The token is an
      unguessable identifier, not authentication — it protects against a stray
      submission being unattributable, not against a determined attacker. There
      is nothing here worth attacking: the form only collects, it never displays.

   2. It can arrive unfinished. The form has a "finish later" button, because
      section 2 asks for margin and close rate and most people do not have those
      to hand. A partial submission is a useful signal — it says which section
      they reached — so it is delivered rather than dropped, flagged clearly so
      it is never mistaken for a completed intake.

   Delivery order, all set in the Vercel project and never in the repo:

     RESEND_API_KEY    send as email through Resend
     ONBOARD_TO        recipient. Falls back to LEAD_TO. Required for email —
                       no default, because this repository is public
     ONBOARD_WEBHOOK   POST as JSON instead. Falls back to LEAD_WEBHOOK
     LEAD_FROM         sender, shared with the lead function

   With none set this returns 503 and the page keeps the answers on screen. */

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      /* Ten textareas of considered answers is legitimately large. Well past
         any real intake, still far short of a payload worth worrying about. */
      if (raw.length > 262144) reject(new Error('too large'));
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

function parse(req, raw) {
  const type = String(req.headers['content-type'] || '');
  if (type.indexOf('application/json') === 0) {
    try { return JSON.parse(raw); } catch (e) { return {}; }
  }
  const out = {};
  new URLSearchParams(raw).forEach((value, key) => { out[key] = value; });
  return out;
}

/* Grouped so the email reads in the same order the client answered, which
   makes it possible to follow their reasoning rather than just their data. */
const SECTIONS = [
  ['The business', [
    ['business_name', 'Business'], ['website', 'Website'],
    ['what_you_sell', 'Sells'], ['revenue_model', 'Revenue model'],
    ['decision_maker', 'Signs off'], ['markets', 'Markets'],
  ]],
  ['The numbers', [
    ['aov', 'Average order value'], ['gross_margin', 'Gross margin %'],
    ['close_rate', 'Lead close rate %'], ['repeat_purchases', 'Repeat purchases / yr'],
    ['payback_window', 'Payback window'], ['profit_share', 'Profit share to spend %'],
    ['monthly_budget', 'Monthly budget'], ['budget_flex', 'Budget flexibility'],
  ]],
  ['The offer', [
    ['destination', 'Destination'], ['offer', 'Offer'], ['incentive', 'Incentive'],
    ['after_convert', 'After conversion'], ['main_objection', 'Main objection'],
  ]],
  ['The customer', [
    ['best_customer', 'Best customer'], ['not_customer', 'Not a customer'],
    ['trigger', 'Trigger'], ['competitors', 'Competitors'], ['customer_words', 'In their words'],
  ]],
  ['History', [
    ['ran_before', 'Ran Meta before'], ['past_spend_result', 'Past spend & result'],
    ['what_worked', 'What worked'], ['other_channels', 'Other channels'],
    ['others_in_account', 'Others in account'],
  ]],
  ['Assets', [
    ['asset_video', 'Has video'], ['asset_photo', 'Has photography'],
    ['asset_product', 'Has product shots'], ['asset_brand', 'Has brand guidelines'],
    ['can_supply_ugc', 'Can supply UGC'], ['creative_approver', 'Creative approver'],
  ]],
  ['Constraints', [
    ['special_category', 'Special ad category'], ['regulated_claims', 'Regulated claims'],
    ['never_say', 'Never say'], ['seasonality', 'Seasonality / capacity'],
    ['spend_ceiling', 'Spend ceiling'],
  ]],
  ['Measurement', [
    ['pixel_installed', 'Pixel / CAPI'], ['success_event', 'Success event'],
    ['crm', 'Source of truth'], ['can_share_value', 'Can share customer value'],
  ]],
  ['Access', [
    ['access_granted', 'Says access granted'], ['client_bm_id', 'Their BM ID'],
  ]],
  ['Working agreement', [
    ['contact_name', 'Contact'], ['contact_email', 'Email'],
    ['contact_channel', 'Channel'], ['reporting_frequency', 'Reporting'],
    ['approval_preference', 'Approves'], ['success_90d', 'Success in 90 days'],
  ]],
];

const META = [['token', 'Token'], ['partial', 'Partial'],
  ['section_reached', 'Reached section'], ['page', 'Submitted from'],
  ['abandoned', 'Abandoned'], ['suspected_bot', 'Flagged']];

/* The same derivation the form shows the client, recomputed here so the
   delivered intake carries the numbers rather than depending on what the
   browser happened to render. Mirrors templates/intake-form.md in the ops
   repo — change both together. */
function derive(d) {
  const n = (k) => { const v = parseFloat(d[k]); return isFinite(v) ? v : 0; };
  const aov = n('aov'), margin = n('gross_margin') / 100, share = n('profit_share') / 100;
  if (!(aov > 0 && margin > 0 && share > 0)) return null;

  const contribution = aov * margin;
  const target = contribution * share;
  const repeat = n('repeat_purchases');
  const close = n('close_rate') / 100;
  const budget = n('monthly_budget');

  const out = {
    contribution_per_sale: contribution,
    breakeven_cpa: contribution,
    target_cpa: target,
    breakeven_roas: 1 / margin,
  };
  if (repeat > 1) out.lifetime_contribution = contribution * repeat;
  if (close > 0) {
    out.value_per_lead = contribution * close;
    out.target_cpl = target * close;
  }
  if (budget > 0) {
    /* Divide by whatever Meta will actually optimise to. For a lead-gen
       account that is the lead, not the closed customer — using cost per
       customer here understates weekly volume by the close rate and would
       wrongly flag a viable account as too small to learn. */
    const optimised_cost = out.target_cpl || target;
    out.conversions_per_week = (budget / optimised_cost) / 4.33;
    /* An ad set needs roughly 50 optimisation events a week to leave the
       learning phase. Below that the structure cannot stabilise, and no
       amount of skill fixes it — so it is flagged before the engagement
       starts rather than discovered a month in. */
    out.below_learning_threshold = out.conversions_per_week < 50;
  }
  return out;
}

const money = (v) => '$' + Math.round(v).toLocaleString('en-AU');

/* Checkboxes post the literal string "yes". Fine as a wire value, scruffy in a
   document someone reads — so it is capitalised at the point of display only. */
const pretty = (v) => (v === 'yes' ? 'Yes' : String(v));

function deriveLines(x) {
  if (!x) return [];
  const l = [
    'Profit per sale:      ' + money(x.contribution_per_sale),
    'Break-even CPA:       ' + money(x.breakeven_cpa),
    'TARGET CPA:           ' + money(x.target_cpa),
    'Break-even ROAS:      ' + x.breakeven_roas.toFixed(2) + 'x',
  ];
  if (x.lifetime_contribution) l.push('12-month profit:      ' + money(x.lifetime_contribution));
  if (x.target_cpl) l.push('Target cost per lead: ' + money(x.target_cpl));
  if (x.conversions_per_week !== undefined) {
    l.push('Conversions / week:   ' + x.conversions_per_week.toFixed(1) +
      (x.below_learning_threshold ? '   << below the ~50/wk learning threshold' : ''));
  }
  return l;
}

function textOf(d) {
  const parts = [];
  if (d.partial === 'yes') {
    parts.push('*** UNFINISHED — they stopped at section ' + (d.section_reached || '?') +
      ' of 10 and asked to finish later. ***\n');
  }
  const x = derive(d);
  if (x) parts.push('DERIVED\n' + deriveLines(x).map((s) => '  ' + s).join('\n') + '\n');

  SECTIONS.forEach(([title, fields]) => {
    const rows = fields.filter(([k]) => d[k]).map(([k, label]) => '  ' + label + ': ' + pretty(d[k]));
    if (rows.length) parts.push(title.toUpperCase() + '\n' + rows.join('\n'));
  });
  const meta = META.filter(([k]) => d[k]).map(([k, label]) => '  ' + label + ': ' + d[k]);
  if (meta.length) parts.push('META\n' + meta.join('\n'));
  return parts.join('\n\n');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));
}

function htmlOf(d) {
  const H = [];
  H.push('<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0A0A0A">');
  if (d.partial === 'yes') {
    H.push('<p style="margin:0 0 16px;padding:10px 14px;background:#FFF4E5;border-left:3px solid #D97706">' +
      '<strong>Unfinished.</strong> Stopped at section ' + escapeHtml(d.section_reached || '?') +
      ' of 10 and asked to finish later.</p>');
  }
  const x = derive(d);
  if (x) {
    H.push('<div style="margin:0 0 20px;padding:14px 16px;background:#0A0A0A;color:#F7F7F5;border-radius:8px">');
    H.push('<p style="margin:0 0 8px;font-size:13px;color:#B5B5AD;text-transform:uppercase;letter-spacing:.06em">Derived</p>');
    H.push('<table style="border-collapse:collapse;font-size:15px">');
    H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Profit per sale</td><td style="color:#F7F7F5"><strong>' + money(x.contribution_per_sale) + '</strong></td></tr>');
    H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Break-even CPA</td><td style="color:#F7F7F5"><strong>' + money(x.breakeven_cpa) + '</strong></td></tr>');
    H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Target CPA</td><td><strong style="color:#D8FF00;font-size:17px">' + money(x.target_cpa) + '</strong></td></tr>');
    if (x.target_cpl) H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Target cost per lead</td><td><strong style="color:#D8FF00">' + money(x.target_cpl) + '</strong></td></tr>');
    H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Break-even ROAS</td><td style="color:#F7F7F5"><strong>' + x.breakeven_roas.toFixed(2) + 'x</strong></td></tr>');
    if (x.conversions_per_week !== undefined) {
      H.push('<tr><td style="padding:3px 18px 3px 0;color:#C9C9C2">Conversions / week</td>' +
        '<td style="color:' + (x.below_learning_threshold ? '#FF6B5A' : '#F7F7F5') + '"><strong>' +
        x.conversions_per_week.toFixed(1) +
        (x.below_learning_threshold ? ' — below the ~50/wk learning threshold' : '') +
        '</strong></td></tr>');
    }
    H.push('</table></div>');
  }
  /* Every cell states its own colour. Tables do not inherit colour in quirks
     mode, which plenty of email clients still render in — the derived panel
     shipped once with near-black figures on its black card because the value
     cells relied on inheriting from the wrapper.

     ONE table for every section, with the section headings as full-width rows
     inside it. A table per section lets each one auto-size its label column to
     its own longest label, so the value column starts somewhere different in
     every block — which is what shipped first and read as broken. */
  H.push('<table style="border-collapse:collapse;width:100%;max-width:640px">');
  SECTIONS.forEach(([title, fields]) => {
    const rows = fields.filter(([k]) => d[k]);
    if (!rows.length) return;
    H.push('<tr><td colspan="2" style="padding:22px 0 6px;font-size:13px;color:#55554F;' +
      'text-transform:uppercase;letter-spacing:.06em"><strong>' + escapeHtml(title) + '</strong></td></tr>');
    rows.forEach(([k, label]) => {
      H.push('<tr>' +
        '<td width="190" style="width:190px;padding:5px 16px 5px 0;color:#55554F;' +
        'white-space:nowrap;vertical-align:top">' + escapeHtml(label) + '</td>' +
        '<td style="padding:5px 0;vertical-align:top;color:#0A0A0A"><strong>' +
        escapeHtml(pretty(d[k])).replace(/\n/g, '<br>') + '</strong></td></tr>');
    });
  });
  H.push('</table>');
  const meta = META.filter(([k]) => d[k]);
  if (meta.length) {
    H.push('<p style="margin:24px 0 0;padding-top:12px;border-top:1px solid #E3E3DD;font-size:13px;color:#55554F">');
    H.push(meta.map(([k, label]) => escapeHtml(label) + ': ' + escapeHtml(d[k])).join(' &middot; '));
    H.push('</p>');
  }
  H.push('</div>');
  return H.join('');
}

async function sendEmail(d) {
  const to = process.env.ONBOARD_TO || process.env.LEAD_TO;
  const from = process.env.LEAD_FROM || 'Sevenam <onboarding@resend.dev>';
  const who = d.business_name || d.contact_name || 'new client';
  const tag = d.abandoned === 'yes'
    ? 'Onboarding abandoned at section ' + (d.section_reached || '?')
    : d.partial === 'yes' ? 'Onboarding (unfinished)' : 'Onboarding';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: d.contact_email || undefined,
      subject: tag + ' — ' + who,
      text: textOf(d),
      html: htmlOf(d),
    }),
  });
  if (!res.ok) throw new Error('resend ' + res.status + ' ' + (await res.text()).slice(0, 200));
}

async function sendWebhook(d) {
  const res = await fetch(process.env.ONBOARD_WEBHOOK || process.env.LEAD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({}, d, { derived: derive(d) })),
  });
  if (!res.ok) throw new Error('webhook ' + res.status);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  /* GET is a health check, not an error. Twice now, time has gone into
     "is the key reaching production" and "am I looking at a stale build" —
     both answerable from a browser, so they should be.

     It reports which delivery route the running build would take and which
     commit is serving. Never a variable name, never a value, never the from
     address: only whether delivery is wired, which leaks nothing an attacker
     can use and saves a dashboard trip every time. */
  if (req.method === 'GET') {
    const route = (process.env.RESEND_API_KEY && (process.env.ONBOARD_TO || process.env.LEAD_TO))
      ? 'email'
      : (process.env.ONBOARD_WEBHOOK || process.env.LEAD_WEBHOOK) ? 'webhook' : 'none';
    return res.status(200).json({
      ok: true,
      delivery: route,
      ready: route !== 'none',
      build: (process.env.VERCEL_GIT_COMMIT_SHA || 'unknown').slice(0, 7),
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let d;
  try {
    d = parse(req, await readBody(req));
  } catch (e) {
    return res.status(413).json({ ok: false, error: 'too_large' });
  }

  /* Logged FIRST, before any check that could discard this. An earlier version
     ran the honeypot above this line, so a trapped submission returned 200 and
     left no trace anywhere — the client saw a thank-you screen and the answers
     were gone. Silent data loss with a success screen is the exact failure this
     form exists to prevent. Nothing gets dropped without a log line. */
  console.log('onboard:', JSON.stringify(Object.assign({}, d, { derived: derive(d) })));

  /* A field no human sees and no human fills in — but browser autofill and
     password managers do, which is how a real intake got eaten once. So a trip
     is no longer fatal on its own: a submission carrying a link token came from
     someone we sent that link to, so it is delivered with a flag rather than
     discarded. Only an untokened trip — which is what an actual bot looks like,
     since the form is not linked from anywhere — is dropped. */
  if (d.hp_leave_blank) {
    if (!d.token) {
      console.log('onboard: honeypot tripped with no token, dropped');
      return res.status(200).json({ ok: true });
    }
    console.log('onboard: honeypot tripped but token present, delivering flagged');
    d.suspected_bot = 'yes — honeypot filled, likely autofill';
  }

  /* A partial is allowed to be sparse — that is the entire point of it. A
     finished intake is held to the fields every later decision depends on. */
  if (d.partial !== 'yes') {
    if (!d.business_name) return res.status(400).json({ ok: false, error: 'business_name_required' });
    if (!d.contact_email || !/.+@.+\..+/.test(d.contact_email)) {
      return res.status(400).json({ ok: false, error: 'email_required' });
    }
  } else if (!d.business_name && !d.contact_email && !d.token) {
    /* Nothing identifying at all — no way to attribute it, so nothing to send. */
    return res.status(400).json({ ok: false, error: 'nothing_to_save' });
  }

  try {
    if (process.env.RESEND_API_KEY && (process.env.ONBOARD_TO || process.env.LEAD_TO)) {
      await sendEmail(d);
    } else if (process.env.ONBOARD_WEBHOOK || process.env.LEAD_WEBHOOK) {
      await sendWebhook(d);
    } else {
      const seen = ['RESEND_API_KEY', 'ONBOARD_TO', 'LEAD_TO', 'ONBOARD_WEBHOOK', 'LEAD_WEBHOOK', 'LEAD_FROM']
        .filter((k) => process.env[k]);
      const build = (process.env.VERCEL_GIT_COMMIT_SHA || 'unknown').slice(0, 7);
      return res.status(503).json({ ok: false, error: 'no_delivery_configured', seen, build });
    }
  } catch (err) {
    console.error('onboard delivery failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'delivery_failed' });
  }

  return res.status(200).json({ ok: true });
};
