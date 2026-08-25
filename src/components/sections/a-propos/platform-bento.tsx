import {
  Activity,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  MessagesSquare,
  PencilLine,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const orbitIcons = [
  MessagesSquare,
  ClipboardCheck,
  FileText,
  Activity,
  CalendarDays,
  Users,
] as const;

export function AboutPlatformBento() {
  return (
    <section
      id="pourquoi-lov"
      className="relative scroll-mt-28 overflow-hidden bg-background py-[var(--section-space-lg)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(26,43,60,0.08)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <Container className="relative">
        <Reveal className="mx-auto mb-[var(--space-10)] max-w-2xl text-center" variant="fade">
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-brand uppercase">
            Écosystème bienveillant
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Nous avons conçu un espace pensé{" "}
            <span className="mark-accent">pour votre suivi</span>
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Reveal variant="fade-scale" className="overflow-hidden rounded-[1.5rem]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-36px_rgba(26,43,60,0.45)]">
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
              <article className="flex h-full flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(26,43,60,0.4)]">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  400 bilans réalisés
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Des évaluations structurées pour clarifier le profil et ouvrir des pistes concrètes.
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.08} variant="fade-scale" className="h-full">
            <article className="flex h-full min-h-[420px] flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(26,43,60,0.4)] lg:min-h-0">
              <div className="relative mx-auto flex aspect-square w-full max-w-[280px] flex-1 items-center justify-center">
                <div aria-hidden className="absolute inset-[8%] rounded-full border border-dashed border-border" />
                <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-border/80" />

                <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[var(--shadow-card)]">
                  <Users className="size-8" aria-hidden />
                </div>

                {orbitIcons.map((Icon, index) => {
                  const angle = (index / orbitIcons.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 42;
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 50 + Math.sin(angle) * radius;
                  return (
                    <span
                      key={`orbit-${index}`}
                      className={cn(
                        "absolute z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-surface shadow-sm",
                        index % 2 === 0
                          ? "bg-accent text-accent-foreground"
                          : "bg-accent-soft text-accent",
                      )}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                  );
                })}
              </div>

              <div className="mt-6">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Users className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  Un espace pensé pour simplifier votre suivi
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Rendez-vous, comptes-rendus, exercices entre les séances et échanges avec l&apos;orthophoniste : tout votre suivi se retrouve au même endroit, simple à consulter à tout moment.
                </p>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={0.1} variant="fade-scale" className="flex-1">
              <article className="flex h-full flex-col rounded-[1.5rem] bg-surface p-7 shadow-[0_18px_50px_-36px_rgba(26,43,60,0.4)]">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <PencilLine className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  Notre approche
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Un accompagnement professionnel, clair et bienveillant, avec des étapes visibles et des repères concrets à chaque moment du parcours.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.14} variant="fade-scale">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_-36px_rgba(26,43,60,0.45)]">
                <Image
                  src="/images/hero-therapist.jpg"
                  alt="Professionnelle préparant un accompagnement orthophonique"
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
