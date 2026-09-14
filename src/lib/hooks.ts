"use client";

import { useCallback, useSyncExternalStore } from "react";

const NOOP_SUBSCRIBE = () => () => {};

/**
 * Media query reaktif lewat useSyncExternalStore — aman untuk hydration
 * dan tidak memanggil setState di dalam effect.
 */
function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** Nilai yang hanya bisa dibaca di klien; `fallback` dipakai saat SSR/hydration. */
function useClientValue<T>(read: () => T, fallback: T): T {
  return useSyncExternalStore(NOOP_SUBSCRIBE, read, () => fallback);
}

/** True ketika pengguna meminta gerak dikurangi. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Perangkat dengan penunjuk presisi — dipakai untuk hover, kursor kustom, magnetic. */
export function usePointerFine() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useMinWidth(px: number) {
  return useMediaQuery(`(min-width: ${px}px)`);
}

/**
 * Tingkat kemampuan perangkat untuk WebGL.
 * `pending` → belum diketahui (render pertama), `full` → desktop,
 * `reduced` → tablet, `none` → mobile / reduced-motion / tanpa WebGL.
 */
export type WebglTier = "pending" | "full" | "reduced" | "none";

export function useWebglTier(): WebglTier {
  const reduced = useReducedMotion();
  const wide = useMinWidth(1024);
  const medium = useMinWidth(768);
  // −1 berarti belum terbaca; 0 berarti WebGL tidak tersedia.
  const cores = useClientValue(deviceScore, -1);

  if (cores < 0) return "pending";
  if (reduced || cores === 0) return "none";
  if (wide && cores >= 4) return "full";
  if (medium) return "reduced";
  return "none";
}

let webglSupport: boolean | null = null;

function supportsWebgl() {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** 0 jika WebGL tidak didukung, selain itu jumlah core logis. */
function deviceScore() {
  return supportsWebgl() ? (navigator.hardwareConcurrency ?? 4) : 0;
}
