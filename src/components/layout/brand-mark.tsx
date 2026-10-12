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

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Lov — Accueil"
    >
      <Image
        src={onDark ? "/brand/logo-horizontal-white.svg" : "/brand/logo-horizontal.svg"}
        alt="Lov"
        width={compact ? 107 : 133}
        height={compact ? 24 : 30}
        className={cn(
          "shrink-0 object-contain",
          compact ? "h-6 w-auto" : "h-[30px] w-auto",
        )}
        priority
      />
    </Link>
  );
}
