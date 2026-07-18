import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const iconBoxVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg",
  {
    variants: {
      size: {
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
      tone: {
        soft: "bg-accent-soft text-accent",
        solid: "bg-accent text-accent-foreground",
        muted: "bg-surface-muted text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "soft",
    },
  },
);

type IconBoxProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof iconBoxVariants> & {
    children: ReactNode;
  };

export function IconBox({
  className,
  size,
  tone,
  children,
  ...props
}: IconBoxProps) {
  return (
    <div
      className={cn(iconBoxVariants({ size, tone }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { iconBoxVariants };
