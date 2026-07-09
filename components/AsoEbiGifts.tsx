"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function AsoEbiGifts() {
  return (
    <section id="gifts" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Aso Ebi &amp; Gifts</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            We are grateful for your love and presence
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mt-12 rounded-lg border border-gold/20 bg-white/70 p-8 text-left backdrop-blur-sm sm:p-10"
        >
          <h3 className="text-center font-heading text-2xl text-gold">Aso Ebi</h3>
          <p className="mt-2 text-center font-body text-sm text-charcoal/70">₦150,000 per set</p>

          <div className="mt-6 space-y-3 rounded-md bg-ivory p-6 font-body text-sm text-charcoal/80">
            <div className="flex justify-between">
              <span className="text-charcoal/50">Account Name</span>
              <span>FamBam 2026 Wedding (Placeholder)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/50">Account Number</span>
              <span>0000000000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/50">Bank</span>
              <span>To be announced</span>
            </div>
          </div>
          <p className="mt-4 text-center font-body text-xs text-charcoal/50">
            Full payment details will be shared closer to the RSVP deadline.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-lg border border-dusty-rose/30 bg-white/70 p-8 backdrop-blur-sm"
        >
          <h3 className="font-heading text-2xl text-dusty-rose">Gifts</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
            Your presence is the greatest gift of all. Should you wish to honor us further,
            a contribution towards our new journey together would be received with love.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
