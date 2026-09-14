"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` membuat seluruh animasi transform/layout otomatis
 * dinonaktifkan ketika pengguna meminta gerak dikurangi — yang tersisa hanya
 * fade sederhana. Parallax dan scene 3D punya penjagaannya sendiri.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
