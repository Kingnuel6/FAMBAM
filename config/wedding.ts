// Single source of truth for all wedding content. Components read from here
// instead of hardcoding copy, so the site can be re-themed for a different
// couple by editing only this file.

export const wedding = {
  bride: "Ayobami",
  groom: "Ibukun",
  coupleNames: "Ibukun & Ayobami",
  hashtag: "#FamBam2026",
  monogram: "I&A",

  invitation: {
    eyebrow: "A Special Invitation For You",
    intro: "Together with our families",
  },

  dates: {
    // ISO strings; the countdown and any date math read from `start`.
    start: "2026-11-19T00:00:00",
    end: "2026-11-20T00:00:00",
    display: "November 19 & 20, 2026",
  },

  rsvp: {
    deadline: "2026-07-31",
    deadlineDisplay: "July 31, 2026",
  },

  location: {
    city: "Marrakech, Morocco",
    venueName: "Hôtel Tigmiza",
    address: "Km 3 Bab Atlas, Palmeraie, Marrakech, Morocco",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Hôtel Tigmiza, Km 3 Bab Atlas, Palmeraie, Marrakech, Morocco"),
  },

  gettingThere:
    "Fly into Marrakech Menara Airport (RAK), approx. 20 minutes to the venue.",

  schedule: [
    {
      day: "Day One",
      date: "November 19, 2026",
      title: "Traditional Ceremony",
      time: "4:00 PM",
      description: "An intimate traditional engagement ceremony with family.",
    },
    {
      day: "Day Two",
      date: "November 20, 2026",
      title: "Wedding & Reception",
      time: "3:00 PM",
      description: "The wedding ceremony followed by an evening reception.",
    },
  ],

  dressCode: {
    summary: "Garden formal",
    // TODO: confirm exact palette/notes for guests before publishing.
    note: "Soft, warm tones: think ivory, sage, gold, and earth tones. Comfortable shoes recommended for garden terrain.",
  },

  weather: "Marrakech in November is mild; expect warm days (~22°C) and cool evenings (~12°C).",

  accommodation: {
    intro: "We've curated a few recommended stays near the venue.",
    externalUrl: "https://fambam-marrakech-2026.netlify.app/",
    // TODO: replace with real hotel names/links/contact info.
    hotels: [
      {
        name: "Hôtel Tigmiza (Venue Hotel)",
        description: "Stay right where the celebration happens.",
        link: "https://fambam-marrakech-2026.netlify.app/",
        contact: "Details on the accommodation site",
      },
      {
        name: "Palais Mirage d'Atlas Hotel",
        description: "A comfortable stay just a short drive from the venue.",
        link: "https://fambam-marrakech-2026.netlify.app/",
        contact: "Details on the accommodation site",
      },
    ],
  },

  // TODO: replace placeholder milestones with the couple's real story/photos.
  story: [
    {
      date: "Placeholder",
      title: "How we met",
      description: "The story of how Ibukun & Ayobami's paths first crossed.",
      image:
        "https://images.pexels.com/photos/34157927/pexels-photo-34157927.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      date: "Placeholder",
      title: "The proposal",
      description: "The moment it became forever.",
      image:
        "https://images.pexels.com/photos/31356131/pexels-photo-31356131.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],

  gallery: [
    {
      src: "https://images.pexels.com/photos/31356131/pexels-photo-31356131.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A Moroccan riad courtyard with a pool, arches, and palm trees",
      caption: "Riad courtyards of Marrakech",
    },
    {
      src: "https://images.pexels.com/photos/34157927/pexels-photo-34157927.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Ornate Moroccan architectural tile work in traditional zellige patterns",
      caption: "Zellige tilework, everywhere you look",
    },
    {
      src: "https://images.pexels.com/photos/5418094/pexels-photo-5418094.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A desert landscape with a grove of palm trees at golden hour",
      caption: "The Palmeraie at golden hour",
    },
  ],

  heroImage: {
    src: "https://images.pexels.com/photos/35179854/pexels-photo-35179854.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "A lush Moroccan courtyard framed by an ornate archway",
  },

  registry: {
    asoEbi: {
      price: "₦150,000 per set",
      accountName: "Oluwatoyin Olatunji Daniel",
      accountNumber: "0014657424",
      bank: "GTBank",
    },
    message:
      "Your presence is the greatest gift of all. Should you wish to honor us further, a contribution towards our new journey together would be received with love.",
    // TODO: add real registry links / QR code image once available.
    links: [] as { label: string; url: string }[],
    qrCodeUrl: undefined as string | undefined,
  },

  music: "/audio/piano.mp3",

  nav: [
    { label: "Details", href: "#details" },
    { label: "Story", href: "#story" },
    { label: "Venue", href: "#venue" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
  ],
} as const;

export type Wedding = typeof wedding;
