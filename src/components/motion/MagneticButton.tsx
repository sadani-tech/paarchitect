"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { usePointerFine, useReducedMotion } from "@/lib/hooks";

const MAX_OFFSET = 6; // px — sengaja nyaris tak disadari

const MotionLink = motion.create(Link);

type Props = {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
  /** `light` dipakai di atas latar gelap (bagian CTA). */
  variant?: "solid" | "outline" | "light";
};

/**
 * CTA utama dengan tarikan magnetik maksimal 6px.
 * Nonaktif pada perangkat sentuh dan saat prefers-reduced-motion.
 */
export function MagneticButton({ children, href, external, className = "", variant = "solid" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * MAX_OFFSET);
    y.set(Math.max(-1, Math.min(1, dy)) * MAX_OFFSET);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center gap-3 px-7 py-4 text-[0.7rem] uppercase tracking-[0.2em] font-medium transition-colors duration-500";
  const skin = {
    solid: "bg-ink text-paper hover:bg-clay",
    light: "bg-paper text-ink hover:bg-clay hover:text-paper",
    outline: "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
  }[variant];

  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-9" />
    </>
  );

  const style = active ? { x: sx, y: sy } : undefined;
  const props = {
    ref,
    className: `${base} ${skin} ${className}`,
    style,
    onMouseMove: onMove,
    onMouseLeave: reset,
    onBlur: reset,
  };

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} {...props}>
      {inner}
    </MotionLink>
  );
}
