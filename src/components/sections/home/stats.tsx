"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { homeStats } from "@/data/stats";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const AUTO_MS = 4000;

const metrics = [homeStats.featured, ...homeStats.secondary];

export function HomeStats() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const current = metrics[active] ?? metrics[0];

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const id = window.setTimeout(() => {
      setActive((value) => (value + 1) % metrics.length);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const ringProgress = useMemo(() => {
    if (current.suffix === "%") return Math.min(current.value, 100);
    if (current.value >= 1000) return 82;
    return 64;
  }, [current]);

  const goTo = (index: number) => {
    setActive(index);
  };

  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-md)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,var(--accent-soft),transparent_60%)] opacity-50"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {homeStats.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {homeStats.title}{" "}
            <span className="font-medium italic text-voice">
              {homeStats.titleAccent}
            </span>
          </h2>
          <p className="mt-3 text-base leading-7 text-muted">
            {homeStats.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          <div
            className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center sm:max-w-[380px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 size-full -rotate-90"
              aria-hidden
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-accent"
                strokeDasharray={2 * Math.PI * 88}
                initial={false}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 88 * (1 - ringProgress / 100),
                }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
              />
            </svg>

            <div className="relative z-10 px-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.label}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, scale: 1.04, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                >
                  <p className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    <Counter
                      value={current.value}
                      suffix={current.suffix}
                      duration={1.1}
                    />
                  </p>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                    {current.label}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Indicateurs"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setPaused(false);
              }
            }}
          >
            {metrics.map((metric, index) => {
              const selected = index === active;
              return (
                <button
                  key={metric.label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => goTo(index)}
                  className={cn(
                    "relative min-h-11 overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    selected
                      ? "border border-border bg-surface text-foreground shadow-[var(--shadow-card)]"
                      : "border border-transparent text-muted hover:text-foreground",
                  )}
                >
                  {selected && !reduceMotion ? (
                    <motion.span
                      key={`progress-${metric.label}-${active}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={
                        paused
                          ? { duration: 0.2 }
                          : { duration: AUTO_MS / 1000, ease: "linear" }
                      }
                    />
                  ) : null}
                  <span className="relative z-10">
                    {metric.value}
                    {metric.suffix} · {metric.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <CtaButton size="sm">Découvrir Lov</CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
