"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { faqItems } from "@/data/home";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = faqItems[activeIndex];

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* Left — questions as a conversation menu */}
          <div>
            <Reveal variant="fade">
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                FAQ
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Questions{" "}
                <span className="font-medium italic text-voice">
                  fréquentes
                </span>
              </h2>
              <p className="mt-3 max-w-sm text-base leading-7 text-muted">
                Choisissez une question — on vous répond comme dans une vraie
                conversation.
              </p>
            </Reveal>

            <Reveal variant="fade" className="mt-8">
              <ul className="flex flex-col gap-2">
                {faqItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={item.question}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all",
                          isActive
                            ? "border-accent/40 bg-accent-soft/60 text-foreground"
                            : "border-border bg-surface text-muted hover:border-accent/30 hover:bg-accent-soft/25 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-xs font-semibold tracking-[0.14em] transition-colors",
                            isActive ? "text-accent" : "text-muted-soft",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm font-medium tracking-tight sm:text-[0.95rem]">
                          {item.question}
                        </span>
                        <ArrowUpRight
                          className={cn(
                            "size-4 shrink-0 transition-all",
                            isActive
                              ? "text-accent opacity-100"
                              : "-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                          )}
                          aria-hidden
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Right — chat thread */}
          <Reveal variant="fade" delay={0.08}>
            <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-card)]">
              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
                <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-white">
                  L
                  <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-surface bg-success" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    Lov
                  </p>
                  <p className="text-xs text-muted">En ligne · répond vite</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-1 flex-col gap-4 px-5 py-6 sm:px-6 sm:py-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={transition.fast}
                    className="flex flex-col gap-4"
                  >
                    {/* Outgoing question bubble */}
                    <motion.div
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={transition.base}
                      className="flex justify-end"
                    >
                      <p className="max-w-[85%] rounded-[1.25rem] rounded-br-md bg-accent px-4 py-3 text-sm leading-6 text-white shadow-[0_12px_30px_-18px_rgba(254,81,16,0.7)]">
                        {active?.question}
                      </p>
                    </motion.div>

                    {/* Incoming answer bubble */}
                    <motion.div
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ ...transition.base, delay: 0.12 }}
                      className="flex items-end gap-2.5"
                    >
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground font-display text-[0.7rem] font-semibold text-background">
                        L
                      </span>
                      <p className="max-w-[85%] rounded-[1.25rem] rounded-bl-md bg-surface-muted px-4 py-3 text-sm leading-6 text-foreground">
                        {active?.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer CTA row */}
              <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="inline-flex items-center gap-2 text-xs text-muted">
                  <Check className="size-3.5 text-success" aria-hidden />
                  Une autre question ? On répond sous 24–48h.
                </p>
                <CtaButton href="/nous-contacter" size="sm">
                  Nous écrire
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
