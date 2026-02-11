"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL = 4500; // 4.5 seconds
const ZOOM_DURATION = 8; // seconds for full zoom cycle (1 → 1.05)

// Default static image paths (fallback)
const DEFAULT_SLIDES = [
  "/images/garder-1.jpg",
  "/images/garden-2.jpg",
  "/images/garden-3.jpg",
] as const;

interface SliderImage {
  asset: {
    url: string;
  };
  alt?: string;
}

interface HeroSliderProps {
  overline?: string;
  heading: string;
  headingAccent?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showScrollIndicator?: boolean;
  showDotIndicators?: boolean;
  sliderImages?: SliderImage[]; // Sanity CMS prop
}

export function HeroSlider({
  overline = "PREMIUM GARDEN LANDSCAPING",
  heading = "We Create Gardens That",
  headingAccent,
  subtitle = "Expert garden construction, care, and property services across the Zurich region. Since day one, we've been turning outdoor spaces into living masterpieces.",
  primaryCta = { label: "Explore Our Work", href: "/projects" },
  secondaryCta = { label: "Contact Us", href: "/contact" },
  showScrollIndicator = true,
  showDotIndicators = true,
  sliderImages, // Sanity CMS prop
}: HeroSliderProps) {
  // Convert Sanity images to same format as original SLIDES array
  // Falls back to default static images if Sanity data is empty/undefined
  const SLIDES = useMemo(() => {
    if (sliderImages && sliderImages.length > 0) {
      return sliderImages.map(img => img.asset.url);
    }
    return DEFAULT_SLIDES;
  }, [sliderImages]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  return (
    <section
      className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[85vh] xl:min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 lg:pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: ZOOM_DURATION / 2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                src={SLIDES[activeIndex]}
                alt=""
                fill
                className="object-cover object-center"
                priority={activeIndex === 0}
                sizes="100vw"
                quality={90}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay - stronger on mobile for better text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(27,58,45,0.90) 0%, rgba(27,58,45,0.60) 50%, rgba(27,58,45,0.75) 100%)",
          }}
        />
      </div>

      {/* Preload next slide for smooth transitions */}
      <div className="hidden">
        <Image
          src={SLIDES[(activeIndex + 1) % SLIDES.length]}
          alt=""
          width={1920}
          height={1080}
          quality={80}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 pb-24 sm:pb-28 md:pb-32">
        <div
          className={cn(
            "max-w-full sm:max-w-xl lg:max-w-2xl mx-auto",
            "text-center"
          )}
        >
          {overline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-gold mb-3 sm:mb-4"
            >
              {overline}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 sm:mb-5 md:mb-6 font-[family-name:var(--font-heading)]"
          >
            {heading}
            {headingAccent && <>{" "}{headingAccent}</>}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-2"
            >
              {subtitle}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center mb-0"
            >
              {primaryCta && (
                <Link href={primaryCta.href} className="w-full sm:w-auto">
                  <Button variant="white" size="xl" rounded="full" className="w-full sm:w-auto min-w-[200px]">
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="w-full sm:w-auto">
                  <Button variant="ghost-white" size="xl" rounded="full" className="w-full sm:w-auto min-w-[200px]">
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Dot Indicators - Positioned below buttons with proper spacing */}
      {showDotIndicators && (
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group p-1.5 touch-manipulation"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={cn(
                  "block h-1.5 sm:h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-6 sm:w-8 bg-white"
                    : "w-1.5 sm:w-2 bg-white/50 group-hover:bg-white/70"
                )}
              />
            </button>
          ))}
        </div>
      )}

      {/* Scroll Indicator - Hidden on mobile to avoid clutter */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="hidden sm:block absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[5]"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-white/80" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
