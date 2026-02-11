"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  caption: string;
  image: string;
  href: string;
  index?: number;
}

export function FeatureCard({
  title,
  caption,
  image,
  href,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="h-full"
    >
      <Link href={href} className="block h-full group">
        <motion.div
          className="h-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative h-[200px] sm:h-[220px] md:h-[260px] w-full overflow-hidden flex-shrink-0">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </motion.div>
            <div
              className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
              }}
            />
          </div>
          <div className="flex flex-col flex-1 min-h-0 p-5 sm:p-6 md:p-8 border-t border-neutral-100">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-950 tracking-tight font-[family-name:var(--font-heading)] mb-2 sm:mb-3">
              {title}
            </h3>
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed flex-1 min-h-0">
              {caption}
            </p>
            <motion.div
              className="mt-4 sm:mt-6 flex items-center gap-2 text-primary-700 font-semibold text-sm pt-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
