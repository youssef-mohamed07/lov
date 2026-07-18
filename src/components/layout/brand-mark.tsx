import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  tone?: "default" | "onDark";
};

export function BrandMark({
  className,
  compact = false,
  tone = "default",
}: BrandMarkProps) {
  const onDark = tone === "onDark";
  const size = compact ? 36 : 40;

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Lov — Accueil"
    >
      <Image
        src="/brand/logo.png"
        alt=""
        width={size}
        height={size}
        className={cn(
          "shrink-0 object-contain",
          compact ? "size-9" : "size-10",
        )}
        priority
      />
      <span
        className={cn(
          "font-display font-semibold tracking-tight",
          compact ? "text-base" : "text-xl",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        Lov
      </span>
    </Link>
  );
}
