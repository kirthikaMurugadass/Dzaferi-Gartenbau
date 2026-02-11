"use client";

import { ScrollAnimation } from "@/components/shared/scroll-animation";
import { Award, TreePine, MapPin, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Award, TreePine, MapPin, Shield] as const;

export function TrustBar() {
  const t = useTranslations("Home.trustBar");

  return (
    <ScrollAnimation>
      <div className="bg-earth-50 py-6 sm:py-8 md:py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {ICONS.map((Icon, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 sm:gap-3 text-neutral-700"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base font-medium">
                  {t(`items.${index}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}
