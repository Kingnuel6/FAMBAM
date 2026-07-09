"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Petals from "./Petals";

type Phase = "closed" | "opening" | "open";
type Mode = "video" | "fallback";

const VIDEO_LOAD_TIMEOUT_MS = 4000;

export default function GateIntro() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [mode, setMode] = useState<Mode>("video");
  const [muted, setMuted] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gateLeftRef = useRef<HTMLDivElement>(null);
  const gateRightRef = useRef<HTMLDivElement>(null);
  const videoReadyRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setPromptVisible(true), 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  // Detect whether the primary video can actually play — falls back to the
  // CSS/SVG gate on decode error, or if metadata never arrives in time
  // (e.g. an unsupported codec that a browser silently hangs on).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      videoReadyRef.current = true;
      video.currentTime = 0;
    };
    const handleError = () => setMode("fallback");

    video.addEventListener("loadedmetadata", handleReady);
    video.addEventListener("error", handleError);

    const timeout = setTimeout(() => {
      if (!videoReadyRef.current) setMode("fallback");
    }, VIDEO_LOAD_TIMEOUT_MS);

    return () => {
      video.removeEventListener("loadedmetadata", handleReady);
      video.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, []);

  const finishWithCrossFade = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: "power1.inOut",
      onComplete: () => setPhase("open"),
    });
  };

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

    if (mode === "video" && videoRef.current) {
      videoRef.current.play().catch(() => setMode("fallback"));
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to(gateLeftRef.current, { rotateY: -112, duration: 1.4 })
      .to(gateRightRef.current, { rotateY: 112, duration: 1.4 }, "<")
      .add(finishWithCrossFade, "-=0.2");
  };

  // If we fell back to CSS mode after the video already started playing
  // (rare, but possible on a mid-stream decode error), still open cleanly.
  useEffect(() => {
    if (mode === "fallback" && phase === "opening" && !reduced) {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(gateLeftRef.current, { rotateY: -112, duration: 1.4 })
        .to(gateRightRef.current, { rotateY: 112, duration: 1.4 }, "<")
        .add(finishWithCrossFade, "-=0.2");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (phase === "open") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-ivory"
    >
      <Petals count={16} paused={phase !== "closed"} />

      <audio ref={audioRef} src="/audio/piano.mp3" loop preload="none" />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-black/20 text-gold backdrop-blur-sm transition hover:bg-black/30"
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

      {/* Primary: video gate */}
      {mode === "video" && (
        <video
          ref={videoRef}
          src="/videos/gate.mp4"
          poster="/images/gate-poster.jpg"
          muted
          playsInline
          preload="auto"
          onEnded={finishWithCrossFade}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Fallback: CSS/SVG two-panel gate */}
      {mode === "fallback" && (
        <div className="gate-scene absolute inset-0">
          <div
            ref={gateLeftRef}
            className="gate-panel gate-panel-left absolute inset-y-0 left-0 w-1/2 origin-left"
          />
          <div
            ref={gateRightRef}
            className="gate-panel gate-panel-right absolute inset-y-0 right-0 w-1/2 origin-right"
          />
        </div>
      )}

      {/* Golden breathing glow */}
      <div className="animate-glow pointer-events-none absolute left-1/2 top-1/2 z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl" />

      {/* Scrims for text legibility over the gate imagery */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-espresso/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-espresso/60 to-transparent" />

      <div className="relative z-20 flex flex-col items-center px-6 pt-10 text-center">
        <p className="font-heading text-lg tracking-wide text-cream sm:text-xl">
          A Special Invitation For You
        </p>
        <p className="mt-2 font-script text-3xl text-gold sm:text-4xl">Ibukun &amp; Ayobami</p>
      </div>

      <div
        className={`relative z-20 mt-auto mb-12 flex flex-col items-center gap-2 pb-6 transition-opacity duration-700 ${
          promptVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleOpen}
          className="animate-pulse-soft rounded-full border border-gold px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-cream backdrop-blur-sm transition hover:bg-gold hover:text-espresso"
        >
          Tap to open
        </button>
        <span className="text-gold">↓</span>
      </div>
    </div>
  );
}
