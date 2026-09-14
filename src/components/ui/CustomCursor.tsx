"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePointerFine, useReducedMotion } from "@/lib/hooks";

/**
 * Kursor "VIEW PROJECT" yang hanya muncul di atas kartu proyek,
 * dan hanya pada perangkat dengan penunjuk presisi.
 * Otomatis mati di layar sentuh dan saat prefers-reduced-motion.
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 42, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);

      const target = (event.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = target?.dataset.cursor === "view" ? "View\nProject" : null;
      setLabel((prev) => (prev === next ? prev : next));
    };

    const onLeave = () => setLabel(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  // Sembunyikan kursor sistem hanya saat label aktif — di luar itu,
  // kursor asli tetap dipakai agar tidak mengganggu keterbacaan.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.toggle("cursor-hidden", Boolean(label));
    return () => document.documentElement.classList.remove("cursor-hidden");
  }, [enabled, label]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {label ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-90 flex h-24 w-24 items-center justify-center rounded-full bg-ink text-center text-[0.6rem] leading-[1.35] font-medium tracking-[0.18em] whitespace-pre text-paper uppercase"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
