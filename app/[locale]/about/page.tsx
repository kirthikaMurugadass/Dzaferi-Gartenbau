import { Hero } from "@/components/sections/hero";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { CTABanner } from "@/components/sections/cta-banner";
import { OurStory } from "@/components/sections/our-story";
import { VisionMission } from "@/components/sections/vision-mission";
import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import { AboutHeroLandscape } from "@/components/sections/about-hero-landscape";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const VALUE_ICONS = [Leaf, Shield, Heart, Sparkles] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About.page");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getTranslations("About.page");
  const hero = await getTranslations("About.page.hero");
  const story = await getTranslations("About.page.story");

  const values = VALUE_ICONS.map((icon, i) => ({
    icon,
    title: page(`values.cards.${i}.title`),
    description: page(`values.cards.${i}.description`),
  }));

  const cta = await getTranslations("About.page.cta");

  return (
    <div className="relative w-full overflow-x-hidden">
      <Hero
        variant="tall"
        image="/images/about-2.jpeg"
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
        primaryCta={{ label: hero("ourValues"), href: "#our-values" }}
        showScrollIndicator={false}
      />
      <SectionWrapper bg="primary-50">
        <SectionHeader
          overline={story("overline")}
          heading={story("heading")}
          subtitle={story("subtitle")}
        />
        <OurStory />
      </SectionWrapper>
      <SectionWrapper bg="white" id="our-values">
        <SectionHeader
          overline={page("values.overline")}
          heading={page("values.heading")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 text-center border border-neutral-200"
            >
              <value.icon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary-500" />
              <h3 className="font-semibold text-neutral-950 mb-1.5 sm:mb-2 text-sm sm:text-base font-[family-name:var(--font-heading)]">
                {value.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper bg="primary-50" maxWidth="wide">
        <AboutHeroLandscape />
      </SectionWrapper>
      <VisionMission />
      <CTABanner
        heading={cta("heading")}
        subtitle={cta("subtitle")}
        primaryCta={{ label: cta("primaryCta"), href: "/contact" }}
        secondaryCta={{ label: cta("secondaryCta"), href: "tel:+41794025621" }}
      />
    </div>
  );
}
