import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-6)]",
        align === "center" && "items-center text-center",
        align === "left" &&
          action &&
          "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <Reveal
        className={cn("max-w-2xl", align === "center" && "mx-auto")}
        variant="fade"
      >
        {eyebrow ? (
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>
        {description ? (
          <p className="mt-[var(--space-4)] text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
      </Reveal>
      {action ? <Reveal delay={0.08}>{action}</Reveal> : null}
    </div>
  );
}

export function AccentTitle({ children }: { children: ReactNode }) {
  return (
    <span className="font-medium italic text-voice">
      {children}
    </span>
  );
}
