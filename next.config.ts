import type { NextConfig } from "next";

/**
 * Fully static: `next build` emits an `out/` folder that can be dropped on
 * Vercel, Netlify, Cloudflare Pages or any plain file host. No server, no API
 * routes, no image optimisation service — the responsive WebP derivatives are
 * generated ahead of time by `npm run images` and picked by src/lib/image-loader.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1200, 1600],
    imageSizes: [],
  },
};

export default nextConfig;
