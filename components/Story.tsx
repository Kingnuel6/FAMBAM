"use client";

import Image from "next/image";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

export default function Story() {
  return (
    <section id="story" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-16 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Our Story</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            How it all began
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gold/30 sm:block" />

          <AnimatedSection stagger={0.2} className="space-y-12">
            {wedding.story.map((moment, i) => (
              <AnimatedItem
                key={moment.title}
                className={`relative flex flex-col items-center gap-6 sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-sm sm:w-1/2">
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="relative w-full text-center sm:w-1/2 sm:text-left">
                  <span className="absolute left-1/2 top-0 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold sm:block" />
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">{moment.date}</p>
                  <h3 className="mt-2 font-heading text-2xl text-charcoal">{moment.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
                    {moment.description}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
