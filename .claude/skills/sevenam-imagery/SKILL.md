---
name: sevenam-imagery
description: Generate or choose imagery for a Sevenam post — Instagram, LinkedIn or X. Use before every Higgsfield call, before briefing any scene with Josh in it, before generating anything containing a phone or a screen, and whenever an image has been rejected and needs rebriefing. Carries the model choice, the camera-position rule, the banned prompt vocabulary, and the full catalogue of what has already been rejected and why. Read it before spending a credit, not after.
---

# Sevenam imagery

**This file is the authority on generated imagery.** Where `sevenam-content` and this file
disagree, this file wins — it was written after the rejections that made the older guidance
wrong.

Every rule below exists because a batch was generated, paid for, and thrown away. Josh's
words, 30 Aug 2026: *"You need to be creating a skill so you're not repeating mistakes over
and over again. We don't want to be making these mistakes consistently because they cost me
credits and money."*

## Before you spend a credit

Run this every time. It is short because the mistakes are repetitive.

1. **Is generation even the right call?** A real photo, a real screenshot, or a rendered
   card beats a generation on almost every brief. Generation is the fallback, not the
   default — see *Do not generate these* below.
2. **Read the reject list.** If the brief contains anything in *Banned vocabulary* or *Do
   not generate these*, it is already a wasted credit. Rewrite it first.
3. **Generate one test frame, then look at it, then batch.** Never fire a set of six on an
   untested prompt shape. One frame costs one credit; a rejected set of six costs six and a
   round trip with Josh.
4. **Look at it yourself before showing him.** The sandbox route below makes this free.
   Showing Josh a dud he has already rejected the twin of is the expensive failure.
5. **Check likeness on any shot with his face in it.** If it does not read as him, it is
   not publishable no matter how good the scene is.

## Looking at the output — do this, it costs nothing

The CloudFront generation URLs are blocked from this session, but
`mcp__Higgsfield__sandbox_exec` runs on Higgsfield's own infrastructure with unrestricted
internet. Curl the URL inside the sandbox, downscale with Pillow or ffmpeg, base64 to
stdout, decode locally, read it.

**Keep the payload under about 19,000 characters** or the MCP result is silently truncated
mid-string. Chunk larger transfers. The sandbox is ephemeral — roughly ten seconds after
the call — so chain the whole job with `&&` in one command.

To hand Josh a large composite: `media_upload` → PUT from the sandbox → `media_confirm`
gives a CloudFront URL he can open. Cheap, and nothing large crosses the context window.

## Model choice

| Need | Model | Why |
|---|---|---|
| **Any scene with Josh in it** | `nano_banana_pro` + reference photos in `image_references`, `aspect_ratio: "4:5"` | Takes multiple references; 4:5 is native |
| A scene with no person, or a person who is not Josh | `nano_banana_pro` | Still the better renderer. `soul_2` only if there is a reason |
| Legible text or a diagram inside the image | `nano_banana_pro` | Others garble type |
| **Exact figures** | **The HTML card. Never a generator.** | A shifted digit publishes a wrong number |

**`soul_2`'s two hard limits**, verified 29 Aug 2026: `image` takes a **maximum of one**
reference, and **there is no 4:5** — a 4:5 request is silently coerced to 3:4, which is
taller than LinkedIn's crop. Both disqualify it for the main brief.

**Do not train or use a Soul.** Josh's call, 29 Aug 2026: *"Don't use soul. Just use those
images as reference each time when briefing higgsfield."* Both existing Souls
(`ad293cb4-b435-472a-8b66-76999ea324ec`, `a452d512-dfc2-49a0-9cd8-4a9750f0a1fb`) are dead
ends — neither looked like him. Do not propose training a third.

**Credits are finite.** `use_unlim: true` returns *"Unlimited generations aren't supported
for nano_banana"*, and a batch has already been cut off mid-run with three of seven
rejected for no credits. Budget the batch, and put the shots that matter first in the queue.

## The reference photos — already imported, permanent

Do not ask Josh to upload anything. These ids are reusable in every future session.

| Photo | `media_id` | Drive file id |
|---|---|---|
| Car, black tee, seatbelt | `a32d1870-011e-4bc0-aa7d-80ea69ba61f5` | `1kXO4-Mc7jCVFlUe5nswi-Q2wEUj2QgDt` |
| Car 2 | `e1e103e4-33b2-4e92-a82c-fdbd20a587c8` | `1bYcc753PMxLQ0CUEC4dIwz1u_B9k-_C2` |
| Car 3 | `b82d26ee-82da-4d64-b39f-c70d7def0471` | `1rZIiSCDQTXVpz0NgiHrhPq8sBfubzLpQ` |
| **Business mode** — the clearest portrait | `0218910b-6f56-40e4-a239-27ece3358962` | `1bEQYq4KwklSWKXwUkL3bIVL0v_1y6OD1` |
| Glasses, shopping centre | `001272e9-81e1-4009-89cc-44b18f2032d3` | `1NfmTk7w-WA2wwHcOr7Cl7SQOxVm1gY-y` |
| With his daughter | `f9a71afa-9d36-4651-b3c8-3cbf2f925b07` | `124E49_Fb5-_e0uPGlNcSv6Ds5ji68zTL` |
| Chilling in the sun | `c0048e62-d274-474b-8c39-bffb802d7173` | `1tcOG4pW_WefLGSzMTMMX4tN844iU_HQY` |

**Which to pass.** Several, favouring clear unobstructed faces — the portrait plus the car
shots. Keep the daughter photo (second person) and the sunglasses one (eyes hidden) out of
the identity set unless the scene itself calls for them. Identity holds better across a set
than off one photo, so pass as many as the model accepts.

**Pass the same reference set across a whole batch.** Changing references between frames
of one set is how likeness drifts and the set stops looking like one person.

New photos: `search_files` on `parentId = '1U8iqnZSvPPAIuN2Hlh6k2pYls5omjPkm'`, then
`media_import_url` with `https://drive.google.com/uc?export=download&id=<FILE_ID>`, which
is publicly fetchable and returns full bytes. **Never `download_file_content` for a photo**
— a one-megabyte photo is more than a megabyte of base64 landing in the context window.

## Where the camera goes — no direct to camera, ever

**Dropped 30 Aug 2026, and it is closed.** Josh: *"Any of these images where it's direct to
camera, like the selfie ones, just don't work because they look fake. They clearly don't
look like me when you're seeing that... let's drop this direction."*

This overrides the arm's-length selfie geometry that was written earlier the same day. That
rule made the *perspective* correct and the likeness got worse, not better — a face filling
the frame at close range is where the generator's small errors are most visible, and there
is nowhere for them to hide. Do not rebrief it, do not "try once more with better
references". **The frontal close-up lane is shut.**

**The four camera positions that replace it.** Every scene with Josh in it uses one:

| Position | What it is |
|---|---|
| **Over the shoulder** | Behind him and slightly to one side, looking at what he is looking at. His head and shoulder frame one edge; the subject is what's in front of him. The house default |
| **Isometric / high angle** | Looking down on the scene from above and off to a corner. Him, the surface, the objects, all as one arrangement |
| **From a distance** | Him small in a big frame — across a room, down a beach, from the other side of the street. The place does the work |
| **Mirror** | The gym mirror shot, and its relatives. Phone visible, that is the point |

**Why these work and the close-up did not.** Likeness only has to survive at the scale it is
rendered. At the back of a frame, three-quarters turned, or reflected in a mirror, a small
error is not perceptible. Filling the frame with his face, it is the whole picture.

**The gym shots are the proven template.** Josh: *"The gym ones work, so maybe more stuff
like that."* Look at what they have in common before briefing a new lifestyle shot — a
mirror or a distance, a real room, body language rather than a face doing an expression.

**Lifestyle is now shown a different way.** Not by putting him at the front of the frame
looking at the lens, but by the place, the activity and the scale of the shot. Water sports,
gym, travel, eating out all still hold as themes; they get an over-the-shoulder, an
isometric or a distance shot instead of a selfie.

**Faces looking at the lens are the failure signature.** If a brief would put his face
frontal and close, it is the wrong brief — change the camera position, not the wording.

## Banned vocabulary

Each of these caused a rejection. Do not put them in a prompt.

**Studio-perfection words — rejected as "too fake":**
`crisp studio flash` · `glossy` · `glossy product realism` · `infinity studio` · `pristine`
· `premium` · `styled` · `polished`

**Advertising-grade words — rejected 29 Aug as "the warm lighting makes it feel fake and
overproduced":**
`warm lighting` · `warm grade` · `golden hour` · `lens flare` · `bloom` · `cinematic
shallow depth of field` · `cinema lighting`

A warm grade plus flare plus bloom plus shallow DOF reads as *advertising*, which is the
one thing this account cannot look like. Ask instead for **neutral white balance, flat or
overcast daylight, no flare, no bloom, phone capture**.

**Face-destroying light — rejected as "I look like a junkie":**
`hard side light` · `deep shadow across the face` · `phone flash texture on skin` ·
`harsh direct flash` on a face

Hard light on a face reads as gaunt, and it also breaks likeness consistency across a set.
When his face is in shot ask for **even, soft, natural light**, and say **athletic, healthy,
rested**.

**Over-stylisation — rejected as "the workout one's a little bit too stylized":**
`crushed blacks` · `heavy grain` · `moody` on anything where the reference is bright
natural daylight. The Mission lane is monochrome and obscured; it is not a black-and-white
art film.

**Colour outside the palette — rejected as "too colourful":**
any named colour other than ink `#0A0A0A`, paper `#F7F7F5`, the greys, and volt `#D8FF00`.
Magenta and cyan were the specific offenders. One colour against grey reads as a brand;
three reads as a stock library.

**Always end the prompt with:** `no text, no lettering, no typography, no logos, no
watermarks`. Stray generated type is the most common way a good frame becomes unusable.

## Do not generate these

Each was tried, rejected, and is closed.

**Screens.** Rejected 30 Aug: *"what you're putting on the phone screens should just be
7am. It should look like we're looking at the Facebook ad library. It should be real
website material, not a photo grid that doesn't make any sense."*

The old instruction asked for *a dense grid of tiny advertising images* **and** *no readable
text*, which can only produce a meaningless mosaic. **A screen in shot is screenshotted,
never generated.** Screenshot the real Meta Ad Library or the real sevenam.com.au and
composite it in, or crop the screen out of the frame entirely. There is no prompt wording
that fixes this — the fix is to stop asking a generator for it.

**Objects on surfaces.** A laptop on concrete, a phone on a desk, a notebook beside a
coffee. Rejected as *"UGC but boring"* — it is the most generic genre in business content
and it illustrates a post rather than having an idea.

**The glasses / POV view.** Rejected 30 Aug: *"Glasses view also looks fake."* Closed.

**Food on the table.** Rejected 30 Aug: *"Food on the table looks fake. Let's drop that
direction."* Eating out stays as a lifestyle theme, but not as a plate-on-table shot.

**The hammock.** *"Hammock one's a bit lame."*

**Dark empty rooms, one cold light, nobody present.** The very first rejection —
*"depressing"*. Melancholy reads as depressing at thumbnail size and argues against a
business whose claim is building fast.

**The erupting-imagery concept** — visuals tearing out of a screen as ribbons and floating
frames. Judged too weird. Generated scenes should look like a photograph someone took, not
a visual metaphor.

**A dog**, unless Josh has supplied locked reference photos of the actual dog. A generated
dog will not be consistent between frames, and an inconsistent pet is worse than no pet.

**Josh's face in a shot where it will be obscured anyway** — wet hair after surf, a squint
into the sun, sunglasses. Rejected 30 Aug: *"After surf shot doesn't look anything like
me."* Anything covering or distorting the face degrades likeness. Water sports stay as a
theme; the shot just has to be composed so his face is clear, or so he is not identifiable
in it at all.

## What does work

The proven lanes, from the sets Josh approved:

- **The gym mirror shot**, phone visible. The strongest lane there is — build out from it.
- **Over the shoulder at the thing he is looking at** — the screen, the water, the road, the
  room. The house default for anything with him in it.
- **Isometric down onto a scene** — the surface and what is on it, him in it rather than
  presenting it.
- **Him at a distance** in a place worth being in.
- **Aspirational but real** — a genuinely good apartment, villa, resort or car. Josh, 29
  Aug: *"I want these to feel like I'm a total baller doing this: luxury apartments, villas,
  resorts, expensive cars, not Mazdas."* But shot on a phone in flat daylight, not lit like
  a campaign. Aspirational **composition**, documentary **capture**.
- **Kicking back doing something you'd rather be doing.** Josh, 30 Aug: *"They need to be
  more outrageous. Be creative with them."* The lifestyle shots are the place to be bold.
  The failed coffee shots were bland, not too much.
- **Water sports, gym, travel, eating out** — the four recurring lifestyle themes, per Josh,
  30 Aug. Surf is fine but *"shouldn't be overdone."*
- **Real mess** — cables, a coffee ring, an unmade room, something cropped at the edge, a
  handheld tilt. Detail too specific and too pointless to have been invented is what reads
  as real, in a picture as in a sentence.

**Self-shot, but not a selfie.** Josh's *"do images that look like I've shot them myself,
I'm showing something"* still holds — it is the **showing** half that survives. A phone held
out over what he is looking at, an arm reaching into frame, a hand on the object. First
person is the house perspective; a face at the front of it is not.

**Fisheye or wide-angle when showing a phone in hand** is allowed but rationed — *"Don't
want too many of those. They feel fake."*

## NSFW false positives

Innocuous prompts have been refused: a cosmetics bottle, a person talking in a kitchen, a
coffee cup on a car roof. This is a classifier fault, not a brief fault. **Reword the
trigger phrase and retry once.** Do not rewrite the whole scene, and do not report it to
Josh as a content problem.

## Aspect ratios

4:5 for LinkedIn and the Instagram feed. 9:16 for Stories and Reels. 1:1 only when a square
is genuinely wanted. `nano_banana_pro` does all three natively; if something has to come
out of a model without 4:5, compose everything important centred and pass it through
`mcp__Higgsfield__reframe`.

## After generation

Prep before publishing: `python3 .claude/skills/social-image-prep/prep.py IN OUT --preset
ig-portrait` — crops to the exact slot and converts to sRGB, which is most of what stops a
platform's own resizer from wrecking it.

**Josh approves every image before it publishes.** The sandbox look-first rule is so that
what reaches him is worth his time, not a substitute for his sign-off.
