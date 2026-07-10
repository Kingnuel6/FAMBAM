"use client";

import { RefObject } from "react";
import { wedding } from "@/config/wedding";

type EnvelopeProps = {
  envelopeRef: RefObject<HTMLDivElement>;
  flapRef: RefObject<HTMLDivElement>;
  monogramRef: RefObject<HTMLDivElement>;
  cardRef: RefObject<HTMLDivElement>;
};

/**
 * Purely presentational — the sage-paper envelope, its flap, gold
 * monogram seal, and the invitation card hidden inside. All motion is
 * owned by OpeningAnimation, which supplies the refs.
 */
export default function Envelope({ envelopeRef, flapRef, monogramRef, cardRef }: EnvelopeProps) {
  return (
    <div className="envelope-scene relative flex flex-col items-center px-6">
      {/* Invitation card, revealed as the flap opens */}
      <div
        ref={cardRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-ivory p-8 text-center opacity-0 shadow-2xl sm:w-[340px]"
      >
        <p className="font-heading text-sm uppercase tracking-[0.3em] text-gold">Save the date</p>
        <p className="mt-3 font-script text-3xl text-charcoal">{wedding.coupleNames}</p>
        <p className="mt-3 font-body text-xs uppercase tracking-widest text-charcoal/70">
          {wedding.dates.display}
        </p>
      </div>

      {/* The envelope body */}
      <div
        ref={envelopeRef}
        className="envelope-paper relative z-10 h-64 w-80 rounded-sm shadow-xl sm:h-72 sm:w-96"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Pocket (bottom triangle) */}
        <div
          className="absolute inset-x-0 bottom-0 h-full rounded-sm"
          style={{
            clipPath: "polygon(0 100%, 50% 42%, 100% 100%)",
            background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Flap */}
        <div
          ref={flapRef}
          className="envelope-paper absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-sm"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            filter: "brightness(1.05)",
          }}
        >
          <div className="absolute inset-0 border-t border-gold/30" />
        </div>

        {/* Gold monogram seal */}
        <div
          ref={monogramRef}
          className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold shadow-lg"
        >
          <span className="font-script text-2xl text-ivory">{wedding.monogram}</span>
        </div>
      </div>
    </div>
  );
}
