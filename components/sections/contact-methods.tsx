"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ContactPageData } from "@/types/sanity/contact";

interface ContactMethodsProps {
  contactData?: ContactPageData | null;
}

export function ContactMethods({ contactData }: ContactMethodsProps) {
  const t = useTranslations("Contact.page.methods");

  // Fallback to constants if Sanity data not available
  const phone = contactData?.contactDetails?.phone || "079 402 56 21";
  const email = contactData?.contactDetails?.email || "info@dzaferi-gartenbau.ch";
  const address = contactData?.addressSection?.address || "Hauptstrasse, 8132 Egg, Switzerland";
  
  // Extract map URL - handle both embed URLs and regular URLs
  let mapUrl = "https://www.google.com/maps?q=Egg+Zurich+Switzerland";
  if (contactData?.addressSection?.googleMapEmbedUrl) {
    const embedUrl = contactData.addressSection.googleMapEmbedUrl;
    // If it's an embed URL, try to extract the query parameter or use as-is
    try {
      const url = new URL(embedUrl);
      const q = url.searchParams.get('q');
      mapUrl = q ? `https://www.google.com/maps?q=${q}` : embedUrl;
    } catch {
      // If URL parsing fails, use the embed URL directly
      mapUrl = embedUrl;
    }
  }

  const phoneFormatted = phone.replace(/\s/g, "").replace(/^0/, "+41 ");

  const METHOD_KEYS = [
    { key: "callUs", icon: Phone, content: phone, href: `tel:${phoneFormatted}`, ctaKey: "callNow" },
    { key: "emailUs", icon: Mail, content: email, href: `mailto:${email}`, ctaKey: "sendEmail" },
    { key: "visitUs", icon: MapPin, content: address, href: mapUrl, ctaKey: "getDirections" },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {METHOD_KEYS.map(({ key, icon: Icon, content, href, ctaKey }) => (
        <a
          key={key}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="bg-white rounded-xl p-6 text-center border border-neutral-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
        >
          <Icon className="h-10 w-10 mx-auto mb-4 text-primary-500 group-hover:text-primary-600" />
          <h3 className="font-semibold text-neutral-950 mb-2 font-[family-name:var(--font-heading)]">
            {t(key)}
          </h3>
          <p className="text-neutral-700 text-sm mb-4">{content}</p>
          <span className="text-primary-700 font-medium text-sm">
            {t(ctaKey)} →
          </span>
        </a>
      ))}
    </div>
  );
}
