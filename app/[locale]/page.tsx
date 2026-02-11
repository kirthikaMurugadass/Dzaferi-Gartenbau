import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  getHeroSection,
  getFeatureCards,
  getStats,
  getTestimonials,
  getHomeProjects,
  getHomeServices,
} from "@/sanity/lib/queries";

// Component imports
import { HeroSlider } from "@/components/sections/HeroSlider";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection";
// import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

import { HowWeWork } from "@/components/sections/how-we-work";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";

// Force dynamic rendering - no cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  return {
    title: "Home",
    description: "Welcome to our website",
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cta = await getTranslations("Home.cta");
  
  // Fetch hero data from Sanity
  let heroData = null;
  try {
    heroData = await getHeroSection(locale as 'en' | 'de');
    console.log('Hero Data from Sanity:', heroData);
  } catch (error) {
    console.error('Error fetching hero data:', error);
  }

  // Fetch feature cards from Sanity
  let featureCards = null;
  try {
    featureCards = await getFeatureCards(locale as 'en' | 'de');
    console.log('Feature Cards from Sanity:', featureCards);
  } catch (error) {
    console.error('Error fetching feature cards:', error);
  }

  // Fetch stats from Sanity
  let stats = null;
  try {
    stats = await getStats(locale as 'en' | 'de');
    console.log('Stats from Sanity:', stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
  }

  // Fetch testimonials from Sanity
  let testimonials = null;
  try {
    testimonials = await getTestimonials(locale as 'en' | 'de');
    console.log('Testimonials from Sanity:', testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }

  // Fetch home projects from Sanity (localized)
  let homeProjects = null;
  try {
    homeProjects = await getHomeProjects(locale as 'en' | 'de');
    console.log('Home projects from Sanity:', homeProjects);
  } catch (error) {
    console.error('Error fetching home projects:', error);
  }

  // Fetch home services from Sanity (localized)
  let homeServices = null;
  try {
    homeServices = await getHomeServices(locale as 'en' | 'de');
    console.log('Home services from Sanity:', homeServices);
  } catch (error) {
    console.error('Error fetching home services:', error);
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Slider - Dynamic from Sanity */}
      <HeroSlider
        overline="PREMIUM GARDEN LANDSCAPING"
        heading={heroData?.title || "We Create Gardens That"}
        subtitle={heroData?.description || "Expert garden construction, care, and property services across the Zurich region. Since day one, we've been turning outdoor spaces into living masterpieces."}
        primaryCta={{
          label: heroData?.primaryButtonText || "Explore Our Work",
          href: heroData?.primaryButtonLink || "/projects"
        }}
        secondaryCta={{
          label: heroData?.secondaryButtonText || "Contact Us",
          href: heroData?.secondaryButtonLink || "/contact"
        }}
        sliderImages={heroData?.sliderImages}
        showScrollIndicator
        showDotIndicators
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Overview */}
      <ServicesOverview services={homeServices} locale={locale as 'en' | 'de'} />

      {/* Feature Cards Section - Dynamic from Sanity */}
      <FeatureCardsSection cards={featureCards} />

      {/* Featured Projects */}
      {/* <FeaturedProjects projects={homeProjects} /> */}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats Counter - Dynamic from Sanity */}
      {/* <StatsCounter stats={stats} /> */}

      {/* How We Work */}
      <HowWeWork />

      {/* Testimonials - Dynamic from Sanity */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Banner */}
      <CTABanner
        heading={cta("heading")}
        subtitle={cta("subtitle")}
        primaryCta={{ label: cta("primaryCta"), href: "/contact" }}
        secondaryCta={{ label: cta("secondaryCta"), href: "tel:+41794025621" }}
      />
    </div>
  );
}
