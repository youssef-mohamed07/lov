"use client";

import {
  CalendarDays,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "Réservation",
    description: "Choisissez un créneau dans notre agenda en ligne.",
    icon: CalendarDays,
  },
  {
    title: "Évaluation",
    description: "Le bilan est réalisé en visio, depuis chez vous.",
    icon: ClipboardList,
  },
  {
    title: "Rééducation",
    description: "Objectifs clairs et adaptés pour progresser.",
    icon: TrendingUp,
  },
] as const;

export function HomeSteps() {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <Reveal variant="fade">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              Parcours
            </p>
            <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              3 étapes simples
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-10" variant="fade">
          <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-0">
            <div
              aria-hidden
              className="absolute top-5 right-[16.666%] left-[16.666%] hidden h-px bg-border sm:block"
            />

            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="relative px-0 text-center sm:px-6"
                >
                  <div className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[0_10px_24px_-14px_rgba(254,81,16,0.5)]">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <span className="mt-3 block font-display text-xs font-semibold tracking-[0.14em] text-muted-soft uppercase">
                    Étape {index + 1}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="mx-auto mt-6 block h-px w-10 bg-border sm:hidden"
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
