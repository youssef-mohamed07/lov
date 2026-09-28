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
    image: "/images/drive-home-section-7-b.png",
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
          "Vous repartez avec des réponses à vos questions et un compte rendu écrit.",
      },
    ],
  },
  overview: {
    badge: "Pourquoi le bilan",
    title: "Une évaluation complète",
    titleAccent: "pour comprendre son fonctionnement",
    body: "Le bilan orthophonique précise le profil, pose les priorités et ouvre une suite concrète.",
    image: "/images/drive-bilan-section-4.png",
    imageAlt: "Séance de bilan orthophonique",
    leftFeatures: [
      "Propose des pistes concrètes.",
      "Pour savoir si une inquiétude mérite un accompagnement, ou quelques conseils à la maison.",
      "Un document conforme pour les médecins et les aménagements scolaires.",
    ],
    rightFeatures: [
      "Essentiel pour toutes vos démarches (PAP, PPS, MDPH…).",
      "Avancer avec des réponses et des conseils adaptés.",
      "L’orthophoniste répond à toutes vos questions et vous guide pour la suite.",
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
        "Comptez environ 1h, entretien et tests compris. Un second rendez-vous pourra vous être proposé pour terminer les épreuves si besoin.",
      image: "/images/drive-home-section-2.png",
    },
    {
      step: "02",
      title: "Ce qu’il faut prévoir",
      description:
        "Un espace calme, une bonne connexion internet, et un ordinateur ou tablette avec un écran suffisamment grand pour le confort visuel.",
      image: "/images/drive-bilan-section-4.png",
    },
    {
      step: "03",
      title: "Confidentialité",
      description:
        "Nos échanges restent strictement confidentiels, le compte rendu est déposé sur votre espace personnel sécurisé.",
      image: "/images/drive-bilan-section-4.png",
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
