"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { approachVolumes } from "@/data/approach";
import { EASE } from "@/lib/motion";
import { useReducedMotion, useWebglTier } from "@/lib/hooks";

const ConceptVolumes = dynamic(() => import("@/components/three/ConceptVolumes"), { ssr: false });

/**
 * Bagian filosofi — punya dua bentuk:
 *
 * 1. Dengan WebGL (desktop & tablet): seksi sticky, tiga volume menyatu
 *    seiring scroll sementara teks berganti mengikuti volume yang aktif.
 * 2. Tanpa WebGL (ponsel, prefers-reduced-motion, peramban tanpa WebGL):
 *    seksi biasa yang mengalir ke bawah dan menampilkan ketiga tahap sekaligus.
 *    Sengaja tidak sticky — di layar pendek, menumpuk teks dan daftar di dalam
 *    satu viewport membuat keduanya saling tindih dan tidak terbaca.
 */
export function ConceptSection() {
  const ref = useRef<HTMLElement>(null);
  const tier = useWebglTier();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Sisakan ruang di awal & akhir supaya komposisi sempat terbaca utuh.
  const modelProgress = useTransform(scrollYProgress, [0.08, 0.88], [0, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.36 ? 0 : value < 0.66 ? 1 : 2;
    setActive((prev) => (prev === next ? prev : next));
  });

  const showCanvas = tier === "full" || tier === "reduced";

  if (!showCanvas) {
    return (
      <section ref={ref} className="bg-paper-2 py-24 sm:py-32" aria-labelledby="concept-title">
        <div className="shell">
          <SectionHeading index="03" label="Design Philosophy" />
          <h2 id="concept-title" className="sr-only">
            Tiga lapis pertimbangan dalam setiap rancangan
          </h2>

          <ol className="mt-12 sm:mt-16">
            {approachVolumes.map((volume, i) => (
              <FadeIn
                as="li"
                key={volume.label}
                delay={i * 0.08}
                className="border-t border-line py-9 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow tabular-nums">{volume.index}</span>
                  <span className="text-[0.7rem] font-medium tracking-[0.28em] uppercase">{volume.label}</span>
                </div>
                <h3 className="display mt-4 text-[clamp(1.6rem,6vw,2.4rem)]">{volume.title}</h3>
                <p className="body-lg mt-4 max-w-xl">{volume.description}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const current = approachVolumes[active];

  return (
    <section ref={ref} className="relative h-[280vh] bg-paper-2" aria-labelledby="concept-title">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="shell pt-24 sm:pt-28">
          <SectionHeading index="03" label="Design Philosophy" />
          <h2 id="concept-title" className="sr-only">
            Tiga lapis pertimbangan dalam setiap rancangan
          </h2>
        </div>

        <div className="relative grid flex-1 items-center gap-8 lg:grid-cols-12">
          {/* Volume 3D — di belakang teks pada layar sempit, satu kolom sendiri pada layar lebar */}
          <div className="absolute inset-0 lg:relative lg:order-2 lg:col-span-7 lg:h-full">
            <ConceptVolumes progress={modelProgress} still={reduced} />
          </div>

          {/* Teks aktif */}
          <div className="shell relative z-10 lg:order-1 lg:col-span-5">
            <div className="flex items-baseline gap-4">
              <span className="eyebrow tabular-nums">{current.index}</span>
              <motion.span
                key={current.label}
                className="text-[0.7rem] font-medium tracking-[0.3em] uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {current.label}
              </motion.span>
            </div>

            <motion.h3
              key={`${current.label}-title`}
              className="display mt-5 text-[clamp(1.75rem,3.6vw,2.9rem)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.04 }}
            >
              {current.title}
            </motion.h3>

            <motion.p
              key={`${current.label}-body`}
              className="body-lg mt-5 max-w-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              {current.description}
            </motion.p>

            {/* Indikator tiga tahap */}
            <div className="mt-10 flex gap-2" aria-hidden>
              {approachVolumes.map((volume, i) => (
                <span key={volume.label} className="h-px w-12 overflow-hidden bg-line-strong">
                  <motion.span
                    className="block h-px origin-left bg-ink"
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
