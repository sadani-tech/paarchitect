"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = {
  /** Satu baris per entri — pembagian baris dikendalikan penuh, bukan otomatis. */
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  delay?: number;
  stagger?: number;
  /** Jalankan segera (hero) alih-alih menunggu viewport. */
  immediate?: boolean;
};

/**
 * Reveal tipografi: tiap baris naik dari balik mask.
 * Dipakai hemat — hanya untuk hero, judul seksi besar, dan CTA utama.
 */
export function RevealText({
  lines,
  className,
  lineClassName,
  as = "h2",
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: Props) {
  const Tag = as as ElementType<{ className?: string; children?: ReactNode }>;
  const animation = {
    initial: "hidden" as const,
    ...(immediate ? { animate: "show" as const } : { whileInView: "show" as const, viewport: viewportOnce }),
  };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className="line-mask">
          <motion.span
            className={lineClassName}
            style={{ display: "block", willChange: "transform" }}
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
            {...animation}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
