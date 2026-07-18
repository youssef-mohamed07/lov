import type { FaqItem } from "@/components/common/faq";

export const about = {
  title: "À propos de Lov",
  description:
    "Nous rendons l’orthophonie plus claire — pour que familles et adultes puissent comprendre, s’orienter, et avancer.",
  reassurance: [
    {
      title: "Orthophonistes diplômés",
      description: "Une équipe formée, supervisée, et spécialisée.",
    },
    {
      title: "Parcours lisible",
      description: "Du simulateur au bilan, chaque étape est claire.",
    },
    {
      title: "Cadre confidentiel",
      description: "Des échanges privés, sécurisés et respectueux.",
    },
  ],
  overview: {
    eyebrow: "Le bilan",
    title: "Un bilan orthophonique",
    titleAccent: "structuré et lisible",
    body: "Le bilan précise le profil, pose les priorités et ouvre une suite concrète — sans jargon inutile. C’est le cœur de notre accompagnement : évaluer pour mieux orienter.",
    points: [
      "Tests adaptés à l’âge et au motif",
      "Restitution claire pour la famille",
      "Compte-rendu écrit et pistes de suivi",
    ],
    image: "/images/path-bilan.jpg",
    imageAlt: "Séance de bilan orthophonique",
  },
  whyOnline: {
    eyebrow: "Pourquoi en ligne ?",
    title: "La clarté d’abord,",
    titleAccent: "où que vous soyez",
    body: "L’orientation et la préparation du bilan peuvent commencer à distance — pour gagner du temps, lever le flou, et arriver mieux préparés à l’évaluation clinique.",
    points: [
      {
        title: "Premier pas immédiat",
        description: "Simulateur et demande de bilan accessibles sans attendre.",
      },
      {
        title: "Plus fluide",
        description: "Des questions guidées, des réponses enregistrées, un échange plus simple.",
      },
      {
        title: "Suite clinique",
        description: "Quand un bilan est indiqué, le parcours reste humain et structuré.",
      },
    ],
  },
  figures: {
    eyebrow: "Repères chiffrés",
    title: "Des chiffres qui ancrent",
    titleAccent: "notre pratique",
    items: [
      { value: 2400, suffix: "+", label: "Bilans accompagnés" },
      { value: 18, suffix: "+", label: "Orthophonistes partenaires" },
      { value: 96, suffix: "%", label: "Familles mieux orientées" },
      { value: 24, suffix: "h", label: "Délai de première réponse" },
    ],
  },
  founders: {
    eyebrow: "Co-fondateurs",
    title: "Ceux qui portent",
    titleAccent: "le projet",
    people: [
      {
        name: "Camille Renard",
        role: "Orthophoniste · Co-fondatrice",
        bio: "Clinique, pédagogie et souci du détail — pour que chaque famille reparte avec des mots qui aident.",
        image: "/images/dialogue-therapist.jpg",
      },
      {
        name: "Léo Martin",
        role: "Produit · Co-fondateur",
        bio: "Des parcours numériques sobres, pensés pour clarifier le premier pas sans remplacer le soin.",
        image: "/images/expertise-listening.jpg",
      },
    ],
  },
  values: {
    eyebrow: "Valeurs",
    title: "Ce qui nous guide",
    titleAccent: "au quotidien",
    items: [
      {
        title: "Clarté",
        description: "Des mots simples, des étapes visibles, des attentes posées.",
      },
      {
        title: "Rigueur",
        description: "Des approches fondées sur la preuve, adaptées à chaque profil.",
      },
      {
        title: "Respect",
        description: "Un cadre bienveillant pour l’enfant, l’adulte et les aidants.",
      },
      {
        title: "Accessibilité",
        description: "Rendre l’orientation possible sans parcours opaque ni jargon.",
      },
      {
        title: "Proximité",
        description: "Une écoute humaine, disponible dès le premier message.",
      },
      {
        title: "Continuité",
        description: "Du simulateur au suivi, un fil clair sans rupture.",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Questions",
    titleAccent: "fréquentes",
    items: [
      {
        question: "Lov est-il un cabinet d’orthophonie ?",
        answer:
          "Lov propose orientation, préparation du bilan et ressources. Les bilans et suivis sont réalisés par des orthophonistes diplômés, dans un cadre clinique clair.",
      },
      {
        question: "Le simulateur remplace-t-il un bilan ?",
        answer:
          "Non. Il donne une première lecture indicative. Seul un bilan orthophonique permet d’évaluer précisément le profil.",
      },
      {
        question: "Comment démarrer ?",
        answer:
          "Vous pouvez commencer par le simulateur, ou directement demander un bilan. Nous vous répondons sous 24–48h.",
      },
      {
        question: "Travaillez-vous avec les écoles ?",
        answer:
          "Oui, lorsque c’est pertinent : le compte-rendu et les pistes peuvent faciliter le lien avec l’équipe éducative.",
      },
    ] satisfies FaqItem[],
  },
} as const;
