import type { FaqItem } from "@/components/common/faq";

export const about = {
  title: "Les Orthos en Visio",
  description:
    "Nous rendons l'orthophonie plus claire, pour que chacun puisse comprendre, s'orienter et avancer.",
  recruitment: {
    eyebrow: "Rejoindre l'équipe",
    title: "Envie de faire partie de l'aventure ?",
    description:
      "Nous recrutons des orthophonistes et des profils produit qui partagent notre vision d'une orthophonie plus claire et plus accessible.",
    ctaLabel: "Voir les postes ouverts",
  },
  reassurance: [
    {
      title: "Orthophonistes diplômés",
      description: "Une équipe formée, supervisée et spécialisée.",
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
    eyebrow: "Ce qui nous guide",
    title: "Trois principes, à chaque séance",
    points: [
      {
        title: "Clarté",
        description: "Des mots simples, jamais de jargon qui isole.",
      },
      {
        title: "Rigueur",
        description: "Des méthodes reconnues, adaptées à chaque profil.",
      },
      {
        title: "Écoute",
        description:
          "Le temps d'entendre ce que vous observez, avant de répondre.",
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
    eyebrow: "Qui vous encadre",
    title: "Deux orthophonistes à la tête de LOV",
    description:
      "Morgane et Charlène dirigent l'équipe clinique au quotidien, et restent elles-mêmes en activité auprès des familles.",
    people: [
      {
        name: "Morgane",
        role: "Orthophoniste, co-fondatrice",
        bio: "Elle supervise la qualité clinique de l'équipe et veille à ce que chaque orthophoniste dispose du temps et du cadre nécessaires pour bien faire son travail.",
        image: "/images/dialogue-therapist.jpg",
      },
      {
        name: "Charlène",
        role: "Orthophoniste, co-fondatrice",
        bio: "Elle pilote l'organisation et l'accompagnement des nouvelles recrues, de la candidature jusqu'à la prise de poste.",
        image: "/images/expertise-listening.jpg",
      },
    ],
  },
  platform: {
    eyebrow: "Notre plateforme",
    title: "Nous avons construit ce qui nous manquait",
    description:
      "Morgane et Charlène ont vécu, en cabinet, les mêmes frustrations que beaucoup de familles : des outils dispersés, des informations qui se perdent, un suivi difficile à tenir dans la durée. LOV est né pour résoudre ça.",
    items: [
      {
        title: "Agenda en ligne",
        description:
          "Fini les allers-retours par téléphone pour caler un rendez-vous : vous réservez vous-même, à l'heure qui vous arrange.",
      },
      {
        title: "Rappels automatiques",
        description:
          "Plus de rendez-vous oublié faute de rappel : un message avant chaque séance, pour ne rien manquer.",
      },
      {
        title: "Comptes-rendus",
        description:
          "Plus de document papier égaré entre deux rendez-vous : chaque compte-rendu rangé dans votre espace, accessible à tout moment.",
      },
      {
        title: "Exercices personnalisés",
        description:
          "Les activités données en séance ne se perdent plus une fois rentré à la maison : retrouvez-les facilement entre les séances.",
      },
      {
        title: "Mesurer pour mieux progresser",
        description:
          "Percevoir les progrès sans recul sur plusieurs séances est difficile : un point régulier sur l'évolution de votre enfant, à partager avec l'école si besoin.",
      },
      {
        title: "Messagerie sécurisée",
        description:
          "Une question n'a plus besoin d'attendre le prochain rendez-vous : échangez directement avec l'orthophoniste, entre deux séances.",
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
