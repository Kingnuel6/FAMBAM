"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the page in Lenis smooth scrolling. Skipped entirely under
 * prefers-reduced-motion — smooth-scroll easing is itself a motion
 * effect, so a reduced-motion visitor gets the browser's native
 * (instant) scroll rather than a "softer" version of the same thing.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
