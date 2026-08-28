#!/usr/bin/env python3
"""Prepare an image for social upload: crop to spec, convert to sRGB, export clean.

Platforms re-encode whatever they receive. The only defence is handing them a file
that already matches the slot exactly, in the colour space they assume.

Usage:
  python3 prep.py IN OUT --preset linkedin-portrait [--format jpeg|png] [--quality 90]
  python3 prep.py --list
"""
import argparse, io, sys
from PIL import Image, ImageCms

# width, height. Every one of these is a size the platform serves at, so nothing
# gets resampled after upload.
PRESETS = {
    "linkedin-portrait":  (1080, 1350),   # 4:5  — the default, most feed height
    "linkedin-square":    (1080, 1080),   # 1:1
    "linkedin-landscape": (1200, 627),    # 1.91:1
    "x-landscape":        (1600, 900),    # 16:9 — X's feed card
    "x-portrait":         (1080, 1350),   # 4:5
    "ig-portrait":        (1080, 1350),   # 4:5
    "ig-square":          (1080, 1080),   # 1:1
    "ig-story":           (1080, 1920),   # 9:16
}

def to_srgb(im):
    """Convert an embedded profile to sRGB. Without this, Adobe RGB and Display P3
    files get reinterpreted rather than converted, which is the subtle colour shift."""
    icc = im.info.get("icc_profile")
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            dst = ImageCms.createProfile("sRGB")
            im = ImageCms.profileToProfile(im, src, dst, outputMode="RGB")
            return im, "converted from embedded profile"
        except Exception as e:
            return im.convert("RGB"), f"profile unreadable ({e}), forced RGB"
    return im.convert("RGB"), "no embedded profile, assumed sRGB"

def cover(im, w, h):
    """Crop to fill the target box, centred, no distortion and no letterboxing."""
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    nw, nh = round(sw * scale), round(sh * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - w) // 2, (nh - h) // 2
    return im.crop((left, top, left + w, top + h))

def main():
    p = argparse.ArgumentParser()
    p.add_argument("src", nargs="?"); p.add_argument("dst", nargs="?")
    p.add_argument("--preset", default="linkedin-portrait")
    p.add_argument("--format", default="jpeg", choices=["jpeg", "png"])
    p.add_argument("--quality", type=int, default=90)
    p.add_argument("--list", action="store_true")
    a = p.parse_args()

    if a.list:
        for k, v in PRESETS.items():
            print(f"{k:20s} {v[0]}x{v[1]}")
        return
    if not a.src or not a.dst:
        p.error("src and dst required")
    if a.preset not in PRESETS:
        p.error(f"unknown preset. --list to see them")

    w, h = PRESETS[a.preset]
    im = Image.open(a.src)
    before = f"{im.size[0]}x{im.size[1]} {im.mode}"
    im, colour_note = to_srgb(im)
    im = cover(im, w, h)

    if a.format == "png":
        im.save(a.dst, "PNG", optimize=True)
    else:
        # 4:4:4 chroma keeps type and fine detail from smearing.
        im.save(a.dst, "JPEG", quality=a.quality, subsampling=0,
                optimize=True, progressive=True)

    import os
    print(f"in    {before}")
    print(f"out   {w}x{h} {a.format} q{a.quality if a.format=='jpeg' else '-'}")
    print(f"srgb  {colour_note}")
    print(f"size  {os.path.getsize(a.dst):,} bytes -> {a.dst}")

if __name__ == "__main__":
    main()
