import { BadgeCheck, ClipboardCheck, FileText } from "lucide-react";
import Image from "next/image";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { bilan } from "@/data/bilan";
import { cn } from "@/lib/utils";

const mentionIcons = [BadgeCheck, ClipboardCheck, FileText] as const;

export function BilanHero() {
  const { hero, description } = bilan;

  return (
    <section className="relative min-h-svh overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,var(--accent-soft),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_8%_75%,var(--brand-soft),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(13,128,175,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(14,14,15,0.06)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
      </div>

      <HeartImage
        src="/images/hero-child.jpg"
        className="absolute top-[20%] left-[-7%] hidden w-[230px] -rotate-8 lg:block xl:left-[-4%] xl:w-[278px]"
        tone="warm"
      />
      <HeartImage
        src="/images/hero-therapist.jpg"
        className="absolute top-[29%] right-[-8%] hidden w-[250px] rotate-6 lg:block xl:right-[-3%] xl:w-[300px]"
        tone="cool"
      />

      <Container className="relative flex flex-col items-center justify-center pt-[calc(var(--header-height)+var(--space-8))] pb-[var(--space-8)] text-center lg:min-h-svh lg:pb-[var(--space-20)]">
        <FadeStagger immediate className="mx-auto flex max-w-4xl flex-col items-center">
          <FadeItem>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              {hero.eyebrow}
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <h1 className="font-display text-[2rem] font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              <span className="block">{hero.title}</span>
              <span className="mt-2 block font-medium italic text-voice">
                {hero.titleAccent}
              </span>
            </h1>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-8)]">
            <CtaButton href={hero.ctaHref} size="lg">
              {hero.ctaLabel}
            </CtaButton>
          </FadeItem>

          <FadeItem className="mt-10 w-full max-w-md px-2 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <HeartImage
                src="/images/hero-child.jpg"
                className="-rotate-6"
                imageClassName="object-[50%_18%]"
              />
              <HeartImage
                src="/images/hero-therapist.jpg"
                className="rotate-6"
                imageClassName="object-[50%_16%]"
              />
            </div>
          </FadeItem>
        </FadeStagger>
      </Container>

      <Container className="pointer-events-none relative pb-[var(--space-10)] sm:pb-[var(--space-12)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-[var(--space-10)]">
        <ul className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
          {hero.mentions.map((label, index) => {
            const Icon = mentionIcons[index] ?? BadgeCheck;
            return (
              <li key={label} className="flex items-center gap-6 sm:gap-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-soft text-brand ring-1 ring-brand/15">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {label}
                </span>
                {index < hero.mentions.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden size-1 rounded-full bg-brand/35 sm:block"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function HeartImage({
  src,
  className,
  imageClassName,
  tone = "warm",
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  tone?: "warm" | "cool";
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none aspect-[1.185]", className)}
    >
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
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 300px"
            className={cn("object-cover", imageClassName)}
            priority
          />
        </div>
      </div>
    </div>
  );
}
