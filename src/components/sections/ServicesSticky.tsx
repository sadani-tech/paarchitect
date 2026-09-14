"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/motion/RevealText";
import { services } from "@/data/services";
import { EASE } from "@/lib/motion";
import { imageMeta } from "@/data/generated/images";

/**
 * Kiri menempel (sticky), kanan menggulir. Indeks, gambar, dan deskripsi
 * berganti saat layanan berikutnya menjadi aktif — tanpa scroll hijacking.
 */
export function ServicesSticky() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  const setItem = useCallback(
    (i: number) => (node: HTMLLIElement | null) => {
      items.current[i] = node;
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActive((prev) => (prev === index ? prev : index));
        }
      },
      // Pita tipis di tengah layar: layanan aktif adalah yang melintasinya.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    for (const node of items.current) if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const current = services[active];

  return (
    <section className="shell py-24 sm:py-32" aria-labelledby="services-title">
      <SectionHeading index="04" label="What We Do" />

      <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        {/* ——— Kolom kiri: menempel ——— */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <RevealText
              as="h2"
              lines={["Apa yang", "kami kerjakan"]}
              className="display text-[clamp(2rem,4.6vw,3.6rem)]"
            />
            <span id="services-title" className="sr-only">
              Layanan studio
            </span>

            <div className="relative mt-10 hidden aspect-4/3 overflow-hidden bg-paper-3 lg:block">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Image
                    src={current.image}
                    alt=""
                    fill
                    sizes="40vw"
                    placeholder="blur"
                    blurDataURL={imageMeta[current.image]?.blur}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 hidden items-center gap-4 lg:flex">
              <span className="display text-3xl tabular-nums">{current.index}</span>
              <span className="h-px flex-1 bg-line" />
              <span className="eyebrow tabular-nums">
                {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* ——— Kolom kanan: menggulir ——— */}
        <ol className="lg:col-span-7">
          {services.map((service, i) => (
            <li
              key={service.title}
              ref={setItem(i)}
              data-index={i}
              data-on={i === active}
              className="border-t border-line py-9 transition-opacity duration-700 first:border-t-0 first:pt-0 data-[on=false]:opacity-45 lg:py-12"
            >
              <div className="flex items-baseline gap-5">
                <span className="eyebrow tabular-nums">{service.index}</span>
                <h3 className="text-[clamp(1.35rem,2.6vw,2rem)] font-normal">{service.title}</h3>
              </div>
              <p className="body-lg mt-4 max-w-xl">{service.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="text-xs uppercase tracking-[0.14em] text-ink-3">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
