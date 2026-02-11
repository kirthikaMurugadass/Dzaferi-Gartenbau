"use client";

import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/shared/service-card";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ServiceCardType } from "@/types/sanity/services";
import type { ServiceIconName } from "@/data/services";

// Helper function to map slug to icon (same as in services listing page)
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

interface ServicesOverviewProps {
  services?: ServiceCardType[] | null;
  locale?: 'en' | 'de';
}

export function ServicesOverview({ services, locale = 'en' }: ServicesOverviewProps) {
  const t = useTranslations("Home.servicesOverview");
  
  // Use Sanity services if available, limit to 3 for display
  const displayServices = (services || []).slice(0, 3);

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        overline={t("overline")}
        heading={t("heading")}
        subtitle={t("subtitle")}
      />
      {displayServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={getIconForSlug(service.slug)}
              href={`/services/${service.slug}`}
              compact
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          <p>No services available</p>
        </div>
      )}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all text-sm sm:text-base"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
