"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Jarak geser awal dalam px. 0 untuk fade murni. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "header" | "footer";
};

/** Fade + geser halus saat elemen masuk viewport. Hanya sekali. */
export function FadeIn({ children, className, delay = 0, duration = 0.9, y = 22, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
