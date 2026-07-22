import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  ClipboardCheck,
  Handshake,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { careers } from "@/data/carrieres";
import { cn } from "@/lib/utils";

const processIcons = [Send, Handshake, ClipboardCheck, Sparkles] as const;

export const metadata: Metadata = {
  title: "Carrières",
  description: careers.description,
};

export default function CareersPage() {
  return (
    <main>
      <PageIntro
        eyebrow={careers.eyebrow}
        title={
          <>
            {careers.title}{" "}
            <span className="font-medium italic text-voice">
              {careers.titleAccent}
            </span>
          </>
        }
        description={careers.description}
        image="/images/ortho-session.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Carrières" },
        ]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Envoyer une candidature
          </CtaButton>
        }
      />

      {/* Culture */}
      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal variant="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/expertise-listening.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F]/55 via-transparent to-transparent"
                />
                <p className="absolute bottom-6 left-6 max-w-[16rem] font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Une équipe au service du soin, pas du spectacle.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} variant="right">
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                {careers.culture.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {careers.culture.title}{" "}
                <span className="squiggle-accent">
                  {careers.culture.titleAccent}
                </span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-muted">
                {careers.culture.description}
              </p>

              <ul className="mt-10 flex flex-col gap-8">
                {careers.culture.items.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="font-display text-sm font-semibold tracking-[0.14em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <Reveal
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variant="fade"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                {careers.process.eyebrow}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {careers.process.title}{" "}
                <span className="font-medium italic text-voice">
                  {careers.process.titleAccent}
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1.5 sm:text-right">
              Quatre temps — sans parcours opaque ni délais flous.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careers.process.steps.map((step, index) => {
              const Icon = processIcons[index] ?? Send;
              return (
                <li key={step.title}>
                  <Reveal delay={index * 0.06} variant="up" className="h-full">
                    <article className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[var(--shadow-card)] sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className="font-display text-4xl font-semibold tracking-tight text-foreground/10">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted sm:leading-7">
                        {step.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Roles */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container className="relative">
          <Reveal
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variant="fade"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                {careers.roles.eyebrow}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {careers.roles.title}{" "}
                <span className="mark-accent">{careers.roles.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1.5 sm:text-right">
              {careers.roles.description}
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col gap-4">
            {careers.roles.items.map((role, index) => (
              <li key={role.title}>
                <Reveal delay={index * 0.05} variant="fade">
                  <article className="group grid gap-6 rounded-[1.5rem] border border-border bg-surface p-6 transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-accent-soft/20 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                          {role.type}
                        </span>
                        <span className="rounded-full bg-background px-2.5 py-1">
                          {role.mode}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1">
                          <MapPin className="size-3.5 shrink-0" aria-hidden />
                          {role.location}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
                        {role.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                        {role.description}
                      </p>
                    </div>

                    <CtaButton
                      href="/nous-contacter"
                      size="sm"
                      className="w-fit shrink-0"
                    >
                      Postuler
                    </CtaButton>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Spontaneous CTA */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-12 text-background sm:px-12 sm:py-14 lg:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute -top-1/3 -right-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(254,81,16,0.35),transparent_62%)] blur-2xl" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
              </div>

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div className="max-w-xl">
                  <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                    Candidature spontanée
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                    {careers.cta.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-7 text-background/70">
                    {careers.cta.description}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <CtaButton href="/nous-contacter" size="lg">
                    {careers.cta.action}
                  </CtaButton>
                  <p className="inline-flex items-center gap-1.5 text-sm text-background/55">
                    Réponse sous quelques jours
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
