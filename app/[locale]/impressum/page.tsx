import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.impressum" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.impressum");

  return (
    <SectionWrapper bg="white" maxWidth="narrow">
      <h1 className="text-3xl font-bold text-neutral-950 mb-8 font-[family-name:var(--font-heading)]">
        {t("title")}
      </h1>
      <div className="prose prose-neutral max-w-none">
        <p>
          <strong>{SITE_CONFIG.name}</strong>
        </p>
        <p>{CONTACT.fullAddress}</p>
        <p>
          Phone:{" "}
          <a href={`tel:${CONTACT.phoneFormatted.replace(/\s/g, "")}`}>
            {CONTACT.phone}
          </a>
        </p>
        <p>
          Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <p className="mt-8 text-neutral-600 text-sm">
          [Add your full legal impressum content here according to Swiss
          requirements]
        </p>
      </div>
    </SectionWrapper>
  );
}
