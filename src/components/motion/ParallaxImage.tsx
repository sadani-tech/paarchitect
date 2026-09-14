"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { imageMeta } from "@/data/generated/images";

type Props = {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  className?: string;
  /** Simpangan vertikal total dalam px. Tetap kecil — 30 – 60. */
  distance?: number;
  priority?: boolean;
};

/**
 * Gambar dengan parallax sangat halus: bergerak ±distance/2 px selama
 * kontainernya melintasi viewport. Dimatikan penuh pada prefers-reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  ratio,
  sizes = "100vw",
  className = "",
  distance = 56,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const meta = imageMeta[src];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-paper-3 ${className}`}
      style={{ aspectRatio: ratio ?? (meta ? `${meta.w} / ${meta.h}` : "16 / 9") }}
    >
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0"
        style={reduced ? undefined : { y, willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          placeholder={meta ? "blur" : undefined}
          blurDataURL={meta?.blur}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
