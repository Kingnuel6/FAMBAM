# Animation pacing reference

## Pick a register, then stay consistent

| Context | Duration | Easing | Stagger between siblings |
|---|---|---|---|
| Luxury / editorial / invitation | 0.8–1.4s | `easeOut`, `power2.out`, `power3.out` | 150–250ms |
| Standard marketing site | 0.4–0.7s | `easeOut` | 80–150ms |
| Dashboard / tool / dense UI | 150–300ms | `easeInOut` or linear | 0–60ms |

Mixing registers within one page (a 1.2s fade next to a 150ms snap) reads as
unintentional, not eclectic. Pick one row and apply it everywhere motion
appears on a given page.

## Do the stagger math

`staggerChildren: 0.22` across 6 elements means the *last* one doesn't start
animating until 1.1s after the *first* — plus its own duration on top. This
compounds fast. Before shipping:

1. Count the animated children in the group.
2. Multiply by the stagger interval.
3. Add one full duration on top (the last child's own animation time).
4. That's the total time before the section is "settled." If it's over ~2s
   for a group the visitor is already looking at, cut the stagger interval
   or the child count (e.g., group multiple text lines into one animated
   block instead of animating every line separately).

## The one-hero-moment rule

A page can have exactly one moment of custom, hand-choreographed animation
(a multi-step timeline library like GSAP is a signal you're building that
moment). Everything else should be a simple, repeated pattern — typically:

```
hidden: { opacity: 0, y: 32 }
show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
```

...triggered by `whileInView` with `viewport={{ once: true, amount: 0.4–0.5 }}`.
This isn't a limitation — it's what makes the one hero moment actually read
as special. If every section has its own bespoke choreography, none of them
stand out, and you've spent 5x the engineering effort for a flatter result.

## Reduced motion is a design decision, not a fallback

Check `prefers-reduced-motion` *before* writing the animation, not after:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

For a hero moment that's structurally dependent on animation (e.g. content
revealed only via a GSAP timeline), branch explicitly: check the media query
in JS too, and jump straight to the end state rather than skipping the
timeline and leaving content invisible. A reduced-motion visitor should see
the *same final content*, just without the choreography — never less
content.

## Common failure: line-height clipping on large display type

Large headline type (`text-6xl`+) with `leading-tight` can visually overlap
a following element when the text wraps to two lines — the line box doesn't
account for serif ascenders/descenders at that size. If a headline wraps and
the next element visually collides with it, increase `leading-` first
(`leading-[1.3]`–`leading-[1.4]` is usually enough) before adding more
margin — margin alone won't fix glyphs overflowing their own line box.
