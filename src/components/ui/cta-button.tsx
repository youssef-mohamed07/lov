import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CtaSize = "sm" | "md" | "lg";
type CtaTone = "voice" | "accent";

type CtaShared = {
  children: ReactNode;
  className?: string;
  size?: CtaSize;
  tone?: CtaTone;
};

type CtaAsLink = CtaShared & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type CtaAsButton = CtaShared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export type CtaButtonProps = CtaAsLink | CtaAsButton;

const sizeStyles = {
  sm: {
    root: "gap-2.5 py-1 pl-4 pr-1 text-sm",
    icon: "size-8",
    arrow: "size-3.5",
  },
  md: {
    root: "gap-3 py-1.5 pl-5 pr-1.5 text-sm",
    icon: "size-9",
    arrow: "size-4",
  },
  lg: {
    root: "gap-3.5 py-2 pl-6 pr-2 text-[15px]",
    icon: "size-10",
    arrow: "size-4",
  },
} as const;

const toneStyles = {
  accent:
    "bg-accent hover:bg-voice hover:shadow-[0_14px_32px_-18px_rgba(224,122,95,0.45)]",
  voice:
    "bg-voice hover:bg-accent hover:shadow-[0_14px_32px_-18px_rgba(47,126,168,0.55)]",
} as const;

function CtaContent({
  children,
  icon,
  arrow,
}: {
  children: ReactNode;
  icon: string;
  arrow: string;
}) {
  return (
    <>
      <span className="tracking-[-0.01em]">{children}</span>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-105",
          icon,
        )}
      >
        <ArrowUpRight className={arrow} aria-hidden />
      </span>
    </>
  );
}

export function CtaButton({
  children,
  className,
  size = "md",
  tone = "accent",
  ...props
}: CtaButtonProps) {
  const styles = sizeStyles[size];
  const classes = cn(
    "group inline-flex items-center rounded-full font-medium text-white transition-[background-color,transform,box-shadow] duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    toneStyles[tone],
    styles.root,
    className,
  );

  if ("href" in props && props.href) {
    const { href } = props;
    return (
      <Link href={href} className={classes}>
        <CtaContent icon={styles.icon} arrow={styles.arrow}>
          {children}
        </CtaContent>
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as CtaAsButton;

  return (
    <button type={type} className={classes} {...buttonProps}>
      <CtaContent icon={styles.icon} arrow={styles.arrow}>
        {children}
      </CtaContent>
    </button>
  );
}
