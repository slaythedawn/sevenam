/* Receives a finished /apply quiz and delivers it to Josh.

   This exists so the visitor never has to open their own mail client. The old
   flow handed them a mailto: link on the result screen — which is a drop-off
   point twice over: it fails silently on any machine with no mail client
   configured, and it asks someone who has just answered five questions to
   perform a sixth, unrelated action in another application.

   No address appears in this file either. This repository is public, so a
   recipient hard-coded here would be as exposed as one in site.js — it comes
   from LEAD_TO in the Vercel project instead.

   Delivery is decided by whichever environment variable is set, checked in this
   order. All are set in the Vercel project, never in the repo:

     RESEND_API_KEY   send the lead as email through Resend. Requires LEAD_TO.
     LEAD_TO          who the email is addressed to. Required for the email
                      route — there is no default, because a default would mean
                      a real address sitting in a public repository.
     LEAD_WEBHOOK     POST the lead as JSON to a webhook (Zapier, Make, Slack).
     LEAD_FROM        the from address. Must be on a Resend-verified domain;
                      until sevenam.com.au is verified there, Resend's own
                      onboarding@resend.dev works and can only send to the
                      address that owns the Resend account, which is the case
                      here.

   With none of them set this returns 503. The page then shows "Try again" — there
   is no mailto fallback and no address in the client at all. */

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      /* A lead is a few hundred bytes. Anything past 64KB is not a lead. */
      if (raw.length > 65536) reject(new Error('too large'));
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

const FIELDS = [
  ['name', 'Name'], ['company', 'Company'], ['email', 'Email'], ['phone', 'Phone'],
  ['website', 'Website'], ['spend', 'Monthly spend'], ['who', 'Who runs it'],
  ['problems', 'Problems'], ['operator', 'Operator'], ['category', 'Business type'],
  ['verdict', 'Recommendation shown'], ['notes', 'Notes'], ['partial', 'Partial'],
  ['abandoned', 'Abandoned'], ['step_reached', 'Step reached'], ['step_label', 'Stopped at'],
  ['source', 'Source'],
  /* Where the visit started, not where the form is — see recordFirstTouch
     in site.js. Without these every lead reported /apply and said nothing
     about which page earned it. */
  ['landing', 'Landed on'], ['referrer', 'Came from'], ['utm', 'Campaign'],
  ['page', 'Submitted from'],
];

function textOf(lead) {
  return FIELDS
    .filter(([key]) => lead[key])
    .map(([key, label]) => label + ': ' + lead[key])
    .join('\n');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
  ));
}

function htmlOf(lead) {
  const rows = FIELDS
    .filter(([key]) => lead[key])
    .map(([key, label]) =>
      '<tr>' +
      '<td style="padding:6px 16px 6px 0;color:#55554F;white-space:nowrap;vertical-align:top">' + escapeHtml(label) + '</td>' +
      '<td style="padding:6px 0;color:#0A0A0A"><strong>' + escapeHtml(lead[key]) + '</strong></td>' +
      '</tr>')
    .join('');
  return '<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6">' +
    '<p style="margin:0 0 14px">New application from sevenam.com.au</p>' +
    '<table style="border-collapse:collapse">' + rows + '</table></div>';
}

async function sendEmail(lead) {
  const to = process.env.LEAD_TO;
  const from = process.env.LEAD_FROM || 'Sevenam <onboarding@resend.dev>';
  const who = lead.company || lead.name || lead.email || 'new enquiry';
  const tag = lead.source === 'pricing-call'
    ? 'Pricing call'
    : lead.abandoned === 'yes'
      ? 'Abandoned — ' + (lead.step_label || 'unknown step')
      : lead.partial === 'yes' ? 'Enquiry started' : 'Application';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      /* So a reply in the mail client goes to the applicant, not to Resend. */
      reply_to: lead.email || undefined,
      subject: tag + ' — ' + who,
      text: textOf(lead),
      html: htmlOf(lead),
    }),
  });

  if (!res.ok) throw new Error('resend ' + res.status + ' ' + (await res.text()).slice(0, 200));
}

async function sendWebhook(lead) {
  const res = await fetch(process.env.LEAD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error('webhook ' + res.status);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let lead;
  try {
    lead = parse(req, await readBody(req));
  } catch (e) {
    return res.status(413).json({ ok: false, error: 'too_large' });
  }

  /* Logged FIRST, before any check that could discard this. The honeypot used to
     run above this line, so a trapped submission returned 200 and left no trace
     anywhere — the visitor saw a thank-you and the application was gone. Nothing
     is dropped without a log line. */
  console.log('lead:', JSON.stringify(lead));

  /* A field no human sees and no human fills in. Bots fill in everything. */
  if (lead.company_url) {
    console.log('lead: honeypot tripped, dropped');
    return res.status(200).json({ ok: true });
  }

  /* Email is the only requirement, on a first-step capture and on a completed
     application alike. /apply captures the lead the moment an email is entered,
     before a single question — everything after that is enrichment, and none of
     it may block a submission. Four mandatory fields on top of a five-question
     survey cost more applications than the data was ever worth. */
  if (!lead.email || !/.+@.+\..+/.test(lead.email)) {
    return res.status(400).json({ ok: false, error: 'email_required' });
  }

  try {
    if (process.env.RESEND_API_KEY && process.env.LEAD_TO) {
      await sendEmail(lead);
    } else if (process.env.LEAD_WEBHOOK) {
      await sendWebhook(lead);
    } else {
      /* Nothing configured. Say so honestly rather than telling the applicant
         their answers were sent, which is the one thing that actually loses a
         lead — the page shows "Try again" and keeps the answers on screen.

         `seen` lists which of the names this function looks for are actually
         present — names only, never values. Setting a variable in Vercel but
         leaving the Production environment unticked, or misspelling the name,
         both look identical from outside otherwise. This disappears the moment
         a delivery route is configured. */
      const seen = ['RESEND_API_KEY', 'LEAD_WEBHOOK', 'LEAD_TO', 'LEAD_FROM']
        .filter((k) => process.env[k]);
      /* Which build answered. A variable only reaches deployments created after
         it was set, so "did the key not take" and "am I talking to the build
         from before I set it" are the two questions here, and this answers the
         second without a trip to the dashboard. */
      const build = (process.env.VERCEL_GIT_COMMIT_SHA || 'unknown').slice(0, 7);
      return res.status(503).json({ ok: false, error: 'no_delivery_configured', seen, build });
    }
  } catch (err) {
    console.error('lead delivery failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'delivery_failed' });
  }

  return res.status(200).json({ ok: true });
};
