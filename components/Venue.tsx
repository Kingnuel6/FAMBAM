"use client";

import { AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";
import { googleCalendarUrl, icsDataUrl } from "@/lib/calendar";

export default function Venue() {
  const calendarPayload = {
    title: `${wedding.coupleNames} Wedding`,
    start: wedding.dates.start,
    end: wedding.dates.end,
    details: `Join us as we celebrate at ${wedding.location.venueName}.`,
    location: wedding.location.address,
  };

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    wedding.location.address
  )}&output=embed`;

  return (
    <section id="venue" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-12 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">The Venue</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            {wedding.location.venueName}
          </h2>
          <p className="mt-2 font-body text-sm text-charcoal/70">{wedding.location.address}</p>
        </AnimatedSection>

        <AnimatedSection
          effect="scale"
          className="overflow-hidden rounded-lg border border-gold/20 bg-white/70 shadow-sm backdrop-blur-sm"
        >
          <div className="aspect-[16/9] w-full">
            <iframe
              src={mapEmbedSrc}
              title={`Map to ${wedding.location.venueName}`}
              loading="lazy"
              className="h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:justify-center">
            <a
              href={wedding.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-6 py-3 text-center font-body text-sm uppercase tracking-[0.2em] text-ivory transition hover:opacity-90"
            >
              Get Directions
            </a>
            <a
              href={googleCalendarUrl(calendarPayload)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold px-6 py-3 text-center font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ivory"
            >
              Add to Google Calendar
            </a>
            <a
              href={icsDataUrl(calendarPayload)}
              download={`${wedding.coupleNames.replace(/\s/g, "-")}-wedding.ics`}
              className="rounded-full border border-sage px-6 py-3 text-center font-body text-sm uppercase tracking-[0.2em] text-sage transition hover:bg-sage hover:text-ivory"
            >
              Save to Calendar
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
