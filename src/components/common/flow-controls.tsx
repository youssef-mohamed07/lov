import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";

import { flowPrimaryClass } from "@/components/common/flow-shell";
import { cn } from "@/lib/utils";

export function FlowChoice({
  label,
  badge,
  selected = false,
  multi = false,
  showArrow = false,
  onSelect,
}: {
  label: ReactNode;
  badge?: ReactNode;
  selected?: boolean;
  multi?: boolean;
  showArrow?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : undefined}
      aria-pressed={multi ? undefined : selected}
      aria-checked={multi ? selected : undefined}
      onClick={onSelect}
      className={cn(
        "group flex min-h-14 w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left text-[0.95rem] font-medium transition-[background-color,border-color,box-shadow,transform] active:scale-[0.995]",
        selected
          ? "border-[var(--flow-tone)] bg-[var(--flow-tone-soft)] text-foreground shadow-[0_12px_30px_-24px_rgba(14,14,15,0.4)]"
          : "border-border bg-surface text-foreground hover:border-[var(--flow-tone)]/45 hover:bg-[var(--flow-tone-soft)]/55 hover:shadow-[var(--shadow-card)]",
      )}
    >
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center text-xs font-semibold transition-colors",
          multi ? "rounded-lg" : "rounded-full",
          selected
            ? "bg-[var(--flow-tone)] text-[var(--flow-tone-fg)]"
            : "bg-surface-muted text-muted ring-1 ring-inset ring-border group-hover:ring-[var(--flow-tone)]/40",
        )}
      >
        {selected ? <Check className="size-4" aria-hidden /> : badge}
      </span>
      <span className="flex-1">{label}</span>
      {showArrow ? (
        <ArrowRight
          className="size-4 shrink-0 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden
        />
      ) : null}
    </button>
  );
}

export function FlowNav({
  onBack,
  backLabel = "Retour",
  onNext,
  nextLabel = "Continuer",
  canContinue = true,
  className,
}: {
  onBack?: () => void;
  backLabel?: string;
  onNext?: () => void;
  nextLabel?: string;
  canContinue?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className={flowPrimaryClass}
        >
          {nextLabel}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

/** Compact segmented progress — reads as a quiz, not a checkout. */
export function FlowDots({
  total,
  current,
  label,
}: {
  total: number;
  current: number;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {label ? (
        <span className="hidden text-xs font-medium tracking-[0.14em] text-muted uppercase sm:inline">
          {label}
        </span>
      ) : null}
      <span className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index < current
                ? "w-6 bg-[var(--flow-tone)]"
                : "w-2.5 bg-border",
            )}
          />
        ))}
      </span>
    </div>
  );
}

/** Labelled stepper — signals a structured, multi-part process. */
export function FlowSteps({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  const safeCurrent = Math.min(Math.max(current, 0), steps.length - 1);

  return (
    <div>
      <ol className="hidden items-center gap-2 sm:flex">
        {steps.map((step, index) => {
          const done = index < safeCurrent;
          const active = index === safeCurrent;
          return (
            <li key={step} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-semibold transition-colors",
                  done || active
                    ? "bg-[var(--flow-tone)] text-[var(--flow-tone-fg)]"
                    : "bg-surface-muted text-muted ring-1 ring-inset ring-border",
                )}
              >
                {done ? <Check className="size-3.5" aria-hidden /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-xs font-medium",
                  active ? "text-foreground" : "text-muted",
                )}
              >
                {step}
              </span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "h-px min-w-3 flex-1 transition-colors",
                    done ? "bg-[var(--flow-tone)]/45" : "bg-border",
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="sm:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium text-foreground">
            {steps[safeCurrent]}
          </p>
          <p className="text-xs tabular-nums text-muted">
            {safeCurrent + 1}/{steps.length}
          </p>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-[var(--flow-tone)] transition-[width] duration-500"
            style={{
              width: `${((safeCurrent + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
