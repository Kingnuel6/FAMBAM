"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ivory/90 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#hero" className="font-script text-2xl text-gold">
          {wedding.monogram}
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {wedding.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/80 transition hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span className={`h-px w-5 bg-charcoal transition ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-charcoal transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-charcoal transition ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 overflow-hidden bg-ivory/95 pb-6 backdrop-blur-sm sm:hidden"
          >
            {wedding.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
