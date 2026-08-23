import { ArrowRight, Check, FileText, Heart, Video } from "lucide-react";
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
          <article className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_28px_70px_-38px_rgba(14,14,15,0.24)]">
            <div aria-hidden className="flex h-1.5">
              <span className="w-2/3 bg-brand" />
              <span className="flex-1 bg-accent" />
            </div>

            <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11">
              <div className="grid items-stretch gap-7 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10">
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                      {plan.name}
                    </p>
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-brand uppercase">
                      Tout inclus
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-snug">
                    {plan.tagline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                    {plan.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground">
                      <Video className="size-3.5 text-accent" aria-hidden />
                      100 % en visioconférence
                    </li>
                    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground">
                      <FileText className="size-3.5 text-brand" aria-hidden />
                      Compte-rendu inclus
                    </li>
                  </ul>
                </div>

                <aside className="flex min-h-[210px] flex-col justify-between rounded-[1.5rem] border border-accent/15 bg-accent-soft p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-white shadow-sm">
                      <Heart className="size-3.5 fill-white" aria-hidden />
                    </span>
                    <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-foreground uppercase">
                      Tarif unique
                    </span>
                  </div>

                  <div>
                    <p className="font-display text-[3.4rem] leading-none font-semibold tracking-tight text-foreground">
                      {plan.price}
                    </p>
                    <p className="mt-2 text-sm text-muted">{plan.period}</p>
                  </div>
                </aside>
              </div>

              <ul className="mt-8 grid gap-x-8 border-y border-border sm:grid-cols-2 lg:grid-cols-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 border-b border-border py-4 text-sm leading-6 text-foreground last:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <p className="text-xs leading-5 text-muted">
                  Paiement sécurisé · Sans abonnement
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
