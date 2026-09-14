import type { Transition, Variants } from "motion/react";

/** Easing tunggal untuk seluruh situs — cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const transition = (duration = 0.8, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Viewport default: sekali saja, dipicu sedikit sebelum elemen penuh terlihat. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition(0.9) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition(0.9) },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Baris teks yang naik dari balik mask. */
export const lineMask: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

/**
 * Catatan: jangan memasang clip-path pada elemen yang sekaligus menjadi
 * pemicu `whileInView`. Elemen dengan `clip-path: inset(100%)` punya
 * intersection rect nol sehingga observer tidak pernah aktif.
 * Lihat komponen ImageReveal untuk struktur yang benar.
 */
