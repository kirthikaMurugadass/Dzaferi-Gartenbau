"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en" as const, label: "English" },
  { code: "de" as const, label: "Deutsch" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 p-2 rounded-lg transition-colors",
          "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30",
          "aria-expanded={open}"
        )}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" aria-hidden />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLocale?.code.toUpperCase() ?? locale.toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-40 py-2 bg-white rounded-xl shadow-lg border border-neutral-200 z-50"
            role="listbox"
          >
            {locales.map((loc) => (
              <Link
                key={loc.code}
                href={pathname}
                locale={loc.code}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-2 text-sm transition-colors",
                  locale === loc.code
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-neutral-700 hover:bg-neutral-50"
                )}
                role="option"
                aria-selected={locale === loc.code}
              >
                {loc.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
