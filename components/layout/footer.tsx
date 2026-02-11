"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterData {
  companyName?: string;
  description?: string;
  logo?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  address?: string;
  phone?: string;
  email?: string;
  googleMapUrl?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
  privacyPolicyLabel?: string;
  privacyPolicyUrl?: string;
}

interface FooterProps {
  footerData?: FooterData | null;
  locale?: string;
}

const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

export function Footer({ footerData, locale = 'en' }: FooterProps) {
  const companyName = footerData?.companyName || "D'Zaferi Gartenbau";
  const description = footerData?.description || "Expert garden construction, care, and property services across the Zurich region.";
  const address = footerData?.address || "Zurich, Switzerland";
  const phone = footerData?.phone || "+41 79 402 56 21";
  const email = footerData?.email || "info@dzaferi-gartenbau.ch";
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;
  const privacyLabel = footerData?.privacyPolicyLabel || "Privacy Policy";
  
  const logoUrl = footerData?.logo?.asset?.url 
    ? urlForImage(footerData.logo)?.width(200).height(64).url() 
    : "/images/logo1.jpeg";

  return (
    <footer
      className="bg-[length:100%_100%] py-16"
      style={{
        background: "linear-gradient(180deg, #1B3A2D 0%, #0F1012 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4 sm:mb-5">
              <Image
                src={logoUrl || "/images/logo1.jpeg"}
                alt={footerData?.logo?.alt || companyName}
                width={200}
                height={64}
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-sm">
              {description}
            </p>
            
            {/* Social Links */}
            {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex gap-4 mt-6">
                {footerData.socialLinks.map((social, index) => {
                  const Icon = SOCIAL_ICONS[social.platform] || null;
                  return Icon ? (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      aria-label={social.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          {footerData?.links && footerData.links.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-[family-name:var(--font-heading)]">
                {locale === 'de' ? 'Navigation' : 'Navigation'}
              </h4>
              <ul className="space-y-2">
                {footerData.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services (Static fallback if no links) */}
          {(!footerData?.links || footerData.links.length === 0) && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-[family-name:var(--font-heading)]">
                {locale === 'de' ? 'Dienstleistungen' : 'Services'}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/home-maintenance"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {locale === 'de' ? 'Hauswartung' : 'Home Maintenance'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/garden-maintenance"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {locale === 'de' ? 'Gartenpflege' : 'Garden Care'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/horiculture"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {locale === 'de' ? 'Gartenbau' : 'Horticulture'}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/winter-service"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {locale === 'de' ? 'Winterdienst' : 'Winter Service'}
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-[family-name:var(--font-heading)]">
              {locale === 'de' ? 'Unternehmen' : 'Company'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {locale === 'de' ? 'Über uns' : 'About'}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {locale === 'de' ? 'Projekte' : 'Projects'}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {locale === 'de' ? 'Kontakt' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 font-[family-name:var(--font-heading)]">
              {locale === 'de' ? 'Kontakt' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors"
                >
                  {email}
                </a>
              </p>
              <p>{address}</p>
              {footerData?.googleMapUrl && (
                <p>
                  <a
                    href={footerData.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold hover:text-accent-gold/80 transition-colors"
                  >
                    {locale === 'de' ? 'Auf Karte ansehen' : 'View on Map'}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-xs sm:text-[13px] text-neutral-500 order-2 sm:order-1">
            {copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-[13px] text-neutral-500 order-1 sm:order-2">
            <Link href="/impressum" className="hover:text-neutral-400 transition-colors">
              {locale === 'de' ? 'Impressum' : 'Impressum'}
            </Link>
            {footerData?.privacyPolicyUrl && (
              <Link href={footerData.privacyPolicyUrl} className="hover:text-neutral-400 transition-colors">
                {privacyLabel}
              </Link>
            )}
            {!footerData?.privacyPolicyUrl && (
              <Link href="/privacy-policy" className="hover:text-neutral-400 transition-colors">
                {locale === 'de' ? 'Datenschutz' : 'Privacy Policy'}
              </Link>
            )}
            <span>{locale === 'de' ? 'Mit ❤️ gemacht in der Schweiz' : 'Made with ❤️ in Switzerland'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
