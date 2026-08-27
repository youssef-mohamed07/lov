import { troubles } from "@/data/troubles";

export const reassuranceItems = [
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
] as const;

export const overview = {
  eyebrow: "La plateforme",
  titleStart: "Tout ce qu’il faut",
  titleAccent: "pour s’orienter",
  description:
    "Lov réunit bilan orthophonique, ressources et accompagnement — pour avancer avec des repères concrets, sans jargon.",
} as const;

export const steps = [
  {
    step: "01",
    title: "Évaluer",
    description:
      "Simulateur ou bilan orthophonique pour clarifier la situation.",
  },
  {
    step: "02",
    title: "Comprendre",
    description:
      "Dyslexie, bégaiement, retard de langage… des pages claires pour se situer.",
  },
  {
    step: "03",
    title: "Agir",
    description:
      "Un accompagnement adapté, en cabinet ou à distance selon le besoin.",
  },
] as const;

export const conditions = troubles.slice(0, 8).map((trouble) => ({
  label: trouble.title,
  href: `/troubles/${trouble.slug}`,
}));

export const platform = {
  eyebrow: "Savoir-faire",
  titleStart: "À votre rythme,",
  titleAccent: "du bilan au suivi",
  description:
    "Deux temps forts de votre parcours : le bilan, puis l'accompagnement.",
  ctaLabel: "Découvrir le bilan",
  ctaHref: "/bilan",
  secondaryLabel: "Parler du suivi",
  secondaryHref: "/suivi",
} as const;

export const expertiseItems = [
  {
    title: "Fondé sur la preuve",
    description:
      "Des méthodes validées en orthophonie, adaptées à l’âge et au profil.",
  },
  {
    title: "Écoute clinique",
    description:
      "Un cadre bienveillant pour l’enfant, l’adolescent, l’adulte et les aidants.",
  },
  {
    title: "Suivi vivant",
    description:
      "Des objectifs mesurables, ajustés au fil des séances et des progrès.",
  },
] as const;

export const pricingPlans = [
  {
    id: "bilan",
    name: "Bilan orthophonique",
    price: "180€",
    period: "parcours complet",
    tagline: "Comprendre ce qui bloque, et repartir avec un plan.",
    description:
      "Une évaluation complète en visio, par une orthophoniste diplômée. Tout est inclus.",
    features: [
      "Questionnaire d’anamnèse en ligne",
      "Restitution des résultats",
      "Recommandations pour l’école et la maison",
      "1 heure de tests étalonnés en visio",
      "Compte rendu écrit sous 10 jours — reconnu médecins et MDPH",
    ],
    report:
      "Rédigé selon les mêmes exigences qu’en cabinet, avec les tests de référence de la profession. Il est reconnu par les médecins et la MDPH, et peut servir de base à une demande de PAP, de PPS ou d’aménagements aux examens.",
    steps: [
      "Vous réservez votre créneau en ligne",
      "Vous remplissez le questionnaire d’anamnèse",
      "Vous transmettez l’ordonnance de votre médecin",
      "Vous vivez la séance de bilan en visio, depuis chez vous",
      "Vous recevez le compte rendu écrit",
    ],
    ctaLabel: "Demander un bilan",
    ctaHref: "/demander-un-bilan",
    image: "/images/pricing-bilan.jpg",
    imageAlt: "Échange autour d’un bilan orthophonique",
  },
] as const;
