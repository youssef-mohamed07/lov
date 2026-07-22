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
        "relative min-h-[52vh] overflow-hidden bg-background sm:min-h-[58vh]",
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
        className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F]/92 via-[#0E0E0F]/55 to-[#0E0E0F]/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_90%,rgba(254,81,16,0.22),transparent_55%)]"
      />

      <Container className="relative flex min-h-[52vh] flex-col justify-end pt-[calc(var(--header-height)+var(--space-10))] pb-[var(--section-space-md)] sm:min-h-[58vh] sm:pt-[calc(var(--header-height)+var(--space-12))]">
        <Reveal className="max-w-3xl" variant="fade">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav aria-label="Fil d’Ariane" className="text-sm text-white/70">
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`}>
                  {index > 0 ? (
                    <span className="mx-1.5 text-white/40" aria-hidden>
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-medium tracking-[0.22em] text-white/75 uppercase",
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
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
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
