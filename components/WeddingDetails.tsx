"use client";

import { AnimatedSection, AnimatedItem } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

export default function WeddingDetails() {
  return (
    <section id="details" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mb-16 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">The Details</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            Everything you need to know
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger={0.12} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {wedding.schedule.map((event) => (
            <AnimatedItem
              key={event.title}
              className="rounded-lg border border-gold/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm"
            >
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">{event.day}</p>
              <h3 className="mt-3 font-heading text-2xl text-charcoal">{event.title}</h3>
              <p className="mt-2 font-body text-sm text-charcoal/70">
                {event.date} · {event.time}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
                {event.description}
              </p>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection
          stagger={0.1}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <AnimatedItem className="rounded-lg border border-gold/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl">👗</div>
            <h3 className="mt-3 font-heading text-xl text-gold">Dress Code</h3>
            <p className="mt-2 font-body text-sm font-medium text-charcoal/80">
              {wedding.dressCode.summary}
            </p>
            <p className="mt-2 font-body text-xs leading-relaxed text-charcoal/60">
              {wedding.dressCode.note}
            </p>
          </AnimatedItem>

          <AnimatedItem className="rounded-lg border border-gold/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl">☀️</div>
            <h3 className="mt-3 font-heading text-xl text-gold">Weather</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">{wedding.weather}</p>
          </AnimatedItem>

          <AnimatedItem className="rounded-lg border border-gold/20 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
            <div className="text-2xl">✈️</div>
            <h3 className="mt-3 font-heading text-xl text-gold">Getting There</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
              {wedding.gettingThere}
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
