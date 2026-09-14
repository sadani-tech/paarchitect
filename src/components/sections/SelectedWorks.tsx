"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { featuredProjects, projects } from "@/data/projects";
import { EASE, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";

const [lead, ...rest] = featuredProjects;

export function SelectedWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Nomor proyek bergerak sedikit lebih lambat daripada gambarnya.
  const numberY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="selected-works" className="shell scroll-mt-24 py-24 sm:py-32" aria-labelledby="works-title">
      <SectionHeading index="01" label="Selected Works" />

      <div className="mt-12 sm:mt-16">
        {/* ——— Proyek utama: foto mengambil alih layar setelah hero ——— */}
        <div ref={ref} className="relative">
          <Link href={`/portfolio/${lead.slug}`} data-cursor="view" className="group block">
            <motion.div
              className="overflow-hidden"
              whileHover={reduced ? undefined : { scale: 1.012 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <ImageReveal
                src={`/projects/${lead.slug}/cover`}
                alt={`${lead.title}, ${lead.location}`}
                ratio="16 / 10"
                sizes="100vw"
                className="w-full"
              />
            </motion.div>

            <div className="mt-6 grid gap-6 sm:grid-cols-12 sm:items-start">
              <motion.span
                className="eyebrow tabular-nums sm:col-span-2"
                style={reduced ? undefined : { y: numberY }}
              >
                {lead.index} — {lead.status}
              </motion.span>

              <div className="sm:col-span-6">
                <RevealText
                  as="h2"
                  lines={[lead.title]}
                  className="display text-[clamp(1.9rem,4.6vw,3.6rem)]"
                  lineClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
                />
                <p className="mt-3 text-sm text-ink-3">
                  {lead.typology} · {lead.location} · {lead.year}
                </p>
              </div>

              <motion.p
                className="body-lg text-balance sm:col-span-4"
                initial={{ opacity: 0.25 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE }}
              >
                {lead.intro}
              </motion.p>
            </div>
          </Link>
        </div>

        {/* ——— Proyek pendukung ——— */}
        <div className="mt-20 grid gap-x-10 gap-y-16 sm:mt-28 sm:grid-cols-2">
          {rest.map((project, i) => (
            <div key={project.slug} className={i % 2 === 1 ? "sm:mt-24" : undefined}>
              <ProjectCard project={project} sizes="(min-width: 640px) 46vw, 100vw" ratio={i % 2 === 1 ? "4 / 5" : "4 / 3"} />
            </div>
          ))}
        </div>

        <motion.div
          className="mt-20 flex flex-wrap items-baseline justify-between gap-6 border-t border-line pt-6 sm:mt-28"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2 id="works-title" className="sr-only">
            Proyek pilihan
          </h2>
          <p className="eyebrow">
            {projects.length} proyek terdokumentasi
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-clay"
          >
            Lihat seluruh proyek
            <span aria-hidden className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
