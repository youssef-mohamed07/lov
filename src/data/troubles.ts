export const troublesPage = {
  title: "Troubles que nous accompagnons",
  description:
    "Comprendre les difficultés de langage, de parole et d’apprentissage — puis trouver le parcours adapté.",
} as const;

export type Trouble = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  overview: string;
  signs: string[];
  approach: string;
  image: string;
};

export const troubles: Trouble[] = [
  {
    slug: "dyslexie",
    title: "Dyslexie",
    shortTitle: "Dyslexie",
    description:
      "Trouble spécifique de l’apprentissage de la lecture qui persiste malgré un enseignement adapté.",
    overview:
      "La dyslexie affecte le décodage, la fluidité et parfois la compréhension écrite. Un bilan orthophonique permet d’en préciser le profil et d’orienter la prise en charge.",
    signs: [
      "Lecture lente, hésitante ou très fatigante",
      "Confusions de lettres ou de sons",
      "Difficultés en orthographe associées",
      "Évitement des tâches de lecture",
    ],
    approach:
      "Nous travaillons la conscience phonologique, le décodage et les stratégies de compensation, en lien avec l’école et la famille.",
    image: "/images/trouble-dyslexia.jpg",
  },
  {
    slug: "retard-parole-langage",
    title: "Retard de parole / langage",
    shortTitle: "Retard de parole",
    description:
      "Développement plus lent du vocabulaire, de la phrase ou de l’intelligibilité par rapport à l’âge.",
    overview:
      "Un retard de parole ou de langage peut freiner la communication, la scolarité et la confiance. Plus l’évaluation est précoce, plus l’accompagnement est efficace.",
    signs: [
      "Peu de mots à un âge où l’on en attend davantage",
      "Phrases très courtes ou peu structurées",
      "Parole difficile à comprendre hors du cercle familial",
      "Frustration ou colères liées à la communication",
    ],
    approach:
      "Le bilan précise le niveau oral, les praxies et la compréhension. La rééducation s’appuie sur le jeu, le quotidien et la guidance parentale.",
    image: "/images/trouble-speech.jpg",
  },
  {
    slug: "begaiement",
    title: "Bégaiement",
    shortTitle: "Bégaiement",
    description:
      "Disfluence qui coupe le flux de la parole : répétitions, blocages, prolongements.",
    overview:
      "Le bégaiement n’est pas un défaut de volonté. Un accompagnement orthophonique aide à fluidifier la parole et à réduire l’impact émotionnel.",
    signs: [
      "Répétitions de sons, syllabes ou mots",
      "Blocages ou efforts visibles pour parler",
      "Évitement de certaines situations de parole",
      "Tension, peur de parler ou perte de confiance",
    ],
    approach:
      "Nous combinons travail sur la fluidité, régulation du rythme et soutien à la communication dans les contextes du quotidien.",
    image: "/images/trouble-stutter.jpg",
  },
  {
    slug: "dysorthographie",
    title: "Dysorthographie",
    shortTitle: "Dysorthographie",
    description:
      "Trouble durable de l’acquisition de l’orthographe, souvent associé à la dyslexie.",
    overview:
      "La dysorthographie rend l’écrit coûteux et source d’erreurs persistantes. L’évaluation orthophonique aide à distinguer les mécanismes en jeu.",
    signs: [
      "Nombreuses fautes malgré les révisions",
      "Orthographe irrégulière d’un jour à l’autre",
      "Difficulté à mémoriser les formes écrites",
      "Évitement de l’écrit ou fatigue importante",
    ],
    approach:
      "La prise en charge cible la phonologie, la morphologie et des stratégies d’écriture adaptées au profil de l’enfant ou de l’adolescent.",
    image: "/images/trouble-writing.jpg",
  },
  {
    slug: "dyscalculie",
    title: "Dyscalculie",
    shortTitle: "Dyscalculie",
    description:
      "Trouble spécifique des apprentissages numériques : sens du nombre, calcul, problèmes.",
    overview:
      "La dyscalculie ne se résume pas à « être mauvais en maths ». Un bilan clarifie les compétences numériques et oriente les aménagements.",
    signs: [
      "Difficulté à comparer des quantités",
      "Calcul mental très laborieux",
      "Confusion dans les opérations ou les consignes",
      "Anxiété face aux situations mathématiques",
    ],
    approach:
      "Nous travaillons le sens du nombre, les représentations et les stratégies de résolution, en coordination avec l’équipe pédagogique.",
    image: "/images/trouble-math.jpg",
  },
  {
    slug: "articulation",
    title: "Troubles de l’articulation",
    shortTitle: "Articulation",
    description:
      "Production incorrecte ou imprécise de certains sons, qui altère l’intelligibilité.",
    overview:
      "Un trouble articulatoire peut être phonétique ou phonologique. Le bilan permet de choisir le bon axe de rééducation.",
    signs: [
      "Sons déformés ou remplacés",
      "Parole peu intelligible pour l’entourage",
      "Persistance après l’âge attendu d’acquisition",
      "Gêne sociale ou moqueries éventuelles",
    ],
    approach:
      "Les séances ciblent la discrimination auditive, les praxies et la généralisation des sons corrects en conversation.",
    image: "/images/trouble-articulation.jpg",
  },
  {
    slug: "dysphasie",
    title: "Dysphasie / TDL",
    shortTitle: "Dysphasie",
    description:
      "Trouble développemental du langage (TDL) qui affecte durablement l’expression et/ou la compréhension.",
    overview:
      "La dysphasie demande une évaluation fine et un accompagnement au long cours, souvent multidisciplinaire.",
    signs: [
      "Langage oral très en décalage avec l’âge",
      "Compréhension partielle des consignes",
      "Structure de phrase fragile",
      "Répercussions scolaires et relationnelles marquées",
    ],
    approach:
      "Nous structurons un projet thérapeutique clair, avec des objectifs mesurables et un soutien aux aidants.",
    image: "/images/trouble-language.jpg",
  },
  {
    slug: "voix",
    title: "Troubles de la voix",
    shortTitle: "Voix",
    description:
      "Dysphonie, fatigue vocale ou usage vocal inadapté qui altère la qualité de la voix.",
    overview:
      "La voix peut souffrir d’un usage intensif, d’un reflux, d’un stress ou d’une pathologie. L’orthophonie aide à retrouver un geste vocal confortable.",
    signs: [
      "Voix rauque, soufflée ou instable",
      "Fatigue vocale en fin de journée",
      "Perte de puissance ou de tessiture",
      "Douleur ou effort pour parler",
    ],
    approach:
      "Bilan vocal, hygiène de vie vocale et rééducation du geste phonatoire, éventuellement en lien avec un ORL.",
    image: "/images/trouble-voice.jpg",
  },
];

export function getTrouble(slug: string) {
  return troubles.find((trouble) => trouble.slug === slug);
}

export function getAllTroubleSlugs() {
  return troubles.map((trouble) => trouble.slug);
}

export function getRelatedTroubles(slug: string, limit = 3) {
  return troubles.filter((item) => item.slug !== slug).slice(0, limit);
}
