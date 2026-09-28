"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { getTrouble } from "@/data/troubles";

const services = [
  { slug: "dyslexie" },
  { slug: "retard-parole-langage" },
  { slug: "begaiement" },
  { slug: "dyscalculie" },
  { slug: "fonctions-oro-myo-faciales" },
  { slug: "oralite-alimentaire" },
] as const;

export function HomeServicesGrid() {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container>
        <Reveal
          className="mb-[var(--space-10)] flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
          variant="fade"
        >
          <div>
            <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-brand uppercase">
              Spécialités
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Des accompagnements{" "}
              <span className="font-medium italic text-voice">
                adaptés à chaque besoin
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted lg:pb-1.5 lg:text-right">
            Six motifs fréquents — chacun avec un parcours pensé pour lui.
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const trouble = getTrouble(service.slug);
            if (!trouble) return null;

            return (
              <Reveal
                key={service.slug}
                delay={(index % 3) * 0.07}
                variant="fade"
                className="h-full"
              >
                <li className="h-full">
                  <Link
                    href={`/troubles/${trouble.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors hover:border-brand/30 sm:p-6"
                  >
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {trouble.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm leading-6 text-muted">
                      {trouble.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-brand underline-offset-4 group-hover:underline">
                      En savoir plus
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
