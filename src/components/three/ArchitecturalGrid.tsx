"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Wireframe arsitektural — garis denah, elevasi, dan grid struktur.
 *
 * Sengaja SVG, bukan WebGL: selalu tersedia (termasuk saat WebGL mati),
 * nyaris tanpa biaya, dan tetap tajam di layar mana pun. Opasitasnya rendah
 * agar tipografi dan fotografi tetap dominan.
 */

type Seg = { d: string; delay: number; len: number };

const STRUCTURE: Seg[] = [
  // Grid kolom (vertikal)
  { d: "M 120 40 L 120 620", delay: 0.0, len: 580 },
  { d: "M 300 40 L 300 620", delay: 0.08, len: 580 },
  { d: "M 480 40 L 480 620", delay: 0.16, len: 580 },
  { d: "M 660 40 L 660 620", delay: 0.24, len: 580 },
  { d: "M 840 40 L 840 620", delay: 0.32, len: 580 },
  // Garis lantai (horizontal)
  { d: "M 40 200 L 960 200", delay: 0.2, len: 920 },
  { d: "M 40 380 L 960 380", delay: 0.3, len: 920 },
  { d: "M 40 560 L 960 560", delay: 0.4, len: 920 },
];

const PLAN: Seg[] = [
  // Denah abstrak — dinding luar
  { d: "M 300 200 L 840 200 L 840 560 L 120 560 L 120 380 L 300 380 Z", delay: 0.5, len: 2200 },
  // Sekat dalam
  { d: "M 480 200 L 480 440", delay: 0.75, len: 240 },
  { d: "M 480 440 L 840 440", delay: 0.85, len: 360 },
  { d: "M 300 380 L 300 560", delay: 0.95, len: 180 },
  // Tanda bukaan
  { d: "M 620 560 L 720 560", delay: 1.05, len: 100 },
  { d: "M 120 460 L 120 500", delay: 1.1, len: 40 },
];

export function ArchitecturalGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 660"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      fill="none"
    >
      <g stroke="var(--color-ink)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {STRUCTURE.map((seg) => (
          <motion.path
            key={seg.d}
            d={seg.d}
            opacity={0.09}
            strokeDasharray={seg.len}
            initial={{ strokeDashoffset: seg.len }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.5 + seg.delay }}
          />
        ))}
        {PLAN.map((seg) => (
          <motion.path
            key={seg.d}
            d={seg.d}
            opacity={0.17}
            strokeDasharray={seg.len}
            initial={{ strokeDashoffset: seg.len }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.6, ease: EASE, delay: 0.5 + seg.delay }}
          />
        ))}
      </g>
    </svg>
  );
}
