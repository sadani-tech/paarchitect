"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { EASE, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="shell py-24 sm:py-32" aria-labelledby="testimonials-title">
      <SectionHeading index="06" label="Kata Klien" />
      <h2 id="testimonials-title" className="sr-only">
        Testimoni klien
      </h2>

      <div className="mt-12 grid gap-x-10 gap-y-14 sm:mt-16 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <motion.figure
            key={item.name}
            className="flex flex-col"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
          >
            <blockquote className="text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-ink-2 text-pretty">
              <span aria-hidden className="mr-1 text-ink-4">
                “
              </span>
              {item.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <span className="block text-sm">{item.name}</span>
              <span className="mt-1 block text-xs text-ink-4">
                {item.role} — {item.project}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
