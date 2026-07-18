import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./container";

type SectionProps = ComponentProps<"section"> & {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  contained?: boolean;
  tone?: "default" | "muted" | "surface";
  /** Vertical rhythm from the spacing system. */
  space?: "sm" | "md" | "lg" | "none";
};

const toneClasses = {
  default: "bg-transparent",
  muted: "bg-surface-muted/60",
  surface: "bg-surface",
} as const;

const spaceClasses = {
  none: "py-0",
  sm: "py-[var(--section-space-sm)]",
  md: "py-[var(--section-space-md)]",
  lg: "py-[var(--section-space-lg)]",
} as const;

export function Section({
  className,
  children,
  containerSize = "lg",
  contained = true,
  tone = "default",
  space = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spaceClasses[space], toneClasses[tone], className)}
      {...props}
    >
      {contained ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
