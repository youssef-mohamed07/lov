"use client";

import { RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { FlowChoice, FlowNav, FlowSteps } from "@/components/common/flow-controls";
import {
  FlowCard,
  FlowEyebrow,
  FlowHeart,
  FlowShell,
  flowGhostClass,
} from "@/components/common/flow-shell";
import { CtaButton } from "@/components/ui/cta-button";
import {
  simulatorPage,
  simulatorQuestions,
  simulatorResults,
  type SimulatorResultKey,
} from "@/data/simulateur";

type Phase = "welcome" | "question" | "result";

const stepLabels = [
  "Profil",
  "Domaine",
  "Impact",
  "Durée",
  "Objectif",
] as const;

const highlights = [
  "2 minutes",
  "Résultat immédiat",
  "Sans diagnostic",
] as const;

function scoresFromAnswers(answers: Record<string, string>) {
  const scores: Record<string, number> = {};
  for (const question of simulatorQuestions) {
    const selected = question.options.find(
      (option) => option.value === answers[question.id],
    );
    if (!selected) continue;
    for (const [key, value] of Object.entries(selected.weight)) {
      scores[key] = (scores[key] ?? 0) + value;
    }
  }
  return scores;
}

export function SimulatorFlow() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = simulatorQuestions.length;
  const question = simulatorQuestions[step];
  const selected = question ? (answers[question.id] ?? "") : "";

  const resultKey = useMemo(() => {
    const entries = Object.entries(scoresFromAnswers(answers));
    if (!entries.length) return "equilibre" as SimulatorResultKey;
    entries.sort((a, b) => b[1] - a[1]);
    const top = entries[0][0];
    return top in simulatorResults
      ? (top as SimulatorResultKey)
      : "equilibre";
  }, [answers]);

  const result = simulatorResults[resultKey] ?? simulatorResults.equilibre;

  function goNext() {
    if (!question || !selected) return;
    if (step >= total - 1) {
      setPhase("result");
      return;
    }
    setStep((value) => value + 1);
  }

  function goBack() {
    if (phase === "result") {
      setPhase("question");
      setStep(total - 1);
      return;
    }
    if (step === 0) {
      setPhase("welcome");
      return;
    }
    setStep((value) => value - 1);
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setPhase("welcome");
  }

  return (
    <FlowShell
      tone="brand"
      width="md"
      rail={
        phase === "question" ? (
          <FlowSteps steps={stepLabels} current={step} />
        ) : null
      }
    >
      {phase === "welcome" ? (
        <FlowCard>
          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="min-w-0 flex-1">
              <FlowEyebrow icon={Sparkles}>Simulateur</FlowEyebrow>
              <h1 className="mt-5 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
                {simulatorPage.title}
              </h1>
            </div>
            <FlowHeart
              src="/images/path-simulator.jpg"
              className="w-24 rotate-6 sm:w-32"
              sizes="128px"
              priority
            />
          </div>

          <p className="mt-5 text-base leading-7 text-muted">
            {simulatorPage.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center rounded-full bg-surface-muted px-3 py-1.5 text-xs font-medium text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <FlowNav
            nextLabel="Commencer"
            onNext={() => setPhase("question")}
            className="mt-8 border-t border-border pt-6"
          />

          <p className="mt-5 text-xs leading-5 text-muted">
            {simulatorPage.disclaimer}
          </p>
        </FlowCard>
      ) : null}

      {phase === "question" && question ? (
        <FlowCard>
          <h1 className="font-display text-[1.6rem] font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
            {question.prompt}
          </h1>
          <div className="mt-7 flex flex-col gap-2.5">
            {question.options.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                selected={selected === option.value}
                onSelect={() =>
                  setAnswers((current) => ({
                    ...current,
                    [question.id]: option.value,
                  }))
                }
              />
            ))}
          </div>
          <FlowNav
            onBack={goBack}
            onNext={goNext}
            nextLabel={step >= total - 1 ? "Voir le résultat" : "Continuer"}
            canContinue={Boolean(selected)}
            className="mt-7 border-t border-border pt-6"
          />
        </FlowCard>
      ) : null}

      {phase === "result" ? (
        <FlowCard>
          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="min-w-0 flex-1">
              <FlowEyebrow icon={Sparkles}>Votre orientation</FlowEyebrow>
              <h1 className="mt-5 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl">
                {result.title}
              </h1>
            </div>
            <FlowHeart
              src="/images/path-bilan.jpg"
              className="w-24 -rotate-6 sm:w-32"
              sizes="128px"
            />
          </div>

          <p className="mt-5 text-base leading-7 text-muted">{result.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href={result.ctaHref} size="lg">
              {result.ctaLabel}
            </CtaButton>
            <button type="button" onClick={restart} className={flowGhostClass}>
              <RotateCcw className="size-4" aria-hidden />
              Recommencer
            </button>
          </div>

          <div className="mt-7 border-t border-border pt-5">
            <button
              type="button"
              onClick={goBack}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Modifier mes réponses
            </button>
            <p className="mt-4 text-xs leading-5 text-muted">
              {simulatorPage.disclaimer}
            </p>
          </div>
        </FlowCard>
      ) : null}
    </FlowShell>
  );
}
