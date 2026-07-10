"use client";

import { motion } from "framer-motion";
import FloatingFlowers from "./FloatingFlowers";
import { wedding } from "@/config/wedding";

export default function FinalScene() {
  return (
    <section
      id="final"
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ivory to-sage/15 px-6 py-24 text-center"
    >
      <FloatingFlowers count={20} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-heading text-2xl italic text-charcoal/80 sm:text-3xl">
          We can&apos;t wait to celebrate with you.
        </p>
        <p className="mt-6 font-script text-5xl text-gold sm:text-6xl">{wedding.coupleNames}</p>
        <p className="mt-6 font-body text-sm uppercase tracking-[0.35em] text-sage">{wedding.hashtag}</p>
      </motion.div>
    </section>
  );
}
