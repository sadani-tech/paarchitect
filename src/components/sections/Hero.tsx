"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { ArchitecturalGrid } from "@/components/three/ArchitecturalGrid";
import { siteConfig } from "@/data/site";
import { EASE } from "@/lib/motion";
import { useReducedMotion, useWebglTier } from "@/lib/hooks";
import { imageMeta } from "@/data/generated/images";

/** WebGL dimuat terpisah dan hanya di klien — HTML hero tampil lebih dulu. */
const ArchitecturalScene = dynamic(() => import("@/components/three/ArchitecturalScene"), { ssr: false });

const FALLBACK = "/projects/rumah-tinggal-dua-lantai/cover";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tier = useWebglTier();
  const reduced = useReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const showCanvas = tier === "full" || tier === "reduced";

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden"
      aria-label="Pembuka"
    >
      <ArchitecturalGrid className="opacity-90" />

      {/* ——— Lapisan WebGL / fallback ——— */}
      <div className="absolute inset-0" aria-hidden>
        {showCanvas ? (
          <motion.div
            className="absolute inset-0 top-[6vh] sm:top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneReady ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <ArchitecturalScene
              progress={scrollYProgress}
              quality={tier === "full" ? "full" : "reduced"}
              still={reduced}
              onReady={() => setSceneReady(true)}
            />
          </motion.div>
        ) : null}

        {/* Tanpa WebGL, hero tetap utuh: fotografi arsitektur + tipografi. */}
        {tier === "none" ? (
          <motion.div
            className="absolute inset-x-0 top-0 h-[62%] sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[62%] lg:w-[52%]"
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
          >
            <Image
              src={FALLBACK}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              placeholder="blur"
              blurDataURL={imageMeta[FALLBACK]?.blur}
              className="object-cover"
            />
            {/* Di ponsel foto duduk di atas dan memudar ke kertas, supaya tipografi tetap terbaca. */}
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/45 to-paper/10 sm:bg-gradient-to-r sm:from-paper sm:via-paper/50 sm:to-paper/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper via-paper/60 to-transparent sm:h-2/5" />
          </motion.div>
        ) : null}
      </div>

      {/* ——— Tipografi ——— */}
      <motion.div
        className="shell relative z-10 pb-[7vh]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          Studio Arsitektur · Est. {siteConfig.founded}
        </motion.p>

        <RevealText
          as="h1"
          immediate
          delay={0.18}
          stagger={0.1}
          lines={["PRANAJA", "ASHARI"]}
          className="display text-[clamp(3.4rem,13.5vw,11.5rem)]"
        />

        <motion.div
          className="mt-8 flex flex-col gap-6 border-t border-line pt-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <p className="eyebrow text-ink">{siteConfig.disciplines.join(" · ")}</p>
          <p className="max-w-sm text-sm leading-relaxed text-ink-3 sm:text-right">
            {siteConfig.tagline} Merancang hunian dan ruang kerja di {siteConfig.studio.region} & DIY.
          </p>
        </motion.div>
      </motion.div>

      {/* ——— Petunjuk scroll + indikator pemuatan WebGL ——— */}
      <motion.div
        className="shell relative z-10 flex items-center justify-between pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
      >
        <Link
          href="#selected-works"
          className="group flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink"
        >
          <span className="relative block h-6 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-x-0 top-0 block h-2 bg-ink"
              animate={reduced ? undefined : { y: [0, 16, 0] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
          Gulir
        </Link>

        <span className="text-[0.625rem] uppercase tracking-[0.22em] text-ink-4 tabular-nums">
          {showCanvas ? (sceneReady ? "Architecture · 100" : "Architecture · 01") : "Architecture"}
        </span>
      </motion.div>
    </section>
  );
}
