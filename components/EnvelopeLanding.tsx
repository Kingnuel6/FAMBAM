"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Petals from "./Petals";

export default function EnvelopeLanding() {
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const [muted, setMuted] = useState(true);
  const [reduced, setReduced] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealLeftRef = useRef<HTMLDivElement>(null);
  const sealRightRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("opening");

    if (!muted && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        /* autoplay blocked or file missing — ignore */
      });
    }

    if (reduced) {
      setPhase("open");
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setPhase("open"),
    });

    tl.to(promptRef.current, { opacity: 0, y: -10, duration: 0.5 })
      .to(
        envelopeRef.current,
        { y: -24, scale: 1.03, duration: 1.1, ease: "power1.out" },
        "-=0.2"
      )
      .to(
        [sealLeftRef.current],
        { x: -18, y: -6, rotate: -25, opacity: 0, duration: 0.7 },
        "-=0.6"
      )
      .to(
        [sealRightRef.current],
        { x: 18, y: -6, rotate: 25, opacity: 0, duration: 0.7 },
        "<"
      )
      .to(
        flapRef.current,
        { rotateX: 165, duration: 1.3, ease: "power2.inOut" },
        "-=0.3"
      )
      .fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: -190, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=0.6"
      )
      .to({}, { duration: 0.6 })
      .to(overlayRef.current, { opacity: 0, duration: 0.9, ease: "power1.inOut" })
      .set(overlayRef.current, { pointerEvents: "none" });
  };

  if (phase === "open") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory paper-texture"
    >
      <Petals count={16} />

      <audio ref={audioRef} src="/audio/piano.mp3" loop preload="none" />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold/10"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18 6a9 9 0 0 1 0 12" />
          </svg>
        )}
      </button>

      <div className="envelope-scene relative flex flex-col items-center px-6">
        <div
          ref={cardRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-6 text-center opacity-0 shadow-2xl sm:w-[340px]"
        >
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-gold">Save the date</p>
          <p className="mt-3 font-script text-3xl text-charcoal">Ibukun &amp; Ayobami</p>
          <p className="mt-3 font-body text-xs uppercase tracking-widest text-charcoal/70">
            November 19 &amp; 20, 2026
          </p>
        </div>

        <div
          ref={envelopeRef}
          className="relative z-10 h-56 w-72 sm:h-64 sm:w-80"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 rounded-sm border border-gold/30 bg-[#fffdf8] shadow-xl" />

          <div
            className="absolute inset-x-0 bottom-0 h-full"
            style={{
              clipPath: "polygon(0 100%, 50% 40%, 100% 100%)",
              background: "linear-gradient(180deg, #f3ecdd 0%, #fffdf8 100%)",
            }}
          />

          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-1/2 origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #f7f0df 0%, #eaddb8 100%)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0 border-t border-gold/20" />
          </div>

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-11 w-11">
              <div
                ref={sealLeftRef}
                className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-gold shadow-md"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <span className="font-script text-lg text-ivory">I&amp;A</span>
              </div>
              <div
                ref={sealRightRef}
                className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-gold shadow-md"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              >
                <span className="font-script text-lg text-ivory">I&amp;A</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={promptRef} className="relative z-10 mt-10 flex flex-col items-center text-center">
          <p className="font-heading text-lg tracking-wide text-charcoal/90 sm:text-xl">
            A Special Invitation For You
          </p>
          <p className="mt-2 font-script text-2xl text-gold">From — Ibukun &amp; Ayobami</p>

          <button
            type="button"
            onClick={handleOpen}
            className="animate-pulse-soft mt-8 rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            Tap to open
          </button>
        </div>
      </div>
    </div>
  );
}
