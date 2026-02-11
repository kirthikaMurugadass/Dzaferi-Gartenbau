"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  variant?: "full" | "half" | "compact" | "tall";
  overline?: string;
  heading: React.ReactNode;
  headingAccent?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  showScrollIndicator?: boolean;
  breadcrumb?: { label: string; href: string }[];
}

export function Hero({
  variant = "full",
  overline,
  heading,
  headingAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  image = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80",
  showScrollIndicator = true,
  breadcrumb,
}: HeroProps) {
  const heightClass =
    variant === "full"
      ? "min-h-[600px] sm:min-h-[700px] md:min-h-[85vh] lg:min-h-screen"
      : variant === "half"
        ? "min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
        : variant === "tall"
          ? "min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[80vh]"
          : "min-h-[350px] sm:min-h-[400px]";

  const isCenteredVariant = variant === "half" || variant === "compact" || variant === "tall";

  return (
    <section
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-0",
        heightClass
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,45,0.85) 0%, rgba(27,58,45,0.4) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16">
        <div
          className={cn(
            "max-w-xl",
            variant === "full"
              ? "sm:max-w-lg lg:max-w-2xl"
              : "mx-auto text-center",
            variant === "tall" && "max-w-full sm:max-w-2xl lg:max-w-3xl flex flex-col items-center"
          )}
        >
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-4 text-white/70 text-sm">
              {breadcrumb.map((item, i) => (
                <span key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                  {i < breadcrumb.length - 1 && " / "}
                </span>
              ))}
            </nav>
          )}

          {overline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-gold",
                variant === "tall" ? "mb-5 md:mb-6" : "mb-4"
              )}
            >
              {overline}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-[family-name:var(--font-heading)]",
              variant === "full" && "mb-4 sm:mb-6",
              variant === "half" && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6",
              variant === "compact" && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6",
              variant === "tall" &&
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6 md:mb-8"
            )}
          >
            {heading}
            {headingAccent && (
              <span className="italic font-normal font-[family-name:var(--font-accent)]">
                {" "}
                {headingAccent}
              </span>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                "text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8",
                variant === "tall" && "sm:mb-8 md:mb-10 max-w-2xl mx-auto"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={cn(
                "flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4",
                isCenteredVariant && "justify-center items-center sm:items-start"
              )}
            >
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <Button variant="white" size="xl" rounded="full">
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button variant="ghost-white" size="xl" rounded="full">
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && variant === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-white/80" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
