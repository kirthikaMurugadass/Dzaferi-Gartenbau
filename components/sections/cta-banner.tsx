"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface CTABannerProps {
  heading?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTABanner({
  heading,
  subtitle,
  primaryCta,
  secondaryCta,
}: CTABannerProps) {
  const t = useTranslations("ctaBanner");
  
  const finalHeading = heading ?? t("heading");
  const finalSubtitle = subtitle ?? t("subtitle");
  const finalPrimaryCta = primaryCta ?? { 
    label: t("primaryButton"), 
    href: "/contact" 
  };
  const finalSecondaryCta = secondaryCta ?? { 
    label: t("secondaryButton"), 
    href: "tel:+41794025621" 
  };
  return (
    <section className="relative min-h-[350px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,45,0.85) 0%, rgba(27,58,45,0.6) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-[family-name:var(--font-heading)]">
          {finalHeading}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          {finalSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link href={finalPrimaryCta.href}>
            <Button variant="white" size="xl" rounded="full" className="w-full sm:w-auto">
              {finalPrimaryCta.label}
            </Button>
          </Link>
          <Link href={finalSecondaryCta.href}>
            <Button variant="ghost-white" size="xl" rounded="full" className="w-full sm:w-auto">
              {finalSecondaryCta.label}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
