"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";
import { cn } from "@/lib/utils";

export function AboutFaq() {
  const { faq } = about;
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container size="md">
        <Reveal className="text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {faq.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {faq.title}{" "}
            <span className="font-medium italic text-voice">
              {faq.titleAccent}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-10 flex flex-col border-y border-border">
          {faq.items.map((item, index) => {
            const selected = open === index;
            return (
              <li key={item.question} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(selected ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={selected}
                >
                  <span
                    className={cn(
                      "font-display text-lg font-semibold tracking-tight transition-colors",
                      selected ? "text-accent" : "text-foreground",
                    )}
                  >
                    {item.question}
                  </span>
                  <span className="mt-1 text-sm text-muted" aria-hidden>
                    {selected ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {selected ? (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
