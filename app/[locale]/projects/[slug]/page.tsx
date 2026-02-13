import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ProjectDetailPageClient } from "@/components/projects/project-detail";
import { getProjectBySlug } from "@/sanity/lib/queries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project" };
  }

  const title = project.seoTitle || project.title || "Project";
  const description = project.seoDescription || project.shortDescription || "";

  const mainImageUrl = project.mainImage?.asset?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: mainImageUrl
        ? [
            {
              url: mainImageUrl,
              alt: project.mainImage?.alt || title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const mainImageUrl = project.mainImage?.asset?.url ?? "/images/project-3.jpg";
  const heroImageUrl =
    project.galleryImages?.[0]?.asset?.url ?? mainImageUrl;

  return (
    <ProjectDetailPageClient
      slug={project.slug}
      image={mainImageUrl}
      heroImage={heroImageUrl}
      title={project.title}
      description={project.shortDescription}
      techStack={project.techStack}
    />
  );
}
