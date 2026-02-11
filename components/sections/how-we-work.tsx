import { SectionWrapper } from "@/components/layout/section-wrapper";
import { useTranslations } from "next-intl";

const steps = ["01", "02", "03", "04"] as const;

export function HowWeWork() {
  const t = useTranslations("Home.howWeWork");

  return (
    <SectionWrapper bg="white">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <p className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-primary-600 mb-3">
          {t("overline")}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950 tracking-tight mb-3 sm:mb-4 md:mb-5">
          {t("heading")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed px-4">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {steps.map((number, index) => (
          <div
            key={number}
            className="rounded-lg sm:rounded-xl bg-[#F8FAF9] border border-neutral-200/80 p-5 sm:p-6 md:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-left"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 tracking-tight block mb-3 sm:mb-4">
              {number}
            </span>
            <h3 className="font-semibold text-neutral-950 text-base sm:text-lg mb-1.5 sm:mb-2">
              {t(`steps.${index}.title`)}
            </h3>
            <p className="text-neutral-700 text-sm sm:text-[15px] leading-relaxed">
              {t(`steps.${index}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
