"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { pricingPlans } from "@/data/home";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomePricing() {
  const reduceMotion = useReducedMotion();
  const defaultId =
    pricingPlans.find((plan) => "highlighted" in plan && plan.highlighted)?.id ??
    pricingPlans[0].id;
  const [activeId, setActiveId] = useState(defaultId);

  const active =
    pricingPlans.find((plan) => plan.id === activeId) ?? pricingPlans[0];

  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-md)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_115%,var(--accent-soft),transparent_60%)] opacity-70"
      />

      <Container className="relative">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            Tarifs
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Combien ça{" "}
            <span className="font-medium italic text-voice">coûte ?</span>
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Trois formules. Un prix affiché. Aucune surprise.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-4xl" variant="fade">
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-[var(--shadow-card)]">
            {/* Plan switcher */}
            <div
              role="tablist"
              aria-label="Choisir une formule"
              className="flex gap-px overflow-x-auto border-b border-border bg-border sm:grid sm:grid-cols-3 sm:overflow-visible"
            >
              {pricingPlans.map((plan) => {
                const selected = plan.id === activeId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(plan.id)}
                    onMouseEnter={() => {
                      if (
                        !reduceMotion &&
                        window.matchMedia("(hover: hover)").matches
                      ) {
                        setActiveId(plan.id);
                      }
                    }}
                    className={cn(
                      "relative min-h-[5.5rem] min-w-[7.5rem] flex-1 px-3 pt-7 pb-4 text-center transition-colors sm:min-w-0 sm:px-6 sm:pt-9 sm:pb-6",
                      selected
                        ? "bg-foreground text-background"
                        : "bg-surface text-muted hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {"badge" in plan && plan.badge ? (
                      <span
                        className={cn(
                          "absolute top-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide whitespace-nowrap",
                          selected
                            ? "bg-accent text-accent-foreground"
                            : "bg-accent-soft text-accent",
                        )}
                      >
                        Populaire
                      </span>
                    ) : null}

                    <span
                      className={cn(
                        "block font-display text-xl font-semibold tracking-tight sm:text-[2rem]",
                        selected ? "text-background" : "text-foreground",
                      )}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs font-medium sm:text-sm",
                        selected ? "text-background/65" : "text-muted",
                      )}
                    >
                      {plan.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active plan detail */}
            <div className="grid lg:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-[240px] lg:min-h-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 1.03 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.image}
                      alt={active.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface/80"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 lg:hidden">
                      <p className="font-display text-3xl font-semibold text-background">
                        {active.price}
                      </p>
                      <p className="mt-0.5 text-sm text-background/75">
                        {active.name} {active.period}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 14, filter: "blur(4px)" }
                    }
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { opacity: 0, y: -10, filter: "blur(4px)" }
                    }
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  >
                    <div className="hidden items-baseline gap-3 lg:flex">
                      <p className="font-display text-4xl font-semibold tracking-tight text-foreground">
                        {active.price}
                      </p>
                      <p className="text-sm text-muted">
                        {active.name} {active.period}
                      </p>
                    </div>

                    <h3 className="sr-only">{active.name}</h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7 lg:mt-4">
                      {active.description}
                    </p>

                    <ul className="mt-6 flex flex-col gap-3">
                      {active.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={
                            reduceMotion ? false : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.05 + index * 0.05,
                            duration: 0.3,
                            ease: easeOutExpo,
                          }}
                          className="flex items-center gap-3 text-sm text-foreground"
                        >
                          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                            <Check className="size-3.5 text-accent" aria-hidden />
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <CtaButton size="md">{active.ctaLabel}</CtaButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
