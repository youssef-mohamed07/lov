import type { FaqItem } from "@/components/common/faq";

export const bilan = {
  title: "Bilan orthophonique",
  description:
    "Une évaluation structurée du langage, de la parole et des apprentissages pour clarifier le profil et définir des pistes concrètes.",
  heroEyebrow: "Évaluation clinique",
  overview: {
    badge: "Pourquoi le bilan",
    title: "Une évaluation claire,",
    titleAccent: "pensée pour les familles",
    body: "Le bilan orthophonique précise le profil, pose les priorités et ouvre une suite concrète — sans jargon inutile.",
    image: "/images/path-bilan.jpg",
    imageAlt: "Séance de bilan orthophonique",
    leftFeatures: [
      {
        title: "Entretien guidé",
        description:
          "Histoire, difficultés actuelles et attentes — pour poser le bon cadre dès le départ.",
      },
      {
        title: "Tests adaptés",
        description:
          "Une batterie choisie selon l’âge et le motif, jamais générique.",
      },
      {
        title: "Lecture du profil",
        description:
          "Des résultats expliqués simplement, pour comprendre ce qui se joue vraiment.",
      },
    ],
    rightFeatures: [
      {
        title: "Restitution claire",
        description:
          "Vous repartez avec des mots justes, pas seulement un compte-rendu technique.",
      },
      {
        title: "Pistes concrètes",
        description:
          "Aménagements, suivi ou orientation — des prochaines étapes actionnables.",
      },
      {
        title: "Compte-rendu écrit",
        description:
          "Un document utile pour la famille, l’école et les professionnels.",
      },
    ],
  },
  process: {
    badge: "Process",
    title: "Un parcours simplifié,",
    titleAccent: "étape par étape",
    body: "Du premier échange à la restitution, chaque temps du bilan est clair — pour que vous sachiez toujours où vous en êtes.",
    ctaLabel: "Demander un bilan",
    ctaHref: "/nous-contacter",
  },
  steps: [
    {
      step: "01",
      title: "Entretien",
      description:
        "Nous recueillons l’histoire développementale, les difficultés actuelles et les attentes de la famille ou de l’adulte.",
      image: "/images/step-orient.jpg",
    },
    {
      step: "02",
      title: "Évaluation",
      description:
        "Tests et observations cliniques pour objectiver le langage oral, écrit, la parole, la voix ou la cognition mathématique selon le motif.",
      image: "/images/step-eval.jpg",
    },
    {
      step: "03",
      title: "Restitution",
      description:
        "Vous repartez avec une lecture claire, des recommandations, et si besoin un projet thérapeutique.",
      image: "/images/step-followup.jpg",
    },
  ],
  includes: [
    "Anamnèse approfondie",
    "Batterie de tests adaptée à l’âge et au motif",
    "Compte-rendu écrit",
    "Pistes de suivi et d’aménagements",
    "Restitution claire pour la famille",
    "Orientation vers la suite si besoin",
  ],
  price: {
    amount: "180€",
    label: "Parcours bilan",
    detail: "Évaluation structurée, restitution et compte-rendu inclus.",
  },
  reassurance: [
    {
      title: "Sans jargon",
      description: "Une restitution claire, compréhensible dès le premier échange.",
    },
    {
      title: "Adapté à l’âge",
      description: "Des tests choisis selon le motif et le profil.",
    },
    {
      title: "Suite concrète",
      description: "Des pistes actionnables, pas seulement un diagnostic.",
    },
  ],
  faq: [
    {
      question: "Combien de temps dure un bilan ?",
      answer:
        "Le bilan s’étale généralement sur une à plusieurs séances selon l’âge et le motif, puis une restitution claire vous est proposée.",
    },
    {
      question: "Faut-il une ordonnance ?",
      answer:
        "Selon votre situation et le cadre de prise en charge, une prescription peut être utile. Nous vous indiquons la marche à suivre lors de la prise de contact.",
    },
    {
      question: "Le simulateur remplace-t-il le bilan ?",
      answer:
        "Non. Le simulateur donne une orientation indicative. Seul le bilan orthophonique évalue précisément le profil.",
    },
    {
      question: "Que se passe-t-il après le bilan ?",
      answer:
        "Vous repartez avec un compte-rendu et des recommandations. Si un suivi est indiqué, nous proposons un projet adapté.",
    },
  ] satisfies FaqItem[],
} as const;
