"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ScrollProgressRule } from "@/components/motion/ArchRule";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { categoryLabels, getNextProject, projectImagePaths, type Project } from "@/data/projects";
import { EASE, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Urutan halaman proyek, tenang dan sinematik:
 * judul → sampul full-bleed → informasi → foto besar → deskripsi →
 * galeri dua kolom → foto penuh layar → detail → proyek berikutnya.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const images = projectImagePaths(project);
  const [cover, ...rest] = images;
  const feature = rest[0];
  const gallery = rest.slice(1);
  const next = getNextProject(project.slug);
  const reduced = useReducedMotion();

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start start", "end start"] });
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]);
  const coverOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  // Galeri dibagi berselang: dua kolom, lalu satu foto lebar, berulang.
  const blocks: Array<{ kind: "pair" | "wide"; items: string[] }> = [];
  for (let i = 0; i < gallery.length; ) {
    if (blocks.length % 3 === 2) {
      blocks.push({ kind: "wide", items: [gallery[i]] });
      i += 1;
    } else {
      blocks.push({ kind: "pair", items: gallery.slice(i, i + 2) });
      i += 2;
    }
  }

  return (
    <article>
      {/* ——— Judul ——— */}
      <header className="shell pt-[calc(var(--header-h)+4rem)] pb-10 sm:pb-14">
        <motion.div
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Link href="/portfolio" className="eyebrow transition-colors hover:text-ink">
            Proyek
          </Link>
          <span className="eyebrow" aria-hidden>
            /
          </span>
          <span className="eyebrow text-ink">{categoryLabels[project.category]}</span>
        </motion.div>

        <RevealText
          as="h1"
          immediate
          delay={0.1}
          lines={[project.title]}
          className="display mt-5 text-[clamp(2.4rem,7vw,5.6rem)]"
        />

        <motion.p
          className="body-lg mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          {project.intro}
        </motion.p>
      </header>

      {/* ——— Sampul full-bleed ——— */}
      <div ref={coverRef} className="relative h-[72svh] min-h-[380px] overflow-hidden sm:h-[86svh]">
        <motion.div className="absolute inset-0" style={{ scale: coverScale, opacity: coverOpacity }}>
          <ImageReveal
            src={cover}
            alt={`${project.title} — tampak utama`}
            ratio="auto"
            sizes="100vw"
            priority
            instant
            className="h-full w-full"
          />
        </motion.div>
      </div>

      {/* ——— Informasi proyek ——— */}
      <section className="shell py-20 sm:py-28" aria-label="Informasi proyek">
        <ScrollProgressRule />
        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ["Tipologi", project.typology],
            ["Lokasi", project.location],
            ["Tahun", project.year],
            ["Status", project.status],
            ["Luas", project.area],
          ].map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-2.5 text-sm sm:text-base">{value}</dd>
            </motion.div>
          ))}
        </dl>

        <motion.div
          className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="eyebrow">Lingkup</span>
          {project.scope.map((item) => (
            <span key={item} className="text-xs uppercase tracking-[0.14em] text-ink-3">
              {item}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ——— Foto besar + deskripsi ——— */}
      {feature ? (
        <section className="shell pb-20 sm:pb-28">
          <ParallaxImage
            src={feature}
            alt={`${project.title} — foto utama`}
            ratio="16 / 10"
            sizes="100vw"
            distance={60}
          />
        </section>
      ) : null}

      <section className="shell pb-20 sm:pb-28" aria-label="Deskripsi">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <RevealText
              as="h2"
              lines={["Catatan", "perancangan"]}
              className="display text-[clamp(1.7rem,3.4vw,2.6rem)]"
            />
          </div>
          <div className="max-w-2xl space-y-6 lg:col-span-8">
            {project.body.map((paragraph, i) => (
              <motion.p
                key={i}
                className="body-lg"
                initial={{ opacity: 0.25 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.08 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Galeri ——— */}
      {blocks.map((block, i) =>
        block.kind === "pair" ? (
          <section key={i} className="shell pb-8 sm:pb-14">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              {block.items.map((src, j) => (
                <ImageReveal
                  key={src}
                  src={src}
                  alt={`${project.title} — dokumentasi ${i * 2 + j + 2}`}
                  sizes="(min-width: 640px) 47vw, 100vw"
                  delay={j * 0.1}
                  className={j === 1 ? "sm:mt-16" : undefined}
                />
              ))}
            </div>
          </section>
        ) : (
          <section key={i} className="pb-8 sm:pb-14">
            <ParallaxImage
              src={block.items[0]}
              alt={`${project.title} — dokumentasi lebar`}
              ratio="16 / 9"
              sizes="100vw"
              distance={44}
            />
          </section>
        ),
      )}

      {/* ——— Proyek berikutnya ——— */}
      <section className="shell py-24 sm:py-32" aria-label="Proyek berikutnya">
        <ScrollProgressRule className="mb-10" />
        <Link href={`/portfolio/${next.slug}`} data-cursor="view" className="group block">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Proyek berikutnya — {next.index}</p>
              <h2 className="display mt-4 text-[clamp(2.1rem,6vw,4.6rem)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                {next.title}
              </h2>
              <p className="mt-4 text-sm text-ink-3">
                {next.typology} · {next.location} · {next.year}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden">
                <motion.div whileHover={reduced ? undefined : { scale: 1.03 }} transition={{ duration: 0.9, ease: EASE }}>
                  <ImageReveal
                    src={`/projects/${next.slug}/cover`}
                    alt={next.title}
                    ratio="4 / 3"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-14 flex flex-wrap gap-4">
          <MagneticButton href="/kontak">Konsultasikan Proyek</MagneticButton>
          <MagneticButton href="/portfolio" variant="outline">
            Semua Proyek
          </MagneticButton>
        </div>
      </section>
    </article>
  );
}
