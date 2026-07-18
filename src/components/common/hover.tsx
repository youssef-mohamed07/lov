import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HoverProps = {
  children: ReactNode;
  className?: string;
  /** @deprecated Kept for API compatibility — no motion applied. */
  lift?: boolean;
  /** @deprecated Kept for API compatibility — no motion applied. */
  scale?: number;
};

/** Static wrapper — hover motion removed in favor of color/border feedback on children. */
export function Hover({ children, className }: HoverProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function HoverScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return <div className={cn(className)}>{children}</div>;
}
