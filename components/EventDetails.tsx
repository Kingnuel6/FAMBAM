"use client";

import { motion, Variants } from "framer-motion";

type DetailCard = {
  icon: string;
  title: string;
  body: React.ReactNode;
};

const cards: DetailCard[] = [
  {
    icon: "📅",
    title: "Date",
    body: <p>November 19 &amp; 20, 2026</p>,
  },
  {
    icon: "📍",
    title: "Venue",
    body: (
      <p>
        Hôtel Tigmiza
        <br />
        Km 3 Bab Atlas, Palmeraie
        <br />
        Marrakech, Morocco
      </p>
    ),
  },
  {
    icon: "🏨",
    title: "Accommodation",
    body: (
      <>
        <p>We&apos;ve curated luxury stays near the venue.</p>
        <a
          href="https://bit.ly/fambam"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block underline decoration-gold decoration-1 underline-offset-4 text-gold"
        >
          bit.ly/fambam
        </a>
      </>
    ),
  },
  {
    icon: "👗",
    title: "Aso Ebi",
    body: (
      <>
        <p>₦150,000 per set</p>
        <p className="mt-1 text-sm text-charcoal/60">Payment details to be shared soon</p>
      </>
    ),
  },
  {
    icon: "✈️",
    title: "Getting There",
    body: <p>Fly into Marrakech Menara Airport (RAK) — approx. 20 minutes to the venue</p>,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function EventDetails() {
  return (
    <section id="details" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">The Details</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            Everything you need to know
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className={`rounded-lg border border-gold/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm ${
                i === cards.length - 1 && cards.length % 3 === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="mt-4 font-heading text-2xl text-gold">{card.title}</h3>
              <div className="mt-3 font-body text-sm leading-relaxed text-charcoal/80">
                {card.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
