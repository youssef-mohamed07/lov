export const troublesPage = {
  title: "Troubles que nous accompagnons",
  description: "Comprendre les difficultés de langage, de parole et d’apprentissage — puis trouver le parcours adapté.",
} as const;

export type TroubleItem = { title: string; description: string };
export type Trouble = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  overviewTitle: string;
  overview: string;
  signs: string[];
  recommendations: TroubleItem[];
  journey: TroubleItem[];
  ctaDescription: string;
  image: string;
};

const item = (title: string, description: string): TroubleItem => ({ title, description });
const journey = (
  observe: string,
  evaluate: string,
  restore = "Une lecture claire des résultats, avec des recommandations.",
  support = "Un suivi régulier, si le bilan le préconise.",
): TroubleItem[] => [
  item("Observer", observe),
  item("Réserver", "Choisir un créneau de bilan dans notre agenda en ligne."),
  item("Évaluer", evaluate),
  item("Restituer", restore),
  item("Accompagner", support),
];

const childCta = "Une évaluation structurée, pour savoir précisément où en est votre enfant.";

export const troubles: Trouble[] = [
  {
    slug: "retard-parole-langage",
    title: "RP/RL - Troubles de la parole et du langage oral",
    shortTitle: "RP/RL",
    eyebrow: "Troubles du langage oral",
    description: "Un développement plus lent du vocabulaire, de la phrase ou de l’intelligibilité par rapport à l’âge attendu.",
    overviewTitle: "Un rythme différent, pas forcément un problème",
    overview: "Chaque enfant construit son langage à son propre rythme. Un bilan permet de savoir si ce rythme mérite d’être accompagné.",
    signs: [
      "Peu de mots à un âge où l’on en attend davantage",
      "Phrases très courtes ou peu structurées",
      "Parole difficile à comprendre hors du cercle proche",
      "Frustration ou colères liées à la communication",
    ],
    recommendations: [
      item("Parler beaucoup, sans forcer", "Commentez ce que vous faites ensemble, sans exiger de réponse."),
      item("Reformuler, sans corriger", "Répétez la phrase correctement, sans pointer l’erreur."),
      item("Laisser du temps", "Attendez la réponse, sans compléter à sa place."),
      item("Lire à voix haute", "Quelques minutes par jour suffisent à enrichir le vocabulaire."),
      item("Limiter les écrans", "Les échanges en face à face restent les plus formateurs."),
      item("Ne pas comparer", "Chaque enfant progresse à son rythme, pas selon une norme rigide."),
    ],
    journey: journey(
      "Repérer les signes dans le quotidien, sans dramatiser.",
      "Un bilan précis du niveau oral et de la compréhension.",
    ),
    ctaDescription: childCta,
    image: "/images/trouble-speech.jpg",
  },
  {
    slug: "dyslexie",
    title: "DL/DO - Troubles du langage écrit",
    shortTitle: "DL/DO",
    eyebrow: "Troubles du langage écrit",
    description: "Un trouble durable de l’apprentissage de la lecture et de l’orthographe, qui persiste malgré un enseignement adapté.",
    overviewTitle: "Une difficulté spécifique, pas un manque d’effort",
    overview: "La dyslexie affecte le décodage et la fluidité de lecture, la dysorthographie touche l’orthographe. Un bilan permet d’en préciser le profil.",
    signs: [
      "Lecture lente, hésitante ou très fatigante",
      "Confusions de lettres ou de sons",
      "Nombreuses fautes malgré les révisions",
      "Évitement des tâches de lecture ou d’écriture",
    ],
    recommendations: [
      item("Lire à voix haute ensemble", "Partagez la lecture plutôt que de la déléguer entièrement."),
      item("Valoriser l’écoute", "Les livres audio permettent d’accéder aux histoires sans la contrainte du déchiffrage."),
      item("Ne pas multiplier les corrections", "Concentrez-vous sur le sens plutôt que sur chaque erreur."),
      item("Aménager le temps scolaire", "Parlez avec l’enseignant du temps supplémentaire possible aux évaluations."),
      item("Encourager les efforts, pas seulement les résultats", "Chaque progrès mérite d’être reconnu."),
      item("Préserver la confiance", "Rappelez que la difficulté ne dit rien de l’intelligence de l’enfant."),
    ],
    journey: journey(
      "Repérer les signes dans le quotidien scolaire, sans dramatiser.",
      "Des tests étalonnés sur la lecture et l’orthographe.",
      "Une lecture claire des résultats, avec des recommandations pour l’école.",
    ),
    ctaDescription: childCta,
    image: "/images/trouble-dyslexia.jpg",
  },
  {
    slug: "begaiement",
    title: "Bégaiement et troubles de la fluence",
    shortTitle: "Bégaiement",
    eyebrow: "Troubles de la fluence",
    description: "Une disfluence qui coupe le flux de la parole : répétitions, blocages, prolongements.",
    overviewTitle: "Un défaut de fluidité, jamais un défaut de volonté",
    overview: "Le bégaiement n’est pas un manque d’effort. Un accompagnement orthophonique aide à fluidifier la parole et à réduire l’impact émotionnel.",
    signs: [
      "Répétitions de sons, syllabes ou mots",
      "Blocages ou efforts visibles pour parler",
      "Évitement de certaines situations de parole",
      "Tension ou perte de confiance à l’oral",
    ],
    recommendations: [
      item("Laisser finir la phrase", "Résistez à l’envie de compléter à sa place."),
      item("Ralentir votre propre débit", "Un rythme plus calme invite naturellement à ralentir le sien."),
      item("Maintenir le contact visuel", "Montrez que vous écoutez le message, pas la façon dont il est dit."),
      item("Ne jamais demander de « recommencer »", "Cela ajoute une pression inutile."),
      item("Valoriser ce qui est dit", "Réagissez au contenu, pas à la fluidité."),
      item("Parler ouvertement, si l’enfant le souhaite", "Nommer le bégaiement sans gêne peut désamorcer l’angoisse."),
    ],
    journey: journey(
      "Repérer la fréquence et le contexte des disfluences.",
      "Une analyse fine du type et de l’intensité des disfluences.",
      undefined,
      "Un suivi régulier, combinant fluidité et soutien émotionnel.",
    ),
    ctaDescription: childCta,
    image: "/images/trouble-stutter.jpg",
  },
  {
    slug: "dyscalculie",
    title: "Troubles de la cognition mathématique",
    shortTitle: "Cognition mathématique",
    eyebrow: "Troubles des apprentissages",
    description: "Un trouble spécifique du sens du nombre, du calcul ou de la résolution de problèmes.",
    overviewTitle: "Une difficulté ciblée, pas un manque de volonté",
    overview: "Ce trouble ne se résume pas à « être mauvais en maths ». Un bilan clarifie les compétences numériques et oriente les aménagements.",
    signs: [
      "Difficulté à comparer des quantités",
      "Calcul mental très laborieux",
      "Confusion dans les opérations ou les consignes",
      "Anxiété face aux situations mathématiques",
    ],
    recommendations: [
      item("Manipuler avant de calculer", "Utilisez des objets concrets plutôt que l’abstraction directe."),
      item("Relier les nombres au quotidien", "Cuisine, courses, jeux de société : les occasions sont nombreuses."),
      item("Ne pas chronométrer systématiquement", "La pression du temps aggrave souvent le blocage."),
      item("Valoriser la démarche", "Reconnaissez un raisonnement juste, même avec un résultat faux."),
      item("Éviter les comparaisons entre enfants", "Chaque profil progresse différemment."),
      item("Parler avec l’enseignant", "Des aménagements simples existent pour les évaluations."),
    ],
    journey: journey(
      "Repérer les difficultés dans le quotidien et à l’école.",
      "Des tests ciblés sur le sens du nombre et le calcul.",
      "Une lecture claire des résultats, avec des recommandations pour l’école.",
    ),
    ctaDescription: childCta,
    image: "/images/trouble-math.jpg",
  },
  {
    slug: "fonctions-oro-myo-faciales",
    title: "Troubles des fonctions oro-myo-faciales",
    shortTitle: "Fonctions oro-myo-faciales",
    eyebrow: "Troubles orofaciaux",
    description: "Des difficultés touchant les fonctions de la sphère orale : succion, mastication, déglutition, respiration.",
    overviewTitle: "Des fonctions qui s’apprennent, et parfois se réapprennent",
    overview: "Ces troubles peuvent affecter la respiration, la mastication ou l’articulation. Un bilan précise les fonctions concernées et les priorités de rééducation.",
    signs: [
      "Respiration buccale fréquente",
      "Difficultés à mastiquer ou avaler certains aliments",
      "Position de langue inhabituelle au repos",
      "Impact possible sur l’articulation",
    ],
    recommendations: [
      item("Observer la respiration au repos", "Nez ou bouche : notez ce que vous remarquez."),
      item("Ne pas forcer la fermeture de bouche", "Un rappel doux suffit, sans insister."),
      item("Consulter en parallèle un dentiste ou un ORL", "Ces troubles se travaillent souvent en équipe."),
      item("Varier les textures alimentaires", "Selon l’âge, cela peut soutenir le développement des fonctions orales."),
      item("Limiter les biberons et tétines prolongés", "Sur avis professionnel, selon l’âge de l’enfant."),
      item("Rester attentif sans dramatiser", "Beaucoup de ces schémas se corrigent avec un accompagnement adapté."),
    ],
    journey: journey(
      "Repérer les signes au quotidien, notamment autour des repas et du sommeil.",
      "Un examen des fonctions oro-myo-faciales concernées.",
      undefined,
      "Une rééducation fonctionnelle, en lien avec les autres professionnels si besoin.",
    ),
    ctaDescription: childCta,
    image: "/images/trouble-articulation.jpg",
  },
  {
    slug: "oralite-alimentaire",
    title: "TOA : Troubles alimentaires pédiatriques",
    shortTitle: "TOA",
    eyebrow: "Troubles de l’oralité",
    description: "Des difficultés dans la relation à l’alimentation : sélectivité, refus, sensibilité sensorielle.",
    overviewTitle: "Un rapport à l’alimentation qui se travaille, en douceur",
    overview: "Ces difficultés dépassent le simple caprice alimentaire. Un bilan permet de comprendre ce qui bloque et d’avancer pas à pas.",
    signs: [
      "Refus systématique de certaines textures ou couleurs",
      "Répertoire alimentaire très restreint",
      "Réactions de rejet fortes face à de nouveaux aliments",
      "Repas source de tension pour l’enfant ou pour vous",
    ],
    recommendations: [
      item("Ne jamais forcer", "La contrainte renforce souvent le blocage."),
      item("Proposer sans exiger", "Un aliment peut être présenté plusieurs fois, sans obligation d’y goûter."),
      item("Garder les repas courts et calmes", "Un cadre apaisé aide davantage qu’une négociation prolongée."),
      item("Impliquer l’enfant dans la préparation", "Toucher, sentir, manipuler avant de goûter."),
      item("Consulter un ORL", "Utile en complément, pour écarter une cause organique aux difficultés."),
      item("Valoriser chaque petit pas", "Une nouvelle texture explorée est déjà une avancée."),
    ],
    journey: journey(
      "Noter les aliments acceptés, refusés, et le contexte des repas.",
      "Un bilan sensoriel et fonctionnel de l’oralité alimentaire.",
      "Une lecture claire des résultats, avec des pistes concrètes.",
      "Un suivi progressif, au rythme de l’enfant.",
    ),
    ctaDescription: childCta,
    image: "/images/family-consult.jpg",
  },
  {
    slug: "origine-neurologique",
    title: "Troubles d’origine neurologique",
    shortTitle: "Origine neurologique",
    eyebrow: "Troubles neurologiques",
    description: "Des troubles du langage ou de la communication consécutifs à une atteinte neurologique.",
    overviewTitle: "Un accompagnement adapté à chaque situation",
    overview: "Ces troubles surviennent après un accident vasculaire, un traumatisme ou dans le cadre d’une maladie neurodégénérative. Un bilan précise les capacités préservées et les axes de travail.",
    signs: [
      "Difficultés à trouver ses mots",
      "Compréhension partielle des phrases longues",
      "Troubles de l’articulation ou de la voix",
      "Fatigue importante lors des échanges",
    ],
    recommendations: [
      item("Parler simplement, sans infantiliser", "Des phrases courtes, un rythme posé, sans changer de ton."),
      item("Laisser le temps de répondre", "Le silence n’est pas un échec, c’est souvent un effort en cours."),
      item("Réduire le bruit de fond", "Un environnement calme facilite la communication."),
      item("Utiliser des supports visuels si besoin", "Un geste, une image, un mot écrit peuvent aider."),
      item("Ne pas parler à la place de la personne", "Même quand la réponse tarde."),
      item("Respecter la fatigue", "Des échanges plus courts mais plus réguliers valent mieux qu’un seul long moment."),
    ],
    journey: journey(
      "Noter les difficultés de communication au quotidien.",
      "Un bilan complet du langage et de la communication.",
      undefined,
      "Une rééducation adaptée, en lien avec l’équipe médicale.",
    ),
    ctaDescription: "Une évaluation structurée, pour savoir précisément où en est votre situation.",
    image: "/images/trouble-language.jpg",
  },
];

export function getTrouble(slug: string) {
  return troubles.find((trouble) => trouble.slug === slug);
}

export function getAllTroubleSlugs() {
  return troubles.map((trouble) => trouble.slug);
}

export function getRelatedTroubles(slug: string, limit = 3) {
  return troubles.filter((trouble) => trouble.slug !== slug).slice(0, limit);
}
