import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

type SiteCtaProps = {
  title?: string;
  accent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function SiteCta({
  title = "Prêt à y voir",
  accent = "plus clair ?",
  description = "Bilan, orientation et accompagnement — pour les familles qui veulent des repères concrets.",
  ctaLabel = "Prendre rendez-vous",
  ctaHref = "/demander-un-bilan",
  secondaryLabel = "Lancer le simulateur",
  secondaryHref = "/simulateur",
}: SiteCtaProps) {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <div className="rounded-[var(--radius-card)] border border-border bg-surface px-6 py-12 shadow-[var(--shadow-card)] sm:px-10 sm:py-16 lg:px-12">
          <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,13rem)_1fr_minmax(0,13rem)] xl:gap-8">
            <div className="flex items-center justify-center gap-3 sm:gap-5 xl:block">
              <HeartCutout
                src="/images/hero-child.jpg"
                className="w-28 -rotate-6 sm:w-40 xl:w-full"
                tone="warm"
              />
              <HeartCutout
                src="/images/hero-therapist.jpg"
                className="w-28 rotate-6 sm:w-40 xl:hidden"
                tone="cool"
              />
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.12]">
                <span className="block">{title}</span>
                <span className="mt-1 block font-medium italic text-voice">
                  {accent}
                </span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <CtaButton href={ctaHref} size="lg">
                  {ctaLabel}
                </CtaButton>
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>

            <HeartCutout
              src="/images/hero-therapist.jpg"
              className="mx-auto hidden w-full rotate-6 xl:block"
              tone="cool"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeartCutout({
  src,
  className,
  tone = "warm",
}: {
  src: string;
  className?: string;
  tone?: "warm" | "cool";
}) {
  return (
    <div aria-hidden className={cn("relative aspect-[1.185]", className)}>
      <div
        className={cn(
          "relative size-full",
          tone === "cool"
            ? "drop-shadow-[0_18px_42px_rgba(13,128,175,0.22)]"
            : "drop-shadow-[0_18px_42px_rgba(249,171,108,0.2)]",
        )}
      >
        <div className="lov-heart-clip absolute inset-[-5%] bg-brand/25" />
        <div className="lov-heart-clip absolute inset-0 overflow-hidden bg-surface-muted">
          <Image src={src} alt="" fill sizes="220px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
