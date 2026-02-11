import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy.page" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getTranslations("privacy.page");
  const sections = await getTranslations("privacy.sections");

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "de" ? "Zurück zur Startseite" : "Back to Home"}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            {page("title")}
          </h1>
          <p className="text-white/80 text-lg">{page("lastUpdated")}</p>
        </div>
      </section>

      {/* Content Section */}
      <div className="w-full bg-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 lg:px-16 py-16 md:py-20">
          <div className="max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
                {sections("introduction.heading")}
              </h2>
              {(sections.raw("introduction.content") as string[]).map((paragraph, i) => (
                <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </section>

          {/* Data Controller */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("dataController.heading")}
            </h2>
            {(sections.raw("dataController.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <div className="bg-neutral-50 rounded-lg p-6 my-6 border border-neutral-200">
              <p className="font-semibold text-neutral-900 mb-2">
                {sections("dataController.company.name")}
              </p>
              <p className="text-sm text-neutral-700 mb-1">
                {sections("dataController.company.address")}
              </p>
              <p className="text-sm text-neutral-700 mb-1">
                {sections("dataController.company.phone")}
              </p>
              <p className="text-sm text-neutral-700">
                {sections("dataController.company.email")}
              </p>
            </div>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("dataCollection.heading")}
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed mb-6">
              {sections("dataCollection.intro")}
            </p>
            {(
              sections.raw("dataCollection.types") as Array<{
                title: string;
                description: string;
              }>
            ).map((type, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </section>

          {/* Legal Basis */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("legalBasis.heading")}
            </h2>
            {(sections.raw("legalBasis.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3 my-6">
              {(sections.raw("legalBasis.bases") as string[]).map((basis, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-600 mt-2.5" />
                  <span className="text-base text-neutral-700 leading-relaxed">{basis}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("cookies.heading")}
            </h2>
            {(sections.raw("cookies.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3 my-6">
              {(sections.raw("cookies.types") as string[]).map((type, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-600 mt-2.5" />
                  <span className="text-base text-neutral-700 leading-relaxed">{type}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-neutral-700 leading-relaxed">{sections("cookies.control")}</p>
          </section>

          {/* Hosting */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("hosting.heading")}
            </h2>
            {(sections.raw("hosting.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Contact Forms */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("contactForms.heading")}
            </h2>
            {(sections.raw("contactForms.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Analytics */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("analytics.heading")}
            </h2>
            {(sections.raw("analytics.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("dataSharing.heading")}
            </h2>
            {(sections.raw("dataSharing.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3 my-6">
              {(sections.raw("dataSharing.circumstances") as string[]).map(
                (circumstance, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-600 mt-2.5" />
                    <span className="text-base text-neutral-700 leading-relaxed">{circumstance}</span>
                  </li>
                )
              )}
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("dataRetention.heading")}
            </h2>
            {(sections.raw("dataRetention.content") as string[]).map((item, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {item}
              </p>
            ))}
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("yourRights.heading")}
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed mb-6">
              {sections("yourRights.intro")}
            </p>
            {(
              sections.raw("yourRights.rights") as Array<{
                title: string;
                description: string;
              }>
            ).map((right, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {right.title}
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed">{right.description}</p>
              </div>
            ))}
            <p className="text-base text-neutral-700 leading-relaxed mt-6">
              {sections("yourRights.contact")}
            </p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("security.heading")}
            </h2>
            {(sections.raw("security.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Third Party Links */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("thirdPartyLinks.heading")}
            </h2>
            {(sections.raw("thirdPartyLinks.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("childrenPrivacy.heading")}
            </h2>
            {(sections.raw("childrenPrivacy.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("changes.heading")}
            </h2>
            {(sections.raw("changes.content") as string[]).map((paragraph, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("contact.heading")}
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed mb-4">
              {sections("contact.intro")}
            </p>
            <ul className="space-y-3 my-6">
              {(sections.raw("contact.methods") as string[]).map((method, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-600 mt-2.5" />
                  <span className="text-base text-neutral-700 leading-relaxed">{method}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-neutral-700 leading-relaxed">{sections("contact.footer")}</p>
          </section>

          {/* Supervisory Authority */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-6 font-[family-name:var(--font-heading)]">
              {sections("supervisoryAuthority.heading")}
            </h2>
            {(sections.raw("supervisoryAuthority.content") as string[]).map((line, i) => (
              <p key={i} className="text-base text-neutral-700 leading-relaxed mb-2">
                {line}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
    </>
  );
}
