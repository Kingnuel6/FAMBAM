"use client";

import { useEffect, useMemo, useState } from "react";

type Sparkle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

/**
 * Tiny twinkling sparkle motes — distinct from Petals (which drift and
 * fall): these stay put and gently fade in/out in place, like dust
 * catching light.
 */
export default function Particles({ count = 18, className = "" }: { count?: number; className?: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="animate-sparkle absolute rounded-full bg-gold"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
