"use client";

import { useEffect, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

const WEDDING_DATE = new Date(wedding.dates.start);

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-forest px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-gold/15 blur-3xl animate-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-sage/15 blur-3xl animate-glow" />
      </div>

      <AnimatedSection className="relative z-10">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-gold">Counting down to</p>
        <h2 className="mt-3 font-script text-4xl text-ivory sm:text-5xl">Our Wedding Day</h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex w-20 flex-col items-center rounded-lg border border-gold/30 bg-white/5 py-5 backdrop-blur-sm sm:w-28"
            >
              <span className="font-heading text-3xl text-ivory sm:text-5xl tabular-nums">
                {unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-2 font-body text-[10px] uppercase tracking-widest text-ivory/60 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
