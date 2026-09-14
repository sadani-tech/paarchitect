import type { Metadata } from "next";
import { PortfolioIndex } from "@/components/sections/PortfolioIndex";
import { CallToAction } from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Proyek",
  description:
    "Arsip proyek arsitektur, interior, dan visualisasi PRANAJA ASHARI — hunian, kluster, kantor, dan ruang komersial di Jawa Tengah & DIY.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioIndex />
      <CallToAction />
    </>
  );
}
