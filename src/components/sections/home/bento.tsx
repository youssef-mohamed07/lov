import {
  Activity,
  BellRing,
  CalendarDays,
  ClipboardCheck,
  FileText,
  MessagesSquare,
} from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const features = [
  {
    title: "Agenda en ligne",
    description:
      "Choisissez un créneau en quelques clics, à l’heure qui vous arrange.",
    icon: CalendarDays,
    tone: "bg-accent-soft text-accent",
  },
  {
    title: "Rappels automatiques",
    description:
      "Un message avant chaque rendez-vous, pour ne rien manquer.",
    icon: BellRing,
    tone: "bg-brand-soft text-brand",
  },
  {
    title: "Comptes-rendus",
    description:
      "Retrouvez le compte-rendu de chaque séance dans votre espace, dès qu’il est prêt.",
    icon: FileText,
    tone: "bg-accent-soft text-accent",
  },
  {
    title: "Exercices personnalisés",
    description:
      "Des activités choisies par l’orthophoniste, à faire entre les séances.",
    icon: ClipboardCheck,
    tone: "bg-brand-soft text-brand",
  },
  {
    title: "Mesurer pour mieux progresser",
    description:
      "Un point régulier sur l’évolution de votre enfant, à partager avec l’école si besoin.",
    icon: Activity,
    tone: "bg-accent-soft text-accent",
  },
  {
    title: "Messagerie sécurisée",
    description:
      "Une question entre deux séances ? Échangez directement avec l’orthophoniste.",
    icon: MessagesSquare,
    tone: "bg-brand-soft text-brand",
  },
] as const;

const defaultTitle = (
  <>
    De la prise de rendez-vous au compte-rendu,{" "}
    <span className="mark-accent">tout est simplifié</span>
  </>
);

type HomeBentoProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  items?: ReadonlyArray<{ title: string; description: string }>;
};

export function HomeBento({
  eyebrow = "La plateforme",
  title = defaultTitle,
  description = "Chaque étape de votre parcours se passe au même endroit, sans jongler entre plusieurs outils.",
  items,
}: HomeBentoProps = {}) {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal variant="fade" className="lg:sticky lg:top-28">
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </p>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const content = items?.[index] ?? feature;
              return (
                <li key={content.title}>
                  <Reveal
                    delay={(index % 2) * 0.05}
                    variant="fade-scale"
                    className="h-full"
                  >
                    <article className="group flex h-full min-h-[168px] flex-col rounded-[1.35rem] border border-border bg-surface p-5 transition-colors hover:border-accent/30 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ${feature.tone}`}
                        >
                          <Icon className="size-[1.125rem]" aria-hidden />
                        </span>
                        <span className="font-display text-xs font-semibold tabular-nums text-muted-soft">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                        {content.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {content.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
