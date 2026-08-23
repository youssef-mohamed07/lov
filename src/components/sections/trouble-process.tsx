import {
  ClipboardList,
  MessageCircleMore,
  Route,
  TrendingUp,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Premier échange",
    description:
      "Vous nous expliquez ce que vous observez, les difficultés rencontrées et vos attentes.",
    icon: MessageCircleMore,
  },
  {
    title: "Bilan ciblé",
    description:
      "L’orthophoniste choisit les tests adaptés pour comprendre précisément le profil.",
    icon: ClipboardList,
  },
  {
    title: "Restitution claire",
    description:
      "Les résultats sont expliqués avec des mots simples, puis traduits en priorités concrètes.",
    icon: Route,
  },
  {
    title: "Accompagnement",
    description:
      "Des objectifs adaptés et des points réguliers permettent d’avancer dans la durée.",
    icon: TrendingUp,
  },
] as const;

type TroubleProcessProps = {
  troubleTitle: string;
};

export function TroubleProcess({ troubleTitle }: TroubleProcessProps) {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container>
        <Reveal variant="fade" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
            Le parcours
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Du premier échange aux{" "}
            <span className="mark-accent">progrès visibles</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Pour {troubleTitle.toLowerCase()}, chaque étape reste lisible, du
            premier rendez-vous à l’accompagnement.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <span
            aria-hidden
            className="absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-accent via-brand/45 to-accent lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-7 lg:space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const left = index % 2 === 0;

              return (
                <li
                  key={step.title}
                  className="relative grid grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]"
                >
                  <span className="relative z-10 col-start-1 row-start-1 inline-flex size-12 items-center justify-center rounded-full border-4 border-[#FFF8F3] bg-accent text-white shadow-[0_10px_28px_-14px_rgba(254,81,16,0.8)] lg:col-start-2 lg:justify-self-center">
                    <Icon className="size-4.5" aria-hidden />
                  </span>

                  <Reveal
                    delay={index * 0.08}
                    variant={left ? "left" : "right"}
                    className={cn(
                      "col-start-2 row-start-1 min-w-0 pb-2 lg:pb-8",
                      left
                        ? "lg:col-start-1 lg:pr-2"
                        : "lg:col-start-3 lg:pl-2",
                    )}
                  >
                    <article
                      className={cn(
                        "group relative min-h-[170px] overflow-hidden rounded-[1.35rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35",
                        left ? "lg:text-right" : "lg:text-left",
                      )}
                    >
                      <span className="font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                        Étape {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                        {step.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
