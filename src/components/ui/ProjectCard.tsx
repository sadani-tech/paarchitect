"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { categoryLabels, type Project } from "@/data/projects";
import { EASE } from "@/lib/motion";

type Props = {
  project: Project;
  /** Diteruskan ke next/image — penting agar srcset tidak berlebihan. */
  sizes?: string;
  ratio?: string;
  priority?: boolean;
};

export function ProjectCard({ project, sizes = "(min-width: 1024px) 46vw, 100vw", ratio, priority }: Props) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-cursor="view"
      className="group block focus-visible:outline-offset-8"
      aria-label={`${project.title} — ${categoryLabels[project.category]}`}
    >
      <div className="overflow-hidden">
        <motion.div
          className="origin-center"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <ImageReveal
            src={`/projects/${project.slug}/cover`}
            alt={`${project.title}, ${project.location}`}
            ratio={ratio ?? "4 / 3"}
            sizes={sizes}
            priority={priority}
          />
        </motion.div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
        <div className="min-w-0">
          <h3 className="flex items-baseline gap-3 text-lg font-normal transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:text-xl">
            <span className="eyebrow shrink-0 tabular-nums opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {project.index}
            </span>
            <span className="truncate">{project.title}</span>
          </h3>
          <p className="mt-1.5 text-sm text-ink-3">
            {project.typology} — {project.location}
          </p>
        </div>
        <span className="eyebrow shrink-0 pt-1 tabular-nums">{project.year}</span>
      </div>
    </Link>
  );
}
