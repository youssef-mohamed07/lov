"use client";

import { ClipboardList, Sparkles } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";

const paths = [
  {
    eyebrow: "Sans engagement",
    title: "Simulateur",
    description:
      "Quelques questions pour une première orientation — indicative, rapide, et claire.",
    cta: "Lancer le simulateur",
    icon: Sparkles,
    image: "/images/path-simulator.jpg",
    points: ["5 minutes chrono", "Résultat immédiat", "Non diagnostique"],
  },
  {
    eyebrow: "Évaluation clinique",
    title: "Bilan orthophonique",
    description:
      "Une évaluation structurée pour préciser le profil et définir la suite.",
    cta: "Découvrir le bilan",
    icon: ClipboardList,
    image: "/images/path-bilan.jpg",
    points: ["Tests adaptés", "Restitution claire", "Compte-rendu écrit"],
  },
] as const;

export function HomePlatform() {
  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal
          className="mb-[var(--space-10)] flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          variant="fade"
        >
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Deux portes d’entrée,{" "}
            <span className="squiggle-accent">un même objectif</span>
          </h2>
          <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1.5 sm:text-right">
            Commencez léger avec le simulateur, ou directement avec un bilan.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Reveal
                key={path.title}
                delay={index * 0.1}
                variant={index === 0 ? "left" : "right"}
              >
                <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-card)] sm:min-h-[420px]">
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

                  <div className="relative mt-auto flex flex-col p-7 sm:p-8">
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <p className="text-xs font-medium tracking-[0.18em] text-white/75 uppercase">
                      {path.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {path.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/85 sm:text-base">
                      {path.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {path.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <CtaButton size="md" className="mt-6 w-fit">
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
