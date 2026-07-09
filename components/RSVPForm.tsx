"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Attending = "yes" | "no" | "maybe";

const OPTIONS: { value: Attending; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
];

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending | null>(null);
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attending) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guests, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          className="mb-10 text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Join Us</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">RSVP</h2>
          <p className="mt-3 font-body text-sm text-charcoal/60">
            Kindly RSVP by <span className="text-gold">July 31, 2026</span>
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-lg border border-gold/30 bg-white/70 p-10 text-center"
            >
              <p className="font-heading text-2xl text-gold">
                Thank you for celebrating with us ❤️
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/70">
                We can&apos;t wait to see you in Marrakech.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-lg border border-gold/20 bg-white/70 p-8 backdrop-blur-sm sm:p-10"
            >
              <div>
                <label htmlFor="name" className="mb-2 block font-body text-xs uppercase tracking-widest text-charcoal/70">
                  Guest Name
                </label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gold/30 bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition focus:border-gold"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <span className="mb-2 block font-body text-xs uppercase tracking-widest text-charcoal/70">
                  Will you attend?
                </span>
                <div className="flex gap-3">
                  {OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setAttending(opt.value)}
                      className={`flex-1 rounded-md border px-4 py-2 font-body text-sm transition ${
                        attending === opt.value
                          ? "border-gold bg-gold text-ivory"
                          : "border-gold/30 text-charcoal/70 hover:border-gold"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="mb-2 block font-body text-xs uppercase tracking-widest text-charcoal/70">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-md border border-gold/30 bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition focus:border-gold"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-body text-xs uppercase tracking-widest text-charcoal/70">
                  Message to the Couple
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-md border border-gold/30 bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition focus:border-gold"
                  placeholder="Share your wishes for Ibukun & Ayobami"
                />
              </div>

              {status === "error" && (
                <p className="font-body text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={!name || !attending || status === "submitting"}
                className="w-full rounded-md bg-gold py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Submit RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
