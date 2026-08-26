"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Laptop,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

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
import {
  bookingForOptions,
  eligibilityReasons,
  particularSituations,
  technicalConditions,
  type EligibilityOption,
} from "@/data/bilan-form";
import { submitJson } from "@/lib/submit";
import { cn } from "@/lib/utils";

type TestStep =
  | "welcome"
  | "booking-for"
  | "birth-date"
  | "reason"
  | "situations"
  | "technical"
  | "eligible"
  | "technical-warning"
  | "ineligible"
  | "details"
  | "thanks";

type EligibilityAnswers = {
  bookingFor: string;
  birthDate: string;
  reason: string;
  situations: string[];
  technical: string[];
};

const emptyAnswers: EligibilityAnswers = {
  bookingFor: "",
  birthDate: "",
  reason: "",
  situations: [],
  technical: [],
};

const testStepOrder: TestStep[] = [
  "booking-for",
  "birth-date",
  "reason",
  "situations",
  "technical",
];

const stepLabels = [
  "Profil",
  "Naissance",
  "Motif",
  "Situation",
  "Technique",
] as const;

const guarantees = [
  "Moins d’une minute",
  "Filtrage clinique",
  "Données protégées",
] as const;

function reasonOptionsForAge(age: number | null): readonly EligibilityOption[] {
  if (age === null) return [];
  if (age <= 6) return eligibilityReasons.young;
  if (age <= 17) return eligibilityReasons.minor;
  return eligibilityReasons.adult;
}

export function BilanFlow() {
  const [step, setStep] = useState<TestStep>("welcome");
  const [answers, setAnswers] = useState<EligibilityAnswers>(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const age = useMemo(
    () => calculateAge(answers.birthDate),
    [answers.birthDate],
  );
  const minor = age !== null && age < 18;
  const reasonOptions = useMemo(() => reasonOptionsForAge(age), [age]);
  const selectedReason = reasonOptions.find(
    (option) => option.value === answers.reason,
  );
  const requiredTechnical = technicalConditions.filter(
    (condition) => !condition.minorOnly || minor,
  );
  const technicalComplete = requiredTechnical.every((condition) =>
    answers.technical.includes(condition.value),
  );

  const progressIndex = testStepOrder.indexOf(step);

  function updateAnswer<K extends keyof EligibilityAnswers>(
    key: K,
    value: EligibilityAnswers[K],
  ) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function resetFlow() {
    setAnswers(emptyAnswers);
    setSubmitted(false);
    setSubmitting(false);
    setError("");
    setStep("welcome");
  }

  function continueFromBirthDate() {
    if (age === null || age < 0 || age > 120) return;
    if (age < 1) {
      setStep("ineligible");
      return;
    }
    updateAnswer("reason", "");
    setStep("reason");
  }

  function continueFromReason() {
    if (!selectedReason) return;
    if (!selectedReason.eligible) {
      setStep("ineligible");
      return;
    }
    setStep("situations");
  }

  function continueFromSituations() {
    if (answers.situations.length === 0) return;
    if (!answers.situations.includes("none")) {
      setStep("ineligible");
      return;
    }
    setStep("technical");
  }

  function continueFromTechnical() {
    setStep(technicalComplete ? "eligible" : "technical-warning");
  }

  function toggleSituation(value: string) {
    setAnswers((current) => {
      if (value === "none") {
        return {
          ...current,
          situations: current.situations.includes("none") ? [] : ["none"],
        };
      }
      const withoutNone = current.situations.filter((item) => item !== "none");
      return {
        ...current,
        situations: withoutNone.includes(value)
          ? withoutNone.filter((item) => item !== value)
          : [...withoutNone, value],
      };
    });
  }

  function toggleTechnical(value: string) {
    setAnswers((current) => ({
      ...current,
      technical: current.technical.includes(value)
        ? current.technical.filter((item) => item !== value)
        : [...current.technical, value],
    }));
  }

  function goBack() {
    const previous: Partial<Record<TestStep, TestStep>> = {
      "booking-for": "welcome",
      "birth-date": "booking-for",
      reason: "birth-date",
      situations: "reason",
      technical: "situations",
      eligible: "technical",
      "technical-warning": "technical",
      details: "eligible",
    };
    const target = previous[step];
    if (target) setStep(target);
  }

  async function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "");
    const checked = (name: string) => formData.get(name) === "on";

    try {
      await submitJson({
        kind: "eligibility_request",
        eligibility: {
          ...answers,
          reasonEligible: selectedReason?.eligible === true,
          technicalComplete,
        },
        patientLastName: value("patientLastName"),
        patientFirstName: value("patientFirstName"),
        patientBirthDate: value("patientBirthDate"),
        patientSex: value("patientSex"),
        guardianLastName: value("guardianLastName"),
        guardianFirstName: value("guardianFirstName"),
        guardianLink: value("guardianLink"),
        parentalAuthority: checked("parentalAuthority"),
        email: value("email"),
        phone: value("phone"),
        address: value("address"),
        postalCode: value("postalCode"),
        city: value("city"),
        country: value("country"),
        doctorName: value("doctorName"),
        prescription: value("prescription"),
        previousCare: value("previousCare"),
        source: value("source"),
        terms: checked("terms"),
        earlyStart: checked("earlyStart"),
        marketing: checked("marketing"),
      });
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
      align={step === "details" ? "top" : "center"}
      rail={
        progressIndex >= 0 ? (
          <FlowSteps steps={stepLabels} current={progressIndex} />
        ) : null
      }
    >
      {step === "welcome" ? (
        <WelcomeStep onStart={() => setStep("booking-for")} />
      ) : null}

      {step === "booking-for" ? (
        <QuestionCard
          title="Pour qui réservez-vous ?"
          onBack={goBack}
          onNext={() => setStep("birth-date")}
          canContinue={Boolean(answers.bookingFor)}
        >
          <div className="grid gap-2.5 sm:grid-cols-3">
            {bookingForOptions.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                selected={answers.bookingFor === option.value}
                onSelect={() => updateAnswer("bookingFor", option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "birth-date" ? (
        <QuestionCard
          title="Quelle est la date de naissance du patient ?"
          description="Elle nous permet d’adapter les questions et de vérifier l’éligibilité selon l’âge."
          onBack={goBack}
          onNext={continueFromBirthDate}
          canContinue={age !== null && age >= 0 && age <= 120}
        >
          <BirthDateField
            featured
            value={answers.birthDate}
            onChange={(value) => updateAnswer("birthDate", value)}
          />
        </QuestionCard>
      ) : null}

      {step === "reason" ? (
        <QuestionCard
          title="Quel est le motif principal de la demande ?"
          onBack={goBack}
          onNext={continueFromReason}
          canContinue={Boolean(selectedReason)}
        >
          <div className="grid gap-2.5">
            {reasonOptions.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                selected={answers.reason === option.value}
                onSelect={() => updateAnswer("reason", option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "situations" ? (
        <QuestionCard
          title="Le patient est-il concerné par l’une de ces situations ?"
          description="Ces informations nous permettent de vérifier que l’accompagnement à distance est réellement adapté."
          onBack={goBack}
          onNext={continueFromSituations}
          canContinue={answers.situations.length > 0}
        >
          <div className="flex flex-col gap-2.5">
            {particularSituations.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                multi
                selected={answers.situations.includes(option.value)}
                onSelect={() => toggleSituation(option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "technical" ? (
        <QuestionCard
          title="Pouvez-vous réunir ces conditions techniques ?"
          description="Cochez toutes les conditions dont vous disposez aujourd’hui."
          onBack={goBack}
          onNext={continueFromTechnical}
          canContinue
        >
          <div className="flex flex-col gap-2.5">
            {requiredTechnical.map((option) => (
              <FlowChoice
                key={option.value}
                label={option.label}
                multi
                selected={answers.technical.includes(option.value)}
                onSelect={() => toggleTechnical(option.value)}
              />
            ))}
          </div>
        </QuestionCard>
      ) : null}

      {step === "eligible" ? (
        <ResultCard
          tone="positive"
          icon={ShieldCheck}
          eyebrow="Éligibilité confirmée"
          title="Votre situation est éligible"
          body="Votre situation est éligible à la prise en soin en visioconférence. Il ne vous reste qu’une étape : remplir vos coordonnées."
          primaryLabel="Remplir mes coordonnées"
          onPrimary={() => setStep("details")}
          onBack={goBack}
        />
      ) : null}

      {step === "technical-warning" ? (
        <ResultCard
          tone="neutral"
          icon={Laptop}
          eyebrow="À prévoir"
          title="Conditions techniques à prévoir"
          body="Nos séances nécessitent un ordinateur ou une tablette avec caméra et micro, une connexion stable et une pièce calme. Si vous pensez pouvoir réunir ces conditions d’ici votre rendez-vous, vous pouvez poursuivre votre réservation."
          primaryLabel="Je poursuis quand même"
          onPrimary={() => setStep("eligible")}
          secondaryHref="/nous-contacter"
          secondaryLabel="Nous contacter"
          onBack={goBack}
        />
      ) : null}

      {step === "ineligible" ? (
        <ResultCard
          tone="warning"
          icon={CircleAlert}
          eyebrow="Orientation"
          title="Un accompagnement en présence est recommandé"
          body="D’après vos réponses, la situation décrite nécessite un accompagnement en présence physique, que nous ne pouvons pas assurer dans de bonnes conditions à distance. Pour trouver un orthophoniste près de chez vous, Allo Ortho recense les praticiens disponibles dans votre région."
          primaryLabel="Trouver un orthophoniste"
          primaryHref="https://app.allo-ortho.com/?utm_page=49&utm_cta=video"
          secondaryHref="/nous-contacter"
          secondaryLabel="Nous contacter"
          onRestart={resetFlow}
        />
      ) : null}

      {step === "details" ? (
        <DetailsForm
          birthDate={answers.birthDate}
          onBack={goBack}
          onSubmit={handleDetailsSubmit}
          submitting={submitting}
          error={error}
        />
      ) : null}

      {step === "thanks" && submitted ? (
        <ThanksStep onRestart={resetFlow} />
      ) : null}
    </FlowShell>
  );
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <FlowCard>
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="min-w-0 flex-1">
          <FlowEyebrow icon={ShieldCheck}>Test d’éligibilité</FlowEyebrow>
          <h1 className="mt-5 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Vérifions que la visio est{" "}
            <span className="font-medium italic text-brand">adaptée</span>
          </h1>
        </div>
        <FlowHeart
          src="/images/path-bilan.jpg"
          className="w-24 rotate-6 sm:w-32"
          sizes="128px"
          priority
        />
      </div>

      <p className="mt-5 text-base leading-7 text-muted">
        Cinq questions rapides pour vérifier que nous pouvons vous accompagner à
        distance. Vos coordonnées ne sont demandées qu’ensuite, si votre
        situation est éligible.
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {guarantees.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-medium text-muted"
          >
            <Check className="size-3.5 text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 border-l-2 border-brand bg-brand-soft/50 px-5 py-4">
        <p className="text-sm leading-6 text-muted">
          Les Orthos en Visio est responsable du traitement. Les réponses au test
          restent dans cette session et sont supprimées si votre situation n’est
          pas éligible. Si vous poursuivez, vos informations sont traitées selon
          notre politique de confidentialité.
        </p>
      </div>

      <button type="button" onClick={onStart} className={cn(flowPrimaryClass, "mt-8 w-full sm:w-auto")}>
        Commencer le test
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </FlowCard>
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

const resultTones = {
  positive: "bg-brand-soft text-brand",
  neutral: "bg-surface-muted text-foreground",
  warning: "bg-accent-soft text-foreground",
} as const;

function ResultCard({
  tone,
  icon: Icon,
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  onPrimary,
  secondaryHref,
  secondaryLabel,
  onBack,
  onRestart,
}: {
  tone: keyof typeof resultTones;
  icon: typeof ShieldCheck;
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  onPrimary?: () => void;
  secondaryHref?: string;
  secondaryLabel?: string;
  onBack?: () => void;
  onRestart?: () => void;
}) {
  return (
    <FlowCard>
      <span
        className={cn(
          "inline-flex size-14 items-center justify-center rounded-2xl",
          resultTones[tone],
        )}
      >
        <Icon className="size-6" aria-hidden />
      </span>

      <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[1.6rem] font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">{body}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {primaryHref ? (
          <a
            href={primaryHref}
            target="_blank"
            rel="noreferrer"
            className={flowPrimaryClass}
          >
            {primaryLabel}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        ) : (
          <button type="button" onClick={onPrimary} className={flowPrimaryClass}>
            {primaryLabel}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        )}
        {secondaryHref && secondaryLabel ? (
          <Link href={secondaryHref} className={flowGhostClass}>
            {secondaryLabel}
          </Link>
        ) : null}
      </div>

      {onBack || onRestart ? (
        <div className="mt-7 border-t border-border pt-5">
          <button
            type="button"
            onClick={onBack ?? onRestart}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {onBack ? "Modifier mes réponses" : "Recommencer le test"}
          </button>
        </div>
      ) : null}
    </FlowCard>
  );
}

function DetailsForm({
  birthDate,
  onBack,
  onSubmit,
  submitting,
  error,
}: {
  birthDate: string;
  onBack: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  error: string;
}) {
  const [patientBirthDate, setPatientBirthDate] = useState(birthDate);
  const patientAge = calculateAge(patientBirthDate);
  const patientIsMinor = patientAge !== null && patientAge < 18;

  return (
    <div>
      <div className="max-w-xl">
        <FlowEyebrow icon={Check}>Dernière étape</FlowEyebrow>
        <h1 className="mt-5 font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl">
          Finalisez votre demande
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Votre situation est éligible. Renseignez les informations nécessaires à
          la préparation du rendez-vous.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <FormSection index={1} title="Le patient">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom" htmlFor="patient-last-name" required>
              <input
                id="patient-last-name"
                name="patientLastName"
                required
                autoComplete="family-name"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Prénom" htmlFor="patient-first-name" required>
              <input
                id="patient-first-name"
                name="patientFirstName"
                required
                autoComplete="given-name"
                className={flowFieldClass}
              />
            </Field>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium text-foreground">
              Date de naissance <span className="text-accent">*</span>
            </p>
            <BirthDateField
              name="patientBirthDate"
              value={patientBirthDate}
              onChange={setPatientBirthDate}
            />
          </div>
          <div className="mt-5 max-w-xs">
            <Field label="Sexe" htmlFor="patient-sex">
              <select
                id="patient-sex"
                name="patientSex"
                defaultValue=""
                className={flowFieldClass}
              >
                <option value="">Non renseigné</option>
                <option value="female">Féminin</option>
                <option value="male">Masculin</option>
              </select>
            </Field>
          </div>
        </FormSection>

        {patientIsMinor ? (
          <FormSection index={2} title="Le représentant légal">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nom" htmlFor="guardian-last-name" required>
                <input
                  id="guardian-last-name"
                  name="guardianLastName"
                  required
                  className={flowFieldClass}
                />
              </Field>
              <Field label="Prénom" htmlFor="guardian-first-name" required>
                <input
                  id="guardian-first-name"
                  name="guardianFirstName"
                  required
                  className={flowFieldClass}
                />
              </Field>
              <Field label="Lien avec le patient" htmlFor="guardian-link" required>
                <select
                  id="guardian-link"
                  name="guardianLink"
                  required
                  defaultValue=""
                  className={flowFieldClass}
                >
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  <option value="mother">Mère</option>
                  <option value="father">Père</option>
                  <option value="legal-guardian">Tuteur légal</option>
                  <option value="other">Autre</option>
                </select>
              </Field>
            </div>
            <div className="mt-5">
              <Consent name="parentalAuthority" required>
                Je certifie être titulaire de l’autorité parentale.
              </Consent>
            </div>
          </FormSection>
        ) : null}

        <FormSection index={patientIsMinor ? 3 : 2} title="Coordonnées">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Adresse e-mail" htmlFor="email" required>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Téléphone" htmlFor="phone" required>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+33 6 00 00 00 00"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Adresse postale" htmlFor="address" required>
              <input
                id="address"
                name="address"
                required
                autoComplete="street-address"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Code postal" htmlFor="postal-code" required>
              <input
                id="postal-code"
                name="postalCode"
                required
                autoComplete="postal-code"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Ville" htmlFor="city" required>
              <input
                id="city"
                name="city"
                required
                autoComplete="address-level2"
                className={flowFieldClass}
              />
            </Field>
            <Field label="Pays" htmlFor="country" required>
              <select
                id="country"
                name="country"
                required
                defaultValue="France"
                autoComplete="country-name"
                className={flowFieldClass}
              >
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Luxembourg</option>
                <option>Autre</option>
              </select>
            </Field>
          </div>
        </FormSection>

        <FormSection index={patientIsMinor ? 4 : 3} title="Parcours de soin">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nom du médecin prescripteur" htmlFor="doctor-name">
              <input
                id="doctor-name"
                name="doctorName"
                className={flowFieldClass}
              />
            </Field>
            <Field
              label="Avez-vous une ordonnance ?"
              htmlFor="prescription"
              required
            >
              <select
                id="prescription"
                name="prescription"
                required
                defaultValue=""
                className={flowFieldClass}
              >
                <option value="" disabled>
                  Sélectionner
                </option>
                <option value="yes">Oui</option>
                <option value="no">Non</option>
              </select>
            </Field>
            <Field
              label="Le patient a-t-il déjà été suivi en orthophonie ?"
              htmlFor="previous-care"
              required
            >
              <select
                id="previous-care"
                name="previousCare"
                required
                defaultValue=""
                className={flowFieldClass}
              >
                <option value="" disabled>
                  Sélectionner
                </option>
                <option value="yes">Oui</option>
                <option value="no">Non</option>
              </select>
            </Field>
            <Field label="Comment nous avez-vous connus ?" htmlFor="source">
              <select
                id="source"
                name="source"
                defaultValue=""
                className={flowFieldClass}
              >
                <option value="">Sélectionner</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="google">Recherche Google</option>
                <option value="word-of-mouth">Bouche-à-oreille</option>
                <option value="health-professional">
                  Professionnel de santé
                </option>
                <option value="other">Autre</option>
              </select>
            </Field>
          </div>
        </FormSection>

        <FormSection index={patientIsMinor ? 5 : 4} title="Consentements">
          <div className="flex flex-col gap-3">
            <Consent name="terms" required>
              J’accepte les Conditions Générales de Vente et ai pris connaissance
              de la politique de confidentialité.
            </Consent>
            <Consent name="earlyStart" required>
              Je demande expressément que la prestation commence avant la fin du
              délai de rétractation de 14 jours.
            </Consent>
            <Consent name="marketing">
              J’accepte de recevoir des e-mails d’information de la part des
              Orthos en Visio.
            </Consent>
          </div>
        </FormSection>

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <div className="sticky bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 mt-2">
          <div className="flex flex-col-reverse gap-3 rounded-[var(--radius-card)] border border-border bg-surface/95 p-3 shadow-[var(--shadow-card)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:py-2 sm:pl-5">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
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
        </div>
      </form>
    </div>
  );
}

function FormSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <FlowCard>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
          {index}
        </span>
        <h2 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </FlowCard>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block min-w-0">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function Consent({
  name,
  required = false,
  children,
}: {
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl bg-surface-muted/70 px-4 py-3 text-sm leading-6 text-foreground transition-colors hover:bg-surface-muted">
      <input
        type="checkbox"
        name={name}
        required={required}
        className="mt-1 size-4 shrink-0 accent-[var(--brand)]"
      />
      <span>
        {children}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </span>
    </label>
  );
}

function ThanksStep({ onRestart }: { onRestart: () => void }) {
  return (
    <FlowCard className="text-center">
      <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Check className="size-7" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Demande envoyée
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
        Merci. Votre demande a bien été enregistrée. Notre équipe vous
        recontactera rapidement pour la suite.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className={flowPrimaryClass}>
          Retour à l’accueil
        </Link>
        <button type="button" onClick={onRestart} className={flowGhostClass}>
          Nouvelle demande
        </button>
      </div>
    </FlowCard>
  );
}
