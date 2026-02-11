"use client";

import { SectionWrapper } from "@/components/layout/section-wrapper";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { useTranslations } from "next-intl";

// Fallback static data
const DEFAULT_STATS = [
  { value: 15, suffix: "+" },
  { value: 200, suffix: "+" },
  { value: 50, suffix: "+" },
  { value: 100, suffix: "%" },
];

interface StatData {
  id: string;
  title: string;
  value: number;
  suffix: string;
  description?: string;
  order: number;
}

interface StatsCounterProps {
  stats?: StatData[] | null;
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounterAnimation(value);

  return (
    <div ref={ref} className="text-center px-2">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-1.5 sm:mb-2 font-[family-name:var(--font-heading)]">
        {count}
        {suffix}
      </div>
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 leading-tight">
        {label}
      </p>
    </div>
  );
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const t = useTranslations("Home.stats");

  // Use Sanity data if available, otherwise use translations with fallback values
  const displayStats = stats && stats.length > 0
    ? stats.map((stat) => ({
        id: stat.id,
        value: stat.value,
        suffix: stat.suffix,
        label: stat.title,
        order: stat.order
      }))
    : DEFAULT_STATS.map((stat, index) => ({
        id: `fallback-${index}`,
        value: stat.value,
        suffix: stat.suffix,
        label: t(`items.${index}`),
        order: index
      }));

  return (
    <SectionWrapper bg="primary-900" animate={false}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
        {displayStats.map((stat, index) => (
          <div
            key={stat.id}
            className={
              index < displayStats.length - 1
                ? "lg:border-r lg:border-white/10 lg:pr-8"
                : ""
            }
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
