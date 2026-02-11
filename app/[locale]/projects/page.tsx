import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ReferencesSection } from "@/components/sections/references-section";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectCard } from "@/components/shared/project-card";
import { CTABanner } from "@/components/sections/cta-banner";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import { getReferences } from "@/sanity/lib/queries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.page" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const page = await getTranslations("projects.page");
  const hero = await getTranslations("projects.page.hero");
  const section = await getTranslations("projects.page.section");

  const list = t.raw("list") as Array<{ slug: string }>;
  const mediaBySlug = new Map(projects.map((p) => [p.slug, p] as const));

  const references = await getReferences(locale as "en" | "de");

  return (
    <>
      <Hero
        variant="tall"
        image="/images/project-3.jpg"
        overline={hero("overline")}
        heading={
          <>
            {hero("heading")}{" "}
            <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
              {hero("headingAccent")}
            </span>
          </>
        }
        subtitle={hero("subtitle")}
        primaryCta={{ label: hero("viewProjects"), href: "#project-gallery" }}
        showScrollIndicator={false}
      />
      {/* <SectionWrapper bg="primary-50" maxWidth="wide" id="project-gallery">
        <SectionHeader
          overline={section("overline")}
          heading={section("heading")}
          subtitle={section("subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((project) => {
            const media = mediaBySlug.get(project.slug);
            if (!media) return null;
            return (
              <ProjectCard
                key={media.id}
                slug={media.slug}
                image={media.image}
                href={`/projects/${media.slug}`}
              />
            );
          })}
        </div>
      </SectionWrapper> */}
      <ReferencesSection references={references ?? undefined} />
      <CTABanner />
    </>
  );
}
