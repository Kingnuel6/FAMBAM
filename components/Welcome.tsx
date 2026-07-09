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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24 text-center"
    >
      <Petals count={10} />

      <motion.div
        className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-dusty-rose/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6 }}
        viewport={{ once: true }}
      />

      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.25 } } }}
      >
        <motion.p
          variants={fadeUp}
          className="font-heading text-xl italic text-charcoal/80 sm:text-2xl"
        >
          Together with our families, we invite you to celebrate our wedding
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-script text-6xl leading-tight text-gold sm:text-7xl md:text-8xl"
        >
          Ibukun &amp; Ayobami
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <p className="font-body text-sm uppercase tracking-[0.35em] text-charcoal/70">
            November 19 &amp; 20, 2026
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-4 font-body text-sm uppercase tracking-widest text-sage">
          Marrakech, Morocco
        </motion.p>
      </motion.div>
    </section>
  );
}
