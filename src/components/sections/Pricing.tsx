"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/motion/RevealText";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { packages, pricingNotes } from "@/data/pricing";
import { quickWhatsappUrl } from "@/lib/whatsapp";

export function Pricing() {
  return (
    <section id="paket" className="shell scroll-mt-24 py-24 sm:py-32" aria-labelledby="pricing-title">
      <SectionHeading index="05" label="Paket Layanan" />

      <div className="mt-12 flex flex-col gap-8 sm:mt-16 lg:flex-row lg:items-end lg:justify-between">
        <RevealText
          as="h2"
          lines={["Tiga cara", "memulai bersama kami"]}
          className="display max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)]"
        />
        <span id="pricing-title" className="sr-only">
          Paket layanan
        </span>
        <p className="max-w-sm text-sm leading-relaxed text-ink-3">
          Setiap proyek punya kerumitan berbeda. Angka berikut adalah titik awal
          percakapan, bukan harga mati.
        </p>
      </div>

      <Stagger className="mt-14 grid gap-px border border-line bg-line sm:mt-16 lg:grid-cols-3">
        {packages.map((pkg) => (
          <StaggerItem
            key={pkg.name}
            className={`flex flex-col bg-paper p-8 sm:p-10 ${pkg.highlight ? "lg:bg-paper-2" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg">{pkg.name}</h3>
              {pkg.highlight ? (
                <span className="border border-ink px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em]">
                  Paling dipilih
                </span>
              ) : null}
            </div>

            <p className="mt-2 text-sm text-ink-3">{pkg.tagline}</p>

            <div className="mt-8 flex items-baseline gap-1.5">
              <span className="display text-[clamp(1.75rem,3vw,2.4rem)]">{pkg.price}</span>
              {pkg.unit ? <span className="text-sm text-ink-3">{pkg.unit}</span> : null}
            </div>
            <p className="mt-1 text-xs text-ink-4">{pkg.note}</p>

            <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
              {pkg.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={quickWhatsappUrl(`paket ${pkg.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-clay"
            >
              Tanya paket ini
              <span aria-hidden className="block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      <ul className="mt-8 space-y-2">
        {pricingNotes.map((note) => (
          <li key={note} className="flex gap-3 text-xs leading-relaxed text-ink-4">
            <span aria-hidden>—</span>
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}
