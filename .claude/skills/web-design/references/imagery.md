# Sourcing and embedding photography

## Finding candidates

Search free stock sites by *feeling + subject*, not subject alone —
"Marrakech riad courtyard pool" beats "Marrakech," because it front-loads the
composition and mood you actually want, not just the location. Cross-check a
handful of results against the one-line brief before picking; the first
result is rarely the best-matched one.

Good free, no-attribution-required sources: Pexels, Unsplash, Pixabay. All
three explicitly permit commercial use and hotlinking via their CDN — you do
not need an API key or a download step for a handful of images embedded
directly by URL.

## Getting the direct CDN URL

Stock photo *pages* (e.g. `pexels.com/photo/some-title-<id>/`) are usually
protected against scraping (Cloudflare/bot-detection), even though the
*images themselves* are meant to be hotlinked. Two ways around this:

1. **Search results often surface the page URL with the photo ID embedded**
   (e.g. `.../photo/elegant-moroccan-riad-courtyard-with-pool-31356131/` —
   the trailing number is the photo ID). Pexels' CDN URL pattern is a stable,
   well-documented convention built from that ID:
   `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
   You can construct this directly from the ID without ever successfully
   loading the page itself.
2. If you have a working WebFetch/browser path to the page, you can extract
   the `og:image` or `<img src>` directly — but don't assume this will work;
   plan for option 1 as the fallback.

## The "I can't verify this in my sandbox" situation

Some agent environments run outbound network traffic through a restrictive
proxy that blocks arbitrary image CDNs (returns 403 for `images.pexels.com`,
etc.), while allowing the environment's own package registries and a handful
of approved domains. If this happens to you:

- **This is a restriction on your tooling's network, not the deployed site's.**
  A real site visitor's browser fetches the image directly from Pexels/etc.
  over their own network — completely unrelated to whatever sandboxed proxy
  blocked *your* `curl`/`WebFetch` call. Don't conclude the image is broken
  just because you can't fetch it yourself.
- **Do conclude you can't visually verify it before shipping.** Say so
  explicitly to whoever you're building for, and suggest they do a quick
  visual check once deployed. Don't silently ship unverified image URLs
  without flagging the gap — a wrong photo ID is a real (if rare) failure
  mode, and "I constructed this URL from a pattern but couldn't load it
  myself" is meaningfully different from "I confirmed this loads."
- Check for a proxy status endpoint or README in your environment before
  concluding the block is permanent — some environments document an
  allowlist you can request additions to.

## Embedding correctly in Next.js

- Add the CDN host to `next.config.mjs` so `next/image` can optimize it:
  ```js
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  }
  ```
- Use `fill` + a sized wrapper (`relative aspect-[4/5]`) for responsive
  grids rather than fixed `width`/`height` — the aspect ratio should be a
  design decision (does this shot want to be tall/intimate or wide/vista?),
  not whatever the source photo happened to be cropped to.
- `loading="lazy"` is the default for `next/image` when the image isn't
  marked `priority` — leave hero/above-the-fold images as `priority`, leave
  everything else lazy.
- Always write real `alt` text describing what's *in* the frame, not the
  caption — captions are for mood, `alt` is for accessibility and should be
  literal.
