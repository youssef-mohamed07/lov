"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { easeOutExpo } from "@/lib/motion";

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
                <span className="text-accent">+</span>400
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
                Un accompagnement humain, pensé pour durer.
              </p>
            </motion.div>
          </Reveal>

          <FadeStagger className="max-w-xl">
            <FadeItem>
              <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
                Pourquoi nous faire confiance ?
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Du bilan à la rééducation depuis chez vous, une autre façon de
                procéder
              </h2>
            </FadeItem>

            <FadeItem className="mt-4">
              <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Notre cabinet en ligne vous accompagne à chaque étape, depuis
                chez vous, pour soutenir le langage et les apprentissages de
                votre enfant.
              </p>
            </FadeItem>

            <FadeItem className="mt-7">
              <CtaButton href="/demander-un-bilan" size="lg">
                Prendre rendez-vous
              </CtaButton>
            </FadeItem>
          </FadeStagger>
        </div>
      </Container>
    </section>
  );
}
