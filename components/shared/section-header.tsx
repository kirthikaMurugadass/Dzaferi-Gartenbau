"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline?: string;
  heading: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  overline,
  heading,
  subtitle,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10 md:mb-16",
        alignment === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {overline && (
        <p className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-500 mb-2 sm:mb-3">
          {overline}
        </p>
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight mb-3 sm:mb-4 md:mb-5 font-[family-name:var(--font-heading)]">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
