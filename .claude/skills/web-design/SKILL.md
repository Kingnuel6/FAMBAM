---
name: web-design
description: Design methodology for blending photography, animation, and copy into web page sections that communicate a specific feeling on purpose — use when asked to make a page feel more alive/premium/on-brand, choose or crop images, pace animations, design a hero or landing section, add a photo gallery, or review whether a section actually "reads" as intended. Not for chart/data visualization (see dataviz) or Claude-Artifact-specific layout constraints (see artifact-design).
---

# Web design: image, motion, and copy as one system

Bad sections fail for one of three reasons: the image fights the message, the
motion is decoration instead of punctuation, or the copy and the visual carry
different weights and the eye doesn't know which one to trust. This skill is
the checklist and worked method for avoiding all three — grounded in a real
build (see `references/fambam-example.md`), not abstract taste.

## The one-line brief, first

Before touching an image picker or an animation curve, write one sentence:
*"This section should make the visitor feel ___ and do ___."* Every choice
below is graded against that sentence. If you can't write it, you're not
ready to design the section — go figure out what it's actually for.

Example from a real section: *"The hero should feel like an invitation to
somewhere warm and specific (Marrakech), and get the visitor to scroll."*
Every subsequent choice — a warm terracotta gradient instead of the site's
default ivory, a serif+script mixed headline, a single CTA — traces back to
that sentence. See `references/fambam-example.md` for the full before/after.

## Imagery: match the emotional register, not just the topic

- **Pick for feeling, not subject.** "A picture of Marrakech" is not a brief.
  "A picture that feels like golden hour and quiet luxury" is. Reject options
  that are topically correct but tonally off (a crowded souk photo reads
  "chaotic," not "quiet luxury," even though it's also "Marrakech").
- **Crop for the message, not just composition.** A wide establishing shot
  reads as a place; a tight, warm-toned detail shot (tilework, a doorway)
  reads as a feeling. Use establishing shots to orient, detail shots to seduce.
- **Vary the shot type across a set.** Three photos of the same subject type
  (three wide landscapes) reads as a stock-photo dump. One establishing shot +
  one texture/detail shot + one human-scale shot reads as a curated set. See
  the three-photo gallery in `references/fambam-example.md` — courtyard
  (place), tilework (texture), palm grove (atmosphere) — for the pattern.
- **License and hotlinking.** Free stock sites (Pexels, Unsplash, Pixabay)
  explicitly permit hotlinking their CDN via direct image URLs — that's the
  intended usage, not a workaround. No API key needed for a handful of
  images; you don't need to download and self-host unless you need
  guaranteed uptime independent of a third party. See
  `references/imagery.md` for the full sourcing workflow, including what to
  do if your own tooling can't fetch the CDN directly to verify an image
  (this happens in sandboxed dev environments — it does not mean the image
  won't load for real site visitors, whose browsers use a completely
  different network path).
- **Lazy-load, always.** Below-the-fold imagery should never block first
  paint. `next/image` with `loading="lazy"` (the default) or a plain `<img
  loading="lazy">` — either is fine, but pick one and don't mix.

## Motion: pacing is the whole game

- **Motion is punctuation, not decoration.** Every animated property should
  answer "what is this drawing the eye to, and why now?" If you can't answer
  that, cut the animation.
- **Slow is a choice, not a default.** Elegant/premium contexts want
  0.6–1.4s durations with `easeOut`-family curves and generous stagger
  (150–250ms between siblings) — long enough to feel considered, short
  enough not to make the visitor wait. Snappy contexts (dashboards, tools)
  want 150–300ms. Picking the wrong register for the context is the single
  most common motion mistake — a slow luxury fade on a data table feels
  broken; a snappy 150ms fade on a wedding invite feels cheap.
- **One hero moment, not motion everywhere.** A page gets one "wow" —
  usually the first thing the visitor sees. Everything after that should be
  a consistent, quieter fade/slide-up on scroll. Spending GSAP-level effort
  (custom timelines, sequenced multi-element choreography) on every section
  drowns the one moment that's supposed to stand out. See the envelope-open
  sequence in `references/fambam-example.md` for what a single hero moment
  looks like, and how the rest of the page deliberately steps down to plain
  `whileInView` fades.
- **Always support `prefers-reduced-motion`.** Not optional, not an
  afterthought — check it before writing the animation code, so the
  reduced-motion path is a real design decision (usually: skip straight to
  the end state) rather than a broken fallback.
- **Test the actual timing, don't eyeball the code.** Durations and delays
  compound (a 0.22s stagger across 6 children is 1.1s before the last one
  starts). Run it in a browser and count seconds; time-on-paper is
  unreliable. See `references/motion.md` for the full pacing reference and
  common stagger-math mistakes.

## Copy and visual weight must agree

- **The biggest thing on screen should be the most important message**, not
  whatever happens to be a long string. If the headline is short and the
  supporting paragraph is long, the paragraph will visually dominate unless
  you deliberately suppress it (smaller size, lower contrast, tighter
  line-height).
- **Use a consistent "weight ladder"** across sections: eyebrow (smallest,
  widest letter-spacing, often a brand accent color) → headline (largest,
  highest contrast) → supporting line (medium, muted color) → CTA (bounded,
  high-contrast, but smaller than the headline). Breaking the ladder in one
  section but not others makes the page feel like it was designed by
  committee.
- **Mixed fonts signal mixed meaning.** Switching from a serif headline to a
  script accent (e.g., an ampersand, a signature-style name) works when it
  marks something as *personal* against something *formal* — don't mix fonts
  just for texture, mix them to mark a distinction the reader should notice.

## Review checklist before shipping a section

1. Can you state the one-line brief from memory, and does the shipped
   section actually deliver it?
2. If you removed all the copy, would the image/color/layout alone still
   communicate the right feeling?
3. If you removed all the motion, would the section still make sense (i.e.,
   is the animation additive, not load-bearing)?
4. Does the biggest, highest-contrast element on screen match the most
   important message?
5. Have you viewed it at the narrowest supported width — not just resized
   the browser, an actual mobile viewport? Wrapped headlines are where
   weight-ladder and motion-timing bugs hide (see the leading/line-height
   bug in `references/fambam-example.md` for a real one).

## Worked example

`references/fambam-example.md` walks through a real hero-section redesign
end to end: the reference screenshot, the one-line brief extracted from it,
the exact Tailwind/CSS bug that broke the first attempt (two rules fighting
over `background-image`), the line-height bug that made a large serif
headline visually overlap itself, and the final verified result. Read it
before designing your first section from this skill — it's the difference
between "sounds right" and "verified right."
