import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ReferencesSection } from "@/components/sections/references-section";
import { CTABanner } from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { getReferences } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects.page");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage() {
  const hero = await getTranslations("projects.page.hero");

  const references = await getReferences();

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
      <ReferencesSection references={references ?? undefined} />
      <CTABanner />
    </>
  );
}
