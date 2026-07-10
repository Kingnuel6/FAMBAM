"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "./AnimatedSection";
import FloatingFlowers from "./FloatingFlowers";
import Particles from "./Particles";
import { wedding } from "@/config/wedding";
import { useMouseParallax } from "@/hooks/useMouseParallax";

function FloralCorner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <g fill="none" stroke="#A8B59A" strokeWidth="1.2" opacity="0.5">
        <path d="M10 190C10 120 60 60 130 40" />
        <ellipse cx="130" cy="40" rx="18" ry="9" fill="#C9A45A" fillOpacity="0.12" />
        <ellipse cx="90" cy="70" rx="14" ry="7" transform="rotate(35 90 70)" fill="#A8B59A" fillOpacity="0.15" />
        <ellipse cx="50" cy="120" rx="14" ry="7" transform="rotate(70 50 120)" fill="#A8B59A" fillOpacity="0.15" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { x, y } = useMouseParallax(sectionRef, 14);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-24 text-center"
    >
      <motion.div style={{ x, y }} className="contents">
        <FloralCorner className="left-0 top-0 h-40 w-40 sm:h-56 sm:w-56" />
        <FloralCorner className="right-0 top-0 h-40 w-40 -scale-x-100 sm:h-56 sm:w-56" />
        <FloralCorner className="bottom-0 left-0 h-40 w-40 -scale-y-100 sm:h-56 sm:w-56" />
        <FloralCorner className="bottom-0 right-0 h-40 w-40 -scale-x-100 -scale-y-100 sm:h-56 sm:w-56" />
      </motion.div>

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/15 blur-3xl" />

      <Particles count={16} />
      <FloatingFlowers count={8} />

      <AnimatedSection
        stagger={0.3}
        className="relative z-10 flex max-w-2xl flex-col items-center"
        amount={0.5}
      >
        <AnimatedItem>
          <p className="font-heading text-xl italic text-charcoal/80 sm:text-2xl">
            {wedding.invitation.intro} invite you to celebrate
          </p>
        </AnimatedItem>

        <AnimatedItem delay={0.1}>
          <h1 className="mt-6 font-script text-6xl leading-tight text-gold sm:text-7xl md:text-8xl">
            {wedding.coupleNames}
          </h1>
        </AnimatedItem>

        <AnimatedItem delay={0.2}>
          <p className="mt-8 font-body text-sm uppercase tracking-[0.3em] text-charcoal/70">
            {wedding.dates.display} — {wedding.location.city}
          </p>
        </AnimatedItem>

        <AnimatedItem delay={0.3} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="#rsvp"
            className="rounded-full bg-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory transition hover:opacity-90"
          >
            RSVP
          </Link>
          <Link
            href="#details"
            className="rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            View Details
          </Link>
        </AnimatedItem>
      </AnimatedSection>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.8 }}
        className="animate-bounce absolute bottom-8 z-10 text-2xl text-sage"
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
