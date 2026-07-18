import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-display font-semibold tracking-tight text-foreground text-balance",
  {
    variants: {
      level: {
        1: "text-4xl sm:text-5xl lg:text-6xl",
        2: "text-3xl sm:text-4xl",
        3: "text-2xl sm:text-3xl",
        4: "text-xl sm:text-2xl",
        5: "text-lg sm:text-xl",
        6: "text-base sm:text-lg",
      },
    },
    defaultVariants: {
      level: 2,
    },
  },
);

type HeadingProps = Omit<ComponentProps<"h1">, "color"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export function Heading({
  as,
  level = 2,
  className,
  children,
  ...props
}: HeadingProps) {
  const tag = as ?? (`h${level ?? 2}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");
  const Comp = tag;

  return (
    <Comp className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Comp>
  );
}

export { headingVariants };
