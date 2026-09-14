"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { imageMeta } from "@/data/generated/images";

type Props = {
  /** Base path tanpa ekstensi, mis. `/projects/rumah-atap-pelana/cover`. */
  src: string;
  alt: string;
  /** CSS aspect-ratio. Kosongkan untuk memakai rasio asli gambar. */
  ratio?: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  delay?: number;
  /** Matikan animasi masuk (mis. gambar sampul yang harus langsung tampil). */
  instant?: boolean;
};

/**
 * Satu-satunya cara gambar portofolio masuk ke layar:
 * clip-path inset(100% 0 0 0) -> inset(0), digabung scale 1.06 -> 1.
 * Dipicu sekali saat masuk viewport, tidak berulang saat scroll balik.
 *
 * Pemicunya sengaja berada pada pembungkus terluar yang TIDAK ter-clip:
 * elemen dengan `clip-path: inset(100%)` memiliki intersection rect nol,
 * sehingga IntersectionObserver -- dan karenanya `whileInView` -- tidak akan
 * pernah aktif bila clip dan pemicu diletakkan pada elemen yang sama.
 */
export function ImageReveal({
  src,
  alt,
  ratio,
  sizes = "100vw",
  className = "",
  imageClassName = "",
  priority = false,
  delay = 0,
  instant = false,
}: Props) {
  const meta = imageMeta[src];
  const aspect = ratio ?? (meta ? `${meta.w} / ${meta.h}` : "4 / 3");

  const trigger = instant
    ? { initial: "show" as const }
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.2 } as const,
      };

  return (
    <motion.div
      className={`relative overflow-hidden bg-paper-3 ${className}`}
      style={{ aspectRatio: aspect }}
      {...trigger}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.15, ease: EASE, delay } },
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ willChange: "transform" }}
          variants={{
            hidden: { scale: 1.06 },
            show: { scale: 1, transition: { duration: 1.4, ease: EASE, delay } },
          }}
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
            className={`object-cover ${imageClassName}`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
