"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { ArchRule } from "@/components/motion/ArchRule";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { categoryLabels, projects, type ProjectCategory } from "@/data/projects";
import { EASE } from "@/lib/motion";

type Filter = ProjectCategory | "all";

const FILTERS: Filter[] = ["all", "residential", "interior", "commercial"];

export function PortfolioIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = { all: projects.length } as Record<Filter, number>;
    for (const category of ["residential", "interior", "commercial"] as const) {
      map[category] = projects.filter((p) => p.category === category).length;
    }
    return map;
  }, []);

  return (
    <section className="shell pt-[calc(var(--header-h)+4rem)] pb-24 sm:pb-32">
      <ArchRule />

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Arsip — {projects.length} proyek</p>
          <RevealText
            as="h1"
            immediate
            lines={["Selected", "Works"]}
            className="display text-[clamp(2.8rem,9vw,7rem)]"
          />
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-3 lg:col-span-5">
          Setiap proyek ditampilkan sebagaimana dirancang dan dibangun — sebagian
          berupa visualisasi tahap desain, sebagian dokumentasi bangunan yang sudah berdiri.
        </p>
      </div>

      {/* ——— Penyaring ——— */}
      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 sm:mt-20">
        {FILTERS.map((item) => {
          const on = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={on}
              className={`group flex items-baseline gap-2 text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                on ? "text-ink" : "text-ink-4 hover:text-ink-2"
              }`}
            >
              {categoryLabels[item]}
              <span className="text-[0.6rem] tabular-nums">{counts[item]}</span>
              <span
                aria-hidden
                className={`block h-px bg-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  on ? "w-6" : "w-0 group-hover:w-4"
                }`}
              />
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-x-10 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 6) * 0.04 }}
            >
              <ProjectCard
                project={project}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                ratio="4 / 3"
                priority={i < 3}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-16 text-sm text-ink-3">Belum ada proyek pada kategori ini.</p>
      ) : null}
    </section>
  );
}
