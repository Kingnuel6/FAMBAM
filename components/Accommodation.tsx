"use client";

import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

export default function Accommodation() {
  return (
    <section id="accommodation" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-12 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Where to Stay</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">Accommodation</h2>
          <p className="mt-3 font-body text-sm text-charcoal/70">{wedding.accommodation.intro}</p>
        </AnimatedSection>

        <AnimatedSection stagger={0.15} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {wedding.accommodation.hotels.map((hotel) => (
            <AnimatedItem
              key={hotel.name}
              className="rounded-lg border border-gold/20 bg-white/70 p-8 shadow-sm backdrop-blur-sm"
            >
              <h3 className="font-heading text-2xl text-gold">{hotel.name}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
                {hotel.description}
              </p>
              <p className="mt-3 font-body text-xs uppercase tracking-widest text-charcoal/50">
                {hotel.contact}
              </p>
              <a
                href={hotel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-body text-sm text-gold underline decoration-gold decoration-1 underline-offset-4"
              >
                View details
              </a>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-8 text-center">
          <a
            href={wedding.accommodation.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            View All Accommodations
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
