import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Shield,
  Award,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/sections/cta-banner";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/shared/portable-text";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlug(slug, locale as "en" | "de");
  
  if (!service) {
    return { title: "Service Not Found" };
  }

  const imageUrl = service.image?.asset?.url;

  return {
    title: `${service.title} | Dzaferi-Gartenbau`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: service.image?.alt || service.title,
            },
          ]
        : undefined,
    },
  };
}

function formatTitleWithSpan(title: string) {
  const parts = title.split(" ");
  const lastPart = parts.pop() ?? "";
  const prefix = parts.join(" ");
  if (!prefix)
    return (
      <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
        {title}
      </span>
    );
  return (
    <>
      {prefix}{" "}
      <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
        {lastPart}
      </span>
    </>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // Fetch service from Sanity
  const service = await getServiceBySlug(slug, locale as "en" | "de");

  if (!service) notFound();

  // Get image URLs from Sanity
  // Use heroImage if available, otherwise fall back to main image
  const heroImage = service.heroImage || service.image;
  const heroImageUrl = heroImage?.asset?.url 
    ? urlForImage(heroImage).width(1920).height(1080).url() 
    : "/images/service-1.avif";
  
  const imageUrl = service.image?.asset?.url 
    ? urlForImage(service.image).width(1200).height(675).url() 
    : "/images/service-1.avif";

  const t = await getTranslations("cta");
  const detail = await getTranslations("services.detail");
  
  // Features are optional - if needed in future, can be added to Sanity service schema
  // For now, features array will be empty
  const features: string[] = [];

  const title = service.title;
  const shortDescription = service.description;

  return (
    <>
      <div>
        <div className="relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[400px]">
          <Image
            src={heroImageUrl}
            alt={heroImage?.alt || service.image?.alt || title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(27,58,45,0.6) 0%, rgba(27,58,45,0.3) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white">
            <div className="max-w-[1280px] mx-auto">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-3 sm:mb-4 text-sm sm:text-base transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {detail("backToServices")}
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white">
                {formatTitleWithSpan(title)}
              </h1>
              <p className="text-white/90 mt-2 text-sm sm:text-base">{shortDescription}</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={service.image?.alt || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              <div className="mt-6 sm:mt-8 md:mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-neutral-950 mb-4 sm:mb-6 font-[family-name:var(--font-heading)]">
                  {detail("overview")}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <PortableText content={service.details} />
                </div>
              </div>

            </div>
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* What We Offer */}
              {/* <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <h2 className="text-xl font-semibold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
                  {detail("whatWeOffer")}
                </h2>
                {Array.isArray(features) && features.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-neutral-700"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-600" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full">
                    {t("bookService")}
                  </Button>
                </Link>
              </div> */}

              {/* Call To Action Card */}
              <div
                className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(27, 58, 45) 0%, rgb(34, 72, 56) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-heading)]">
                    {detail("readyToStart")}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    {detail("readyToStartDescription")}
                  </p>
                  <Link href="/contact" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-white text-primary-700 hover:bg-white/90 font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {detail("requestConsultation")}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-4 text-center">
                  {detail("trustedCertified")}
                </h3>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-200">
                      <Shield className="h-8 w-8 text-primary-600" />
                    </div>
                    <span className="text-xs text-neutral-600 text-center">
                      {detail("insured")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-200">
                      <Award className="h-8 w-8 text-primary-600" />
                    </div>
                    <span className="text-xs text-neutral-600 text-center">
                      {detail("certified")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-200">
                      <Star className="h-8 w-8 text-primary-600" />
                    </div>
                    <span className="text-xs text-neutral-600 text-center">
                      {detail("premium")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTABanner
        heading={detail("ctaHeading")}
        subtitle={detail("ctaSubtitle", { service: title.toLowerCase() })}
        primaryCta={{ label: t("contactUs"), href: "/contact" }}
        secondaryCta={{ label: "079 402 56 21", href: "tel:+41794025621" }}
      />
    </>
  );
}
