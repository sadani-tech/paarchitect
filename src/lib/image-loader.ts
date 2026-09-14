"use client";

/**
 * Custom next/image loader for `output: "export"`.
 *
 * `src` is an extensionless base path such as `/projects/<slug>/cover`.
 * The build step (npm run images) wrote `<base>-480.webp`, `-768`, `-1200`
 * and `-1600`; this rounds the requested width up to the nearest one.
 */
const WIDTHS = [480, 768, 1200, 1600];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (/\.[a-z0-9]+$/i.test(src)) return src; // already a real file (favicon, og image…)
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${src}-${target}.webp`;
}
