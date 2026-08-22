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

export type EligibilityOption = {
  label: string;
  value: string;
  eligible: boolean;
};

export const bookingForOptions = [
  { label: "Mon enfant", value: "child" },
  { label: "Moi-même", value: "self" },
  { label: "Un proche", value: "relative" },
] as const;

export const eligibilityReasons = {
  young: [
    { label: "Mon enfant parle peu ou pas encore", value: "late-language", eligible: true },
    { label: "On le comprend difficilement", value: "speech-clarity", eligible: true },
    { label: "Mon enfant bégaie, répète des mots", value: "stuttering-young", eligible: true },
    { label: "Mon enfant a du mal à manger, refuse des aliments", value: "feeding-young", eligible: true },
    { label: "Mon enfant place mal sa langue, avale mal", value: "swallowing-young", eligible: false },
    { label: "Mon enfant respire par la bouche / bave beaucoup", value: "mouth-breathing-young", eligible: false },
    { label: "Mon enfant a la voix enrouée", value: "voice-young", eligible: false },
    { label: "Mon enfant s’étouffe, il fait des fausses routes", value: "choking-young", eligible: false },
    { label: "Mon enfant a du mal à écrire / dessiner", value: "writing-young", eligible: false },
    { label: "Autre situation", value: "other-young", eligible: false },
  ],
  minor: [
    { label: "Mon enfant a du mal à parler, communiquer", value: "communication-minor", eligible: true },
    { label: "Mon enfant bégaie, répète des mots", value: "stuttering-minor", eligible: false },
    { label: "Mon enfant a du mal à lire et/ou écrire", value: "literacy-minor", eligible: true },
    { label: "Mon enfant a des difficultés en mathématiques", value: "math-minor", eligible: true },
    { label: "Mon enfant a du mal à manger, refuse des aliments", value: "feeding-minor", eligible: true },
    { label: "Mon enfant place mal sa langue, avale mal", value: "swallowing-minor", eligible: true },
    { label: "Mon enfant respire par la bouche", value: "mouth-breathing-minor", eligible: true },
    { label: "Mon enfant a la voix enrouée", value: "voice-minor", eligible: false },
    { label: "Mon enfant s’étouffe, il fait des fausses routes", value: "choking-minor", eligible: false },
    { label: "Mon enfant a du mal à écrire / dessiner", value: "writing-minor", eligible: false },
    { label: "Autre situation", value: "other-minor", eligible: false },
  ],
  adult: [
    { label: "Difficultés à lire et/ou écrire", value: "literacy-adult", eligible: true },
    { label: "Difficultés à parler, à trouver des mots", value: "communication-adult", eligible: true },
    { label: "Difficultés d’attention et de mémoire", value: "memory-adult", eligible: true },
    { label: "Bégaiement, bredouillement", value: "stuttering-adult", eligible: false },
    { label: "Problème de voix, d’articulation", value: "voice-adult", eligible: false },
    { label: "Problème de déglutition", value: "swallowing-adult", eligible: false },
  ],
} as const satisfies Record<string, readonly EligibilityOption[]>;

export const particularSituations = [
  { label: "Troubles sensoriels : surdité ou malvoyance", value: "sensory" },
  { label: "Déficience intellectuelle avérée", value: "intellectual" },
  { label: "Trouble du spectre de l’autisme modéré à sévère", value: "autism" },
  { label: "Paralysie cérébrale et syndromes complexes", value: "cerebral" },
  { label: "Maladie neurologique évolutive", value: "neurological" },
  { label: "AVC ou traumatisme crânien datant de moins de trois mois", value: "recent-trauma" },
  { label: "Intervention chirurgicale ORL", value: "orl-surgery" },
  { label: "Aucune de ces situations", value: "none" },
] as const;

export const technicalConditions = [
  { label: "Je dispose d’un ordinateur ou d’une tablette avec caméra et micro", value: "device", minorOnly: false },
  { label: "Je dispose d’une connexion internet stable et d’une pièce calme", value: "connection", minorOnly: false },
  { label: "Un adulte pourra être présent au domicile pendant la séance", value: "adult-present", minorOnly: true },
] as const;
