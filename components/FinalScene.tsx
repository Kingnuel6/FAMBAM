"use client";

import { motion } from "framer-motion";
import Petals from "./Petals";

export default function FinalScene() {
  return (
    <section
      id="final"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ivory to-dusty-rose/20 px-6 py-24 text-center"
    >
      <Petals count={20} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-heading text-2xl italic text-charcoal/80 sm:text-3xl">
          We can&apos;t wait to celebrate with you in Marrakech
        </p>
        <p className="mt-6 font-script text-5xl text-gold sm:text-6xl">Ibukun &amp; Ayobami</p>
        <p className="mt-6 font-body text-sm uppercase tracking-[0.35em] text-sage">#FamBam2026</p>
      </motion.div>
    </section>
  );
}
