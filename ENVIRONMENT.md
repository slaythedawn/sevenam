# Environment variables

Every variable below lives in the Vercel project, never in this repository.
This repo is public — anything written here is readable by everyone.

## Where to set them

1. **vercel.com** → the **sevenam** project → **Settings** → **Environment Variables**
2. **Add New** for each row in the table below
3. Tick **Production**. This is the step people miss, and a variable with only
   Preview ticked behaves exactly like one that was never set.
4. **Save**
5. **Deployments** → newest → **⋯** → **Redeploy**

Step 5 is not optional. **Vercel only exposes a variable to deployments built
after it was added.** Setting a key changes nothing on the live site until the
next build, which is why "I set it and nothing happened" is almost always this.

## The variables

Paste these values exactly.

| Name | Value | Required |
|---|---|---|
| `RESEND_API_KEY` | your Resend key, starts `re_` | Yes |
| `LEAD_TO` | `joshuapcck@gmail.com` | Yes — `/apply` breaks without it |
| `ONBOARD_TO` | `joshuapcck@gmail.com` | Yes — `/onboard` breaks without it |
| `LEAD_FROM` | *see "Turning on confirmations" below* | Only for auto-confirmations |
| `LEAD_REPLY_TO` | `joshuapcck@gmail.com` | Only for auto-confirmations |

There is deliberately **no default recipient in the code**. A default would mean
a real address sitting in a public repository, so the functions return 503
rather than guess.

### What `LEAD_FROM` changes

Unset, both functions send from Resend's shared sender, `onboarding@resend.dev`.
That sender can **only deliver to the address that owns the Resend account** —
`joshuapcck@gmail.com`. That is why both `_TO` variables above are that address,
and it works fine for leads reaching you.

It is also why auto-confirmations to the applicant stay off until `LEAD_FROM` is
set, and why leads cannot yet go to a team address, a client, or a CRM. All of
those need a verified sending domain — see below.

## Turning on the auto-confirmation

When somebody submits `/apply` or `/pricing-call` they get an automated
acknowledgement, so they know it arrived. **This is off until `LEAD_FROM` is
set**, and it is gated on purpose: from Resend's shared `onboarding@resend.dev`
sender, mail to anyone other than the Resend account owner does not get
delivered, so a confirmation would fail — or look like it worked and never
arrive. Rather than send into that, the function skips it and logs
`confirmation skipped, LEAD_FROM unset`.

To switch it on:

1. **resend.com → Domains → Add Domain** → `sevenam.com.au`
2. Add the DNS records Resend gives you at your registrar
3. Wait for the Domains page to read **Verified** — not "Pending"
4. Set `LEAD_FROM` = `Sevenam <hello@sevenam.com.au>` (angle brackets included)
5. Set `LEAD_REPLY_TO` = `joshuapcck@gmail.com`
6. Redeploy, then submit the form once with a *different* address than your own
   and confirm the acknowledgement lands

`LEAD_REPLY_TO` matters because `sevenam.com.au` has no MX record — a reply to
`hello@` bounces. With it set, replies to the confirmation reach your Gmail and
the email invites one. Leave it unset and the confirmation still sends, but drops
both the reply-to header and the line offering a reply, rather than inviting one
that bounces.

**Who gets a confirmation:** a completed `/apply` application, and a
`/pricing-call` request. **Not** a partial capture or an abandonment — those are
internal signals, and somebody still mid-quiz has not submitted anything.

It contains no booking link. It says Josh will reply with a time.

## Optional: send somewhere other than email

Set either of these and the matching function POSTs the lead as JSON instead of
emailing it. Useful for Zapier, Make, a Slack hook, or a CRM.

| Name | Effect |
|---|---|
| `LEAD_WEBHOOK` | `/apply` posts JSON here instead of emailing |
| `ONBOARD_WEBHOOK` | `/onboard` posts JSON here instead of emailing |

Email wins if both are configured. Worth switching to a webhook once volume
makes three emails per applicant annoying — the functions need no code change.

## Checking it worked

Open **https://sevenam.com.au/api/onboard** in a browser. It answers a GET with
a health check rather than an error:

```json
{ "ok": true, "delivery": "email", "ready": true, "build": "741b97e" }
```

| Field | What it means |
|---|---|
| `delivery` | `email` = Resend wired · `webhook` = falling back · **`none` = not configured** |
| `ready` | `false` means a submission would fail right now |
| `build` | The commit serving. If it is not the one you just deployed, you are looking at a stale build — redeploy |

It reports **no variable name, no value and not the from address** — only
whether delivery is wired. Nothing here is useful to an attacker.

It catches the failure that is otherwise invisible from outside: an API key set
with **no recipient** reports `none`, which used to look identical to fully
working.

Then submit the live form once. Only a real submission proves delivery.

## What each form sends you

Both label their emails so a half-finished enquiry is never mistaken for a
completed one.

| Subject | Means |
|---|---|
| `Enquiry started — <email>` | `/apply` captured an email; they are still going |
| `Abandoned — Question 3 — …` | They left mid-quiz, at the named question |
| `Application — <business>` | `/apply` completed |
| `Pricing call — <email>` | `/pricing-call` request |
| `Onboarding (unfinished)` | `/onboard` partial, via "finish later" |
| `Onboarding abandoned at section N` | Client stalled, at the named section |
| `Onboarding — <business>` | `/onboard` completed |

And what the submitter gets, once `LEAD_FROM` is set:

| Subject | Sent when |
|---|---|
| `Your pricing call — Sevenam` | `/pricing-call` request |
| `We have your application — Sevenam` | `/apply` completed |

## If something is wrong

**"That didn't go through" on the form.** The response carries a `seen` list
naming which of the variable names above the function can actually see. That
separates a misspelled name from an unticked Production box from a stale build,
without opening the dashboard.

**Form says success but no email.** Check spam first — `onboarding@resend.dev`
is a shared sender and lands there often. Then **resend.com → Emails**, which
logs every send attempt with its status and failure reason. If the send is not
listed at all, the function never reached Resend, which points at the API key.

**Nothing in the Vercel runtime logs.** Expected. This project is on the Hobby
plan, where runtime logs are live-only and not retained for querying. To capture
one, open the project's **Logs** tab and leave it streaming *while* you submit.
