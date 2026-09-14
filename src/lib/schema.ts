import { siteConfig } from "@/data/site";
import { faqs } from "@/data/faqs";
import type { Project } from "@/data/projects";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp}`,
    foundingDate: String(siteConfig.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.studio.address,
      addressLocality: siteConfig.studio.city,
      addressRegion: siteConfig.studio.region,
      addressCountry: "ID",
    },
    sameAs: [siteConfig.instagram],
    areaServed: [siteConfig.studio.region, "DI Yogyakarta"],
    knowsAbout: ["Arsitektur", "Desain Interior", "Visualisasi 3D"],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.intro,
    creator: { "@type": "Organization", name: siteConfig.name },
    dateCreated: project.year,
    locationCreated: { "@type": "Place", name: project.location },
    image: `${siteConfig.url}/projects/${project.slug}/cover-1200.webp`,
    url: `${siteConfig.url}/portfolio/${project.slug}/`,
  };
}
