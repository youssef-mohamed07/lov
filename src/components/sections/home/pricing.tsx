import { ArrowRight, Check, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { pricingPlans } from "@/data/home";

const plan = pricingPlans[0];

export function HomePricing() {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <Reveal className="mx-auto max-w-5xl" variant="fade-scale">
          <article className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_28px_70px_-32px_rgba(14,14,15,0.28)]">
            <div className="grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
              <div className="relative aspect-[16/11] min-h-[220px] lg:aspect-auto lg:min-h-[32rem]">
                <Image
                  src={plan.image}
                  alt={plan.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="object-cover object-[50%_42%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent"
                />
                <span className="absolute bottom-4 left-4 inline-flex size-11 items-center justify-center rounded-full bg-surface/95 text-accent shadow-[var(--shadow-card)] backdrop-blur-sm">
                  <Heart className="size-4 fill-accent" aria-hidden />
                </span>
              </div>

              <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <p className="pt-1.5 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                    {plan.name}
                  </p>
                  <div className="text-right">
                    <p className="font-display text-[2.5rem] leading-none font-semibold tracking-tight text-foreground">
                      {plan.price}
                    </p>
                    <p className="mt-1.5 text-sm text-muted">{plan.period}</p>
                  </div>
                </div>

                <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.85rem] sm:leading-snug">
                  {plan.tagline}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                  {plan.description}
                </p>

                <ul className="mt-7 flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-6 text-foreground"
                    >
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check className="size-3" aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <CtaButton href={plan.ctaHref} size="lg">
                    {plan.ctaLabel}
                  </CtaButton>
                  <Link
                    href="/deja-un-bilan"
                    className="group inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    J’ai déjà un bilan
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
