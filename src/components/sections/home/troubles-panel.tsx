"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Check,
  Ear,
  MessageCircle,
  Mic2,
  PencilLine,
  Calculator,
  AudioLines,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { troubles, type Trouble } from "@/data/troubles";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof BookOpen> = {
  dyslexie: BookOpen,
  "retard-parole-langage": MessageCircle,
  begaiement: Mic2,
  dysorthographie: PencilLine,
  dyscalculie: Calculator,
  articulation: AudioLines,
  dysphasie: Ear,
  voix: Mic2,
};

const featuredSlugs = [
  "dyslexie",
  "retard-parole-langage",
  "begaiement",
  "dysorthographie",
] as const;

export function HomeTroublesPanel() {
  const items = useMemo(
    () =>
      featuredSlugs
        .map((slug) => troubles.find((trouble) => trouble.slug === slug))
        .filter(Boolean) as Trouble[],
    [],
  );

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "dyslexie");
  const active = items.find((item) => item.slug === activeSlug) ?? items[0];
  const reduceMotion = useReducedMotion();

  if (!active) return null;

  const ActiveIcon = iconMap[active.slug] ?? BookOpen;

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal
          className="mx-auto mb-[var(--space-10)] max-w-2xl text-center"
          variant="up"
        >
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-accent uppercase">
            Troubles
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Choisissez un trouble,{" "}
            <span className="font-display font-medium italic text-voice">
              explorez le parcours
            </span>
          </h2>
        </Reveal>

        <div className="grid items-start gap-[var(--space-5)] lg:grid-cols-[minmax(240px,0.85fr)_1.45fr] lg:gap-6">
          <Reveal variant="left">
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-3 shadow-[var(--shadow-card)] sm:p-4 lg:sticky lg:top-[calc(var(--header-height)+1rem)]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                Départements
              </div>

              <ul
                className="flex flex-col gap-2"
                role="tablist"
                aria-label="Troubles"
              >
                {items.map((item) => {
                  const Icon = iconMap[item.slug] ?? BookOpen;
                  const selected = item.slug === active.slug;
                  return (
                    <li key={item.slug}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveSlug(item.slug)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-colors duration-200",
                          selected
                            ? "bg-accent-soft text-accent"
                            : "text-foreground hover:bg-background",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                            selected
                              ? "bg-accent text-accent-foreground"
                              : "bg-surface-muted text-muted",
                          )}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        {item.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} variant="right">
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  role="tabpanel"
                >
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[2/1]">
                    <Image
                      src={active.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"
                    />
                    <div className="absolute bottom-4 left-4 inline-flex size-12 items-center justify-center rounded-2xl bg-surface text-accent shadow-[var(--shadow-card)]">
                      <ActiveIcon className="size-5" aria-hidden />
                    </div>
                  </div>

                  <div className="flex flex-col p-6 sm:p-8">
                    <h3 className="max-w-lg font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                      {active.overview}
                    </p>

                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {active.signs.slice(0, 4).map((sign, index) => (
                        <motion.li
                          key={sign}
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 10 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.06 + index * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-start gap-2.5 rounded-2xl bg-background px-4 py-3 text-sm text-foreground"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          <span>{sign}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <CtaButton href={`/troubles/${active.slug}`} size="md">
                        Voir le détail du trouble
                      </CtaButton>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
