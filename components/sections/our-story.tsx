"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function OurStory() {
  const t = useTranslations("About.page.story");

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-4 sm:mb-5 md:mb-6 font-[family-name:var(--font-heading)]">
          {t("contentHeading")}
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-3 sm:mb-4">
          {t("paragraphs.0")}
        </p>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-3 sm:mb-4">
          {t("paragraphs.1")}
        </p>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {t("paragraphs.2")}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <Image
            src="/images/image-7.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    </div>
  );
}
