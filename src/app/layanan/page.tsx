import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { ArchRule } from "@/components/motion/ArchRule";
import { ServicesSticky } from "@/components/sections/ServicesSticky";
import { Pricing } from "@/components/sections/Pricing";
import { Faqs } from "@/components/sections/Faqs";
import { CallToAction } from "@/components/sections/CallToAction";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Desain arsitektur, interior, visualisasi 3D, renovasi, dan pendampingan konstruksi — beserta paket dan proses kerjanya.",
  alternates: { canonical: "/layanan" },
};

export default function LayananPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />

      <section className="shell pt-[calc(var(--header-h)+4rem)] pb-4">
        <ArchRule />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Layanan</p>
            <RevealText
              as="h1"
              immediate
              lines={["Dari konsep", "sampai lapangan"]}
              className="display text-[clamp(2.4rem,7vw,5.4rem)]"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-3 lg:col-span-5">
            Lingkup kerja dapat diambil sebagian atau menyeluruh. Yang paling sering
            dipilih adalah paket arsitektur dan interior sekaligus, karena keduanya
            saling menentukan.
          </p>
        </div>
      </section>

      <ServicesSticky />
      <Pricing />
      <Faqs />
      <CallToAction />
    </>
  );
}
