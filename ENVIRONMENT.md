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
| `LEAD_FROM` | *leave unset for now* | No — see below |

There is deliberately **no default recipient in the code**. A default would mean
a real address sitting in a public repository, so the functions return 503
rather than guess.

### Why `LEAD_FROM` is left unset

Unset, both functions send from Resend's shared sender, `onboarding@resend.dev`.
That sender can **only deliver to the address that owns the Resend account** —
`joshuapcck@gmail.com`. That is why both `_TO` variables above are that address.

It works, and it is fine while you are the only recipient.

**The day you want leads going anywhere else** — a team address, a CRM, a client
— set:

```
LEAD_FROM = Sevenam <hello@sevenam.com.au>
```

Format matters: `Name <address>`, angle brackets included. A bare address sends
fine but displays as raw text in most inboxes.

This requires `sevenam.com.au` to be a **verified domain** in Resend first
(resend.com → Domains → Add Domain, then add the DNS records it gives you).
Setting `LEAD_FROM` to an unverified domain makes every send fail. Check the
Domains page reads *Verified* before you set it.

It is a *sending identity*, not a mailbox — no inbox needs to exist behind it,
and nothing on the site ever displays it, so it does not conflict with the rule
that no email address appears anywhere on the site.

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
