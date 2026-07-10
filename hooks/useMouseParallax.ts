"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Small desktop-only parallax offset driven by pointer position, relative
 * to the center of the given element. Disabled entirely on touch devices
 * (no meaningful pointer position) and under prefers-reduced-motion.
 */
export function useMouseParallax(ref: React.RefObject<HTMLElement>, strength = 12) {
  const [enabled, setEnabled] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduced && !coarsePointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(relX * strength);
      rawY.set(relY * strength);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [enabled, ref, rawX, rawY, strength]);

  return { x, y, enabled };
}
