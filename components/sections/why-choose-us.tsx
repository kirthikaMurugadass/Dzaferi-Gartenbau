"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyChooseUs() {
  const t = useTranslations("Home.whyChooseUs");

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">
        <div>
          <SectionHeader
            overline={t("overline")}
            heading={t("heading")}
            alignment="left"
          />
          <div className="space-y-5 sm:space-y-6">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm sm:text-base mb-1 sm:mb-1.5">
                    {t(`items.${index}.title`)}
                  </h4>
                  <p className="text-neutral-600 text-sm sm:text-[15px] leading-[1.6]">
                    {t(`items.${index}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80"
                alt="Garden work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mt-4 sm:mt-6">
              <Image
                src="https://images.unsplash.com/photo-1598902108854-10e335adac99?w=600&q=80"
                alt="Stone work detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-center">
            <div className="relative aspect-[4/3] w-full max-w-[calc(50%-0.5rem)]">
              <Image
                src="/images/logo1.jpeg"
                alt="Dzaferi-Gartenbau"
                fill
                className="object-contain"
                sizes="(max-width: 800px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
