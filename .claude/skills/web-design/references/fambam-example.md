# Worked example: the FAMBAM 2026 Welcome hero

A real end-to-end redesign from this project, including the bugs hit and
how they were caught — not a cleaned-up retelling.

## The brief

The user shared a screenshot of a reference site with a specific look: a
dark, warm terracotta-to-espresso gradient background with a subtle hex
texture, a small gold eyebrow line ("YOU ARE WARMLY INVITED TO CELEBRATE"),
a gold divider ornament, a `#hashtag` line, a large serif headline with a
script-style ampersand, and an outlined gold CTA button.

**One-line brief extracted from the screenshot:** *"The hero should feel like
a warm, formal, personal invitation — dark and rich rather than light and
airy — with one clear next action."*

Everything below traces back to that sentence. The original hero (before
this brief) was a light ivory background with an italic serif line and a
script headline — visually pleasant, but not the *warm, formal, dark*
register the reference asked for. Matching "the vibe" required changing the
background treatment and the type mix, not just re-skinning colors on the
same layout.

## Attempt 1: the bug that made the background invisible

First pass, the hero got two CSS rules:

```css
.welcome-gradient {
  background: radial-gradient(ellipse 120% 90% at 50% 35%, #6b3c22 0%, #4a2a18 45%, #241209 100%);
}
.hex-pattern {
  background-image: /* six layered linear-gradients forming a hex/diamond texture */;
  background-size: 44px 76px;
  background-position: 0 0, 0 0, 22px 38px, 22px 38px, 0 0, 22px 38px;
}
```

...applied together as `className="welcome-gradient hex-pattern"` on the
same element. Screenshot showed a **pale cream checkerboard**, no dark
gradient at all.

**Root cause:** `background:` is a shorthand that resets `background-image`
(among other sub-properties). Both rules set `background-image` on the same
element; whichever rule comes later in the stylesheet wins the whole
property, it doesn't layer with the earlier one. `hex-pattern` was defined
after `welcome-gradient` in the file, so it silently won and the radial
gradient never rendered — the page just showed the body's default light
background through the low-opacity hex lines.

**Fix:** combine both into a single `background-image` property, using CSS's
comma-separated multi-layer syntax, with the radial gradient as the *last*
(bottom) layer and matching entries in `background-size`/`background-position`
for every layer including the gradient (`100% 100%`, `center`):

```css
.welcome-gradient {
  background-image: /* ...six hex-texture layers... */,
    radial-gradient(ellipse 120% 90% at 50% 35%, #6b3c22 0%, #4a2a18 45%, #241209 100%);
  background-size: 88px 152px, 88px 152px, 88px 152px, 88px 152px, 88px 152px, 88px 152px, 100% 100%;
  background-position: 0 0, 0 0, 44px 76px, 44px 76px, 0 0, 44px 76px, center;
}
```

**Lesson:** never split a layered background across two classes on the same
element unless you're certain about cascade order. Combine into one
`background-image` stack from the start.

## Attempt 1 (continued): the texture read as a bold checkerboard

Even after the gradient fixed, the hex-texture opacity/scale (`0.05–0.07`
opacity, `44×76px` tiles) rendered far more prominently than intended —
looked like an argyle/checkerboard pattern rather than a subtle hint of
texture, because the tile size was small relative to typical viewport width,
making the repeat very visible.

**Fix:** halved the opacity (`0.02–0.03`) and doubled the tile size
(`88×152px`). Verified via screenshot at both mobile (390px) and desktop
(1440px) widths before calling it done — the pattern reads as a faint
texture, not a print.

## The headline overlap bug

The `<h1>` used `text-6xl leading-tight` at mobile width, wrapping "Ibukun &"
onto one line and "Ayobami" onto a second. Screenshot showed the second line
visually overlapping the first — glyphs blending into a blurry
double-exposure look, and the date/location text below appeared to fade in
partially, which was actually the *next* element's text colliding with the
headline's own line box, not a real opacity bug.

**Root cause:** `leading-tight` (1.25) doesn't leave enough vertical room for
a large serif font's ascenders/descenders when it wraps to multiple lines at
that size — margin on the *next* sibling is calculated from the nominal line
box, not the font's actual rendered extent, so the next element started
inside the visual overlap zone.

**Fix:** `leading-[1.35]` (up from default `leading-tight`) plus bumping the
following element's top margin from `mt-8` to `mt-10`. Re-verified via
screenshot — lines now have clean separation at both viewport widths.

## The final, verified section

```tsx
<section className="welcome-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
  <Petals count={10} />
  <motion.div /* staggerChildren: 0.22 */>
    <motion.p>You are warmly invited to celebrate</motion.p>       {/* eyebrow */}
    <motion.div>{/* gold divider + ✦ ornament */}</motion.div>
    <motion.p>#FamBam2026</motion.p>                               {/* hashtag */}
    <motion.h1 className="leading-[1.35]">
      Ibukun <span className="font-script text-gold">&amp;</span> Ayobami
    </motion.h1>
    <motion.p>November 19 &amp; 20, 2026</motion.p>
    <motion.p>Palmeraie, Marrakech — Morocco</motion.p>
    <motion.a href="..." className="rounded-full border border-gold ...">
      View Accommodations ↓
    </motion.a>
  </motion.div>
</section>
```

This matches the weight ladder from the main `SKILL.md`: eyebrow (smallest,
widest tracking, gold) → divider (pure ornament, no text weight to manage) →
hashtag (same size as eyebrow, slightly different opacity to rank below it)
→ headline (largest, highest contrast, the one serif/script font mix) →
supporting date/location (medium, muted) → CTA (bounded, smaller than the
headline, but highest local contrast via the filled-on-hover treatment).

## The gallery: shot-type variety in practice

Added a three-photo gallery right after this hero, sourced per
`references/imagery.md`. The three shots were deliberately picked for
different shot types, not just "three Marrakech photos":

1. **Riad courtyard with pool** — an establishing/place shot.
2. **Zellige tilework close-up** — a texture/detail shot.
3. **Desert palm grove at golden hour** — an atmosphere/mood shot.

That mix reads as curated; three wide landscape shots of different
buildings would have read as a stock-photo dump. Each `<figure>` uses a
bottom gradient overlay (`bg-gradient-to-t from-espresso/60 ...`) so a white
caption is always legible regardless of the photo's own tonal range — a
technique worth reusing anywhere a caption sits directly on a photo.
