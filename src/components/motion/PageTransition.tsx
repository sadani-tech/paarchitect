"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EASE_SOFT } from "@/lib/motion";

/**
 * Transisi halaman seminimal mungkin: opacity + geser 8px saat rute baru
 * dipasang. Tidak ada overlay yang menahan navigasi — responsivitas tautan
 * lebih penting daripada animasi.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      id="main"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: EASE_SOFT }}
    >
      {children}
    </motion.main>
  );
}
