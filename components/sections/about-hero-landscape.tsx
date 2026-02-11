"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function AboutHeroLandscape() {
  const t = useTranslations("About.page.landscape");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_8px_40px_-12px_rgba(27,58,45,0.2)]"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.03 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/images/image-1.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
          quality={85}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,58,45,0.85) 0%, rgba(27,58,45,0.70) 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-center mx-auto px-4 sm:px-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90 mb-2 sm:mb-3"
            >
              
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight leading-[1.2] mb-3 sm:mb-4 font-[family-name:var(--font-heading)]"
            >
              {t("quote.prefix")}{" "}
              <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
                {t("quote.hands")}
              </span>{" "}
              {t("quote.middle")}{" "}
              <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
                {t("quote.heart")}
              </span>{" "}
              {t("quote.suffix")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
