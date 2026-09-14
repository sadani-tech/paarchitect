"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { EASE, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";

/** Garis horizontal yang tumbuh 0 → 100% saat masuk viewport. */
export function ArchRule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left bg-line-strong ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}

/** Garis vertikal yang tumbuh dari atas. */
export function ArchRuleY({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`w-px origin-top bg-line ${className}`}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}

/** Pembatas seksi yang panjangnya mengikuti progres scroll dokumen. */
export function ScrollProgressRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={`h-px w-full bg-line ${className}`} aria-hidden>
      <motion.div className="h-px origin-left bg-ink" style={reduced ? { scaleX: 1 } : { scaleX }} />
    </div>
  );
}
