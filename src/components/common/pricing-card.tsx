"use client";

import { Check } from "lucide-react";

import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: readonly string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
};

export function PricingCard({
  name,
  price,
  period = "/ séance",
  description,
  features,
  ctaLabel = "Prendre rendez-vous",
  ctaHref = "/nous-contacter",
  highlighted = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[1.75rem] border p-[var(--space-8)] shadow-[var(--shadow-card)] transition-[border-color,background-color] duration-200",
        highlighted
          ? "border-accent bg-accent-soft/50"
          : "border-border bg-surface hover:border-accent/35 hover:bg-accent-soft/15",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        {badge ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-[var(--space-5)] flex items-baseline gap-1">
        <span className="font-display text-5xl font-semibold tracking-tight text-foreground">
          {price}
        </span>
        <span className="text-sm text-muted">{period}</span>
      </div>

      <p className="mt-[var(--space-3)] text-sm leading-6 text-muted">
        {description}
      </p>

      <ul className="mt-[var(--space-8)] flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <CtaButton
        href={ctaHref}
        size="md"
        className="mt-[var(--space-8)] w-fit"
      >
        {ctaLabel}
      </CtaButton>
    </article>
  );
}
