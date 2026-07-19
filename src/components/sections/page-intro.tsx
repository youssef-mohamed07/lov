import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export type PageIntroBreadcrumb = {
  label: string;
  href?: string;
};

type PageIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: PageIntroBreadcrumb[];
  actions?: ReactNode;
  className?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  image = "/images/clinic-welcome.jpg",
  imageAlt = "",
  breadcrumbs,
  actions,
  className,
}: PageIntroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[58vh] overflow-hidden bg-surface",
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F]/90 via-[#0E0E0F]/50 to-[#0E0E0F]/25"
      />

      <Container className="relative flex min-h-[58vh] flex-col justify-end pt-[calc(var(--header-height)+var(--space-12))] pb-[var(--section-space-md)]">
        <Reveal className="max-w-3xl" variant="fade">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <p className="text-sm text-white/70">
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`}>
                  {index > 0 ? " / " : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </p>
          ) : null}

          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-medium tracking-[0.2em] text-white/75 uppercase",
                breadcrumbs?.length ? "mt-4" : "",
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h1
            className={cn(
              "max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.12]",
              eyebrow || breadcrumbs?.length ? "mt-3" : "",
            )}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {description}
          </p>
          {actions ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
