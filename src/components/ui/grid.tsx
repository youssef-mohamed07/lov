import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid w-full", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-12",
    },
    gap: {
      none: "gap-0",
      sm: "gap-[var(--space-4)]",
      md: "gap-[var(--grid-gap)]",
      lg: "gap-[var(--space-10)] lg:gap-[var(--space-12)]",
    },
    align: {
      start: "items-start",
      center: "items-center",
      stretch: "items-stretch",
      end: "items-end",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
    align: "stretch",
  },
});

type GridProps = ComponentProps<"div"> & VariantProps<typeof gridVariants>;

export function Grid({
  className,
  cols,
  gap,
  align,
  children,
  ...props
}: GridProps) {
  return (
    <div className={cn(gridVariants({ cols, gap, align }), className)} {...props}>
      {children}
    </div>
  );
}

type GridItemProps = ComponentProps<"div"> & {
  span?: 1 | 2 | 3 | 4 | 6 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 6 | 12;
  spanLg?: 1 | 2 | 3 | 4 | 6 | 12;
};

const spanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  12: "col-span-12",
} as const;

const spanMdClasses = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
  12: "md:col-span-12",
} as const;

const spanLgClasses = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
  12: "lg:col-span-12",
} as const;

export function GridItem({
  className,
  span,
  spanMd,
  spanLg,
  children,
  ...props
}: GridItemProps) {
  return (
    <div
      className={cn(
        span && spanClasses[span],
        spanMd && spanMdClasses[spanMd],
        spanLg && spanLgClasses[spanLg],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { gridVariants };
