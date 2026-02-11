"use client";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/data/testimonials";
import { useTranslations } from "next-intl";
import { urlForImage } from "@/sanity/lib/image";

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  message: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  rating: number;
  order: number;
}

interface TestimonialsProps {
  testimonials?: TestimonialData[] | null;
}

export function Testimonials({ testimonials: sanityTestimonials }: TestimonialsProps) {
  const t = useTranslations("Home.testimonials");

  // Use Sanity data if available, otherwise use translations with fallback data
  const displayTestimonials = sanityTestimonials && sanityTestimonials.length > 0
    ? sanityTestimonials.map((testimonial) => ({
        id: testimonial.id,
        quote: testimonial.message,
        clientName: testimonial.name,
        clientLocation: testimonial.role,
        rating: testimonial.rating,
        image: testimonial.image?.asset?.url 
          ? urlForImage(testimonial.image)?.width(400).height(400).url() || testimonial.image.asset.url
          : undefined
      }))
    : testimonials.map((testimonial, index) => ({
        id: testimonial.id,
        quote: t(`cards.${index}.quote`),
        clientName: t(`cards.${index}.clientName`),
        clientLocation: t(`cards.${index}.clientLocation`),
        rating: testimonial.rating,
        image: undefined
      }));

  return (
    <SectionWrapper bg="earth-50">
      <SectionHeader
        overline={t("overline")}
        heading={t("heading")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {displayTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            clientName={testimonial.clientName}
            clientLocation={testimonial.clientLocation}
            rating={testimonial.rating}
            image={testimonial.image}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
