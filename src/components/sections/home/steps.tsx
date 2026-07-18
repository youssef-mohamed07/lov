"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    title: "S’orienter",
    description: "Clarifiez le besoin avec le simulateur, en quelques minutes.",
    image: "/images/step-orient.jpg",
  },
  {
    step: "02",
    title: "Réserver",
    description: "Choisissez un créneau et préparez le motif simplement.",
    image: "/images/step-booking.jpg",
  },
  {
    step: "03",
    title: "Évaluation",
    description: "Un bilan orthophonique précis, adapté à l’âge et au besoin.",
    image: "/images/step-eval.jpg",
  },
  {
    step: "04",
    title: "Suivi",
    description: "Des objectifs partagés et des progrès visibles, ensemble.",
    image: "/images/step-followup.jpg",
  },
] as const;

export function HomeSteps() {
  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-accent uppercase">
            Parcours
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Des étapes simples{" "}
            <span className="font-medium italic text-voice">
              vers plus de clarté
            </span>
          </h2>
          <p className="mt-[var(--space-4)] text-base leading-7 text-muted sm:text-lg">
            Un parcours fluide — de la première orientation jusqu’au suivi.
          </p>
        </Reveal>

        <Reveal delay={0.08} variant="fade" className="mt-[var(--section-space-sm)]">
          <ol className="overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[var(--shadow-card)] lg:grid lg:grid-cols-4">
            {steps.map((item, index) => {
              const last = index === steps.length - 1;

              return (
                <li
                  key={item.step}
                  className={cn(
                    "relative",
                    !last && "border-b border-border lg:border-r lg:border-b-0",
                  )}
                >
                  <article className="relative flex min-h-[280px] flex-col justify-end sm:min-h-[300px] lg:min-h-[360px]">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
                    />

                    {/* Connector toward next step */}
                    {!last ? (
                      <span
                        aria-hidden
                        className="absolute top-1/2 right-0 z-20 hidden size-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-sm lg:inline-flex"
                      >
                        <ArrowRight className="size-3.5" />
                      </span>
                    ) : null}

                    <div className="relative z-10 flex flex-col p-5 sm:p-6">
                      <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white backdrop-blur-md">
                        <span className="font-display text-sm tracking-normal">
                          {item.step}
                        </span>
                        <span className="h-3 w-px bg-white/35" aria-hidden />
                        Étape
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/85">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
