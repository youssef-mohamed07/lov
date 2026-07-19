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

const AUTO_MS = 3800;

const metrics = [homeStats.featured, ...homeStats.secondary];

export function HomeStats() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const current = metrics[active] ?? metrics[0];

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % metrics.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const ringProgress = useMemo(() => {
    if (current.suffix === "%") return Math.min(current.value, 100);
    if (current.value >= 1000) return 82;
    return 64;
  }, [current]);

  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
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

        <div
          className="mx-auto mt-10 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center sm:max-w-[380px]">
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
                  <p className="font-display text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
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
          >
            {metrics.map((metric, index) => {
              const selected = index === active;
              return (
                <button
                  key={metric.label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {selected && !reduceMotion ? (
                    <motion.span
                      layoutId="stats-pill"
                      className="absolute inset-0 rounded-full border border-border bg-background"
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                    />
                  ) : selected ? (
                    <span className="absolute inset-0 rounded-full border border-border bg-background" />
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
            <CtaButton size="sm">
              Découvrir Lov
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
