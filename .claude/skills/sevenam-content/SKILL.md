---
name: sevenam-content
description: Write, review or schedule LinkedIn and X posts for Josh Peacock / Sevenam. Use whenever drafting a post, thread or carousel for LinkedIn or X, running the 7am session or the Friday planning session, checking whether a draft is on brand, or deciding what to post next. Carries the positioning, the voice spec, the claim rules and the approval gate.
---

# Sevenam content

Operating rules for Josh's LinkedIn and X presence. The full system lives in
`content/CLAUDE.md`; the state files it reads are in `content/state/`. This skill is the
part you need in your head before writing a word.

## Approval gate, before anything else

**Nothing publishes or schedules without Josh approving that specific post, in that
session.** Not "he approved the plan", not "he approved a similar one yesterday". The
product's own principle applied to itself.

Publishing goes through the Blotato MCP tools. LinkedIn is `accountId` 33954, platform
`linkedin`, no `pageId`. X is `accountId` 25005, platform `twitter`.

## Who Josh is, and who he is not

A **broad marketer, CMO and entrepreneur.** Agency side and client side. Deep in AI, and
currently working inside live Meta ad accounts. Founder of Sevenam.

He is **not** a fifteen-year Meta specialist or a media buyer. He has been running
Facebook ads in some capacity for fifteen years and that is true, but it is background,
never the pitch. Narrowing him to a tactician to make a credential land harder is the
exact mistake to avoid.

Write at **CMO altitude.** A post about how an org is structured beats a post about how a
campaign is structured.

## Three things that are never in a post

1. **The client base.** The number of accounts on the system is not a credential. "Three
   accounts, not thirty" is flinching and it does not go in.
2. **Stacked credentials.** Work history appears in passing, in service of a point:
   *"having worked on Netflix in APAC"*. Never a title claim, never a logo list, never
   "Ex-CMO (Netflix, McDonald's)" — that claims a role Josh did not hold. If the point
   does not need the brand, leave it out. McDonald's is unusable until the accurate
   relationship is stated.
3. **Anything identifying a client.** Category and spend band only.

**Never open by conceding your own credibility.** Concede before you argue means concede
the opposing point, not your own standing.

## Strategy: report from inside, do not comment from outside

Commentary on the latest model release is the most crowded space on LinkedIn. It decays in
about 48 hours and attracts other marketers rather than buyers.

The moat is that Josh is **inside live accounts at $30k to $500k a month spend.** So:
not "here is my view on the new model" but "here is what it did in a live account". Same
visionary position, except a competitor who read the same launch post cannot replicate it.

Ranked by what actually performs:

1. **The 7am decision post.** Proprietary, specific, daily, unfakeable. Needs Josh's real
   numbers each morning — never invent one, skip the post instead.
2. **Ad Library teardowns.** The Meta Ad Library is public, so any brand's live ads can be
   dissected without touching a client. Endlessly available, high save rate.
3. **Hands-on tool verdicts.** A real prompt or a real verdict. Not commentary.
4. **Mechanism explainers.** How the auction behaves, why a metric lies. Evergreen.

Reaction posts to product launches rank last. Highest competition, fastest decay, wrong
audience.

## Claims

No factual claim outside `content/state/truth-file.md`. If it is not verified there, rewrite
the post so it does not claim it.

That guardrail was written for **facts** — spend figures, results, case numbers — where
inventing one is fatal. **Judgement is different.** An opinion about where the industry is
heading needs no source, only honest framing as opinion rather than fact. Keep the line
clear: "Advantage+ expands past your selections" is a factual claim about platform
behaviour and needs a source. "Most teams are still built around the old bottleneck" is a
read, and is his to make.

Never invent a number. Not a spend figure, not a result, not as illustration.

## Voice

Australian spelling. No emoji. No em dashes. One idea per post. Short lines. Specific
numbers. First person. Use contractions — writing without them is one of the strongest AI
tells. Never open with "Most founders".

**Banned, because they read as AI:** the rule of three, the concession pivot ("To be
fair... What is left is..."), ending on a question, even paragraph rhythm, summarising your
own point in the last line, numbered lists inside a story, adjective pairs, "here's what
most people miss", "let that sink in", everything resolving neatly.

**What reads human:** detail too specific and too pointless to have been generated. The
time it happened. The word someone actually used. A thought that goes nowhere. A joke you
do not explain.

**The enemy** is an era, a structure, a practice or an artefact. Never a person, never a
named firm, never Josh's own buyers. Name to praise, anonymise to criticise. Every
criticism carries a replacement or it is complaining.

**Do not write the fee model as a vow.** Priced to the work rather than the budget. Never
"never a percentage of spend" — absolutes foreclose the managed line.

## Channels

| Channel | Followers | Note |
|---|---|---|
| LinkedIn, Josh Peacock | 5,494 | The lead channel. Weight effort here |
| X, @girlboyrobot | 530 | Roughly a tenth of LinkedIn |
| LinkedIn, Sevenam page | ~0 | Settled: carries no posts |

Everything posts as a person, not as a brand. **Never cross-post the same text** — write
each channel its own angle. Six LinkedIn slots and ten to fourteen X slots a week, and the
six matter more than the fourteen.

**The X profile is a blocker.** The bio still claims "Ex-CMO (Netflix, McDonald's)" and
"10k+ marketers already learning" under a "Commentary account" label. Every X reply sends
strangers there. Flag it rather than working around it.

## Timing

All windows Australia/Sydney; `scheduledTime` goes to Blotato in **UTC**, so subtract 10
hours in AEST or 11 in AEDT. Every morning slot converts to the previous UTC day. State
both times before scheduling.

Never a round minute. Never a minute used in the last fourteen days. Three hours minimum
between posts on the same platform, eight minutes minimum from the other platform.
Full windows and the randomisation rules are in `content/CLAUDE.md` section 5.

## Replies stay manual, permanently

Twenty to forty a week on X, every LinkedIn comment inside ninety minutes. Do not automate
it. On X it is the growth engine because the follower base is small; on LinkedIn it
protects reach that already exists.
