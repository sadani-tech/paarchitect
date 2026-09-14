"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, viewportOnce } from "@/lib/motion";
import { ArchRule } from "@/components/motion/ArchRule";

type Props = {
  /** Nomor seksi, mis. "01". */
  index?: string;
  label: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Urutan gerak yang konsisten di seluruh situs:
 * garis tumbuh → label muncul → isi seksi menyusul.
 */
export function SectionHeading({ index, label, children, className = "" }: Props) {
  return (
    <div className={className}>
      <ArchRule />
      <motion.div
        className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
      >
        {index ? <span className="eyebrow tabular-nums">{index} —</span> : null}
        <span className="eyebrow text-ink">{label}</span>
      </motion.div>
      {children}
    </div>
  );
}
