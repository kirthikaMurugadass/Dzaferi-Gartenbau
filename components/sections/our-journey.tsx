"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "Founded",
    description:
      "Company established with a passion for nature and a vision to transform outdoor spaces.",
  },
  {
    year: "First Projects",
    description:
      "Landscape transformations across Zurich built our reputation for quality and precision.",
  },
  {
    year: "Growth",
    description:
      "Expanded team and service offerings to meet growing demand across the region.",
  },
  {
    year: "Today",
    description:
      "Trusted by 200+ clients across the region. Swiss quality, delivered with passion.",
  },
];

export function OurJourney() {
  return (
    <div className="space-y-12 md:space-y-16">
      {milestones.map((milestone, index) => {
        const isEven = index % 2 === 1;
        const offsetX = isEven ? 48 : -48;

        return (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: offsetX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className={`flex flex-col gap-4 md:flex-row md:items-center md:gap-12 ${
              isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-shrink-0 md:w-36">
              <span className="text-2xl font-bold text-primary-700 font-[family-name:var(--font-heading)]">
                {milestone.year}
              </span>
            </div>
            <div className="flex-1">
              <div className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-8">
                <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-primary-500 md:left-8 md:top-8" />
                <p className="pl-6 text-neutral-700 leading-relaxed md:pl-8 md:text-lg">
                  {milestone.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
