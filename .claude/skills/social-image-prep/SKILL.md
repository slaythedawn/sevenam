---
name: social-image-prep
description: Prepare an image for social upload — crop to the platform's exact slot, convert to sRGB, export clean. Use before publishing any image to LinkedIn, X or Instagram, and whenever a published image looks compressed, recoloured, letterboxed or cropped wrong. Covers the ratio specs per platform and the export recipe that minimises the platform's own re-encoding.
---

# Social image prep

Every platform re-encodes what you upload. **Byte-for-byte is not achievable by any tool or
method, manual upload included.** What is controllable is how much it degrades, and almost
all of the visible damage comes from three avoidable things.

## The three causes, in order of how much they cost

**1. Uploading at the wrong size.** Send something larger than the slot and the platform
downsamples it with its own resizer, which is worse than doing it yourself. Handing it a
file that already matches the slot means nothing gets resampled.

**2. A non-sRGB colour profile.** Professional cameras and editing tools output Adobe RGB or
Display P3. Platforms do not colour-manage properly — they reinterpret the numbers instead
of converting them, and everything shifts subtly. **This is what "it looks different but I
can't say why" almost always is.** Converting to sRGB first removes it entirely.

**3. Wrong format.** JPEG is compressed harder than PNG. Type, flat colour and fine lines
smear; photographs survive better.

## Use it

```bash
python3 .claude/skills/social-image-prep/prep.py IN OUT --preset PRESET [--format jpeg|png] [--quality 90]
python3 .claude/skills/social-image-prep/prep.py --list
```

| Preset | Size | For |
|---|---|---|
| `linkedin-portrait` | 1080x1350 | **The default.** Most feed height, highest engagement |
| `linkedin-square` | 1080x1080 | Safest crop |
| `linkedin-landscape` | 1200x627 | Link-preview shaped |
| `x-landscape` | 1600x900 | X feed card |
| `ig-portrait` / `ig-square` / `ig-story` | 1080x1350 / 1080x1080 / 1080x1920 | Instagram |

**Format: PNG for cards, type and graphics. JPEG q90 for photographs.** The script writes
JPEG with 4:4:4 chroma so type and fine detail do not smear.

Cropping is centred cover — fills the slot, no distortion, no letterboxing. Check the result
before publishing: a centred crop can behead someone or cut a figure off an edge.

## The full chain, and why each hop matters

1. **Prep to spec** with this script. Never hand a platform an off-ratio or non-sRGB file.
2. **Host it somewhere that serves the original bytes** — `social/` on sevenam.com.au,
   pushed to `main`. Google Drive's `uc?export=download` may serve a processed copy, so it
   is a suspect hop for photographs.
3. **Confirm it is live** with `web_fetch_vercel_url` before referencing it.
4. **Publish as a single image.** Multiple `mediaUrls` on LinkedIn become a PDF document
   carousel, which resamples and recolours. One image per LinkedIn post.

Every hop removed is quality kept. For a photograph where fidelity really matters, exporting
at 1080x1350 sRGB and posting by hand is still the shortest chain there is.

## Reaching the file at all

The script needs the image on disk. In this environment that means something generated
locally or already in the repo — **Drive and sevenam.com.au are both blocked at the network
level**, so neither `curl` nor Chromium can pull an image down, public sharing or not. The
only route for a file in Drive is the Drive MCP's base64 download, which is expensive for
anything above a few hundred KB.
