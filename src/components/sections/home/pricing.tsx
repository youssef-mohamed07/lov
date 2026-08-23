import {
  ArrowRight,
  Check,
  Clock3,
  FileCheck2,
  ShieldCheck,
  Video,
} from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { pricingPlans } from "@/data/home";

const plan = pricingPlans[0];

const reassurance = [
  { label: "100 % en visioconférence", icon: Video },
  { label: "Compte-rendu inclus", icon: FileCheck2 },
  { label: "Sans abonnement", icon: ShieldCheck },
] as const;

export function HomePricing() {
  return (
    <section className="overflow-hidden bg-background py-[var(--section-space-md)]">
      <Container className="relative">
        <Reveal className="mx-auto max-w-5xl" variant="fade-scale">
          <article className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_30px_80px_-48px_rgba(14,14,15,0.32)]">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-brand to-accent" />

            <div className="grid lg:grid-cols-[minmax(0,1.18fr)_minmax(20rem,0.82fr)]">
              <div className="px-6 pb-7 pt-9 sm:px-9 sm:pb-8 sm:pt-11 lg:px-12 lg:pt-14">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                    {plan.name}
                  </p>
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-brand uppercase">
                    Tout inclus
                  </span>
                </div>

                <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.15]">
                  Comprendre ce qui bloque.{" "}
                  <span className="mark-accent">Savoir quoi faire ensuite.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {plan.description}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {reassurance.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.label}
                        className="inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-2 text-xs font-medium text-foreground"
                      >
                        <Icon className="size-3.5 text-brand" aria-hidden />
                        {item.label}
                      </li>
                    );
                  })}
                </ul>

              </div>

              <aside className="relative m-3 flex flex-col overflow-hidden rounded-[1.55rem] border border-brand/10 bg-brand-soft/70 p-6 text-foreground sm:m-4 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:ml-0 lg:p-9">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-28 -top-28 size-80 rounded-full bg-[radial-gradient(circle,rgba(249,171,108,0.3),transparent_65%)]" />
                  <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(13,128,175,0.8)_0.8px,transparent_0.8px)] [background-size:20px_20px]" />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/80 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-brand uppercase shadow-sm">
                      Tarif unique
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <Clock3 className="size-3.5" aria-hidden />
                      Parcours complet
                    </span>
                  </div>

                  <div className="mt-10">
                    <p className="font-display text-[4.4rem] leading-none font-semibold tracking-[-0.06em] text-foreground">
                      {plan.price}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      Un seul paiement pour l’évaluation, la restitution et le compte-rendu écrit.
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl border border-brand/10 bg-white/75 p-4 shadow-[0_16px_38px_-30px_rgba(13,128,175,0.38)]">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                        <FileCheck2 className="size-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Un plan clair à la sortie
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          Résultats expliqués, recommandations concrètes et prochaines étapes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-9">
                    <CtaButton
                      href={plan.ctaHref}
                      size="lg"
                      className="w-full justify-between"
                    >
                      {plan.ctaLabel}
                    </CtaButton>
                    <p className="mt-3 text-center text-xs text-muted">
                      Paiement sécurisé · Aucun abonnement
                    </p>
                    <Link
                      href="/deja-un-bilan"
                      className="group mt-6 flex min-h-11 items-center justify-center gap-2 border-t border-brand/10 pt-5 text-sm font-medium text-muted transition-colors hover:text-brand"
                    >
                      J’ai déjà un bilan
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </aside>

              <div className="border-t border-border px-6 pb-9 pt-7 sm:px-9 sm:pb-11 lg:col-start-1 lg:px-12 lg:pb-14">
                <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                  Votre parcours comprend
                </p>
                <ul className="mt-5 grid gap-x-7 gap-y-4 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground"
                    >
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check className="size-3" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
