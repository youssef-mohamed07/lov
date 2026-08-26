"use client";

import { ArrowLeft, ArrowRight, Check, FileText, Upload } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

import { BirthDateField, calculateAge } from "@/components/common/birth-date-field";
import { FlowChoice, FlowNav, FlowSteps } from "@/components/common/flow-controls";
import {
  FlowCard,
  FlowEyebrow,
  FlowHeart,
  FlowShell,
  flowFieldClass,
  flowGhostClass,
  flowPrimaryClass,
} from "@/components/common/flow-shell";
import { submitFormData } from "@/lib/submit";
import { cn } from "@/lib/utils";

type Step = "welcome" | "profile" | "birth-date" | "need" | "details" | "thanks";

const stepOrder: Step[] = ["profile", "birth-date", "need", "details"];
const stepLabels = ["Profil", "Naissance", "Besoin", "Contact"] as const;

const profileOptions = [
  { label: "Un enfant", value: "enfant" },
  { label: "Un adulte", value: "adulte" },
] as const;

const needOptions = [
  { label: "Commencer un suivi", value: "suivi" },
  { label: "Être orienté vers un professionnel", value: "orientation" },
  { label: "Obtenir un second avis", value: "avis" },
  { label: "Autre besoin", value: "autre" },
] as const;

type Answers = {
  profile: string;
  birthDate: string;
  need: string;
};

const emptyAnswers: Answers = {
  profile: "",
  birthDate: "",
  need: "",
};

export function ExistingBilanForm() {
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const age = calculateAge(answers.birthDate);
  const progressIndex = stepOrder.indexOf(step);

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function goBack() {
    const previous: Partial<Record<Step, Step>> = {
      profile: "welcome",
      "birth-date": "profile",
      need: "birth-date",
      details: "need",
    };
    const target = previous[step];
    if (target) setStep(target);
  }

  function reset() {
    setAnswers(emptyAnswers);
    setFileName("");
    setSubmitted(false);
    setSubmitting(false);
    setError("");
    setStep("welcome");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      await submitFormData(formData);
      setSubmitted(true);
      setStep("thanks");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Une erreur est survenue.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FlowShell
      tone="brand"
      width={step === "details" ? "lg" : "md"}
      align={step === "details" || step === "welcome" ? "top" : "center"}
      rail={
        progressIndex >= 0 ? (
          <FlowSteps steps={stepLabels} current={progressIndex} />
        ) : null
      }
    >
      {step === "welcome" ? (
        <FlowCard>
          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="min-w-0 flex-1">
              <FlowEyebrow icon={FileText}>J’ai déjà un bilan</FlowEyebrow>
              <h1 className="mt-5 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
                Expliquez-nous{" "}
                <span className="font-medium italic text-brand">votre situation</span>
              </h1>
            </div>
            <FlowHeart
              src="/images/pricing-bilan.jpg"
              className="w-24 -rotate-6 sm:w-32"
              sizes="128px"
              priority
            />
          </div>
          <p className="mt-5 text-base leading-7 text-muted">
            Quelques questions, puis votre compte rendu si vous l’avez. Nous
            vous orienterons vers la suite la plus adaptée.
          </p>
          <FlowNav
            nextLabel="Commencer"
            onNext={() => setStep("profile")}
            className="mt-8 border-t border-border pt-6"
          />
        </FlowCard>
      ) : null}

      {step === "profile" ? (
        <QuestionCard
          title="Le bilan concerne qui ?"
          onBack={goBack}
          onNext={() => setStep("birth-date")}
          canContinue={Boolean(answers.profile)}
        >
          <div className="grid gap-2.5 sm:grid-cols-2">
            {profileOptions.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                selected={answers.profile === option.value}
                onSelect={() => update("profile", option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "birth-date" ? (
        <QuestionCard
          title="Quelle est la date de naissance du patient ?"
          description="Elle nous aide à orienter la suite selon l’âge."
          onBack={goBack}
          onNext={() => setStep("need")}
          canContinue={age !== null && age >= 0 && age <= 120}
        >
          <BirthDateField
            featured
            value={answers.birthDate}
            onChange={(value) => update("birthDate", value)}
          />
        </QuestionCard>
      ) : null}

      {step === "need" ? (
        <QuestionCard
          title="Que recherchez-vous ?"
          onBack={goBack}
          onNext={() => setStep("details")}
          canContinue={Boolean(answers.need)}
        >
          <div className="flex flex-col gap-2.5">
            {needOptions.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                selected={answers.need === option.value}
                onSelect={() => update("need", option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "details" ? (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="profile" value={answers.profile} />
          <input type="hidden" name="birthDate" value={answers.birthDate} />
          <input type="hidden" name="need" value={answers.need} />

          <FlowCard>
            <h1 className="font-display text-[1.6rem] font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
              Vos coordonnées
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Nous vous recontactons sous 24 à 48 heures ouvrées.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Nom" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={flowFieldClass}
                  placeholder="Votre nom"
                />
              </Field>
              <Field label="Courriel" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={flowFieldClass}
                  placeholder="vous@exemple.fr"
                />
              </Field>
              <Field label="Téléphone" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={flowFieldClass}
                  placeholder="06 00 00 00 00"
                />
              </Field>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Compte rendu{" "}
                <span className="font-normal text-muted">(facultatif)</span>
              </span>
              <span className="flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-[var(--flow-tone)]/40 bg-[var(--flow-tone-soft)]/70 px-5 py-4 transition-colors hover:bg-[var(--flow-tone-soft)]">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand">
                  {fileName ? (
                    <FileText className="size-5" aria-hidden />
                  ) : (
                    <Upload className="size-5" aria-hidden />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {fileName || "Ajouter votre bilan"}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    PDF, JPG ou PNG · 4 Mo max.
                  </span>
                </span>
                <input
                  name="report"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  className="sr-only"
                  onChange={(event) =>
                    setFileName(event.target.files?.[0]?.name ?? "")
                  }
                />
              </span>
            </label>

            <div className="mt-5">
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={cn(flowFieldClass, "resize-none leading-7")}
                  placeholder="Ajoutez un détail utile…"
                />
              </Field>
            </div>

            <p className="mt-5 text-xs leading-5 text-muted">
              Vos informations et documents restent confidentiels.
            </p>
            {error ? (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground sm:w-auto"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Retour
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`${flowPrimaryClass} w-full sm:w-auto`}
              >
                {submitting ? "Envoi…" : "Envoyer ma demande"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </FlowCard>
        </form>
      ) : null}

      {step === "thanks" && submitted ? (
        <FlowCard className="text-center">
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Check className="size-7" aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Demande envoyée
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
            Merci. Notre équipe étudie votre bilan et vous recontacte sous 24 à
            48 heures ouvrées.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={flowGhostClass}>
              Retour à l’accueil
            </Link>
            <button type="button" onClick={reset} className={flowGhostClass}>
              Nouvelle demande
            </button>
          </div>
        </FlowCard>
      ) : null}
    </FlowShell>
  );
}

function QuestionCard({
  title,
  description,
  children,
  onBack,
  onNext,
  canContinue,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
}) {
  return (
    <FlowCard>
      <h1 className="font-display text-[1.6rem] font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
      <div className="mt-7">{children}</div>
      <FlowNav
        onBack={onBack}
        onNext={onNext}
        canContinue={canContinue}
        className="mt-7 border-t border-border pt-6"
      />
    </FlowCard>
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
    <label htmlFor={htmlFor} className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
