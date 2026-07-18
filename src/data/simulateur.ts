export type SimulatorQuestion = {
  id: string;
  prompt: string;
  options: { label: string; value: string; weight: Record<string, number> }[];
};

export const simulatorPage = {
  title: "Par où commencer ?",
  description:
    "Répondez à quelques questions pour une première orientation — indicative, rapide, et sans diagnostic.",
  disclaimer:
    "Cet outil ne remplace pas un bilan orthophonique ni un avis médical. En cas d’urgence, contactez le 15.",
} as const;

export const simulatorQuestions: SimulatorQuestion[] = [
  {
    id: "age",
    prompt: "La personne concernée est…",
    options: [
      {
        label: "Un enfant (avant le CP)",
        value: "enfant",
        weight: { "retard-parole-langage": 2, articulation: 1 },
      },
      {
        label: "Un élève (primaire / collège)",
        value: "eleve",
        weight: { dyslexie: 2, dysorthographie: 1 },
      },
      {
        label: "Un adolescent ou un adulte",
        value: "adulte",
        weight: { begaiement: 1, voix: 1, dyslexie: 1 },
      },
    ],
  },
  {
    id: "domaine",
    prompt: "La difficulté principale touche surtout…",
    options: [
      {
        label: "La lecture ou l’orthographe",
        value: "lecture",
        weight: { dyslexie: 2, dysorthographie: 2 },
      },
      {
        label: "La parole ou la fluidité",
        value: "parole",
        weight: { begaiement: 2, articulation: 2, "retard-parole-langage": 1 },
      },
      {
        label: "Le langage oral / la compréhension",
        value: "langage",
        weight: { dysphasie: 2, "retard-parole-langage": 2 },
      },
      {
        label: "Les maths / le sens du nombre",
        value: "maths",
        weight: { dyscalculie: 3 },
      },
      {
        label: "La voix",
        value: "voix",
        weight: { voix: 3 },
      },
    ],
  },
  {
    id: "impact",
    prompt: "L’impact au quotidien est…",
    options: [
      {
        label: "Léger, surtout ponctuel",
        value: "leger",
        weight: { equilibre: 2 },
      },
      {
        label: "Visible à l’école ou au travail",
        value: "ecole",
        weight: { dyslexie: 1, dysphasie: 1, bilan: 1 },
      },
      {
        label: "Source de forte gêne ou de souffrance",
        value: "fort",
        weight: { bilan: 2, begaiement: 1 },
      },
    ],
  },
  {
    id: "duree",
    prompt: "Ces difficultés…",
    options: [
      {
        label: "Sont récentes",
        value: "recentes",
        weight: { equilibre: 1, voix: 1 },
      },
      {
        label: "Durent depuis plusieurs mois",
        value: "mois",
        weight: { bilan: 1, "retard-parole-langage": 1 },
      },
      {
        label: "Sont présentes depuis longtemps",
        value: "longtemps",
        weight: { dyslexie: 1, dysphasie: 1, bilan: 1 },
      },
    ],
  },
  {
    id: "objectif",
    prompt: "Ce que vous cherchez en priorité…",
    options: [
      {
        label: "Comprendre ce qui se passe",
        value: "comprendre",
        weight: { bilan: 2 },
      },
      {
        label: "Commencer un accompagnement",
        value: "accompagnement",
        weight: { echange: 2 },
      },
      {
        label: "Les deux",
        value: "les-deux",
        weight: { bilan: 1, echange: 1 },
      },
    ],
  },
];

export const simulatorResults = {
  dyslexie: {
    title: "Piste : dyslexie / lecture",
    body: "Vos réponses évoquent surtout des difficultés liées à la lecture. Une page dédiée et un bilan orthophonique peuvent clarifier le profil.",
    ctaLabel: "Voir la dyslexie",
    ctaHref: "/troubles/dyslexie",
  },
  dysorthographie: {
    title: "Piste : dysorthographie",
    body: "L’écrit et l’orthographe semblent centraux. Un bilan permet de préciser les mécanismes et les aides possibles.",
    ctaLabel: "Voir la dysorthographie",
    ctaHref: "/troubles/dysorthographie",
  },
  "retard-parole-langage": {
    title: "Piste : retard de parole / langage",
    body: "Le développement oral semble en décalage. Une évaluation précoce aide à poser un cadre clair.",
    ctaLabel: "Voir le retard de langage",
    ctaHref: "/troubles/retard-parole-langage",
  },
  begaiement: {
    title: "Piste : bégaiement",
    body: "La fluidité de la parole semble au premier plan. Un accompagnement orthophonique peut réduire l’impact au quotidien.",
    ctaLabel: "Voir le bégaiement",
    ctaHref: "/troubles/begaiement",
  },
  dyscalculie: {
    title: "Piste : dyscalculie",
    body: "Les difficultés numériques semblent dominantes. Un bilan peut objectiver le sens du nombre et le calcul.",
    ctaLabel: "Voir la dyscalculie",
    ctaHref: "/troubles/dyscalculie",
  },
  articulation: {
    title: "Piste : articulation",
    body: "L’intelligibilité ou certains sons semblent concernés. Une évaluation précise oriente la rééducation.",
    ctaLabel: "Voir l’articulation",
    ctaHref: "/troubles/articulation",
  },
  dysphasie: {
    title: "Piste : dysphasie / TDL",
    body: "Le langage oral (expression et/ou compréhension) semble durablement fragile. Un bilan approfondi est recommandé.",
    ctaLabel: "Voir la dysphasie",
    ctaHref: "/troubles/dysphasie",
  },
  voix: {
    title: "Piste : voix",
    body: "La qualité ou le confort vocal semble central. Un bilan vocal, parfois couplé à un avis ORL, peut aider.",
    ctaLabel: "Voir les troubles de la voix",
    ctaHref: "/troubles/voix",
  },
  equilibre: {
    title: "Piste : besoin de repères",
    body: "Vous semblez surtout chercher de la clarté. Le simulateur est un bon début — un bilan orthophonique approfondira si besoin.",
    ctaLabel: "Découvrir le bilan",
    ctaHref: "/bilan",
  },
  bilan: {
    title: "Orientation recommandée : bilan orthophonique",
    body: "Un bilan structuré semble adapté pour mettre des mots justes sur la situation avant d’engager un suivi.",
    ctaLabel: "Demander un bilan",
    ctaHref: "/bilan",
  },
  echange: {
    title: "Orientation recommandée : prise de contact",
    body: "Un premier échange peut déjà vous aider à choisir le bon format d’accompagnement.",
    ctaLabel: "Nous contacter",
    ctaHref: "/nous-contacter",
  },
} as const;

export type SimulatorResultKey = keyof typeof simulatorResults;
