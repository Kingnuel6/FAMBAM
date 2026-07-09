"use client";

import { motion, Variants } from "framer-motion";
import Petals from "./Petals";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function Welcome() {
  return (
    <section
      id="welcome"
      className="welcome-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <Petals count={10} />

      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.22 } } }}
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-xs uppercase tracking-[0.35em] text-gold sm:text-sm"
        >
          You are warmly invited to celebrate
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="text-gold">✦</span>
          <span className="h-px w-10 bg-gold/50" />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 font-body text-xs uppercase tracking-[0.35em] text-gold/90">
          #FamBam2026
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading text-5xl leading-[1.35] text-cream sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Ibukun <span className="font-script text-gold">&amp;</span> Ayobami
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-10 font-heading text-2xl text-cream/90 sm:text-3xl">
          November 19 &amp; 20, 2026
        </motion.p>

        <motion.p variants={fadeUp} className="mt-3 font-body text-sm uppercase tracking-[0.3em] text-cream/70">
          Palmeraie, Marrakech — Morocco
        </motion.p>

        <motion.a
          href="#details"
          variants={fadeUp}
          className="mt-10 rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-espresso"
        >
          View Accommodations ↓
        </motion.a>
      </motion.div>
    </section>
  );
}
