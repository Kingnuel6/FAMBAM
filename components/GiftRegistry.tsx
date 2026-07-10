"use client";

import { AnimatedSection } from "./AnimatedSection";
import { wedding } from "@/config/wedding";

export default function GiftRegistry() {
  const { asoEbi, message, links, qrCodeUrl } = wedding.registry;

  return (
    <section id="gifts" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Gift Registry</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            We are grateful for your love and presence
          </h2>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="mt-12 rounded-lg border border-gold/20 bg-white/70 p-8 text-left backdrop-blur-sm sm:p-10"
        >
          <h3 className="text-center font-heading text-2xl text-gold">Aso Ebi</h3>
          <p className="mt-2 text-center font-body text-sm text-charcoal/70">{asoEbi.price}</p>

          <div className="mt-6 space-y-3 rounded-md bg-ivory p-6 font-body text-sm text-charcoal/80">
            <div className="flex justify-between">
              <span className="text-charcoal/50">Account Name</span>
              <span>{asoEbi.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/50">Account Number</span>
              <span>{asoEbi.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/50">Bank</span>
              <span>{asoEbi.bank}</span>
            </div>
          </div>
        </AnimatedSection>

        {links.length > 0 && (
          <AnimatedSection
            delay={0.2}
            className="mt-8 rounded-lg border border-gold/20 bg-white/70 p-8 backdrop-blur-sm"
          >
            <h3 className="font-heading text-2xl text-gold">Registry Links</h3>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-charcoal/80 underline decoration-gold decoration-1 underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        )}

        {qrCodeUrl && (
          <AnimatedSection delay={0.25} className="mt-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrCodeUrl} alt="Scan to view gift registry" className="h-40 w-40 rounded-md border border-gold/20" />
          </AnimatedSection>
        )}

        <AnimatedSection
          delay={0.3}
          className="mt-8 rounded-lg border border-sage/40 bg-white/70 p-8 backdrop-blur-sm"
        >
          <h3 className="font-heading text-2xl text-sage">Gifts</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">{message}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
