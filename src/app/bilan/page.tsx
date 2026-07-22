import type { Metadata } from "next";
import { Check, Compass, MessageCircle, Users } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { BilanOverview } from "@/components/sections/bilan-overview";
import { BilanProcess } from "@/components/sections/bilan-process";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { bilan } from "@/data/bilan";

const reassuranceIcons = [MessageCircle, Users, Compass] as const;

export const metadata: Metadata = {
  title: "Bilan orthophonique",
  description: bilan.description,
};

export default function BilanPage() {
  return (
    <main>
      <PageIntro
        eyebrow={bilan.heroEyebrow}
        title={bilan.title}
        description={bilan.description}
        image="/images/path-bilan.jpg"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Bilan" }]}
        actions={
          <CtaButton href="/nous-contacter" size="lg" className="min-h-11">
            Demander un bilan
          </CtaButton>
        }
      />

      {/* Reassurance — editorial strip, not SaaS cards */}
      <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
        <Container className="relative">
          <Reveal
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variant="fade"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Avant tout
              </p>
              <h2 className="mt-2 max-w-md font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Un bilan pensé{" "}
                <span className="mark-accent">pour les familles</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1 sm:text-right">
              Clair dès le premier échange — et utile pour la suite.
            </p>
          </Reveal>

          <Reveal className="mt-10" variant="fade">
            <ul className="relative grid gap-8 sm:grid-cols-3 sm:gap-0">
              <div
                aria-hidden
                className="absolute top-5 right-[16.5%] left-[16.5%] hidden h-px bg-border sm:block"
              />
              {bilan.reassurance.map((item, index) => {
                const Icon = reassuranceIcons[index] ?? MessageCircle;
                return (
                  <li
                    key={item.title}
                    className="relative px-0 text-center sm:px-6"
                  >
                    <div className="relative z-10 mx-auto flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[0_10px_24px_-14px_rgba(254,81,16,0.5)]">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      <BilanOverview />
      <BilanProcess />

      {/* Includes + price — one composition */}
      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <Reveal
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variant="fade"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Inclus
              </p>
              <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Ce que contient{" "}
                <span className="squiggle-accent">le bilan</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1 sm:text-right">
              Tout est affiché — aucune surprise après le premier échange.
            </p>
          </Reveal>

          <Reveal variant="fade">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-card)]">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[240px] lg:min-h-[380px]">
                  <Image
                    src="/images/pricing-bilan.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface/50"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
                    <p className="text-xs font-medium tracking-[0.18em] text-white/75 uppercase">
                      {bilan.price.label}
                    </p>
                    <p className="mt-1 font-display text-4xl font-semibold text-white">
                      {bilan.price.amount}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="hidden items-baseline gap-3 lg:flex">
                    <p className="font-display text-5xl font-semibold tracking-tight text-foreground">
                      {bilan.price.amount}
                    </p>
                    <p className="text-sm text-muted">{bilan.price.label}</p>
                  </div>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-muted lg:mt-3">
                    {bilan.price.detail}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3">
                    {bilan.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-foreground"
                      >
                        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <CtaButton
                      href="/nous-contacter"
                      size="md"
                      className="min-h-11"
                    >
                      Demander un bilan
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
