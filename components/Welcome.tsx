"use client";

import Image from "next/image";
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <Image
        src="https://images.pexels.com/photos/35179854/pexels-photo-35179854.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="A lush Moroccan courtyard framed by an ornate archway"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-espresso/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-transparent to-espresso/60" />

      <Petals count={10} />

      <motion.div
        className="relative z-10 flex max-w-2xl flex-col items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.3 } } }}
      >
        <motion.p
          variants={fadeUp}
          className="font-heading text-xl italic text-cream/90 sm:text-2xl"
        >
          Together with our families
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-script text-6xl leading-tight text-gold sm:text-7xl md:text-8xl"
        >
          Ibukun &amp; Ayobami
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-8 font-body text-sm uppercase tracking-[0.3em] text-cream/80">
          November 19 &amp; 20, 2026 — Marrakech, Morocco
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="animate-bounce absolute bottom-8 z-10 text-2xl text-cream/80"
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
