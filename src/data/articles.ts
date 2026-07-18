export const articlesPage = {
  title: "Nos dernières ressources",
  description:
    "Repères clairs pour les parents, les enseignants et les adultes — comprendre l’orthophonie, s’orienter, et avancer.",
  subscribeLabel: "Recevoir les prochaines ressources",
  subscribePlaceholder: "Votre courriel",
  subscribeCta: "S’inscrire",
} as const;

export type ArticleCategory = {
  slug: string;
  title: string;
  description: string;
};

export type ArticleGalleryImage = {
  src: string;
  alt: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  gallery: ArticleGalleryImage[];
  content: string[];
};

export const articleCategories: ArticleCategory[] = [
  {
    slug: "orientation",
    title: "Orientation",
    description: "Savoir quand consulter et comment démarrer un parcours.",
  },
  {
    slug: "troubles",
    title: "Troubles",
    description: "Comprendre les difficultés de langage, parole et apprentissages.",
  },
  {
    slug: "parcours",
    title: "Parcours",
    description: "Bilan, suivi et aménagements au fil du temps.",
  },
  {
    slug: "familles",
    title: "Familles",
    description: "Conseils concrets pour accompagner au quotidien.",
  },
];

export const articles: Article[] = [
  {
    slug: "quand-consulter",
    title: "Quand consulter un orthophoniste ?",
    excerpt:
      "Les signaux qui indiquent qu’un bilan orthophonique peut être utile — sans attendre que les difficultés s’installent.",
    date: "12 mars 2026",
    category: "orientation",
    image: "/images/path-bilan.jpg",
    gallery: [
      { src: "/images/family-consult.jpg", alt: "Échange en famille" },
      { src: "/images/step-orient.jpg", alt: "Première orientation" },
      { src: "/images/path-simulator.jpg", alt: "Simulateur d’orientation" },
      { src: "/images/clinic-welcome.jpg", alt: "Accueil du cabinet" },
    ],
    content: [
      "Beaucoup de familles hésitent avant de prendre rendez-vous, par peur d’en faire trop ou trop tôt. En orthophonie, un bilan sert d’abord à clarifier : il n’engage pas automatiquement une rééducation longue.",
      "Des retards de parole, une lecture très coûteuse, un bégaiement qui s’installe ou une voix « cassée » durablement sont autant de motifs légitimes pour demander un avis.",
      "Si vous hésitez, le simulateur Lov peut vous donner une première orientation. Ensuite, un bilan orthophonique pose un cadre précis et rassurant.",
    ],
  },
  {
    slug: "reperer-dyslexie",
    title: "Repérer les premiers signes de dyslexie",
    excerpt:
      "Ce qui doit alerter à l’école et à la maison, et pourquoi une évaluation spécialisée compte.",
    date: "28 février 2026",
    category: "troubles",
    image: "/images/trouble-dyslexia.jpg",
    gallery: [
      { src: "/images/trouble-dyslexia.jpg", alt: "Lecture et apprentissages" },
      { src: "/images/ortho-reading.jpg", alt: "Séance de lecture" },
      { src: "/images/gallery-materials.jpg", alt: "Matériel pédagogique" },
      { src: "/images/step-eval.jpg", alt: "Évaluation" },
    ],
    content: [
      "La dyslexie ne se résume pas à « inverser des lettres ». Elle se manifeste surtout par une lecture lente, fatigante, et un accès difficile au code écrit malgré un enseignement adapté.",
      "Les enseignants sont souvent les premiers à remarquer un décalage. Les parents, eux, voient le coût émotionnel : évitement des devoirs, perte de confiance, conflits autour de la lecture.",
      "Un bilan orthophonique permet de décrire le profil (phonologique, visuel, mixte) et d’ouvrir des aménagements utiles dès maintenant.",
    ],
  },
  {
    slug: "bilan-ou-suivi",
    title: "Bilan ou suivi : que choisir ?",
    excerpt:
      "Deux temps complémentaires du parcours orthophonique, selon que vous ayez besoin de clarifier ou d’entraîner.",
    date: "4 février 2026",
    category: "parcours",
    image: "/images/step-eval.jpg",
    gallery: [
      { src: "/images/path-bilan.jpg", alt: "Bilan orthophonique" },
      { src: "/images/step-followup.jpg", alt: "Suivi" },
      { src: "/images/pricing-suivi.jpg", alt: "Accompagnement" },
      { src: "/images/expertise-follow.jpg", alt: "Suivi en séance" },
    ],
    content: [
      "Le bilan orthophonique évalue, pose des hypothèses et restitue une lecture claire. Le suivi, lui, transforme ces pistes en entraînement régulier.",
      "Parfois, un bilan suffit à rassurer et à proposer des aménagements scolaires. D’autres fois, il ouvre une prise en charge structurée.",
      "Chez Lov, nous vous aidons à choisir le bon format — sans jargon, avec des prochaines étapes concrètes.",
    ],
  },
  {
    slug: "aider-enfant-maison",
    title: "Aider son enfant à la maison sans se substituer à l’orthophoniste",
    excerpt:
      "Des gestes simples pour soutenir les progrès entre les séances, sans transformer le salon en salle de classe.",
    date: "18 janvier 2026",
    category: "familles",
    image: "/images/showcase-family.jpg",
    gallery: [
      { src: "/images/showcase-family.jpg", alt: "Famille" },
      { src: "/images/gallery-play.jpg", alt: "Jeux de langage" },
      { src: "/images/dialogue-child.jpg", alt: "Enfant" },
      { src: "/images/faq-calm.jpg", alt: "Espace calme" },
    ],
    content: [
      "Le rôle des parents n’est pas de « faire l’orthophonie » à la maison, mais de créer un climat où la parole et l’écrit restent possibles et désirables.",
      "Lire ensemble, reformuler, jouer avec les sons, valoriser les efforts plutôt que la performance : ces habitudes comptent autant qu’un exercice supplémentaire.",
      "Demandez à l’orthophoniste 2 ou 3 objectifs réalistes entre deux séances. La régularité douce bat les grandes sessions stressantes.",
    ],
  },
  {
    slug: "begaiement-ecole",
    title: "Bégaiement à l’école : comment parler avec l’équipe",
    excerpt:
      "Préparer un échange clair avec enseignants et AESH pour réduire la pression autour de la prise de parole.",
    date: "9 janvier 2026",
    category: "troubles",
    image: "/images/trouble-stutter.jpg",
    gallery: [
      { src: "/images/trouble-stutter.jpg", alt: "Prise de parole" },
      { src: "/images/dialogue-therapist.jpg", alt: "Orthophoniste" },
      { src: "/images/expertise-listening.jpg", alt: "Écoute" },
      { src: "/images/ortho-session.jpg", alt: "Séance" },
    ],
    content: [
      "Le bégaiement se vit souvent plus durement à l’école qu’à la maison. La peur du regard des pairs peut renforcer les évitements.",
      "Un message simple à l’équipe pédagogique aide : laisser le temps, ne pas finir les phrases, éviter les lectures à haute voix surprises.",
      "L’orthophoniste peut fournir des recommandations écrites utiles pour formaliser ces aménagements.",
    ],
  },
  {
    slug: "suivi-regulier",
    title: "Pourquoi la régularité change la donne",
    excerpt:
      "Ce que la continuité apporte quand on veut transformer une difficulté durable de langage ou d’apprentissage.",
    date: "2 janvier 2026",
    category: "parcours",
    image: "/images/step-followup.jpg",
    gallery: [
      { src: "/images/step-followup.jpg", alt: "Suivi régulier" },
      { src: "/images/step-booking.jpg", alt: "Rendez-vous" },
      { src: "/images/expertise-pedagogy.jpg", alt: "Pédagogie" },
      { src: "/images/stats-impact.jpg", alt: "Progrès" },
    ],
    content: [
      "Les apprentissages langagiers se consolidient par répétition espacée. Une séance isolée éclaire ; un rythme régulier transforme.",
      "La régularité permet aussi d’ajuster les objectifs : ce qui fonctionnait en septembre n’est pas forcément le bon levier en mars.",
      "Si la charge est trop lourde, mieux vaut un rythme soutenable qu’un planning idéal abandonné au bout de trois semaines.",
    ],
  },
];

export function getCategory(slug: string) {
  return articleCategories.find((category) => category.slug === slug);
}

export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((article) => article.category === categorySlug);
}

export function getArticle(categorySlug: string, articleSlug: string) {
  return articles.find(
    (article) =>
      article.category === categorySlug && article.slug === articleSlug,
  );
}

export function getArticleHref(article: Pick<Article, "category" | "slug">) {
  return `/ressources/${article.category}/${article.slug}`;
}

export function getCategoryHref(categorySlug: string) {
  return `/ressources/${categorySlug}`;
}

export function getRelatedArticles(
  article: Pick<Article, "slug" | "category">,
  limit = 3,
) {
  const sameCategory = articles.filter(
    (item) => item.category === article.category && item.slug !== article.slug,
  );
  const others = articles.filter(
    (item) => item.category !== article.category && item.slug !== article.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
