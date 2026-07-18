"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import {
  bilanFormCopy,
  bilanQuestions,
  labelForAnswer,
  type BilanAnswers,
  type BilanStep,
} from "@/data/bilan-form";
import { clearBilanDraft, useBilanDraft } from "@/hooks/use-bilan-draft";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Phase = "welcome" | "question" | "summary" | "contact" | "merci";

const TOTAL_FLOW = bilanQuestions.length + 2;

const fieldClassName =
  "w-full rounded-2xl border border-border/80 bg-background px-4 py-3.5 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/50 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]";

function phaseFromIndex(index: number, started: boolean): Phase {
  if (!started) return "welcome";
  if (index < bilanQuestions.length) return "question";
  if (index === bilanQuestions.length) return "summary";
  if (index === bilanQuestions.length + 1) return "contact";
  return "merci";
}

function isEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isQuestionValid(step: BilanStep, answers: BilanAnswers) {
  if (step.kind === "text") return answers[step.id].trim().length >= 2;
  if (step.kind === "choice") return Boolean(answers[step.id]);
  return true;
}

function isContactValid(answers: BilanAnswers) {
  return (
    answers.parentName.trim().length >= 2 &&
    isEmailValid(answers.email) &&
    answers.phone.trim().replace(/\s/g, "").length >= 8
  );
}

export function BilanFlow() {
  const reduceMotion = useReducedMotion();
  const {
    hydrated,
    stepIndex,
    setStepIndex,
    answers,
    updateAnswer,
    resetDraft,
  } = useBilanDraft();
  const [started, setStarted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const canContinueRef = useRef(false);

  useEffect(() => {
    if (!hydrated) return;
    if (stepIndex > 0 || answers.firstName.trim()) setStarted(true);
  }, [hydrated, stepIndex, answers.firstName]);

  const phase = submitted
    ? "merci"
    : phaseFromIndex(stepIndex, started);
  const question =
    phase === "question" ? bilanQuestions[stepIndex] : undefined;
  const progressIndex = Math.min(stepIndex, TOTAL_FLOW - 1);
  const progressPct =
    phase === "welcome"
      ? 0
      : phase === "merci"
        ? 100
        : Math.round(((progressIndex + 1) / TOTAL_FLOW) * 100);

  const canContinue = useMemo(() => {
    if (phase === "welcome") return true;
    if (phase === "question" && question) {
      return isQuestionValid(question, answers);
    }
    if (phase === "summary") return true;
    if (phase === "contact") return isContactValid(answers);
    return false;
  }, [answers, phase, question]);

  canContinueRef.current = canContinue;

  useEffect(() => {
    if (!hydrated || phase === "merci" || phase === "summary" || phase === "welcome")
      return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 240);
    return () => window.clearTimeout(timer);
  }, [hydrated, phase, stepIndex]);

  function goTo(next: number) {
    setDirection(next > stepIndex ? 1 : -1);
    setStepIndex(next);
  }

  async function handleSubmit() {
    if (!isContactValid(answers) || submitting || submitted) return;
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    clearBilanDraft();
    setDirection(1);
    setSubmitted(true);
    setSubmitting(false);
  }

  function goNext() {
    if (!canContinueRef.current || phase === "merci") return;
    if (phase === "welcome") {
      setStarted(true);
      setDirection(1);
      return;
    }
    if (phase === "contact") {
      void handleSubmit();
      return;
    }
    goTo(stepIndex + 1);
  }

  function goBack() {
    if (phase === "merci") return;
    if (phase === "welcome") return;
    if (phase === "question" && stepIndex === 0) {
      setStarted(false);
      setDirection(-1);
      return;
    }
    goTo(stepIndex - 1);
  }

  function handleRestart() {
    setSubmitted(false);
    setStarted(false);
    resetDraft();
    setDirection(1);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" || event.shiftKey || submitted) return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "TEXTAREA") return;
      event.preventDefault();
      if (!canContinueRef.current) return;
      goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const slide = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: direction > 0 ? 24 : -24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: direction > 0 ? -18 : 18 },
      };

  if (!hydrated) {
    return (
      <section className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-9 animate-pulse rounded-full bg-accent-soft" />
      </section>
    );
  }

  return (
    <section className="min-h-svh bg-background lg:grid lg:h-svh lg:grid-cols-[0.95fr_1.05fr] lg:overflow-hidden">
      {/* Visual side */}
      <aside className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/path-bilan.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#142636]/90 via-[#142636]/45 to-[#142636]/20"
        />
        <div className="relative flex h-full min-h-svh flex-col justify-between p-10 xl:p-14">
          <BrandMark tone="onDark" />

          <div className="max-w-md">
            <p className="text-xs font-medium tracking-[0.22em] text-white/70 uppercase">
              Bilan orthophonique
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              Préparez votre bilan{" "}
              <span className="font-medium italic text-voice">en douceur</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              Une question à la fois. Vos réponses sont enregistrées
              automatiquement — pour un échange plus clair dès le premier
              contact.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "5 à 7 minutes chrono",
                "Sans engagement",
                "Réponse sous 24–48h",
              ].map((item) => (
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
            {bilanFormCopy.disclaimer}
          </p>
        </div>
      </aside>

      {/* Flow side */}
      <div className="relative flex min-h-svh flex-col px-5 pt-6 pb-8 sm:px-8 lg:h-svh lg:overflow-y-auto lg:px-12 lg:pt-10 xl:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_top_right,var(--accent-soft),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(224,122,95,0.12),transparent_40%)]"
        />

        <div className="relative mx-auto flex w-full max-w-lg items-center justify-between gap-3 lg:hidden">
          <BrandMark compact />
          {phase !== "merci" && phase !== "welcome" ? (
            <p className="text-sm tabular-nums text-muted">{progressPct}%</p>
          ) : null}
        </div>

        {phase !== "merci" && phase !== "welcome" ? (
          <header className="relative mx-auto mt-5 w-full max-w-lg lg:mt-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                {bilanFormCopy.eyebrow}
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

        <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-8 sm:py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={
                phase === "question"
                  ? question?.id
                  : phase === "welcome"
                    ? "welcome"
                    : phase
              }
              initial={slide.initial}
              animate={slide.animate}
              exit={slide.exit}
              transition={transition.base}
            >
              {phase === "welcome" ? (
                <WelcomeStep onStart={goNext} />
              ) : null}

              {phase === "question" && question ? (
                <QuestionStep
                  step={question}
                  answers={answers}
                  updateAnswer={updateAnswer}
                  inputRef={inputRef}
                  onAutoAdvance={() => {
                    window.setTimeout(() => {
                      setDirection(1);
                      setStepIndex((value) => value + 1);
                    }, 200);
                  }}
                />
              ) : null}

              {phase === "summary" ? <SummaryStep answers={answers} /> : null}

              {phase === "contact" ? (
                <ContactStep
                  answers={answers}
                  updateAnswer={updateAnswer}
                  inputRef={inputRef}
                />
              ) : null}

              {phase === "merci" ? (
                <MerciStep onRestart={handleRestart} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {phase !== "merci" && phase !== "welcome" ? (
          <footer className="relative mx-auto w-full max-w-lg">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                <ArrowLeft className="size-4" aria-hidden />
                {bilanFormCopy.back}
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_14px_30px_-16px_rgba(47,126,168,0.7)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {phase === "contact"
                  ? submitting
                    ? "Envoi…"
                    : bilanFormCopy.submit
                  : bilanFormCopy.next}
                {phase !== "contact" ? (
                  <ArrowRight className="size-4" aria-hidden />
                ) : null}
              </button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-muted lg:hidden">
              {bilanFormCopy.disclaimer}
            </p>
          </footer>
        ) : null}
      </div>
    </section>
  );
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center lg:text-left">
      <div className="mx-auto mb-6 inline-flex size-14 items-center justify-center rounded-[1.25rem] bg-accent-soft text-accent lg:mx-0">
        <Sparkles className="size-6" aria-hidden />
      </div>
      <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
        {bilanFormCopy.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {bilanFormCopy.title}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted lg:mx-0">
        {bilanFormCopy.description}
      </p>

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-border lg:hidden">
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/path-bilan.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_14px_30px_-16px_rgba(47,126,168,0.7)]"
      >
        Commencer
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}

function QuestionStep({
  step,
  answers,
  updateAnswer,
  inputRef,
  onAutoAdvance,
}: {
  step: BilanStep;
  answers: BilanAnswers;
  updateAnswer: <K extends keyof BilanAnswers>(
    key: K,
    value: BilanAnswers[K],
  ) => void;
  inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onAutoAdvance: () => void;
}) {
  return (
    <div>
      <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-[1.15]">
        {step.prompt}
      </h1>

      {step.kind === "text" ? (
        <div className="mt-8">
          <input
            ref={inputRef as MutableRefObject<HTMLInputElement>}
            type="text"
            value={answers.firstName}
            onChange={(event) => updateAnswer("firstName", event.target.value)}
            placeholder={step.placeholder}
            autoComplete="given-name"
            className="w-full border-0 border-b-2 border-border bg-transparent px-0 py-3 font-display text-3xl text-foreground outline-none transition-colors placeholder:text-muted/40 focus:border-accent sm:text-4xl"
          />
          {step.helper ? (
            <p className="mt-4 text-sm leading-6 text-muted">{step.helper}</p>
          ) : null}
        </div>
      ) : null}

      {step.kind === "textarea" ? (
        <div className="mt-8">
          <textarea
            ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
            value={answers.notes}
            onChange={(event) => updateAnswer("notes", event.target.value)}
            placeholder={step.placeholder}
            rows={5}
            className={cn(fieldClassName, "resize-none leading-7")}
          />
          {step.optional ? (
            <p className="mt-3 text-sm text-muted">
              Facultatif — vous pouvez passer.
            </p>
          ) : null}
        </div>
      ) : null}

      {step.kind === "choice" ? (
        <div className="mt-8 flex flex-col gap-2.5">
          {step.options.map((option, index) => {
            const selected = answers[step.id] === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, ...transition.fast }}
                onClick={() => {
                  updateAnswer(step.id, option.value);
                  onAutoAdvance();
                }}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left text-[0.95rem] font-medium transition-all sm:px-5",
                  selected
                    ? "border-accent bg-accent text-accent-foreground shadow-[0_16px_36px_-20px_rgba(47,126,168,0.65)]"
                    : "border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-soft/50",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    selected
                      ? "border-white/30 bg-white/15 text-white"
                      : "border-border bg-background text-muted group-hover:border-accent/30",
                  )}
                >
                  {selected ? (
                    <Check className="size-3.5" aria-hidden />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                {option.label}
              </motion.button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function SummaryStep({ answers }: { answers: BilanAnswers }) {
  const rows = [
    { label: "Prénom", value: answers.firstName || "—" },
    { label: "Âge", value: labelForAnswer("age", answers.age) },
    { label: "Motif", value: labelForAnswer("reason", answers.reason) },
    { label: "Durée", value: labelForAnswer("duration", answers.duration) },
    {
      label: "Suivi actuel",
      value: labelForAnswer("followed", answers.followed),
    },
    {
      label: "Remarques",
      value: answers.notes.trim() || "Aucune",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl">
        {bilanFormCopy.summaryTitle}
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">
        {bilanFormCopy.summarySubtitle}
      </p>

      <dl className="mt-8 overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-[var(--shadow-card)]">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "grid gap-1 px-5 py-4 sm:grid-cols-[7.5rem_1fr] sm:items-center sm:gap-4",
              index !== rows.length - 1 && "border-b border-border",
            )}
          >
            <dt className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
              {row.label}
            </dt>
            <dd className="text-sm font-medium text-foreground sm:text-base">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ContactStep({
  answers,
  updateAnswer,
  inputRef,
}: {
  answers: BilanAnswers;
  updateAnswer: <K extends keyof BilanAnswers>(
    key: K,
    value: BilanAnswers[K],
  ) => void;
  inputRef: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}) {
  return (
    <div>
      <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl">
        {bilanFormCopy.contactTitle}
      </h1>
      <p className="mt-3 text-base leading-7 text-muted">
        {bilanFormCopy.contactSubtitle}
      </p>

      <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-border bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
        <Field label="Nom du parent" htmlFor="parentName">
          <input
            ref={inputRef as MutableRefObject<HTMLInputElement>}
            id="parentName"
            type="text"
            value={answers.parentName}
            onChange={(event) => updateAnswer("parentName", event.target.value)}
            autoComplete="name"
            className={fieldClassName}
            placeholder="Votre nom"
          />
        </Field>
        <Field label="Courriel" htmlFor="email">
          <input
            id="email"
            type="email"
            value={answers.email}
            onChange={(event) => updateAnswer("email", event.target.value)}
            autoComplete="email"
            className={fieldClassName}
            placeholder="vous@exemple.fr"
          />
        </Field>
        <Field label="Téléphone" htmlFor="phone">
          <input
            id="phone"
            type="tel"
            value={answers.phone}
            onChange={(event) => updateAnswer("phone", event.target.value)}
            autoComplete="tel"
            className={fieldClassName}
            placeholder="06 00 00 00 00"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function MerciStep({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={transition.base}
        className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent"
      >
        <Check className="size-7" aria-hidden />
      </motion.div>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {bilanFormCopy.merciTitle}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted sm:text-lg">
        {bilanFormCopy.merciBody}
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground"
        >
          {bilanFormCopy.home}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
        >
          {bilanFormCopy.restart}
        </button>
      </div>
    </div>
  );
}
