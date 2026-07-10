"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { rsvpSchema, RsvpFormValues } from "@/lib/rsvpSchema";
import { wedding } from "@/config/wedding";

const ATTENDING_OPTIONS: { value: RsvpFormValues["attending"]; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
];

const MEAL_OPTIONS = ["No preference", "Vegetarian", "Vegan", "Halal", "Other"];

const inputClass =
  "w-full rounded-md border border-gold/30 bg-white px-4 py-3 font-body text-sm text-charcoal outline-none transition focus:border-gold";
const labelClass = "mb-2 block font-body text-xs uppercase tracking-widest text-charcoal/70";
const errorClass = "mt-1 font-body text-xs text-red-500";

export default function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestCount: 1, mealPreference: "", attending: undefined },
  });

  const attending = watch("attending");

  const onSubmit = async (values: RsvpFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
        <AnimatedSection className="mb-10 text-center">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">Join Us</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">RSVP</h2>
          <p className="mt-3 font-body text-sm text-charcoal/60">
            Kindly RSVP by <span className="text-gold">{wedding.rsvp.deadlineDisplay}</span>
          </p>
        </AnimatedSection>

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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6 rounded-lg border border-gold/20 bg-white/70 p-8 backdrop-blur-sm sm:p-10"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First Name
                  </label>
                  <input id="firstName" className={inputClass} {...register("firstName")} />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name
                  </label>
                  <input id="lastName" className={inputClass} {...register("lastName")} />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" type="email" className={inputClass} {...register("email")} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input id="phone" type="tel" className={inputClass} {...register("phone")} />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>

              <div>
                <span className={labelClass}>Will you attend?</span>
                <div className="flex gap-3">
                  {ATTENDING_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setValue("attending", opt.value, { shouldValidate: true })}
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
                {errors.attending && <p className={errorClass}>{errors.attending.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="mealPreference" className={labelClass}>
                    Meal Preference
                  </label>
                  <select id="mealPreference" className={inputClass} {...register("mealPreference")}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {MEAL_OPTIONS.map((meal) => (
                      <option key={meal} value={meal}>
                        {meal}
                      </option>
                    ))}
                  </select>
                  {errors.mealPreference && <p className={errorClass}>{errors.mealPreference.message}</p>}
                </div>

                <div>
                  <label htmlFor="guestCount" className={labelClass}>
                    Guest Count
                  </label>
                  <select
                    id="guestCount"
                    className={inputClass}
                    {...register("guestCount", { valueAsNumber: true })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {errors.guestCount && <p className={errorClass}>{errors.guestCount.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message to the Couple
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder={`Share your wishes for ${wedding.coupleNames}`}
                  {...register("message")}
                />
              </div>

              {status === "error" && (
                <p className="font-body text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-gold py-3 font-body text-sm uppercase tracking-[0.2em] text-ivory transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
