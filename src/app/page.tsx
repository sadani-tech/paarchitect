import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Approach } from "@/components/sections/Approach";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { ServicesSticky } from "@/components/sections/ServicesSticky";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faqs } from "@/components/sections/Faqs";
import { CallToAction } from "@/components/sections/CallToAction";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Hero />
      <SelectedWorks />
      <Approach />
      <ConceptSection />
      <ServicesSticky />
      <Pricing />
      <Testimonials />
      <Faqs />
      <CallToAction />
    </>
  );
}
