# CLAUDE.md — Sevenam content system

Operating file for the LinkedIn and X content system. Scope is this `content/`
directory only. The repository root has its own `CLAUDE.md` for the marketing site;
both load when you work in here, and neither overrides the other.

Publishing goes through the Blotato MCP server. Scheduling goes through Blotato's
`scheduledTime`, not through a cron that posts.

---

## 1. Setup

**Already done.** The Blotato MCP server is registered at the account level, so its
tools are live in every session — including sessions a Routine fires. There is no
`.mcp.json` and no `.env` here on purpose: this repository is public, and the API key
lives in the Blotato account registration where it belongs. Do not add one.

Connected accounts, confirmed 27 Aug 2026:

| Platform | Account | id | Note |
|---|---|---|---|
| LinkedIn | Josh Peacock | 33954 | Personal profile. The Sevenam company page exists but Blotato cannot see it — see below. Omit `pageId` until it can. |
| X | @girlboyrobot | 25005 | |

Re-confirm with `blotato_list_accounts` if a post ever fails to schedule; a stale
cached connector session shows as connected and still errors.

### The LinkedIn company page is not connected

Blotato returns LinkedIn company pages as `subaccounts` on the account, and it returns
none. The page is not missing — the connection was authorised for member posting
(`w_member_social`) without the organisation scope, so Blotato has no handle to post to
the page with.

**Every LinkedIn post goes to Josh's personal profile until this is fixed**, whatever the
week plan says. There is no error; it simply posts to the wrong place.

To fix, in Blotato:

1. **Remove** the LinkedIn connection entirely. Do not use "reconnect" — a stale cached
   session survives it, which is the failure in the troubleshooting table below.
2. Re-add, and grant the organisation / company page permission at LinkedIn's consent
   screen. Josh must be Super admin or Content admin on the Sevenam page for it to be
   offered.
3. Run `blotato_list_accounts` again. The page comes back as a subaccount with an id.
   Record that id here. Nothing routes to it yet — see the decision below.

**Decided 27 Aug 2026: every LinkedIn slot goes to the personal profile.** The page stays
connected and correct for anyone who looks Sevenam up, and carries no scheduled posts.

Two reasons, in order. **The personal profile has 5,494 followers and the page has
roughly none** (27 Aug 2026), so a post to the page reaches nobody while costing the same
to write and approve. And the voice spec in section 6 is first person — Josh's own
decisions, his own concessions — which is personal-profile writing anyway.

The audience gap would have to close a long way before the first reason expires, and the
second does not expire at all. Reconnecting the page does not reopen this. If it ever
changes, it changes here first, and the week plan grows a channel column at the same time.

Same on X: everything goes to @girlboyrobot, posting as a person rather than as a brand.

### Audience, 27 Aug 2026

| Channel | Followers | Note |
|---|---|---|
| LinkedIn, Josh Peacock | 5,494 | 500+ connections, 197 profile views. The main lead channel |
| X, @girlboyrobot | 530 | Following 1,900. The ratio is worth fixing |
| LinkedIn, Sevenam page | ~0 | Not connected to Blotato, carries no posts |

LinkedIn is roughly ten times X and is where the buyers are. Weight effort accordingly:
the six LinkedIn slots matter more than the ten to fourteen X slots, even though X is
more of them.

### Before the first real post

The queue was empty as of 27 Aug 2026. Run these once, delete each afterwards:

1. Plain text to X, now.
2. Plain text to LinkedIn, now.
3. An image on both.
4. **A post scheduled twenty minutes out.** This is the one that matters, because the
   whole operating model rests on `scheduledTime` firing. Verify with
   `blotato_list_schedules`, then verify it actually published.
5. A LinkedIn document carousel, if you want that format.

**Media is not a local path.** Blotato takes public URLs in `mediaUrls`. Anything in
`assets/` is a staging area — upload through `blotato_create_presigned_upload_url`
first and pass the returned URL.

---

## 2. How it runs

Three routines. Only the drafting ones are scheduled, and none of them publishes.

| Routine | When | Interactive? | What it does |
|---|---|---|---|
| **Daily prep** | 06:15 Sydney, Routine | No | Drafts everything that can be drafted without you, leaves the 7am decision slot open, counts the angle bank. Publishes and schedules nothing. |
| **Daily scan** | 06:40 to 07:00 | Yes | You read one account, produce the 7am post, harvest angles |
| **7am session** | Straight after | Yes | You approve each post, Claude schedules them into Blotato at randomised times |
| **Weekly planning** | Friday 16:00 Sydney, Routine then interactive | Half | Routine drafts next week into `state/week-plan.md` at `pending_approval`. You approve in a session. |

**The 7am session cannot be automated.** It asks you for the day's real numbers and
needs your approval on each post. A Routine firing at 6:40 would have nobody to ask.
That is why the daily Routine drafts *around* the 7am slot and stops. It also has no Blotato
tools to schedule with, by design — see below.

**Publishing itself is never scheduled by you.** Blotato holds the queue and fires at
the time Claude wrote into it. There is no publishing cron to break.

### The Routines physically cannot reach Blotato

On a laptop the drafting run was fenced with `claude -p --allowedTools "Read,Write,Edit"`,
so it could not publish. The Routines keep that fence by a different route: **a Routine
fires a session with no MCP connector tools at all.** No `mcp__Blotato__*` exists in
those sessions. They can read, write, edit, run Bash and push, and that is the lot.

So the drafting Routines cannot publish even if a prompt were mangled or a state file
told them to. The prompts still say publish nothing, because belt and braces, but the
guarantee is structural.

Two consequences worth knowing:

- A Routine cannot read X metrics either, so `blotato_get_post_analytics` is out of
  reach on Friday. The learning loop was already yours to run, so this costs nothing.
- If you ever want a Routine that *can* reach Blotato, it has to be created from the
  claude.ai Routines UI rather than from a session. Do not. Guardrail 1 is the product's
  own principle applied to itself.

If you ever do find a Routine-fired session has scheduled something, treat it as
serious: check `blotato_list_schedules` and delete it with `blotato_delete_schedule`.

---

## 3. The 7am session

Run this in a session each morning, or save it as a custom command.

```
Run the 7am session.

1. Read state/week-plan.md and state/truth-file.md. Show me today's entries,
   including anything the daily Routine already drafted.

2. For each post marked [to draft], draft it now from state/angle-bank.md.
   For the 7am decision post, ASK ME for today's real numbers. Never invent
   a figure, a category, or a spend amount. If I do not have a real decision
   today, skip the post rather than filling it.

3. Show me each post one at a time, in publishing order, with its channel,
   pillar and format. Wait for my approval on each.

4. For each post I approve, compute a randomised publish time using the rules
   in section 5. Tell me the Sydney time you chose AND the UTC time you will
   send, BEFORE you schedule.

5. Schedule each approved post through blotato_create_post with that
   scheduledTime, converted to UTC. On LinkedIn, pass pageId only if the
   slot is explicitly marked for the company page AND the page appears as a
   subaccount in blotato_list_accounts. Otherwise omit it, and tell me the
   post is going to the personal profile.
   If a post has a `reply:` field, it stays manual — see section 5.

6. Append each scheduled post to state/ledger.md with date, Sydney time,
   channel, pillar, format, series and the first line of the body. Update the
   status in state/week-plan.md to `scheduled`.

Rules: never publish or schedule anything I have not explicitly approved in
this session. Never edit approved text, not even punctuation. If I say
"approve all except X", X stays unscheduled and the rest proceed. If I do
not respond about a post, it does not go out.
```

---

## 4. The Friday planning session

The Routine drafts PART 2 headlessly on Friday. PART 1 is the learning loop and needs
you, because it ends in a judgement call.

```
Run the weekly planning session.

PART 1 — LEARNING LOOP. Read state/performance.md and state/ledger.md.

For each post published in the last seven days, compute its index: its
engagement metric divided by the trailing median for that format on that
channel across the last 12 posts. Show me a table.

Flag ONLY posts above 1.5 or below 0.6. Anything between is noise — say so
explicitly rather than commenting on it.

For each series with four or more entries, apply: two consecutive above 1.5
means increase frequency and go bolder in the same direction; two consecutive
below 0.6 means change exactly ONE variable or retire it. Tell me which
variable and why.

Propose exactly ONE adjustment for next week. If the data does not support
one, say the data does not support one. Do not manufacture an adjustment.

List posts now eligible for the repost pool: index 1.5+, at least 60 days
old, claims still true. For each, say which rung of the transformation ladder.

Do NOT propose changes to the pillars, the caps, the refusals, the voice
spec, or the 7am cadence. Those are fixed regardless of performance.

Wait for me to confirm before continuing.

PART 2 — PLAN NEXT WEEK.

Six LinkedIn slots, ten to fourteen X slots. Rules from section 6.
Leave one Thursday slot open for whatever the week produces.

For each slot write the audience, the feeling and the job BEFORE writing the
post. Then write the post in full and exact.

Verify every factual claim against state/truth-file.md. Anything unverifiable
gets rewritten so it does not claim it. Flag anything that could identify a
client.

Write to state/week-plan.md with every post at status pending_approval.
Schedule NOTHING.
```

---

## 5. Timing and randomisation

Claude computes these at approval time. All windows below are **Australia/Sydney**.

| Slot | Window |
|---|---|
| LinkedIn morning | 06:45 to 07:40 |
| LinkedIn second post | 11:30 to 15:00 |
| X morning | 06:40 to 08:30 |
| X midday | 11:00 to 14:30 |
| X evening | 16:30 to 19:00 |

- **Never a round minute.** Exclude :00, :15, :30, :45.
- **Never a minute used in the last fourteen days.** Check `state/ledger.md`.
  If the constraint leaves nothing legal in the window — the LinkedIn morning slot is
  only about fifty usable minutes wide — relax the fourteen days to seven and say so
  out loud rather than silently picking a round minute.
- **Minimum three hours** between posts on the same platform.
- **Never within eight minutes** of the other platform. Simultaneous cross-posting is
  the second most obvious automation signal after a fixed minute.
- **Draw toward the middle of the window** with occasional outliers rather than flat random.
- The 7am post stays inside the seven o'clock hour. The ritual is at 7am, the publish
  is around 7am.

### Converting to UTC — get this wrong and the post goes out at the wrong time

`scheduledTime` is ISO 8601 and Blotato resolves it in **UTC**. Every Sydney time above
must be converted before it goes into `blotato_create_post`.

- **AEST, roughly April to early October: Sydney is UTC+10.** Subtract 10 hours.
  07:07 Sydney is `T21:07:00Z` the **previous** day.
- **AEDT, roughly October to early April: Sydney is UTC+11.** Subtract 11 hours.

Every morning slot converts to the previous UTC day. Check the date, not just the clock.
State both times before scheduling, as step 4 of the 7am session requires.

### Threads and replies

`additionalPosts` on X creates a real thread, published together with the parent. There
is no reply-to-post-id parameter, so a `reply:` link four minutes after the parent is
**not** something Blotato can do. Either fold it into the thread as `additionalPosts`,
or post it by hand. Prefer by hand: you are in the app replying anyway, and guardrail 7
says replies stay manual.

**OVERRIDE, 28 Aug 2026: never skip a day, on either channel.** Josh's instruction. It
replaces the rule that used to sit here — that cadence should vary, some days none, and that
an account which never skips is the tell. Both channels now post every day, weekends
included.

Two consequences to manage rather than ignore. Seven LinkedIn posts a week is above the six
slots the pillar caps assume, so watch that "the model" does not quietly exceed three in any
nine. And fourteen posts a week makes `state/angle-bank.md` the binding constraint on
quality — the schedule is no longer the limit, the material is.

**Weekend windows are not defined** in the table above, which was built for weekdays. Later
morning, roughly 09:30 to 10:30 Sydney, is the working assumption for LinkedIn until there
is data to say otherwise.

---

## 6. Content rules

### Pillars and caps, per week

| Pillar | LinkedIn | Notes |
|---|---|---|
| The model | max 3 in any 9 posts | The wedge. Never more. |
| 7am decisions | daily | Runs regardless of performance |
| AI and tools | max 2 | At least one must be a real prompt or hands-on verdict, not commentary |
| Creative | 1 to 2 | |
| Craft | min 2 in any 9 posts | |
| Personal | max 1 | |
| Build log and SEO | max 2 | |

**Also every week:** at least one concession, failure or self-teardown. At least one
category index or artefact teardown. At most one post naming the paid offer.

**Length mix per six LinkedIn posts:** two long (200 to 300 words), two medium (80 to
150), two short (under 50). Two or three times a month, a short post with no image at all.

**Never the same format twice in a row. Never the same pillar on consecutive days.**

### Voice

Australian spelling. No emoji. No em dashes. One idea per post. Short lines. Specific
numbers. Concede before you argue. First person. Never open with "Most founders".

**Banned, because they read as AI:** the rule of three, the concession pivot ("To be
fair... What is left is..."), ending on a question, even paragraph rhythm, summarising
your own point in the last line, numbered lists inside a story, no contractions,
adjective pairs, "here's what most people miss", "let that sink in", everything
resolving neatly.

**What reads human:** detail too specific and too pointless to have been generated. The
time it happened. The word someone actually used. A thought that goes nowhere. A joke
you do not explain.

**No credential stacking.** Work history appears in passing, in service of a point, never
as a list of logos or a claim to a title. "Having worked on Netflix in APAC" is the
register. "Ex-CMO (Netflix, McDonald’s)" is not: it claims a role Josh did not hold, and
a stacked credential line reads as compensating. The client base is the same — the number
of accounts on the system is not a credential and does not belong in a post. See
`state/truth-file.md`, Work history.

**Do not open by conceding your own credibility.** Concede before you argue means concede
the opposing point, not your own standing. "Three accounts, not thirty" is flinching.

### The enemy

An era, a structure, a practice, or an artefact. Never a person, never a named firm,
never your own buyers.

**Name to praise. Anonymise to criticise. Aim criticism at the practice.**

Every criticism carries a replacement, or it is complaining.

### Two rules carried over from the site, because it is the same brand

- **Do not write the fee model as a vow.** "Never a percentage of spend" was removed from
  about 140 places on the site; fees are "priced to the work rather than your budget".
  Absolutes foreclose the managed line. The model pillar is exactly where this phrasing
  creeps back in — watch for "never a share of your spend" and "your fee will never take
  a cut", which three separate sweeps missed on the site.
- **Never state a precise time for the overnight run.** "Before you're up", never "02:00".
  The 7am decision post timestamps *the decision*, which is fine. It must not timestamp
  the run that produced it.

---

## 7. Guardrails, non-negotiable

1. **Nothing publishes or schedules without explicit approval of that specific post, in
   that session.** This is the product's own principle applied to itself. A Routine-fired
   session has no one present, so it approves nothing and schedules nothing, ever.
2. **Never invent a number.** Not a spend figure, not a decision, not a result, not as
   illustration. The 7am format's entire credibility is that the figures are real.
3. **No client is identifiable.** Category and spend band only. Never a detail that
   narrows it to one brand.
4. **No agency is named.** Ever.
5. **No claim outside `state/truth-file.md`.** If it is not verified there, the post is
   rewritten so it does not claim it.
6. **Never claim a media buying result on a brand you did not buy media for.**
7. **Replies stay manual, permanently.** Twenty to forty a week on X, every comment on
   LinkedIn inside ninety minutes. Do not automate this. It is the growth engine
   precisely because it is real.
8. **Never edit approved text.** If it changes, it goes back to `pending_approval`.

---

## 8. The Routines

Two Routines, both drafting only. They fire a fresh session in this environment, so
their prompts are written standalone.

| Routine | Cron (UTC) | Sydney |
|---|---|---|
| Sevenam daily content prep | `15 20 * * *` | 06:15 daily |
| Sevenam weekly content plan | `0 6 * * 5` | about 16:08 Friday |

Trigger ids: `trig_01UgPSZgAiKsGNVVSZqggEhm` (daily),
`trig_01Q71mbDmCDzndEWwkAHK8z7` (weekly). The Friday one fires a few minutes past the
hour because the scheduler anchored it to the minute it was created.

**Cron fires in UTC, and these are set for AEST (UTC+10).** When Sydney moves to AEDT
in October, both drift an hour later in local terms. Shift them to `15 19 * * *` and
`0 5 * * 5` then, and back again in April. Manage them with `list_triggers` and
`update_trigger`.

LinkedIn post analytics may not come back from Blotato — `blotato_get_post_analytics`
exists and works for other platforms, but the LinkedIn gap is reported and unverified
here since nothing has published yet. Either way the Monday metrics pull is manual, and
the daily Routine reminds you on Mondays.

---

## 9. State files

- `state/week-plan.md` — next week's posts and statuses
- `state/ledger.md` — everything published
- `state/performance.md` — metrics, index scores, adjustments
- `state/truth-file.md` — every claim allowed, with source
- `state/angle-bank.md` — backlog, tagged by pillar, each with a source. Sixty entries
  minimum, never below thirty. The daily Routine counts it and warns.

---

## 10. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| No Blotato tools in session | Server dropped from the account registration | Re-register in Blotato, start a fresh session |
| OAuth error on any call | Subscription not active | Blotato Settings > API, generate a key |
| Credential error on a connector that shows as connected | Stale cached session | Remove fully, re-add. Reconnecting does not clear it |
| Local file path rejected | `mediaUrls` takes public URLs only | `blotato_create_presigned_upload_url` first |
| LinkedIn post landed on the personal profile when it was meant for the page | The connection has no organisation scope, so `pageId` was unavailable | Section 1. Remove the connection fully and re-add with page permission |
| Post published ten or eleven hours off | Sydney time sent without converting to UTC | Section 5. Both times get stated before scheduling |
| Scheduled post never fires | Check the queue directly | `blotato_list_schedules`. Do not assume |
| A Routine scheduled something | Guardrail 1 breach | `blotato_delete_schedule`, then fix the Routine prompt |
| LinkedIn metrics never arrive | Reported gap in Blotato's analytics | Capture by hand on Mondays |

---

## 11. Before the first real post

- [ ] Rotate the Blotato API key. The one in chat history is compromised
- [ ] Confirm with Blotato support that LinkedIn posting uses the official Posts API with
      `w_member_social`, not a scraped session. Non-negotiable on your main lead channel
- [ ] Run all five tests in section 1 and delete the test posts
- [ ] Reconnect LinkedIn in Blotato with the organisation scope, so the company page
      appears as a subaccount. Until then everything posts to the personal profile
- [ ] LinkedIn headline, about section, featured section and banner updated
- [ ] **X bio and pinned post rewritten. This is a blocker, not a polish item.** As of
      27 Aug 2026 the bio reads "Building the smartest AI marketing community | Ex-CMO
      (Netflix, McDonald's) sharing daily strategies | 10k+ marketers already learning",
      under a "Commentary account" label, with an emoji. None of those claims is in
      `state/truth-file.md`, none appears on sevenam.com.au, and the positioning is a
      different business entirely. The pinned post is emoji-and-hashtag styled and breaks
      most of the voice spec.

      Every X reply drives traffic to that profile. Guardrail 5 governs what a post may
      claim; a bio is a claim surface too, and this one is making claims the truth file
      cannot support on the channel where strangers form their first impression. Fix it
      before the first real post, not after
- [ ] Replace "Ex-CMO (Netflix, McDonald’s)" in the X bio. Resolved 27 Aug 2026: the
      accurate phrasing is *having worked on Netflix in APAC*, not a CMO title. Confirm
      the equivalent for McDonald’s before using it at all. Also drop "10k+ marketers
      already learning" unless it can be sourced, and the "Commentary account" label
- [ ] **Fix the retracted tenure claim on the live site.** Josh confirmed 27 Aug 2026 that
      fifteen years inside Meta ad accounts is not accurate. Four places state it, and the
      correct replacement has not been supplied yet:
      - `about.html:56` meta description, "fifteen years inside ecommerce Meta ad accounts"
      - `about.html:60` og:description, "Fifteen years inside Australian ecommerce ad accounts"
      - `about.html:179` body, "Fifteen years running paid media from first sale to international scale"
      - `check.html:143` body, "spent fifteen years inside Australian ecommerce ad accounts"

      Two others are broad-marketing framing and are probably fine as they stand:
      `index.html:465` "fifteen years building and scaling consumer brands" and
      `about.html:194` "Fifteen years of work that had to hold at national scale".

      Changing `about.html:60` changes the og:description, so **rerun `node tools/build-og.js`**
      or the social card keeps the old wording. Run `node tools/indexnow.js /about /check`
      after the deploy is live, never before
- [ ] "How did you hear about us" field added to /apply
- [ ] `state/truth-file.md` checked line by line against what is actually published
- [ ] `state/angle-bank.md` at sixty entries minimum
- [ ] Decide: is the account check free or paid
