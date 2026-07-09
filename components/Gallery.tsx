"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const photos = [
  {
    src: "https://images.pexels.com/photos/31356131/pexels-photo-31356131.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A Moroccan riad courtyard with a pool, arches, and palm trees",
    caption: "Riad courtyards of Marrakech",
  },
  {
    src: "https://images.pexels.com/photos/34157927/pexels-photo-34157927.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Ornate Moroccan architectural tile work in traditional zellige patterns",
    caption: "Zellige tilework, everywhere you look",
  },
  {
    src: "https://images.pexels.com/photos/5418094/pexels-photo-5418094.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A desert landscape with a grove of palm trees at golden hour",
    caption: "The Palmeraie at golden hour",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Gallery() {
  return (
    <section className="relative bg-ivory px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.35em] text-sage">A Glimpse</p>
          <h2 className="mt-3 font-heading text-4xl text-charcoal sm:text-5xl">
            Marrakech is waiting for us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-sm"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-4 left-4 right-4 font-body text-xs uppercase tracking-widest text-ivory">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
