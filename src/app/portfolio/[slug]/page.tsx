import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { JsonLd } from "@/components/ui/JsonLd";
import { getProject, projects } from "@/data/projects";
import { projectSchema } from "@/lib/schema";

type Params = { slug: string };

/** Semua halaman proyek dibuat saat build — tidak ada permintaan ke server. */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.intro,
      images: [{ url: `/projects/${project.slug}/cover-1200.webp`, width: 1200, height: 900 }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={projectSchema(project)} />
      <ProjectDetail project={project} />
    </>
  );
}
