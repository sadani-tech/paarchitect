"use client";

import { motion } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ArchRule } from "@/components/motion/ArchRule";
import { siteConfig } from "@/data/site";
import { EASE, viewportOnce } from "@/lib/motion";
import { quickWhatsappUrl } from "@/lib/whatsapp";

export function CallToAction() {
  return (
    <section className="bg-ink text-paper" aria-labelledby="cta-title">
      <div className="shell py-24 sm:py-32">
        <ArchRule className="bg-ink-3" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealText
              as="h2"
              lines={["Punya lahan,", "atau baru punya rencana?"]}
              className="display text-[clamp(2.1rem,5.4vw,4.4rem)]"
            />
            <span id="cta-title" className="sr-only">
              Konsultasikan proyek Anda
            </span>

            <motion.p
              className="mt-8 max-w-lg text-base leading-relaxed text-paper/70"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Konsultasi awal tidak dipungut biaya. Ceritakan lahan, kebutuhan ruang,
              dan anggaran Anda — kami bantu memetakan kemungkinannya sebelum apa pun
              diputuskan.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            >
              <MagneticButton href="/kontak" variant="light">
                Konsultasikan Proyek
              </MagneticButton>
              <a
                href={quickWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-2 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
              >
                Chat WhatsApp langsung
                <span aria-hidden className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
              </a>
            </motion.div>
          </div>

          <motion.dl
            className="grid gap-8 self-end lg:col-span-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          >
            <div className="border-t border-ink-3 pt-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Studio</dt>
              <dd className="mt-2 text-sm leading-relaxed text-paper/80">{siteConfig.studio.address}</dd>
            </div>
            <div className="border-t border-ink-3 pt-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Jam kerja</dt>
              <dd className="mt-2 text-sm text-paper/80">{siteConfig.studio.hours}</dd>
            </div>
            <div className="border-t border-ink-3 pt-4">
              <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/45">Surel</dt>
              <dd className="mt-2 text-sm text-paper/80">
                <a href={`mailto:${siteConfig.email}`} className="underline decoration-paper/25 underline-offset-4">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
