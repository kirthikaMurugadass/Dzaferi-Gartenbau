"use client";

import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Leaf,
  TreePine,
  Home,
  Building2,
  Snowflake,
  PencilRuler,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { ServiceIconName } from "@/data/services";

const ICON_MAP = {
  Leaf,
  TreePine,
  Home,
  Building2,
  Snowflake,
  PencilRuler,
} as const;

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  icon: ServiceIconName;
  href: string;
  compact?: boolean;
}

export function ServiceCard({
  title,
  description,
  features,
  icon,
  href,
  compact = false,
}: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? Leaf;
  const t = useTranslations("services.card");
  
  return (
    <Link href={href}>
      <div
        className={cn(
          "group bg-white border border-neutral-200 rounded-xl sm:rounded-2xl transition-all duration-300 hover:border-primary-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1",
          compact ? "p-5 sm:p-6" : "p-6 sm:p-7 md:p-8"
        )}
      >
        <div className="mb-3 sm:mb-4">
          <Icon className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-neutral-500 group-hover:text-primary-500 transition-colors" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-2 sm:mb-3 font-[family-name:var(--font-heading)]">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-3 sm:mb-4">{description}</p>
        {features && features.length > 0 && (
          <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            {features.slice(0, compact ? 3 : 5).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs sm:text-sm text-neutral-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <span className="inline-flex items-center gap-2 text-primary-700 font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">
          {compact ? t("learnMore") : t("requestService")}
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>
    </Link>
  );
}
