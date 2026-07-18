"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const words = [
  { label: "Écouter", delay: 0, arc: -22 },
  { label: "Nommer", delay: 1.4, arc: 16 },
  { label: "Répéter", delay: 2.8, arc: -12 },
  { label: "Comprendre", delay: 4.2, arc: 20 },
  { label: "Prononcer", delay: 5.6, arc: -18 },
  { label: "Progresser", delay: 7, arc: 10 },
] as const;

/** Origin near the orthophoniste’s mouth (left panel). */
const MOUTH = { left: "31%", top: "52%" } as const;

export function HomeDialogue() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [travelX, setTravelX] = useState(360);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => setTravelX(stage.clientWidth * 0.4);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(26,43,60,0.08)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <Container className="relative">
        <Reveal className="mx-auto mb-[var(--space-10)] max-w-2xl text-center" variant="fade">
          <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-accent uppercase">
            La relation thérapeutique
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Du clinicien à l’enfant,{" "}
            <span className="font-medium italic text-voice">
              des mots qui circulent
            </span>
          </h2>
        </Reveal>

        <Reveal variant="fade">
          <div
            ref={stageRef}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[var(--shadow-card)]"
          >
            <div className="grid min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] lg:grid-cols-2">
              <div className="relative min-h-[280px] border-b border-border lg:border-r lg:border-b-0">
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
                  className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent"
                />
                <p className="absolute bottom-4 left-4 rounded-full bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm sm:bottom-5 sm:left-5">
                  Orthophoniste
                </p>
              </div>

              <div className="relative min-h-[280px]">
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
                  className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent"
                />
                <p className="absolute right-4 bottom-4 rounded-full bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm sm:right-5 sm:bottom-5">
                  Enfant
                </p>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
            >
              {/* Voice pulse at the mouth */}
              {!reduceMotion ? (
                <span
                  className="absolute"
                  style={{
                    left: MOUTH.left,
                    top: MOUTH.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.span
                    className="block size-2.5 rounded-full bg-accent/50"
                    animate={{ scale: [1, 2.8, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </span>
              ) : null}

              {words.map((word) => (
                <span
                  key={word.label}
                  className="absolute"
                  style={{
                    left: MOUTH.left,
                    top: MOUTH.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.span
                    className="inline-flex w-max shrink-0 items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-foreground shadow-[0_14px_34px_-18px_rgba(26,43,60,0.55)]"
                    initial={false}
                    animate={
                      reduceMotion
                        ? {
                            opacity: 0.9,
                            x: travelX * 0.45,
                            y: -8,
                          }
                        : {
                            opacity: [0, 1, 1, 0],
                            scale: [0.7, 1.05, 1, 0.86],
                            x: [0, travelX * 0.42, travelX * 0.78, travelX],
                            y: [8, word.arc, word.arc * 0.35, -16],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 3.4,
                            delay: word.delay,
                            repeat: Infinity,
                            repeatDelay: 5.2,
                            ease: "easeInOut",
                            times: [0, 0.16, 0.72, 1],
                          }
                    }
                  >
                    {word.label}
                  </motion.span>
                </span>
              ))}
            </div>

            <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
              <div className="flex flex-wrap justify-center gap-2">
                {words.map((word) => (
                  <span
                    key={word.label}
                    className="rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground"
                  >
                    {word.label}
                  </span>
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
