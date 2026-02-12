"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const directionOffsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export function ScrollAnimation({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: ScrollAnimationProps) {
  const offset = directionOffsets[direction];
  const isVertical = direction === "up" || direction === "down";
  const axis = isVertical ? "y" : "x";
  const value = offset[axis as keyof typeof offset];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(isVertical ? { y: value } : { x: value }),
    },
    visible: {
      opacity: 1,
      ...(isVertical ? { y: 0 } : { x: 0 }),
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
