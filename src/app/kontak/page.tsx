import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { ArchRule } from "@/components/motion/ArchRule";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Konsultasikan rencana proyek Anda. Isi ringkasan kebutuhan, lalu kirim langsung ke WhatsApp PRANAJA ASHARI.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return (
    <>
      <section className="shell pt-[calc(var(--header-h)+4rem)] pb-16 sm:pb-20">
        <ArchRule />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Kontak — Konsultasi awal gratis</p>
            <RevealText
              as="h1"
              immediate
              lines={["Mari bicarakan", "proyek Anda"]}
              className="display text-[clamp(2.4rem,7vw,5.4rem)]"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-3 lg:col-span-5">
            Isi ringkasan di bawah ini. Jawaban Anda langsung dirangkai menjadi pesan
            WhatsApp yang rapi — tanpa formulir yang hilang entah ke mana.
          </p>
        </div>
      </section>

      <section className="shell pb-24 sm:pb-32" aria-label="Formulir konsultasi">
        <ConsultationForm />
      </section>

      <section className="shell pb-24 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ImageReveal
              src="/projects/paitlegi-coffee-space/cover"
              alt="Interior kedai kopi dengan palet gelap"
              ratio="16 / 10"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
          <dl className="grid gap-8 self-end lg:col-span-5">
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Studio</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">{siteConfig.studio.address}</dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Jam kerja</dt>
              <dd className="mt-2 text-sm text-ink-2">{siteConfig.studio.hours}</dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Kanal</dt>
              <dd className="mt-2 space-y-1.5 text-sm text-ink-2">
                <a href={`mailto:${siteConfig.email}`} className="block underline decoration-line underline-offset-4">
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline decoration-line underline-offset-4"
                >
                  {siteConfig.instagramHandle}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
