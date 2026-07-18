"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { faqItems } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = faqItems[activeIndex] ?? faqItems[0];
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal variant="fade-scale">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[var(--radius-card)] border border-border">
              <Image
                src="/images/faq-calm.jpg"
                alt="Espace d’échange calme pour les familles"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <MessageCircleQuestion className="size-5" aria-hidden />
                </div>
                <h2 className="mt-4 max-w-sm font-display text-3xl font-semibold tracking-tight text-foreground">
                  Des réponses{" "}
                  <span className="font-display font-medium italic text-voice">
                    avant de démarrer
                  </span>
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                  Sélectionnez une question pour afficher la réponse. Besoin
                  d’un échange humain ?
                </p>
                <CtaButton href="/nous-contacter" size="sm" className="mt-5">
                  Nous écrire
                </CtaButton>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal variant="fade">
              <div className="flex flex-wrap gap-2">
                {faqItems.map((item, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-left text-sm font-medium transition-all",
                        selected
                          ? "border-accent bg-accent-soft text-accent"
                          : "border-border bg-background text-foreground/75 hover:border-accent/30 hover:text-foreground",
                      )}
                    >
                      {`0${index + 1}`}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.06} variant="fade">
              <div className="flex flex-col gap-2">
                {faqItems.map((item, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all sm:px-5",
                        selected
                          ? "border-accent/40 bg-accent-soft/50 text-foreground"
                          : "border-transparent bg-background text-muted hover:border-border hover:text-foreground",
                      )}
                    >
                      <span className="mr-3 font-display text-accent">
                        0{index + 1}
                      </span>
                      {item.question}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.1} variant="fade-scale" className="flex-1">
              <div className="h-full rounded-[var(--radius-card)] border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.question}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                      Réponse
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {active.question}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                      {active.answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
