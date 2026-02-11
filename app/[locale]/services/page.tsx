import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/shared/service-card";
import { CTABanner } from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { getAllServices } from "@/sanity/lib/queries";
import type { ServiceIconName } from "@/data/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.page" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

// Helper function to map slug to icon (preserving existing icon logic)
function getIconForSlug(slug: string): ServiceIconName {
  const iconMap: Record<string, ServiceIconName> = {
    "home-maintenance": "Leaf",
    "garden-maintenance": "TreePine",
    "house-service": "Home",
    "horiculture": "Building2",
    "winter-service": "Snowflake",
  };
  return iconMap[slug] || "Leaf";
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services.page");
  const hero = await getTranslations("Services.page.hero");
  const section = await getTranslations("Services.page.section");

  // Fetch services from Sanity
  const sanityServices = await getAllServices(locale as "en" | "de");

  return (
    <>
      <Hero
        variant="tall"
        image="/images/service-1.avif"
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
        primaryCta={{ label: hero("viewServices"), href: "#services-section" }}
        showScrollIndicator={false}
      />
      <SectionWrapper bg="white" id="services-section">
        <SectionHeader
          overline={section("overline")}
          heading={section("heading")}
          subtitle={section("subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(sanityServices || []).map((service) => (
            <div key={service.id} id={service.slug}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={getIconForSlug(service.slug)}
                href={`/services/${service.slug}`}
              />
            </div>
          ))}
        </div>
      </SectionWrapper>
      <CTABanner subtitle={t("ctaSubtitle")} />
    </>
  );
}
