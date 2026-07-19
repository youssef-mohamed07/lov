"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, Target, Trophy } from "lucide-react";
import Image from "next/image";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { easeOutExpo } from "@/lib/motion";

const features = [
  {
    icon: BookOpen,
    title: "Ressources claires",
    description:
      "Des pages et outils pour comprendre les troubles et les parcours.",
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
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal variant="fade-scale" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/showcase-family.jpg"
                alt="Échange entre une famille et un professionnel autour d’un bilan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent"
              />
            </div>

            <motion.div
              className="absolute top-4 left-4 rounded-2xl border border-border/60 bg-surface/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-sm sm:top-6 sm:left-6 sm:px-5 sm:py-4"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                Bilans réalisés
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                2 400
                <span className="text-accent">+</span>
              </p>
            </motion.div>

            <motion.div
              className="absolute top-[42%] right-3 flex max-w-[11.5rem] items-center gap-2.5 rounded-full border border-border/60 bg-surface/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur-sm sm:right-5 sm:max-w-none sm:px-3.5 sm:py-2.5"
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45, ease: easeOutExpo }}
            >
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Target className="size-3.5" aria-hidden />
              </span>
              <p className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                340 familles orientées ce mois
              </p>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-4 flex max-w-[90%] items-center gap-2.5 rounded-full border border-border/60 bg-surface/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur-sm sm:bottom-6 sm:left-6 sm:px-3.5 sm:py-2.5"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.45, ease: easeOutExpo }}
            >
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Heart className="size-3.5 fill-accent" aria-hidden />
              </span>
              <p className="text-xs font-medium leading-snug text-foreground sm:text-sm">
                Pensé pour les familles, clair dès le premier pas
              </p>
            </motion.div>
          </Reveal>

          <FadeStagger className="max-w-xl">
            <FadeItem>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Pourquoi Lov
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                <span className="block">Un parcours clair,</span>
                <span className="mt-1 block font-medium italic text-voice">
                  des possibilités concrètes
                </span>
              </h2>
            </FadeItem>

            <FadeItem className="mt-4">
              <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Lov aide les familles et les adultes à comprendre le langage, la
                parole et les apprentissages — puis à choisir le bon format :
                simulateur, bilan ou suivi.
              </p>
            </FadeItem>

            <FadeItem className="mt-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-border bg-surface px-4 py-4 transition-colors hover:border-foreground/15"
                    >
                      <div className="inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="size-4" aria-hidden />
                      </div>
                      <h3 className="mt-3 text-sm font-semibold tracking-tight text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </FadeItem>

            <FadeItem className="mt-7">
              <CtaButton size="sm">
                Découvrir le bilan
              </CtaButton>
            </FadeItem>
          </FadeStagger>
        </div>
      </Container>
    </section>
  );
}
