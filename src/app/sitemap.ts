import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

/** Wajib untuk output: "export" — berkas dihasilkan sekali saat build. */
export const dynamic = "force-static";

/** Dihasilkan saat build dan diekspor sebagai sitemap.xml statis. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/studio", "/portfolio", "/layanan", "/kontak"];

  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}/`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/portfolio/${project.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
