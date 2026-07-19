"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const words = [
  { label: "Écouter", delay: 0, arc: -28 },
  { label: "Nommer", delay: 1.6, arc: 10 },
  { label: "Répéter", delay: 3.2, arc: -18 },
  { label: "Comprendre", delay: 4.8, arc: 22 },
] as const;

/** Origin at the orthophoniste’s mouth (left panel, full stage %). */
const MOUTH = { left: "29.5%", top: "56%" } as const;

const CYCLE = 3.6;
const REPEAT_DELAY = 4.2;

export function HomeDialogue() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [travelX, setTravelX] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      const next = Math.round(stage.clientWidth * 0.42);
      setTravelX((current) => (current === next ? current : next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const ready = travelX > 0;

  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal className="mx-auto mb-8 max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            La relation thérapeutique
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Du clinicien à l’enfant,{" "}
            <span className="font-medium italic text-voice">
              des mots qui circulent
            </span>
          </h2>
        </Reveal>

        <Reveal variant="fade">
          <div
            ref={stageRef}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-border bg-surface"
          >
            <div className="grid min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] lg:grid-cols-2">
              <div className="relative min-h-[260px] border-b border-border lg:border-r lg:border-b-0">
                <Image
                  src="/images/dialogue-therapist.jpg"
                  alt="Orthophoniste"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[50%_18%]"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
                />
                <p className="absolute bottom-4 left-4 rounded-full border border-border/50 bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  Orthophoniste
                </p>
              </div>

              <div className="relative min-h-[260px]">
                <Image
                  src="/images/dialogue-child.jpg"
                  alt="Enfant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[48%_12%]"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
                />
                <p className="absolute right-4 bottom-4 rounded-full border border-border/50 bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                  Enfant
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
            >
              {ready && !reduceMotion ? (
                <span
                  className="absolute"
                  style={{
                    left: MOUTH.left,
                    top: MOUTH.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.span
                    className="block size-3 rounded-full bg-accent"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </span>
              ) : null}

              {ready
                ? words.map((word) => (
                    <span
                      key={`${word.label}-${travelX}`}
                      className="absolute"
                      style={{
                        left: MOUTH.left,
                        top: MOUTH.top,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.div
                        className="relative w-max"
                        initial={{
                          opacity: 0,
                          scale: 0.35,
                          x: 0,
                          y: 6,
                          rotate: -6,
                        }}
                        animate={
                          reduceMotion
                            ? {
                                opacity: 0.95,
                                x: travelX * 0.5,
                                y: -10,
                                scale: 1,
                                rotate: 0,
                              }
                            : {
                                opacity: [0, 1, 1, 0],
                                scale: [0.35, 1.06, 1, 0.9],
                                x: [0, travelX * 0.35, travelX * 0.72, travelX],
                                y: [6, word.arc, word.arc * 0.4, -20],
                                rotate: [-6, word.arc > 0 ? 3 : -3, 0, 2],
                              }
                        }
                        transition={
                          reduceMotion
                            ? { duration: 0.4 }
                            : {
                                duration: CYCLE,
                                delay: word.delay,
                                repeat: Infinity,
                                repeatDelay: REPEAT_DELAY,
                                ease: [0.22, 1, 0.36, 1],
                                times: [0, 0.18, 0.7, 1],
                              }
                        }
                      >
                        <div className="rounded-2xl border border-border bg-surface px-4 py-2.5 shadow-[0_16px_40px_-20px_rgba(14,14,15,0.55)]">
                          <div className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-accent" />
                            <span className="text-sm font-semibold tracking-tight text-foreground">
                              {word.label}
                            </span>
                          </div>
                        </div>
                        <span className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 border-b border-l border-border bg-surface" />
                      </motion.div>
                    </span>
                  ))
                : null}
            </div>

            <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
              <div className="flex flex-wrap justify-center gap-2">
                {words.map((word, index) => (
                  <motion.span
                    key={word.label}
                    className="rounded-2xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground"
                    initial={reduceMotion ? false : { opacity: 0.35, y: 6 }}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.35, 1, 1, 0.35],
                            y: [6, 0, 0, 6],
                            scale: [0.96, 1.04, 1, 0.96],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 2.4,
                            delay: index * 0.55,
                            repeat: Infinity,
                            repeatDelay: 1.8,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.7, 1],
                          }
                    }
                  >
                    {word.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-sm leading-7 text-muted sm:text-base">
            Un échange clair, patient et guidé — pour que chaque mot trouve sa
            place, de la voix du clinicien jusqu’à celle de l’enfant.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
