import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { ArchRule } from "@/components/motion/ArchRule";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallToAction } from "@/components/sections/CallToAction";
import { processSteps } from "@/data/services";
import { approachVolumes } from "@/data/approach";
import { siteConfig, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "PRANAJA ASHARI adalah studio arsitektur dan interior yang bekerja dari pembacaan tapak hingga pendampingan konstruksi.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <section className="shell pt-[calc(var(--header-h)+4rem)] pb-20 sm:pb-28">
        <ArchRule />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Tentang — Est. {siteConfig.founded}</p>
            <RevealText
              as="h1"
              immediate
              lines={["Studio yang", "bekerja dari tapak"]}
              className="display text-[clamp(2.4rem,7vw,5.4rem)]"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-3 lg:col-span-5">
            {siteConfig.description}
          </p>
        </div>
      </section>

      <section className="shell pb-20 sm:pb-28">
        <ParallaxImage
          src="/projects/rumah-atap-pelana/cover"
          alt="Rumah dengan atap pelana dan pagar beton rendah"
          ratio="16 / 9"
          sizes="100vw"
          priority
          distance={50}
        />
      </section>

      <section className="shell pb-24 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <RevealText
              as="h2"
              lines={["Cara kami", "membaca proyek"]}
              className="display text-[clamp(1.8rem,3.8vw,2.8rem)]"
            />
          </div>
          <div className="lg:col-span-7">
            <Stagger as="ol" className="space-y-0">
              {approachVolumes.map((item) => (
                <StaggerItem key={item.label} as="li" className="border-t border-line py-8 first:border-t-0 first:pt-0">
                  <div className="flex items-baseline gap-5">
                    <span className="eyebrow tabular-nums">{item.index}</span>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em]">{item.label}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-normal sm:text-2xl">{item.title}</h3>
                  <p className="body-lg mt-3 max-w-xl">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-24 sm:py-32">
        <div className="shell">
          <SectionHeading index="02" label="Proses Kerja" />
          <Stagger as="ol" className="mt-12 grid gap-px border border-line bg-line sm:mt-16 lg:grid-cols-5">
            {processSteps.map((step) => (
              <StaggerItem key={step.index} as="li" className="flex flex-col bg-paper p-7">
                <span className="display text-3xl tabular-nums">{step.index}</span>
                <h3 className="mt-5 text-base leading-snug">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-3">{step.description}</p>
                <span className="mt-6 text-[0.65rem] uppercase tracking-[0.18em] text-ink-4">{step.duration}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ImageReveal
              src="/projects/kantor-cabang-yogyakarta/01"
              alt="Interior ruang penerimaan kantor"
              ratio="4 / 3"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading index="03" label="Angka" />
            <Stagger as="dl" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <dt className="display text-[clamp(2.2rem,4vw,3.2rem)] tabular-nums">{stat.value}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-ink-3">{stat.label}</dd>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.2} className="mt-12 border-t border-line pt-6">
              <p className="body-lg max-w-lg">
                Kami bekerja dalam jumlah proyek yang terbatas setiap tahun, supaya setiap
                rancangan sempat dipikirkan sampai detail sambungannya.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
