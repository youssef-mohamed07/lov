"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { pricingPlans } from "@/data/home";
import { cn } from "@/lib/utils";

export function HomePricing() {
  const [activeId, setActiveId] = useState(
    pricingPlans.find((plan) => "highlighted" in plan && plan.highlighted)?.id ??
      pricingPlans[0].id,
  );
  const active =
    pricingPlans.find((plan) => plan.id === activeId) ?? pricingPlans[0];
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto mb-[var(--space-10)] max-w-2xl text-center" variant="fade">
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-accent uppercase">
            Tarifs
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Choisissez le rythme{" "}
            <span className="font-display font-medium italic text-voice">
              qui vous convient
            </span>
          </h2>
          <p className="mt-[var(--space-4)] text-base leading-7 text-muted sm:text-lg">
            Séance, bilan ou suivi — sélectionnez une formule pour voir le
            détail.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal variant="fade-scale">
            <div className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card)] lg:min-h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                  {"badge" in active && active.badge ? active.badge : "Formule"}
                </p>
                <div className="mt-2 flex flex-wrap items-end gap-2">
                  <p className="font-display text-5xl font-semibold tracking-tight text-foreground">
                    {active.price}
                  </p>
                  <p className="pb-1 text-sm text-muted">{active.period}</p>
                </div>
                <p className="mt-2 max-w-md text-sm leading-6 text-foreground/80">
                  {active.description}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {pricingPlans.map((plan, index) => {
              const selected = plan.id === active.id;
              return (
                <Reveal key={plan.id} delay={index * 0.06} variant="fade">
                  <button
                    type="button"
                    onClick={() => setActiveId(plan.id)}
                    className={cn(
                      "w-full rounded-[1.35rem] border p-5 text-left transition-all duration-300 sm:p-6",
                      selected
                        ? "border-accent bg-accent-soft/60 shadow-[var(--shadow-card)]"
                        : "border-border bg-surface hover:border-accent/30 hover:bg-background",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {plan.name}
                          </h3>
                          {"badge" in plan && plan.badge ? (
                            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                              {plan.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {plan.description}
                        </p>
                      </div>
                      <p className="shrink-0 font-display text-2xl font-semibold tracking-tight text-foreground">
                        {plan.price}
                      </p>
                    </div>

                    <AnimatePresence initial={false}>
                      {selected ? (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 flex flex-col gap-2 border-t border-border/80 pt-4">
                            {plan.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-sm text-foreground"
                              >
                                <Check
                                  className="size-4 shrink-0 text-accent"
                                  aria-hidden
                                />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <span
                            className="mt-5 inline-block"
                            onClick={(event) => event.stopPropagation()}
                            onKeyDown={(event) => event.stopPropagation()}
                          >
                            <CtaButton href={plan.ctaHref} size="sm">
                              {plan.ctaLabel}
                            </CtaButton>
                          </span>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
