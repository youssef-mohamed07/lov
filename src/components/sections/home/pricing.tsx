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
          <article className="rounded-[2rem] border border-border bg-surface p-2 shadow-[0_28px_70px_-38px_rgba(14,14,15,0.24)]">
            <div className="rounded-[1.55rem] bg-background px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
              <div className="grid items-start gap-7 md:grid-cols-[minmax(0,1fr)_13.5rem] md:gap-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
                      {plan.name}
                    </p>
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-brand uppercase">
                      Tout inclus
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-snug">
                    {plan.tagline}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                    {plan.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground">
                      <Video className="size-3.5 text-accent" aria-hidden />
                      100 % en visioconférence
                    </li>
                    <li className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground">
                      <FileText className="size-3.5 text-brand" aria-hidden />
                      Compte-rendu inclus
                    </li>
                  </ul>
                </div>

                <div className="relative overflow-hidden rounded-[1.5rem] bg-accent-soft p-5 sm:p-6">
                  <div
                    aria-hidden
                    className="absolute -top-10 -right-10 size-28 rounded-full border-[18px] border-white/35"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-white">
                      <Heart className="size-3.5 fill-white" aria-hidden />
                    </span>
                    <span className="rounded-full bg-surface/80 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-foreground uppercase">
                      Tarif unique
                    </span>
                  </div>
                  <p className="relative mt-8 font-display text-[3.35rem] leading-none font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </p>
                  <p className="relative mt-2 text-sm text-muted">
                    {plan.period}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid gap-2.5 border-t border-border pt-7 sm:grid-cols-2 lg:grid-cols-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-2xl bg-surface-muted px-3.5 py-3 text-sm leading-6 text-foreground"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-brand ring-1 ring-inset ring-border">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
