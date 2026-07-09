"use client";

import { useEffect, useMemo, useState } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  hue: "rose" | "gold" | "sage";
  rotate: number;
};

const HUE_COLOR: Record<Petal["hue"], string> = {
  rose: "#D8A7B1",
  gold: "#C9A227",
  sage: "#A8B5A2",
};

export default function Petals({
  count = 14,
  className = "",
  paused = false,
}: {
  count?: number;
  className?: string;
  paused?: boolean;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 14 + Math.random() * 12,
      delay: Math.random() * 14,
      drift: (Math.random() - 0.5) * 160,
      hue: (["rose", "gold", "sage"] as const)[Math.floor(Math.random() * 3)],
      rotate: Math.random() * 360,
    }));
  }, [count]);

  if (reduced) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal animate-petal-fall"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationPlayState: paused ? "paused" : "running",
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 32 32"
            width="100%"
            height="100%"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <path
              d="M16 2C21 2 26 9 26 16C26 23 21 30 16 30C11 30 6 23 6 16C6 9 11 2 16 2Z"
              fill={HUE_COLOR[p.hue]}
              opacity="0.55"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
