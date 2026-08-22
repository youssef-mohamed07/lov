import { FolderOpen, ListChecks, Users, Video } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const community = ["A", "M", "S", "L", "N", "C"];

export function HomeBento() {
  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(14,14,15,0.07)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      <Container className="relative">
        <Reveal className="mx-auto mb-[var(--space-10)] max-w-2xl text-center" variant="fade">
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-brand uppercase">
            Votre espace LOV
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Une plateforme pensée pour{" "}
            <span className="mark-accent">simplifier votre suivi</span>
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Reveal variant="fade-scale" className="overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-36px_rgba(14,14,15,0.45)]">
                <Image
                  src="/images/hero-child.jpg"
                  alt="Enfant concentré pendant une activité de langage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.06} variant="fade-scale" className="flex-1">
              <article className="flex h-full flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(14,14,15,0.4)]">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                  <FolderOpen className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  Votre espace personnel
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Retrouvez vos rendez-vous, comptes-rendus et échanges avec
                  l’orthophoniste, réunis au même endroit.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.08} variant="fade-scale" className="h-full">
            <article className="flex h-full min-h-[420px] flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(14,14,15,0.4)] lg:min-h-0">
              <div className="relative mx-auto flex aspect-square w-full max-w-[280px] flex-1 items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-[8%] rounded-full border border-dashed border-border"
                />
                <div
                  aria-hidden
                  className="absolute inset-[22%] rounded-full border border-dashed border-border/80"
                />

                <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[var(--shadow-card)]">
                  <Users className="size-8" aria-hidden />
                </div>

                {community.map((initial, index) => {
                  const angle = (index / community.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  return (
                    <span
                      key={initial + index}
                      className={cn(
                        "absolute z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-surface text-xs font-semibold shadow-sm",
                        index % 2 === 0
                          ? "bg-accent text-accent-foreground"
                          : "bg-accent-soft text-accent",
                      )}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {initial}
                    </span>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                  <ListChecks className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  Un suivi qui reste lisible
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Historique des séances, objectifs partagés et prochaines
                  étapes toujours visibles.
                </p>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.1} variant="fade-scale" className="flex-1">
              <article className="flex h-full flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(14,14,15,0.4)]">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                  <Video className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  Des séances en visio, sans complication
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Une connexion simple, pour se concentrer sur l’essentiel de
                  la séance.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.14} variant="fade-scale">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-36px_rgba(14,14,15,0.45)]">
                <Image
                  src="/images/hero-therapist.jpg"
                  alt="Professionnel préparant un accompagnement orthophonique"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
