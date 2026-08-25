import type { FaqItem } from "@/components/common/faq";

export const bilan = {
  title: "Bilan orthophonique en téléconsultation, depuis chez vous.",
  description:
    "Une évaluation structurée du langage, de la parole et des apprentissages, pour clarifier le profil de votre enfant et définir des pistes concrètes.",
  hero: {
    eyebrow: "Les Orthos en Visio",
    title: "Bilan orthophonique",
    titleAccent: "en téléconsultation, depuis chez vous.",
    ctaLabel: "Demander un bilan",
    ctaHref: "/demander-un-bilan",
    mentions: ["Bilan normé", "Tests étalonnés", "Compte rendu écrit"],
  },
  trust: {
    image: "/images/showcase-family.jpg",
    imageAlt: "Échange entre une famille et un professionnel autour d’un bilan",
    badgeLabel: "Bilans réalisés",
    badgeValue: "400",
    imageCaption: "Évaluation conforme aux exigences administratives",
    eyebrow: "Pourquoi nous faire confiance ?",
    title: "Le bilan orthophonique,",
    titleAccent: "une autre façon de procéder",
    description:
      "Notre cabinet en ligne réalise votre bilan depuis chez vous, avec les mêmes exigences qu’un bilan en cabinet.",
    ctaLabel: "Demander un bilan",
    ctaHref: "/demander-un-bilan",
  },
  parcours: {
    eyebrow: "Parcours",
    title: "3 étapes simples",
    steps: [
      {
        title: "Réservation",
        description: "Choisissez un créneau dans notre agenda en ligne.",
      },
      {
        title: "Évaluation",
        description: "Le bilan est réalisé en visio, depuis chez vous.",
      },
      {
        title: "Restitution",
        description:
          "Vous repartez avec une lecture claire et un compte rendu écrit.",
      },
    ],
  },
  overview: {
    badge: "Pourquoi le bilan",
    title: "Une évaluation claire,",
    titleAccent: "pensée pour être comprise",
    body: "Le bilan orthophonique précise le profil, pose les priorités et ouvre une suite concrète, sans jargon inutile.",
    image: "/images/path-bilan.jpg",
    imageAlt: "Séance de bilan orthophonique",
    leftFeatures: [
      {
        title: "Mettre des mots sur ce que vous observez",
        description:
          "Ce que vous ressentez au quotidien devient un profil clair et documenté.",
      },
      {
        title: "Distinguer une variation normale d’un vrai besoin",
        description:
          "Pour savoir si une inquiétude mérite un accompagnement, ou simplement du temps.",
      },
      {
        title: "Un avis professionnel, sans attendre des mois",
        description:
          "Un premier rendez-vous rapide, pour ne pas rester dans le doute.",
      },
    ],
    rightFeatures: [
      {
        title: "Un document reconnu pour l’école ou un médecin",
        description:
          "Utile pour toutes vos démarches, sans avoir à tout réexpliquer.",
      },
      {
        title: "Savoir si un accompagnement est nécessaire, et lequel",
        description:
          "Une réponse concrète, adaptée à la situation de votre enfant.",
      },
      {
        title: "Avancer avec des réponses, plutôt qu’avec des questions",
        description:
          "Le bilan referme une incertitude pour en ouvrir une plus claire.",
      },
    ],
  },
  process: {
    badge: "Infos pratiques",
    title: "Ce qu’il faut savoir",
    titleAccent: "avant votre rendez-vous",
    body: "Quelques repères, pour vous présenter sereinement au bilan.",
    ctaLabel: "Demander un bilan",
    ctaHref: "/nous-contacter",
  },
  steps: [
    {
      step: "01",
      title: "Durée",
      description:
        "Comptez environ 1h30, entretien et tests compris. La restitution peut avoir lieu le même jour ou lors d’un second rendez-vous, selon la disponibilité.",
      image: "/images/step-orient.jpg",
    },
    {
      step: "02",
      title: "Ce qu’il faut prévoir",
      description:
        "Un espace calme, une bonne connexion internet, et si possible les derniers bulletins scolaires ou comptes rendus déjà réalisés.",
      image: "/images/step-eval.jpg",
    },
    {
      step: "03",
      title: "Confidentialité",
      description:
        "Vos échanges restent strictement confidentiels. Le compte rendu n’est transmis qu’aux personnes que vous choisissez.",
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
