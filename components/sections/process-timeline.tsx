"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const STEP_COLORS = [
  "#1F6F5C", // 1
  "#3A7D6C", // 2
  "#D4A373", // 3
  "#64748B", // 4
  "#0F172A", // 5
];

const steps = [
  {
    number: 1,
    title: "Discovery & Analysis",
    description:
      "Understanding your vision, site conditions, and requirements to deliver precisely what you need.",
  },
  {
    number: 2,
    title: "Strategy & Planning",
    description:
      "Detailed plan—scope, timeline, materials, and budget. Clear communication at every stage.",
  },
  {
    number: 3,
    title: "Design & Architecture",
    description:
      "Layouts that balance aesthetics with functionality. Every element thoughtfully positioned.",
  },
  {
    number: 4,
    title: "Development & Testing",
    description:
      "Skilled execution brings the plan to life. Quality checks before handover.",
  },
  {
    number: 5,
    title: "Deployment & Launch",
    description:
      "Final touches, walkthrough, and ongoing support. Your space, ready to enjoy.",
  },
];

export function ProcessTimeline() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div ref={containerRef} className="relative">
      {/* Animated vertical center line */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-px overflow-hidden md:block">
        <motion.div
          ref={lineRef}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="h-full w-full origin-top bg-[#E2E8F0]"
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="space-y-20 md:space-y-28">
        {steps.map((step, index) => {
          const isLeft = index % 2 === 1;
          const initialX = isMobile ? 0 : isLeft ? 48 : -48;
          const initialY = isMobile ? 32 : 0;
          const color = STEP_COLORS[index];

          const cardContent = (
            <motion.div
              initial={false}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              className="group rounded-[20px] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)]"
            >
              <h3 className="font-semibold text-[#0F172A] text-lg leading-tight font-[family-name:var(--font-body)]">
                {step.title}
              </h3>
              <p className="mt-4 text-[15px] font-normal leading-[1.7] text-[#64748B]">
                {step.description}
              </p>
            </motion.div>
          );

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: initialX, y: initialY }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative flex flex-col items-center md:flex-row md:items-stretch"
            >
              {/* Desktop: Left column */}
              <div
                className={`hidden flex-1 md:block ${
                  isLeft ? "flex items-center justify-end pr-12" : ""
                }`}
              >
                {isLeft && (
                  <div className="w-full max-w-[420px]">{cardContent}</div>
                )}
              </div>

              {/* Center badge */}
              <div className="flex flex-shrink-0 justify-center px-4 md:relative">
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold text-white"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 4px 14px ${color}40`,
                  }}
                >
                  {step.number}
                </motion.div>
              </div>

              {/* Desktop: Right column | Mobile: card below badge */}
              <div
                className={`mt-8 flex flex-1 md:mt-0 ${
                  !isLeft ? "items-center justify-start pl-12" : ""
                }`}
              >
                {!isLeft && (
                  <div className="mx-auto w-full max-w-[420px] md:mx-0">
                    {cardContent}
                  </div>
                )}
              </div>

              {/* Mobile: card for left steps */}
              {isLeft && (
                <div className="mt-8 w-full md:hidden">
                  <div className="mx-auto w-full max-w-[420px]">
                    {cardContent}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
