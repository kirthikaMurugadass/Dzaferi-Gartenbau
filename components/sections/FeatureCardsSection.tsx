"use client";

import { FeatureCard } from "@/components/shared/FeatureCard";
import { useTranslations } from "next-intl";
import { urlForImage } from "@/sanity/lib/image";

// Fallback static data
const FALLBACK_CARDS = [
  { image: "/images/image-2.avif", href: "/about" },
  { image: "/images/image-5.jpeg", href: "/services" },
  { image: "/images/image-4.jpeg", href: "/services#garden-maintenance" },
];

interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  image: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  link: string;
  order: number;
}

interface FeatureCardsSectionProps {
  cards?: FeatureCardData[] | null;
}

export function FeatureCardsSection({ cards }: FeatureCardsSectionProps) {
  const t = useTranslations("Home.featureCards");

  // Use Sanity data if available, otherwise use translations with fallback images
  const displayCards = cards && cards.length > 0 
    ? cards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        image: card.image?.asset?.url 
          ? urlForImage(card.image)?.width(800).height(600).url() || card.image.asset.url
          : "/images/placeholder.jpg",
        link: card.link,
        order: card.order
      }))
    : FALLBACK_CARDS.map((meta, index) => ({
        id: `fallback-${index}`,
        title: t(`cards.${index}.title`),
        description: t(`cards.${index}.caption`),
        image: meta.image,
        link: meta.href,
        order: index
      }));

  return (
    <section className="w-full bg-neutral-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {displayCards.map((card, index) => (
            <FeatureCard
              key={card.id}
              title={card.title}
              caption={card.description}
              image={card.image}
              href={card.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
