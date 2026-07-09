## FamBam 2026

Digital wedding invitation for Ibukun & Ayobami — November 19 & 20, 2026, Hôtel Tigmiza, Marrakech, Morocco. `#FamBam2026`

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP.

### Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Structure

- `app/page.tsx` — assembles the scene sequence
- `components/EnvelopeLanding.tsx` — Scene 1, the cinematic GSAP envelope-open sequence
- `components/Welcome.tsx` — Scene 2, hero
- `components/EventDetails.tsx` — Scene 3, event info cards
- `components/Countdown.tsx` — Scene 4, live countdown
- `components/RSVPForm.tsx` + `app/api/rsvp/route.ts` — Scene 5, RSVP
- `components/AsoEbiGifts.tsx` — Scene 6, Aso Ebi & gifts
- `components/FinalScene.tsx` — closing scene

### Notes

- `public/audio/piano.mp3` is not included — add a soft piano track there to enable the optional Scene 1 background music (see `public/audio/README.md`).
- `public/icons/icon.svg` is a placeholder monogram icon for the PWA manifest; swap in branded PNG/SVG icons before shipping.
- Aso Ebi payment details in `components/AsoEbiGifts.tsx` are placeholders pending real account information.

### Deploy

```bash
vercel deploy --prod
```
