"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { expertiseItems } from "@/data/home";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const images = [
  "/images/expertise-pedagogy.jpg",
  "/images/expertise-listening.jpg",
  "/images/expertise-follow.jpg",
] as const;

export function HomeExpertise() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(1);

  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal className="mx-auto mb-8 max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            Savoir-faire
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Une clinique au service de{" "}
            <span className="font-medium italic text-voice">la clarté</span>
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            Explorez chaque intention — preuve, écoute, suivi.
          </p>
        </Reveal>

        <Reveal variant="fade">
          <div
            className="flex h-[380px] gap-2 sm:h-[460px] sm:gap-3"
            onMouseLeave={() => {
              if (!reduceMotion) setActive(1);
            }}
          >
            {expertiseItems.map((item, index) => {
              const selected = index === active;

              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  animate={{
                    flexGrow: selected ? 2.4 : 1,
                  }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="relative min-w-0 overflow-hidden rounded-[1.35rem] text-left"
                  style={{ flexBasis: 0 }}
                  aria-pressed={selected}
                >
                  <Image
                    src={images[index] ?? images[0]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 60vw, 45vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      selected ? "scale-105" : "scale-100",
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 transition-colors duration-500",
                      selected
                        ? "bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent"
                        : "bg-foreground/60",
                    )}
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={cn(
                        "mt-2 font-display font-semibold tracking-tight text-background transition-all duration-300",
                        selected
                          ? "text-xl sm:text-2xl"
                          : "truncate text-sm sm:text-base",
                      )}
                    >
                      {item.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {selected ? (
                        <motion.p
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 10 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            reduceMotion
                              ? undefined
                              : { opacity: 0, y: 6 }
                          }
                          transition={{ duration: 0.3, ease: easeOutExpo }}
                          className="mt-2 max-w-sm text-sm leading-6 text-background/75"
                        >
                          {item.description}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
