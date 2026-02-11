"use client";

import { ScrollAnimation } from "@/components/shared/scroll-animation";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "primary-50" | "earth-50" | "primary-900" | "transparent" | "off-white";
  maxWidth?: "page" | "wide" | "narrow" | "full" | "article";
  animate?: boolean;
  id?: string;
}

const bgClasses = {
  white: "bg-white",
  "primary-50": "bg-primary-50",
  "earth-50": "bg-earth-50",
  "primary-900": "bg-primary-900",
  transparent: "bg-transparent",
  "off-white": "bg-[#F8FAF9]",
};

const maxWidthClasses = {
  page: "max-w-[1280px]",
  wide: "max-w-[1440px]",
  narrow: "max-w-[768px]",
  full: "max-w-full",
  article: "max-w-[900px]",
};

export function SectionWrapper({
  children,
  className,
  bg = "white",
  maxWidth = "page",
  animate = true,
  id,
}: SectionWrapperProps) {
  const content = (
    <div
      id={id}
      className={cn(
        "w-full px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24",
        id && "scroll-mt-20",
        bgClasses[bg],
        maxWidthClasses[maxWidth],
        "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );

  if (animate) {
    return <ScrollAnimation>{content}</ScrollAnimation>;
  }

  return content;
}
