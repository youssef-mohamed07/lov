export type CareerRole = {
  slug: string;
  title: string;
  type: string;
  mode: string;
  location: string;
  description: string;
  image: string;
  about: string;
  missions: string[];
  profile: string[];
  offer: string[];
};

export const careers = {
  eyebrow: "Nous rejoindre",
  title: "Donner du sens à",
  titleAccent: "votre pratique",
  description:
    "La flexibilité du libéral, le confort du salariat, depuis chez soi.",
  ctaLabel: "Envoyer votre candidature",
  culture: {
    eyebrow: "Comment on travaille",
    title: "Une équipe à",
    titleAccent: "taille humaine",
    items: [
      {
        title: "Respecter votre personnalité clinique",
        description:
          "Chaque professionnel a son parcours, ses particularités, ses préférences thérapeutiques.",
      },
      {
        title: "Créer une vraie relation de travail",
        description:
          "Même à distance, nous échangeons, nous partageons, nous rions et buvons des cafés, entre deux bilans.",
      },
      {
        title: "Co-construire notre entreprise",
        description:
          "Vos idées comptent et vos retours sont précieux, ils nous aident à améliorer ce que nous proposons aux familles.",
      },
    ],
  },
  process: {
    eyebrow: "Candidature",
    title: "Un processus",
    titleAccent: "simple en 4 étapes",
    steps: [
      {
        title: "Vous nous écrivez",
        description:
          "Un message avec votre parcours et ce qui vous donne envie de nous rejoindre.",
      },
      {
        title: "On se parle",
        description:
          "Trente minutes pour faire connaissance, parler de votre pratique et de vos attentes.",
      },
      {
        title: "Une mise en situation",
        description:
          "Un cas concret, pour voir ensemble comment vous raisonnez.",
      },
      {
        title: "Une réponse rapide",
        description:
          "Qu'elle soit positive ou non, vous avez une réponse claire, suivie d'une intégration accompagnée si vous nous rejoignez.",
      },
    ],
  },
  roles: {
    eyebrow: "Ouvertures",
    title: "Postes",
    titleAccent: "ouverts",
    items: [
      {
        slug: "orthophoniste",
        title: "Orthophoniste",
        type: "Temps partiel",
        mode: "Présentiel et distanciel",
        location: "Paris · À distance possible",
        description:
          "Réaliser des bilans et des prises en charge (langage, parole, apprentissages) et participer à l’amélioration des parcours.",
        image: "/images/ortho-session.jpg",
        about:
          "Vous accompagnez des familles en visioconférence, avec le même exigence clinique qu’en cabinet, dans une équipe encadrée au quotidien.",
        missions: [
          "Réaliser des bilans orthophoniques structurés en télésoin",
          "Conduire des séances de suivi adaptées à chaque profil",
          "Rédiger des comptes-rendus clairs, utiles aux familles et aux partenaires",
          "Échanger avec l’équipe pour faire évoluer les parcours",
        ],
        profile: [
          "Diplôme d’État d’orthophoniste",
          "À l’aise avec la visioconférence et les outils numériques",
          "Souci du soin, de la clarté et de la relation avec les familles",
          "Envie de contribuer à une pratique collective, pas isolée",
        ],
        offer: [
          "Encadrement clinique régulier",
          "Outils et parcours déjà structurés",
          "Organisation souple, à taille humaine",
          "Intégration accompagnée dès la prise de poste",
        ],
      },
      {
        slug: "charge-contenu-clinique",
        title: "Chargé·e de contenu clinique",
        type: "Indépendant·e ou CDI",
        mode: "À distance",
        location: "À distance",
        description:
          "Rédiger des contenus clairs et justes sur l’orthophonie à destination des parents et des enseignants.",
        image: "/images/ortho-reading.jpg",
        about:
          "Vous transformez l’expertise clinique en contenus accessibles : articles, guides et repères pour aider les familles à mieux comprendre et s’orienter.",
        missions: [
          "Rédiger des articles et ressources sur l’orthophonie",
          "Travailler avec les orthophonistes pour garantir la justesse clinique",
          "Structurer des contenus clairs pour parents et enseignants",
          "Améliorer en continu le ton, la lisibilité et l’utilité des textes",
        ],
        profile: [
          "Excellente plume en français",
          "Appétence pour la vulgarisation médicale ou éducative",
          "Rigueur, curiosité et sens du détail",
          "Capacité à travailler en autonomie à distance",
        ],
        offer: [
          "Sujets concrets, au service des familles",
          "Collaboration directe avec l’équipe clinique",
          "Format flexible (indépendant·e ou CDI)",
          "Retours rapides et cadre éditorial clair",
        ],
      },
      {
        slug: "concepteur-produit",
        title: "Concepteur·rice produit",
        type: "CDI",
        mode: "Mixte",
        location: "Paris / mixte",
        description:
          "Concevoir des parcours numériques sobres, accessibles et cliniquement responsables.",
        image: "/images/expertise-follow.jpg",
        about:
          "Vous concevez les parcours Lov — du premier contact au suivi — pour qu’ils restent simples, humains et cliniquement responsables.",
        missions: [
          "Concevoir des parcours utilisateur sobres et accessibles",
          "Travailler avec l’équipe clinique sur les priorités produit",
          "Prototyper, tester et itérer à partir de retours réels",
          "Veiller à la cohérence de l’expérience sur tout le site",
        ],
        profile: [
          "Expérience en conception produit ou UX",
          "Sensibilité aux enjeux de santé ou d’éducation",
          "Capacité à simplifier sans appauvrir",
          "Aisance en travail collaboratif mixte",
        ],
        offer: [
          "Impact direct sur l’expérience des familles",
          "Équipe petite, décisions rapides",
          "Cadre hybride Paris / distance",
          "Produit au service du soin, pas du volume",
        ],
      },
    ] satisfies CareerRole[],
  },
  cta: {
    eyebrow: "Aucun poste ne correspond ?",
    title: "Écrivez-nous quand même",
    description:
      "Déposez votre CV, chaque profil est étudié. Si un besoin correspond, on revient vers vous.",
    fileLabel: "Déposer votre CV",
    action: "Envoyer ma candidature",
    successTitle: "Candidature envoyée",
    successDescription:
      "Merci. Nous étudions chaque profil et revenons vers vous si un besoin correspond.",
  },
} as const;

export function getCareerRole(slug: string) {
  return careers.roles.items.find((role) => role.slug === slug);
}

export function getAllCareerRoleSlugs() {
  return careers.roles.items.map((role) => role.slug);
}

export function getCareerRoleHref(slug: string) {
  return `/carrieres/${slug}`;
}
