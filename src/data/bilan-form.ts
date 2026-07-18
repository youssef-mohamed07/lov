export type BilanChoiceOption = {
  label: string;
  value: string;
};

export type BilanStep =
  | {
      id: "firstName";
      kind: "text";
      prompt: string;
      placeholder: string;
      helper?: string;
    }
  | {
      id: "age" | "reason" | "duration" | "followed";
      kind: "choice";
      prompt: string;
      options: BilanChoiceOption[];
    }
  | {
      id: "notes";
      kind: "textarea";
      prompt: string;
      placeholder: string;
      optional?: boolean;
    };

export const bilanFormCopy = {
  eyebrow: "Demande de bilan",
  title: "Quelques questions pour préparer votre bilan",
  description:
    "Répondez à votre rythme — une question à la fois. Vos réponses sont enregistrées automatiquement.",
  disclaimer:
    "Cet outil prépare votre demande. Il ne remplace pas un bilan orthophonique ni un avis médical.",
  next: "Suivant",
  back: "Retour",
  submit: "Recevoir mon bilan",
  summaryTitle: "Récapitulatif",
  summarySubtitle: "Vérifiez vos réponses avant de laisser vos coordonnées.",
  contactTitle: "Vos coordonnées",
  contactSubtitle: "Nous vous recontactons rapidement pour convenir d’un créneau.",
  merciTitle: "Merci",
  merciBody:
    "Votre demande de bilan a bien été envoyée. Notre équipe vous contacte sous 24 à 48 heures ouvrées.",
  restart: "Nouvelle demande",
  home: "Retour à l’accueil",
} as const;

export const bilanQuestions: BilanStep[] = [
  {
    id: "firstName",
    kind: "text",
    prompt: "Quel est le prénom de votre enfant ?",
    placeholder: "Prénom",
    helper: "Prénom uniquement — nous l’utiliserons pour personnaliser l’échange.",
  },
  {
    id: "age",
    kind: "choice",
    prompt: "Quel âge a votre enfant ?",
    options: [
      { label: "2–3 ans", value: "2-3" },
      { label: "4–5 ans", value: "4-5" },
      { label: "6–8 ans", value: "6-8" },
      { label: "9–12 ans", value: "9-12" },
    ],
  },
  {
    id: "reason",
    kind: "choice",
    prompt: "Pourquoi souhaitez-vous réaliser un bilan ?",
    options: [
      { label: "Difficultés de langage", value: "langage" },
      { label: "Difficultés de prononciation", value: "prononciation" },
      { label: "Difficultés de lecture", value: "lecture" },
      { label: "Difficultés d’écriture", value: "ecriture" },
      { label: "Je ne suis pas certain(e)", value: "incertain" },
    ],
  },
  {
    id: "duration",
    kind: "choice",
    prompt: "Depuis combien de temps observez-vous ces difficultés ?",
    options: [
      { label: "Quelques semaines", value: "semaines" },
      { label: "Quelques mois", value: "mois" },
      { label: "Plus d’un an", value: "plus-un-an" },
    ],
  },
  {
    id: "followed",
    kind: "choice",
    prompt: "Votre enfant est-il déjà suivi par un professionnel ?",
    options: [
      { label: "Oui", value: "oui" },
      { label: "Non", value: "non" },
    ],
  },
  {
    id: "notes",
    kind: "textarea",
    prompt: "Avez-vous des remarques particulières ?",
    placeholder: "Contexte scolaire, bilans antérieurs, attentes…",
    optional: true,
  },
];

export type BilanAnswers = {
  firstName: string;
  age: string;
  reason: string;
  duration: string;
  followed: string;
  notes: string;
  parentName: string;
  email: string;
  phone: string;
};

export const emptyBilanAnswers: BilanAnswers = {
  firstName: "",
  age: "",
  reason: "",
  duration: "",
  followed: "",
  notes: "",
  parentName: "",
  email: "",
  phone: "",
};

export function labelForAnswer(
  questionId: BilanStep["id"],
  value: string,
): string {
  if (!value) return "—";
  const step = bilanQuestions.find((item) => item.id === questionId);
  if (!step || step.kind !== "choice") return value;
  return step.options.find((option) => option.value === value)?.label ?? value;
}
