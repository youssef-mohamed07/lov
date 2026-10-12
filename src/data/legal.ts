export type LegalDocument = {
  path: string;
  title: string;
  description: string;
};

// The client supplies the final documents; until then each page shows a notice.
export const legalDocuments = {
  mentionsLegales: {
    path: "/mentions-legales",
    title: "Mentions légales",
    description:
      "Les informations relatives à l’éditeur et à l’hébergeur du site.",
  },
  cgv: {
    path: "/cgv",
    title: "Conditions générales de vente",
    description:
      "Les conditions applicables aux bilans et aux séances réservés en ligne.",
  },
  cgu: {
    path: "/cgu",
    title: "Conditions générales d’utilisation",
    description:
      "Les règles d’utilisation du site et de votre espace personnel.",
  },
  confidentialite: {
    path: "/politique-de-confidentialite",
    title: "Politique de confidentialité",
    description:
      "La manière dont vos données personnelles sont collectées, utilisées et protégées.",
  },
} as const satisfies Record<string, LegalDocument>;
