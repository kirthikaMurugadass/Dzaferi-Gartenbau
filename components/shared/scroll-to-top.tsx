"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-[0_4px_14px_rgba(56,133,95,0.4)] transition-all duration-300 hover:scale-110 hover:bg-primary-700 hover:shadow-[0_6px_20px_rgba(56,133,95,0.5)] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 md:bottom-8 md:right-8 md:h-14 md:w-14 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
    </button>
  );
}

