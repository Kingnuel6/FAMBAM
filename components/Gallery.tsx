"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

export default function Gallery() {
  const photos = wedding.gallery;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <section id="gallery" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mb-12 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">A Glimpse</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            Marrakech is waiting for us
          </h2>
        </AnimatedSection>

        <AnimatedSection stagger={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <AnimatedItem
              key={photo.src}
              className="group relative overflow-hidden rounded-lg shadow-sm"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="relative block aspect-[4/5] w-full cursor-zoom-in"
                aria-label={`Enlarge photo: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-left font-body text-xs uppercase tracking-widest text-ivory">
                  {photo.caption}
                </span>
              </button>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-6"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10 sm:left-8"
            >
              ‹
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                fill
                sizes="(min-width: 640px) 512px, 90vw"
                className="rounded-md object-cover"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory/10 sm:right-8"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
