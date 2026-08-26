"use client";

import { ClipboardList, HeartHandshake } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";

const paths = [
  {
    eyebrow: "01 — Bilan orthophonique",
    title: "Bilan orthophonique",
    description:
      "Une évaluation structurée pour préciser le profil et poser les priorités.",
    href: "/bilan",
    cta: "Découvrir le bilan",
    icon: ClipboardList,
    image: "/images/path-bilan.jpg",
  },
  {
    eyebrow: "02 — Suivi et accompagnement",
    title: "Suivi et accompagnement",
    description:
      "Des séances régulières, des objectifs partagés et des progrès mesurés dans le temps.",
    href: "/suivi",
    cta: "Découvrir le suivi",
    icon: HeartHandshake,
    image: "/images/pricing-suivi.jpg",
  },
] as const;

export function HomePlatform() {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container>
        <Reveal
          className="mb-[var(--space-10)] flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          variant="fade"
        >
          <div>
            <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              À votre rythme,{" "}
              <span className="mark-tint">du bilan au suivi</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1.5 sm:text-right">
            Deux temps forts de votre parcours : le bilan, puis
            l&apos;accompagnement.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Reveal
                key={path.href}
                delay={index * 0.1}
                variant={index === 0 ? "left" : "right"}
                className="h-full"
              >
                <article className="relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-card)] sm:min-h-[420px]">
                  <Image
                    src={path.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
                  />

                  <div className="relative mt-auto flex min-h-[17.5rem] flex-col p-7 sm:min-h-[18.5rem] sm:p-8">
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <p className="text-xs font-medium tracking-[0.18em] text-white/75 uppercase">
                      {path.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {path.title}
                    </h3>
                    <p className="mt-3 max-w-md flex-1 text-sm leading-6 text-white/85 sm:text-base">
                      {path.description}
                    </p>
                    <CtaButton href={path.href} size="md" className="mt-6 w-fit">
                      {path.cta}
                    </CtaButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
