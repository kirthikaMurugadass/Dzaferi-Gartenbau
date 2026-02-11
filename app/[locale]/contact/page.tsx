import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactMethods } from "@/components/sections/contact-methods";
import { CTABanner } from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { getContactPage } from "@/sanity/lib/queries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const contactData = await getContactPage(locale as "en" | "de");
  const t = await getTranslations({ locale, namespace: "Contact.page" });
  
  const title = contactData?.headerSection?.title?.[locale as "en" | "de"] || t("title");
  const description = contactData?.headerSection?.description?.[locale as "en" | "de"] || t("description");
  
  return {
    title,
    description,
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact.page");
  const hero = await getTranslations("Contact.page.hero");
  const section = await getTranslations("Contact.page.section");
  const cta = await getTranslations("Contact.page.cta");

  // Fetch contact page data from Sanity
  const contactData = await getContactPage(locale as "en" | "de");

  // Get localized values from Sanity or fallback to translations
  const title = contactData?.headerSection?.title?.[locale as "en" | "de"] || hero("heading");
  const description = contactData?.headerSection?.description?.[locale as "en" | "de"] || hero("subtitle");
  const mapUrl = contactData?.addressSection?.googleMapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21626.5!2d8.7!3d47.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE4JzAwLjAiTiA4wrA0MicwMC4wIkU!5e0!3m2!1sen!2sch!4v1234567890";
  const phone = contactData?.contactDetails?.phone || "079 402 56 21";
  const phoneFormatted = phone.replace(/\s/g, "").replace(/^0/, "+41 ");
  const businessHours = contactData?.businessHours || [];
  const ctaText = contactData?.ctaSection?.ctaText?.[locale as "en" | "de"] || cta("subtitle");

  return (
    <>
      <Hero
        variant="tall"
        image="/images/image-8.avif"
        overline={hero("overline")}
        heading={
          <>
            {title}{" "}
            <span className="italic font-normal font-[family-name:var(--font-accent)] text-white">
              {hero("headingAccent")}
            </span>{" "}
            {hero("headingSuffix")}
          </>
        }
        subtitle={description}
        primaryCta={{ label: hero("getConsultation"), href: "#contact-form" }}
        showScrollIndicator={false}
      />
      <SectionWrapper bg="white" id="contact-form">
        <SectionHeader
          overline={section("overline")}
          heading={section("heading")}
          subtitle={section("subtitle")}
        />
        <div className="mb-10 sm:mb-12 md:mb-16">
          <ContactMethods contactData={contactData} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-3 sm:mb-4 font-[family-name:var(--font-heading)]">
              {section("sendMessage")}
            </h3>
            <ContactForm />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 mb-3 sm:mb-4 font-[family-name:var(--font-heading)]">
              {section("ourLocation")}
            </h3>
            <div className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-200">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={section("mapTitle")}
                className="w-full h-full"
              />
            </div>
            {businessHours.length > 0 && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-primary-50 rounded-lg">
                <h4 className="font-semibold text-neutral-950 mb-2 text-sm sm:text-base">
                  {section("businessHours")}
                </h4>
                {businessHours.map((hour, index) => (
                  <p key={index} className="text-neutral-700 text-xs sm:text-sm">
                    {hour.day}: {hour.time}
                  </p>
                ))}
                <p className="text-primary-700 text-xs sm:text-sm mt-2 font-medium">
                  {ctaText}
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>
      <CTABanner
        heading={cta("heading")}
        subtitle={ctaText}
        primaryCta={{ label: cta("primaryCta"), href: "/contact" }}
        secondaryCta={{ label: phone, href: `tel:${phoneFormatted}` }}
      />
    </>
  );
}
