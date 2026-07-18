import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("text-pretty", {
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-6",
      md: "text-base leading-7",
      lg: "text-lg leading-8",
      xl: "text-xl leading-8",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted",
      accent: "text-accent",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    weight: "normal",
  },
});

type TextElement = "p" | "span" | "div" | "label";

type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: TextElement;
  };

export function Text({
  as: Comp = "p",
  size,
  tone,
  weight,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Comp
      className={cn(textVariants({ size, tone, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { textVariants };
