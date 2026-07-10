"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

export type RevealEffect = "fade-up" | "blur-in" | "scale";

const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

const effects: Record<RevealEffect, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(14px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
};

type AnimatedSectionProps = {
  children: ReactNode;
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
  /** Viewport fraction that must be visible before revealing (0-1). */
  amount?: number;
  /** When set, children using AnimatedItem stagger in by this many seconds. */
  stagger?: number;
  className?: string;
};

/**
 * Scroll-triggered reveal wrapper — the single place that owns "how a
 * section enters the screen" so individual sections don't each redefine
 * their own fade/blur/scale variants. Motion timing follows the site's
 * editorial pace (600-1500ms, easeOut-family curves, generous stagger).
 */
export function AnimatedSection({
  children,
  effect = "fade-up",
  delay = 0,
  duration = 0.9,
  amount = 0.35,
  stagger,
  className = "",
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={
        stagger !== undefined
          ? { show: { transition: { staggerChildren: stagger } } }
          : effects[effect]
      }
      transition={stagger === undefined ? { duration, delay, ease: EASE_EDITORIAL } : undefined}
    >
      {children}
    </motion.div>
  );
}

/**
 * A child of a staggering AnimatedSection. Inherits the "hidden"/"show"
 * state from its nearest animating ancestor — do not give it its own
 * whileInView/viewport, or it will animate independently instead of as
 * part of the stagger sequence.
 */
export function AnimatedItem({
  children,
  effect = "fade-up",
  delay = 0,
  duration = 0.9,
  className = "",
  ...rest
}: AnimatedSectionProps & Omit<HTMLMotionProps<"div">, "variants" | "transition" | "className">) {
  return (
    <motion.div
      className={className}
      variants={effects[effect]}
      transition={{ duration, delay, ease: EASE_EDITORIAL }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
