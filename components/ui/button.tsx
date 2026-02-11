"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-700 text-white hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-md active:bg-primary-800 active:translate-y-0",
        secondary:
          "border-2 border-primary-700 text-primary-700 bg-transparent hover:bg-primary-50 hover:border-primary-600",
        ghost:
          "text-primary-700 hover:bg-primary-50",
        white:
          "bg-white text-primary-900 hover:bg-neutral-100 hover:shadow-md",
        "ghost-white":
          "border border-white/60 text-white bg-transparent hover:bg-white/10 hover:border-white",
      },
      size: {
        default: "h-10 sm:h-11 px-5 sm:px-7 text-sm",
        sm: "h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-[13px]",
        lg: "h-11 sm:h-12 px-7 sm:px-9 text-sm sm:text-base",
        xl: "h-12 sm:h-14 px-7 sm:px-9 text-sm sm:text-base font-bold",
        icon: "h-9 w-9 sm:h-10 sm:w-10",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
