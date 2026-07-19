"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { faqItems } from "@/data/home";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function HomeFaq() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal className="mx-auto mb-8 max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            FAQ
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions{" "}
            <span className="font-medium italic text-voice">fréquentes</span>
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Survolez une question pour afficher la réponse.
          </p>
        </Reveal>

        <Reveal variant="fade">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.5rem] border border-border bg-surface">
            {faqItems.map((item, index) => {
              const open = index === activeIndex;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    open && "bg-surface-muted/70",
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocusCapture={() => setActiveIndex(index)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={cn(
                        "font-display text-xs font-semibold tracking-[0.14em]",
                        open ? "text-accent" : "text-muted-soft",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-base font-medium tracking-tight transition-colors",
                        open ? "text-foreground" : "text-muted",
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        open
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-muted text-muted",
                      )}
                    >
                      {open ? (
                        <Minus className="size-4" aria-hidden />
                      ) : (
                        <Plus className="size-4" aria-hidden />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={
                          reduceMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduceMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-7 text-muted sm:px-6 sm:pl-[3.75rem] sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex justify-center" variant="fade">
          <CtaButton size="sm">
            Nous écrire
          </CtaButton>
        </Reveal>
      </Container>
    </section>
  );
}
