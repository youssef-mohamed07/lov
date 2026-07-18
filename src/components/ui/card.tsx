import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 text-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mb-4 flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-6 flex items-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
