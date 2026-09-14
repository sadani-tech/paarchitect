"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/motion/RevealText";
import { faqs } from "@/data/faqs";
import { EASE } from "@/lib/motion";

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="shell py-24 sm:py-32" aria-labelledby="faq-title">
      <SectionHeading index="07" label="Pertanyaan Umum" />

      <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <RevealText
            as="h2"
            lines={["Yang sering", "ditanyakan"]}
            className="display text-[clamp(1.9rem,4vw,3rem)]"
          />
          <span id="faq-title" className="sr-only">
            Pertanyaan umum
          </span>
        </div>

        <ul className="lg:col-span-8">
          {faqs.map((faq, i) => {
            const expanded = open === i;
            return (
              <li key={faq.question} className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-base leading-snug transition-colors group-hover:text-clay sm:text-lg">
                      {faq.question}
                    </span>
                    <span aria-hidden className="relative mt-2 block h-3 w-3 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-ink" />
                      <motion.span
                        className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-ink"
                        animate={{ scaleY: expanded ? 0 : 1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ink-2 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
