import type { FaqItem } from "@/components/common/faq";
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
  eyebrow: "Outils",
  titleStart: "S’orienter",
  titleAccent: "avant de s’engager",
  description:
    "Le simulateur et le bilan vous donnent une première lecture — pour décider ensuite avec plus de clarté.",
  ctaLabel: "Lancer le simulateur",
  ctaHref: "/simulateur",
  secondaryLabel: "Bilan orthophonique",
  secondaryHref: "/bilan",
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
    id: "seance",
    name: "Séance",
    price: "70€",
    period: "/ séance",
    description: "Rééducation orthophonique individuelle.",
    features: [
      "45 à 50 minutes",
      "Cabinet ou distanciel",
      "Objectifs partagés",
    ],
    ctaLabel: "Réserver",
    ctaHref: "/nous-contacter",
    image: "/images/pricing-seance.jpg",
    imageAlt: "Séance d’accompagnement autour d’une activité",
  },
  {
    id: "bilan",
    name: "Bilan",
    price: "180€",
    period: "/ parcours",
    description: "Évaluation structurée du profil.",
    features: [
      "Tests adaptés au motif",
      "Restitution claire",
      "Compte-rendu écrit",
    ],
    ctaLabel: "Demander un bilan",
    ctaHref: "/bilan",
    highlighted: true,
    badge: "Le plus choisi",
    image: "/images/pricing-bilan.jpg",
    imageAlt: "Échange autour d’un bilan orthophonique",
  },
  {
    id: "suivi",
    name: "Suivi",
    price: "240€",
    period: "/ 4 séances",
    description: "Accompagnement régulier pour ancrer les progrès.",
    features: [
      "4 séances planifiées",
      "Guidance parentale",
      "Ajustements continus",
    ],
    ctaLabel: "Commencer",
    ctaHref: "/nous-contacter",
    image: "/images/pricing-suivi.jpg",
    imageAlt: "Professionnel préparant un suivi personnalisé",
  },
] as const;

export const faqItems: FaqItem[] = [
  {
    question: "Est-ce que Lov remplace un médecin ou un ORL ?",
    answer:
      "Non. Lov propose une orientation et un accompagnement orthophonique. Selon le motif, un avis médical peut rester nécessaire.",
  },
  {
    question: "Combien de temps dure un bilan orthophonique ?",
    answer:
      "Le bilan s’étale généralement sur une à plusieurs séances selon l’âge et le motif, puis une restitution claire vous est proposée.",
  },
  {
    question: "Puis-je commencer par le simulateur ?",
    answer:
      "Oui. Le simulateur donne une première lecture indicative, non diagnostique. Vous pourrez ensuite demander un bilan si besoin.",
  },
  {
    question: "Les échanges sont-ils confidentiels ?",
    answer:
      "Oui. La confidentialité est au cœur de notre pratique. Vos informations sont traitées avec le plus grand soin.",
  },
];
