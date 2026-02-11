"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { navigation } from "@/data/navigation";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isScrolled = useScrollPosition(80);
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300",
          isScrolled
            ? "bg-white text-neutral-900 shadow-sm border-b border-neutral-200"
            : "bg-transparent text-white"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-0.5 lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:py-0 lg:rounded-none shadow-sm lg:shadow-none">
            <Image
              src="/images/logo1.jpeg"
              alt="Dzaferi-Gartenbau"
              width={160}
              height={48}
              className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.main.map((item) => {
              if (item.cta) {
                return (
                  <Link key={item.key} href={item.href}>
                  <Button variant="primary" size="default" rounded="full">
                    {t("getInTouch")}
                  </Button>
                </Link>
                );
              }
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "font-medium text-sm hover:text-primary-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-700 after:transition-all hover:after:w-full",
                    isScrolled ? "text-neutral-900" : "text-white"
                  )}
                >
                  {t(item.key as "home" | "services" | "projects" | "about" | "contact")}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
          {/* Mobile Menu Button */}
          <button
              className="p-2 rounded-md bg-white/95 backdrop-blur-sm shadow-sm lg:bg-transparent lg:backdrop-blur-none lg:shadow-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
                <X className="h-6 w-6 text-neutral-900" />
            ) : (
                <Menu className="h-6 w-6 text-neutral-900" />
            )}
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary-900 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
              {navigation.main
                .filter((item) => !item.cta)
                .map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-center"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg sm:text-xl font-medium text-white hover:text-primary-300 transition-colors"
                    >
                      {t(item.key as "home" | "services" | "projects" | "about" | "contact")}
                    </Link>
                  </motion.div>
                ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="white" size="lg" rounded="full">
                    {t("getInTouch")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
