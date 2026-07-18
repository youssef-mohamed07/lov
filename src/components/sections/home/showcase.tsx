"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, Target, Trophy } from "lucide-react";
import Image from "next/image";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: BookOpen,
    title: "Ressources claires",
    description:
      "Des pages et outils pour comprendre les troubles et les parcours d’orthophonie.",
  },
  {
    icon: Trophy,
    title: "18+ orthophonistes",
    description:
      "Des cliniciens expérimentés, formés et engagés auprès des familles.",
  },
] as const;

export function HomeShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <div className="grid items-center gap-[var(--space-12)] lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fade-scale" className="relative">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/showcase-family.jpg"
                alt="Échange entre une famille et un professionnel autour d’un bilan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <motion.div
              className="absolute top-5 left-5 rounded-2xl bg-accent-soft px-4 py-3 shadow-[0_16px_40px_-20px_rgba(26,43,60,0.45)] sm:top-7 sm:left-7 sm:px-5 sm:py-4"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <p className="text-xs text-foreground/70">Bilans réalisés</p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                2 400
              </p>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2 rounded-full bg-surface px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(26,43,60,0.5)] sm:right-6 sm:px-4"
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Target className="size-3.5" aria-hidden />
              </span>
              <p className="max-w-[10.5rem] text-xs font-medium leading-snug text-foreground sm:max-w-none sm:text-sm">
                340 familles orientées ce mois
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-5 left-5 flex max-w-[85%] items-center gap-2 rounded-full bg-surface px-3.5 py-2.5 shadow-[0_16px_40px_-18px_rgba(26,43,60,0.5)] sm:bottom-7 sm:left-7 sm:px-4"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 7, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Heart className="size-3.5 fill-accent" aria-hidden />
              </span>
              <p className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                Pensé pour les familles, clair dès le premier pas
              </p>
            </motion.div>
          </Reveal>

          <FadeStagger className="max-w-xl">
            <FadeItem>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                <span className="block">Un parcours clair,</span>
                <span className="mt-1 block font-display text-[1.05em] font-medium italic text-voice">
                  des possibilités concrètes
                </span>
              </h2>
            </FadeItem>

            <FadeItem className="mt-[var(--space-5)]">
              <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Lov aide les familles et les adultes à comprendre le langage, la
                parole et les apprentissages — puis à choisir le bon format :
                simulateur, bilan orthophonique ou suivi.
              </p>
            </FadeItem>

            <FadeItem className="mt-[var(--space-8)]">
              <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title}>
                      <div className="inline-flex size-11 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <h3 className="mt-[var(--space-4)] text-base font-semibold tracking-tight text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-[var(--space-2)] text-sm leading-6 text-muted">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </FadeItem>
          </FadeStagger>
        </div>
      </Container>
    </section>
  );
}
