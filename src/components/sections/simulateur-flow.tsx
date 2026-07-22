"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { CtaButton } from "@/components/ui/cta-button";
import {
  simulatorPage,
  simulatorQuestions,
  simulatorResults,
  type SimulatorResultKey,
} from "@/data/simulateur";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Phase = "welcome" | "question" | "result";

const highlights = [
  "2 minutes chrono",
  "Résultat immédiat",
  "Non diagnostique",
] as const;

export function SimulatorFlow() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("welcome");
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1);

  const question = simulatorQuestions[step];
  const total = simulatorQuestions.length;
  const progressPct =
    phase === "welcome"
      ? 0
      : phase === "result"
        ? 100
        : Math.round(((step + 1) / total) * 100);

  const resultKey = useMemo(() => {
    const entries = Object.entries(scores);
    if (!entries.length) return "equilibre" as SimulatorResultKey;
    entries.sort((a, b) => b[1] - a[1]);
    const top = entries[0][0];
    if (top in simulatorResults) return top as SimulatorResultKey;
    return "equilibre";
  }, [scores]);

  const result = simulatorResults[resultKey] ?? simulatorResults.equilibre;

  function choose(weight: Record<string, number>) {
    setScores((prev) => {
      const next = { ...prev };
      for (const [key, value] of Object.entries(weight)) {
        next[key] = (next[key] ?? 0) + value;
      }
      return next;
    });

    setDirection(1);
    if (step >= total - 1) {
      setPhase("result");
      return;
    }
    setStep((value) => value + 1);
  }

  function goBack() {
    if (phase === "result") {
      setDirection(-1);
      setPhase("question");
      setStep(total - 1);
      return;
    }
    if (phase === "question" && step === 0) {
      setDirection(-1);
      setPhase("welcome");
      return;
    }
    if (phase === "question") {
      setDirection(-1);
      setStep((value) => value - 1);
    }
  }

  function restart() {
    setDirection(1);
    setStep(0);
    setScores({});
    setPhase("welcome");
  }

  const slide = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: direction > 0 ? 22 : -22 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: direction > 0 ? -16 : 16 },
      };

  // Left-panel label reflects the live phase.
  const asideKicker =
    phase === "welcome"
      ? "Orientation rapide"
      : phase === "result"
        ? "Votre orientation"
        : `Question ${step + 1} sur ${total}`;

  const asideCounter =
    phase === "welcome"
      ? "01"
      : phase === "result"
        ? "✓"
        : String(step + 1).padStart(2, "0");

  return (
    <section className="min-h-svh bg-background lg:grid lg:h-svh lg:grid-cols-[0.95fr_1.05fr] lg:overflow-hidden">
      {/* Live left panel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/path-simulator.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F]/94 via-[#0E0E0F]/55 to-[#0E0E0F]/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_100%,rgba(254,81,16,0.3),transparent_55%)]"
        />

        <div className="relative flex h-full min-h-svh flex-col justify-between p-10 xl:p-14">
          <div className="flex items-center justify-between gap-4">
            <BrandMark tone="onDark" />
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Accueil
            </Link>
          </div>

          <div className="max-w-md">
            <div className="flex items-baseline gap-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={asideCounter}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                  transition={transition.base}
                  className="font-display text-6xl font-semibold leading-none text-accent xl:text-7xl"
                >
                  {asideCounter}
                </motion.span>
              </AnimatePresence>
              <span className="font-display text-2xl font-medium text-white/30">
                / {String(total).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-6 text-xs font-medium tracking-[0.22em] text-white/70 uppercase">
              {asideKicker}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              Quelques questions,{" "}
              <span className="font-medium italic text-accent">
                une piste claire
              </span>
            </h2>

            {/* Segmented progress */}
            <div className="mt-8 flex gap-1.5" aria-hidden>
              {simulatorQuestions.map((q, index) => {
                const done =
                  phase === "result" ||
                  (phase === "question" && index <= step);
                return (
                  <span
                    key={q.id}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-500",
                      done ? "bg-accent" : "bg-white/20",
                    )}
                  />
                );
              })}
            </div>

            <ul className="mt-8 flex flex-col gap-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-3 text-sm text-white/85"
                >
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/15">
                    <Check className="size-3.5 text-white" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="max-w-sm text-xs leading-5 text-white/55">
            {simulatorPage.disclaimer}
          </p>
        </div>
      </aside>

      {/* Right flow */}
      <div className="relative flex min-h-svh flex-col px-5 pt-6 pb-8 sm:px-8 lg:h-svh lg:overflow-y-auto lg:px-12 lg:pt-10 xl:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_top_right,var(--accent-soft),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(254,81,16,0.12),transparent_40%)]"
        />

        <div className="relative mx-auto flex w-full max-w-lg items-center justify-between gap-3 lg:hidden">
          <BrandMark compact />
          <div className="flex items-center gap-2">
            {phase !== "welcome" ? (
              <p className="text-sm tabular-nums text-muted">{progressPct}%</p>
            ) : null}
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Accueil
            </Link>
          </div>
        </div>

        {phase !== "welcome" ? (
          <header className="relative mx-auto mt-5 w-full max-w-lg">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                {phase === "result"
                  ? "Résultat"
                  : `Question ${step + 1} / ${total}`}
              </p>
              <p className="hidden text-sm tabular-nums text-muted lg:block">
                {progressPct}%
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={transition.base}
              />
            </div>
          </header>
        ) : null}

        <div
          className={cn(
            "relative mx-auto flex w-full max-w-lg flex-1 flex-col py-8 sm:py-10",
            phase === "welcome"
              ? "justify-start lg:justify-center lg:pb-4"
              : "justify-center",
          )}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={
                phase === "question"
                  ? question?.id
                  : phase === "welcome"
                    ? "welcome"
                    : "result"
              }
              initial={slide.initial}
              animate={slide.animate}
              exit={slide.exit}
              transition={transition.base}
            >
              {phase === "welcome" ? (
                <div className="text-center lg:text-left">
                  <div className="mx-auto mb-6 inline-flex size-14 items-center justify-center rounded-[1.25rem] bg-accent-soft text-accent lg:mx-0">
                    <Sparkles className="size-6" aria-hidden />
                  </div>
                  <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                    Simulateur
                  </p>
                  <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                    {simulatorPage.title}
                  </h1>
                  <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted lg:mx-0">
                    {simulatorPage.description}
                  </p>

                  <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-border lg:hidden">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src="/images/path-simulator.jpg"
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-5 text-muted lg:hidden">
                    {simulatorPage.disclaimer}
                  </p>
                </div>
              ) : null}

              {phase === "question" && question ? (
                <div>
                  <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.15]">
                    {question.prompt}
                  </h1>
                  <div className="mt-8 flex flex-col gap-2.5">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.05,
                          ...transition.fast,
                        }}
                        onClick={() => choose(option.weight)}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-4 text-left text-[0.95rem] font-medium text-foreground transition-all hover:border-accent/40 hover:bg-accent-soft/50 hover:shadow-[var(--shadow-card)] sm:px-5"
                      >
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option.label}</span>
                        <ArrowRight
                          className="size-4 shrink-0 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                          aria-hidden
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : null}

              {phase === "result" ? (
                <div>
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={transition.base}
                    className="inline-flex size-14 items-center justify-center rounded-[1.25rem] bg-accent text-white shadow-[0_16px_40px_-20px_rgba(254,81,16,0.6)]"
                  >
                    <Sparkles className="size-6" aria-hidden />
                  </motion.div>
                  <p className="mt-5 text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    Votre orientation
                  </p>
                  <h1 className="mt-3 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.15]">
                    {result.title}
                  </h1>
                  <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
                    {result.body}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <CtaButton href={result.ctaHref} size="lg">
                      {result.ctaLabel}
                    </CtaButton>
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
                    >
                      <RotateCcw className="size-4" aria-hidden />
                      Recommencer
                    </button>
                  </div>
                  <p className="mt-6 text-xs leading-5 text-muted">
                    {simulatorPage.disclaimer}
                  </p>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {phase === "welcome" ? (
          <footer className="relative mx-auto mt-auto w-full max-w-lg border-t border-border/70 pt-5">
            <CtaButton
              type="button"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                setDirection(1);
                setPhase("question");
              }}
            >
              Commencer
            </CtaButton>
            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted lg:hidden">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </footer>
        ) : null}

        {phase === "question" ? (
          <footer className="relative mx-auto w-full max-w-lg">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Retour
            </button>
          </footer>
        ) : null}
      </div>
    </section>
  );
}
