"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/motion/RevealText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { manifesto } from "@/data/approach";
import { stats } from "@/data/site";
import { EASE, viewportOnce } from "@/lib/motion";

export function Approach() {
  return (
    <section className="shell py-24 sm:py-32" aria-labelledby="approach-title">
      <SectionHeading index="02" label="Our Approach" />

      <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <RevealText
            as="h2"
            lines={["Arsitektur yang", "tidak perlu berteriak"]}
            className="display text-[clamp(2.1rem,5.4vw,4.4rem)]"
          />
          <div id="approach-title" className="sr-only">
            Pendekatan studio
          </div>

          <div className="mt-10 max-w-xl space-y-5">
            {manifesto.map((line, i) => (
              <motion.p
                key={line}
                className="body-lg"
                initial={{ opacity: 0.25 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <Stagger as="dl" className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-20">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <dt className="display text-[clamp(2rem,3.4vw,2.9rem)] tabular-nums">{stat.value}</dt>
                <dd className="mt-2 text-xs leading-relaxed text-ink-3">{stat.label}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="lg:col-span-5">
          <ParallaxImage
            src="/projects/hunian-klasik-modern/cover"
            alt="Ruang keluarga dua lantai dengan jendela lengkung"
            ratio="3 / 4"
            sizes="(min-width: 1024px) 40vw, 100vw"
            distance={48}
          />
          <p className="mt-4 text-xs text-ink-4">Hunian Klasik Modern — Yogyakarta</p>
        </div>
      </div>
    </section>
  );
}
