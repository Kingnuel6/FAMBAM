"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Envelope from "./Envelope";
import FloatingFlowers from "./FloatingFlowers";
import { wedding } from "@/config/wedding";

type Phase = "closed" | "opening" | "open";

const CORNER_FLOWERS = [
  "absolute -left-6 -top-6 sm:-left-10 sm:-top-10",
  "absolute -right-6 -top-6 sm:-right-10 sm:-top-10",
  "absolute -left-6 -bottom-6 sm:-left-10 sm:-bottom-10",
  "absolute -right-6 -bottom-6 sm:-right-10 sm:-bottom-10",
];

function CornerFlower({ className, delay }: { className: string; delay: number }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`${className} h-16 w-16 sm:h-24 sm:w-24`}
      style={{ animation: `bloom 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}
      aria-hidden="true"
    >
      <g fill="none" stroke="#C9A45A" strokeWidth="1.2" opacity="0.8">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="30"
            cy="30"
            rx="16"
            ry="7"
            transform={`rotate(${deg} 30 30)`}
            fill="#C9A45A"
            fillOpacity="0.15"
          />
        ))}
        <circle cx="30" cy="30" r="5" fill="#C9A45A" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

export default function OpeningAnimation() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [muted, setMuted] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [showBloom, setShowBloom] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
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
      audioRef.current.volume = 0.45;
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

    tl.to(promptRef.current, { opacity: 0, y: -8, duration: 0.35 })
      // 2. Monogram softly glows
      .to(
        monogramRef.current,
        { scale: 1.18, boxShadow: "0 0 40px 10px rgba(201,164,90,0.55)", duration: 0.4, ease: "power1.out" },
        "<"
      )
      .to(monogramRef.current, { scale: 1, duration: 0.3 })
      // 3. Flap slowly opens
      .to(flapRef.current, { rotateX: 165, duration: 1.0, ease: "power2.inOut" }, "-=0.1")
      // 4. Invitation card slides upward
      .fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.92 },
        { y: -170, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.75"
      )
      // 5. Camera gently zooms in
      .to(sceneRef.current, { scale: 1.06, duration: 1.0, ease: "power1.inOut" }, "-=0.9")
      // 7. Flowers softly bloom in the corners
      .call(() => setShowBloom(true), undefined, "-=0.5")
      .to({}, { duration: 0.15 })
      // 6 & 8. Background fades to ivory, invitation expands into the site
      .to(overlayRef.current, { opacity: 0, duration: 0.7, ease: "power1.inOut" })
      .set(overlayRef.current, { pointerEvents: "none" });
  };

  if (phase === "open") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ivory"
    >
      <FloatingFlowers count={12} paused={phase !== "closed"} />

      <audio ref={audioRef} src={wedding.music} loop preload="none" />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition hover:bg-gold/10"
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

      <div ref={sceneRef} className="relative flex flex-col items-center">
        {showBloom &&
          CORNER_FLOWERS.map((cls, i) => <CornerFlower key={cls} className={cls} delay={i * 0.1} />)}

        <Envelope envelopeRef={envelopeRef} flapRef={flapRef} monogramRef={monogramRef} cardRef={cardRef} />

        <div ref={promptRef} className="relative z-10 mt-10 flex flex-col items-center text-center">
          <p className="font-heading text-lg tracking-wide text-charcoal/90 sm:text-xl">
            {wedding.invitation.eyebrow}
          </p>
          <p className="mt-2 font-script text-2xl text-gold">{wedding.coupleNames}</p>

          <button
            type="button"
            onClick={handleOpen}
            className="animate-pulse-soft mt-8 rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            Tap to Open
          </button>
        </div>
      </div>
    </div>
  );
}
