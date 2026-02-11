"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export function VisionMission() {
  const t = useTranslations("About.page.purpose");

  return (
    <SectionWrapper bg="off-white">
      <SectionHeader
        overline={t("overline")}
        heading={t("heading")}
        alignment="center"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-12">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-neutral-100"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-3 sm:mb-4 font-[family-name:var(--font-heading)]">
            {t("cards.0.title")}
          </h3>
          <p className="text-neutral-700 leading-relaxed text-sm sm:text-[15px]">
            {t("cards.0.description")}
          </p>
        </motion.div>
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-neutral-100"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-3 sm:mb-4 font-[family-name:var(--font-heading)]">
            {t("cards.1.title")}
          </h3>
          <p className="text-neutral-700 leading-relaxed text-sm sm:text-[15px]">
            {t("cards.1.description")}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
