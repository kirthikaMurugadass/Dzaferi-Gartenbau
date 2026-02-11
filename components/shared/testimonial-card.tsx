"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  clientLocation: string;
  rating: number;
  image?: string;
}

export function TestimonialCard({
  quote,
  clientName,
  clientLocation,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 relative">
      <span
        className="absolute top-4 right-5 sm:top-6 sm:right-8 text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-accent)] italic text-primary-200"
        aria-hidden
      >
        "
      </span>
      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-5 sm:mb-6 font-[family-name:var(--font-accent)] italic relative z-10">
        {quote}
      </p>
      <div className="flex gap-1 mb-3 sm:mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 sm:h-5 sm:w-5 fill-accent-gold text-accent-gold"
            aria-hidden
          />
        ))}
      </div>
      <div className="pt-3 sm:pt-4 border-t border-primary-200">
        <div className="flex items-center gap-3">
          {image && (
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={clientName}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-neutral-950 text-sm sm:text-base">{clientName}</p>
            <p className="text-xs sm:text-sm text-neutral-500">{clientLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
