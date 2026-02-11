"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  image: string;
  slug: string;
  href?: string;
  title?: string;
  description?: string;
  location?: string;
  tags?: string[];
}

export function ProjectCard({
  slug,
  image,
  href,
  title,
  description,
  location,
  tags,
}: ProjectCardProps) {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("projects");
  const viewProjectLabel = t("page.viewProject");

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayTitle = title ?? slug;
  const displayLocation = location ?? "";
  const displayDescription = description ?? "";
  const displayTags = tags ?? [];

  return (
    <Link href={href ?? `/projects/${slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={displayTitle}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Always visible gradient overlay on mobile, hover on desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/40 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400"
          aria-hidden="true"
        />
        
        {/* Text content - always visible on mobile, hover on desktop */}
        {mounted && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6">
            <div className="md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-400">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 font-[family-name:var(--font-heading)]">
                {displayTitle}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">{displayLocation}</p>
              {displayDescription ? (
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                  {displayDescription}
                </p>
              ) : null}
              {displayTags.length ? (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  {displayTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-white/90 bg-white/10 border border-white/15 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="inline-flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                {viewProjectLabel}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
