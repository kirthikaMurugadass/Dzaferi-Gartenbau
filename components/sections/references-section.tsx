"use client";

import { motion } from "framer-motion";
import { User, Phone } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { ReferenceType } from "@/types/sanity/references";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

interface ReferencesSectionProps {
  references?: ReferenceType[] | null;
}

export function ReferencesSection({ references }: ReferencesSectionProps) {
  const t = useTranslations("projects");
  const [isLoading, setIsLoading] = useState(!references);

  useEffect(() => {
    if (references !== undefined) {
      setIsLoading(false);
    }
  }, [references]);

  const fallbackCards = t.raw("references.cards") as Array<{
    name: string;
    location: string;
    phone: string;
  }>;

  const cards =
    references && references.length > 0
      ? references.map((ref) => ({
          name: ref.name,
          location: ref.location,
          phone: ref.phone,
        }))
      : fallbackCards;

  const showSkeleton = isLoading && (!references || references.length === 0);

  return (
    <SectionWrapper bg="off-white" maxWidth="page" animate={false}>
      <div className="text-center mb-12 md:mb-16">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-600 mb-3">
          {t("references.overline")}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-neutral-950 tracking-tight mb-4 font-[family-name:var(--font-heading)]">
          {t("references.heading")}
        </h2>
        <p className="text-neutral-700 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
          {t("references.subtitle")}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {showSkeleton
          ? // Loading state: skeleton cards with same layout
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-start gap-5 animate-pulse">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100/60" />
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="h-4 w-32 bg-neutral-200 rounded" />
                    <div className="h-4 w-24 bg-neutral-200 rounded" />
                    <div className="h-4 w-40 bg-neutral-200 rounded" />
                  </div>
                </div>
              </motion.div>
            ))
          : cards.map((ref) => (
              <motion.div
                key={ref.phone}
                variants={item}
                className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(27,58,45,0.08)] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-950 text-lg mb-1 font-[family-name:var(--font-heading)]">
                      {ref.name}
                    </h3>
                    <p className="text-neutral-600 text-[15px] mb-4">{ref.location}</p>
                    <a
                      href={`tel:${ref.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-primary-700 text-[15px] font-medium hover:text-primary-800 transition-colors"
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      <span className="sr-only">{t("references.card.call")}</span>
                      <span aria-hidden>{t("references.card.call")}:</span> {ref.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="text-center text-neutral-600 text-sm md:text-base mt-10 leading-relaxed"
      >
        {t("references.footerNote")}
      </motion.p>
    </SectionWrapper>
  );
}
