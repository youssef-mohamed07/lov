"use client";

import {
  CalendarDays,
  ClipboardList,
  Compass,
  TrendingUp,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "S’orienter",
    description: "Clarifiez le besoin avec le simulateur, en quelques minutes.",
    icon: Compass,
  },
  {
    title: "Réserver",
    description: "Choisissez un créneau et préparez le motif simplement.",
    icon: CalendarDays,
  },
  {
    title: "Évaluation",
    description: "Un bilan orthophonique précis, adapté à l’âge et au besoin.",
    icon: ClipboardList,
  },
  {
    title: "Suivi",
    description: "Des objectifs partagés et des progrès visibles, ensemble.",
    icon: TrendingUp,
  },
] as const;

export function HomeSteps() {
  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            Parcours
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Des étapes simples{" "}
            <span className="font-medium italic text-voice">
              vers plus de clarté
            </span>
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Un parcours fluide — de la première orientation jusqu’au suivi.
          </p>
        </Reveal>

        <Reveal className="mt-10" variant="fade">
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <div
              aria-hidden
              className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block"
            />

            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="relative px-0 text-center lg:px-6"
                >
                  <div className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full border border-border bg-background text-accent">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="mx-auto mt-6 block h-px w-10 bg-border lg:hidden"
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
