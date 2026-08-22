import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { cn } from "@/lib/utils";

export type FlowTone = "accent" | "brand";

/** Tone is exposed as CSS vars so every flow primitive stays tone-agnostic. */
const toneVars: Record<FlowTone, CSSProperties> = {
  accent: {
    "--flow-tone": "var(--accent)",
    "--flow-tone-soft": "var(--accent-soft)",
    "--flow-tone-fg": "var(--foreground)",
  } as CSSProperties,
  brand: {
    "--flow-tone": "var(--brand)",
    "--flow-tone-soft": "var(--brand-soft)",
    "--flow-tone-fg": "var(--brand-foreground)",
  } as CSSProperties,
};

const widthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
} as const;

export const flowFieldClass =
  "w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-soft focus:border-[var(--flow-tone)] focus:shadow-[0_0_0_4px_var(--flow-tone-soft)]";

export const flowPrimaryClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--flow-tone)] px-6 text-sm font-semibold text-[var(--flow-tone-fg)] transition-[filter,transform] hover:brightness-[0.94] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-35";

export const flowGhostClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-[var(--flow-tone-soft)]";

type FlowShellProps = {
  tone?: FlowTone;
  width?: keyof typeof widthClasses;
  exitHref?: string;
  exitLabel?: string;
  /** Small status node in the header, left of the exit link. */
  meta?: ReactNode;
  /** Full-width node under the header — progress bars, steppers. */
  rail?: ReactNode;
  /** Long content (forms) reads better anchored to the top. */
  align?: "center" | "top";
  children: ReactNode;
};

export function FlowShell({
  tone = "brand",
  width = "md",
  exitHref = "/",
  exitLabel = "Quitter",
  meta,
  rail,
  align = "center",
  children,
}: FlowShellProps) {
  // The header tracks the content column so rails line up with the cards.
  const barWidth = width === "sm" ? widthClasses.md : widthClasses[width];

  return (
    <div
      style={toneVars[tone]}
      className="relative isolate flex min-h-svh flex-col bg-background"
    >
      <FlowBackdrop />

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div
          className={cn(
            "mx-auto flex w-full items-center gap-4 px-5 py-3 sm:px-8",
            barWidth,
          )}
        >
          <BrandMark compact />
          {meta ? <div className="ml-auto min-w-0">{meta}</div> : null}
          <Link
            href={exitHref}
            className={cn(
              "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground",
              !meta && "ml-auto",
            )}
          >
            <X className="size-4" aria-hidden />
            <span className="hidden sm:inline">{exitLabel}</span>
          </Link>
        </div>
        {rail ? (
          <div className={cn("mx-auto w-full px-5 pb-3 sm:px-8", barWidth)}>
            {rail}
          </div>
        ) : null}
      </header>

      <div
        className={cn(
          "relative flex flex-1 flex-col px-5 py-10 sm:px-8 sm:py-14",
          align === "center" && "justify-center",
        )}
      >
        <div className={cn("mx-auto w-full", widthClasses[width])}>{children}</div>
      </div>
    </div>
  );
}

function FlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-12%,var(--flow-tone-soft),transparent_62%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_100%_100%,var(--brand-soft),transparent_60%)] opacity-55" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(14,14,15,0.06)_0.8px,transparent_0.8px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_76%)]" />
    </div>
  );
}

export function FlowCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FlowEyebrow({
  icon: Icon,
  children,
}: {
  icon?: typeof X;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[var(--flow-tone-soft)] px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-foreground uppercase ring-1 ring-inset ring-[var(--flow-tone)]/25">
      {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

/** The Lov heart mask, reused as the signature visual of every flow. */
export function FlowHeart({
  src,
  className,
  imageClassName,
  sizes = "260px",
  priority = false,
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div aria-hidden className={cn("relative aspect-[1.185]", className)}>
      <div className="lov-heart-clip absolute inset-[-4%] bg-[var(--flow-tone)]/25" />
      <div className="lov-heart-clip absolute inset-0 overflow-hidden bg-surface-muted">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
