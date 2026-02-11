import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.privacy");

  return (
    <SectionWrapper bg="white" maxWidth="narrow">
      <h1 className="text-3xl font-bold text-neutral-950 mb-8 font-[family-name:var(--font-heading)]">
        {t("title")}
      </h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-neutral-700">
          [Add your privacy policy content here according to Swiss GDPR
          requirements]
        </p>
      </div>
    </SectionWrapper>
  );
}
