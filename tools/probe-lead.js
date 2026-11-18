#!/usr/bin/env node
/* Is the lead form actually delivering?

     node tools/probe-lead.js

   The form is the only way anyone reaches Sevenam, and when it breaks it
   breaks silently: api/lead.js returns 502, the page shows "Try again", and
   nobody is told. On 17 November 2026 it had been doing exactly that with an
   invalid RESEND_API_KEY. Nothing on the site would ever have said so, and at
   current traffic it could have sat like that for months.

   So this posts a real submission and reads the status code, which is
   trustworthy: api/lead.js returns 200 only once a lead has genuinely been
   handed to Resend or to the webhook.

   The probe address is deliberately @sevenam.com.au. That domain has no MX
   record, so the applicant acknowledgement the function sends bounces and no
   third party ever receives anything. Do not point it at a real mailbox.

   Exit status is the whole point: 0 delivering, 1 not. That is what makes it
   usable from CI, where a non-zero exit is what raises the alarm.

   It deliberately does not try to name the cause from the response body. The
   502 body is just {"ok":false,"error":"delivery_failed"} — the provider's
   message is logged server-side and never sent to the client, which is right,
   since the client is the public. So the causes below are a checklist to read,
   not something matched against what came back. */

const ORIGIN = process.env.PROBE_ORIGIN || 'https://sevenam.com.au';
const ENDPOINT = ORIGIN + '/api/lead';

/* Both of these have actually happened. */
const KNOWN_CAUSES = `
  Known causes, both seen before:

  1. RESEND_API_KEY set but rejected ("API key is invalid"). Regenerate it in
     Resend, set it in Vercel under Settings > Environment Variables for
     Production, then REDEPLOY. Setting the variable alone changes nothing:
     Vercel only exposes a variable to deployments built after it was set.

  2. Resend refusing the recipient. The shared onboarding@resend.dev sender,
     used whenever LEAD_FROM is unset, only delivers to the Resend account
     owner's own address. Verify sevenam.com.au in Resend and set LEAD_FROM,
     or point LEAD_TO at the Resend account's own address.`;

async function main() {
  const body = new URLSearchParams({
    email: 'health-probe@sevenam.com.au',
    website: 'sevenam.com.au',
    spend: 'TEST',
    want: 'AUTOMATED HEALTH CHECK - please ignore',
    source: 'health-probe',
    partial: 'no',
  });

  let res, text;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    text = await res.text();
  } catch (err) {
    console.error(`UNREACHABLE  ${ENDPOINT}`);
    console.error(`  ${err && err.message}`);
    console.error('  The site may be down, or the network blocked the request.');
    process.exit(1);
  }

  if (res.status === 200) {
    console.log(`OK  ${ENDPOINT} delivered a lead (200).`);
    console.log('  One test enquiry has just landed in the inbox. That is the proof.');
    return;
  }

  console.error(`BROKEN  ${ENDPOINT} returned ${res.status}`);
  console.error(`  ${text.slice(0, 300)}`);

  if (res.status === 503) {
    console.error('\n  Nothing is configured to deliver. The body above lists which variable\n' +
                  '  names the running build can see, and which build answered. Set\n' +
                  '  RESEND_API_KEY and LEAD_TO (or LEAD_WEBHOOK) in Vercel, then redeploy.');
  } else if (res.status === 502) {
    console.error('\n  Delivery is configured but failing, which is the dangerous state:\n' +
                  '  visitors see "Try again" and nobody is told.\n' +
                  '\n  The real message is server-side. Read it with get_runtime_errors on the\n' +
                  '  Vercel project for route /api/lead, or in the function logs.');
    console.error(KNOWN_CAUSES);
  }

  process.exit(1);
}

main();
