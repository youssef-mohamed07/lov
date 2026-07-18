import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Remove horizontal gutters (edge-to-edge inside a parent). */
  flush?: boolean;
};

const sizeClasses = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  full: "max-w-none",
} as const;

export function Container({
  as: Comp = "div",
  size = "lg",
  flush = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "mx-auto w-full",
        !flush && "px-[var(--gutter)]",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
