import type { FaqItem } from "@/components/common/faq";

export type PageFaqContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
  filters?: {
    id: string;
    label: string;
    itemIndexes: number[];
  }[];
};

export type FaqGroup = {
  id: string;
  label: string;
  content: PageFaqContent;
};

export const homeFaq: PageFaqContent = {
  eyebrow: "Questions fréquentes",
  title: "Vos questions, nos réponses",
  description: "Les réponses essentielles avant de commencer.",
  items: [
    {
      question: "Un bilan à distance, est-ce que ça vaut vraiment un bilan en cabinet ?",
      answer:
        "Oui, pour les troubles que nous prenons en charge. Nous utilisons les mêmes tests étalonnés et les mêmes protocoles qu’en cabinet. La recherche sur la téléorthophonie est aujourd’hui solide, notamment pour le langage oral, le langage écrit et le bégaiement : les résultats obtenus à distance sont équivalents à ceux du présentiel. Ce qui change, c’est le délai pour obtenir un rendez-vous, et le fait que votre enfant reste dans un environnement familier.",
    },
    {
      question: "Prenez-vous en charge tous les troubles en visioconférence ?",
      answer:
        "Non. Le télésoin convient à l’évaluation et à la prise en charge de la plupart des troubles du langage oral et écrit, des apprentissages, et de certains troubles de l’oralité et oro-myo-fonctionnels. Les troubles de la voix, de la déglutition avec fausses routes, les suites de chirurgie ORL ou les troubles neurologiques en phase aiguë nécessitent un examen physique que nous ne pouvons pas réaliser à distance. Retrouvez l’ensemble des troubles pris en charge dans la rubrique « Les troubles ».",
    },
    {
      question: "Combien de temps faut-il attendre pour obtenir un rendez-vous ?",
      answer:
        "Il n’y a pas de liste d’attente : les créneaux disponibles s’affichent directement dans l’agenda au moment de la réservation. Vous voyez donc en temps réel ce que nous pouvons vous proposer.",
    },
    {
      question: "Le compte rendu est-il accepté par la MDPH ?",
      answer:
        "Oui. Il est rédigé selon les exigences de la profession, à partir de tests étalonnés, et signé par une orthophoniste titulaire du Certificat de Capacité d’Orthophoniste avec son numéro RPPS. Il constitue une pièce recevable pour une demande de PAP, de PPS, d’aménagements d’examens ou pour un dossier MDPH.",
    },
    {
      question: "Pourquoi n’êtes-vous pas conventionnés avec l’Assurance Maladie ?",
      answer:
        "Le conventionnement actuel n’autorise le télésoin que de façon très restreinte : il est plafonné à une faible part de l’activité de chaque orthophoniste et réservé aux patients d’une même zone géographique. Exercer à 100 % en ligne, comme nous le faisons, est incompatible avec ce cadre.",
    },
  ],
};

export const aboutFaq: PageFaqContent = {
  eyebrow: "À propos",
  title: "L’équipe et votre confiance",
  description: "Qui vous accompagne, comment, et dans quel cadre.",
  items: [
    {
      question: "Qui va s’occuper de mon enfant ?",
      answer:
        "Une orthophoniste titulaire du Certificat de Capacité d’Orthophoniste, ou d’une équivalence obtenue en France, et enregistrée au répertoire national des professionnels de santé. Son nom et son numéro RPPS figurent sur votre facture et sur le compte rendu de bilan. Toutes nos orthophonistes sont salariées de la structure : nous ne sommes pas un annuaire de praticiennes indépendantes.",
    },
    {
      question: "Puis-je choisir mon orthophoniste ?",
      answer:
        "Nous vous attribuons l’orthophoniste la plus adaptée à la situation de votre enfant. Chacune de nos praticiennes a ses domaines de prédilection, et nous veillons à ce que vous soyez accompagné par celle dont l’expertise correspond le mieux à votre besoin.",
    },
    {
      question: "Puis-je changer d’orthophoniste en cours de suivi ?",
      answer:
        "Oui. La qualité de la relation thérapeutique compte énormément, particulièrement avec un enfant. Si le courant ne passe pas, dites-le-nous simplement : nous vous proposerons une autre praticienne et lui transmettrons l’ensemble du dossier pour assurer la continuité du suivi.",
    },
    {
      question: "Comment sont sélectionnées vos orthophonistes ?",
      answer:
        "Au-delà du Certificat de Capacité, nous recherchons des praticiennes à l’aise avec l’exercice à distance et formées à capter l’attention d’un enfant à travers un écran. Chaque orthophoniste est rattachée à ses domaines de prédilection, ce qui nous permet d’orienter chaque famille vers la personne la plus pertinente.",
    },
    {
      question: "Où sont conservées les données de santé de mon enfant ?",
      answer:
        "Chez un hébergeur certifié « Hébergeur de Données de Santé », un agrément délivré par les autorités françaises et spécifiquement conçu pour les données médicales. Les échanges sont chiffrés, et seules les professionnelles intervenant auprès de votre enfant y ont accès. Nos orthophonistes sont tenues au secret professionnel, exactement comme en cabinet.",
    },
  ],
};

export const bilanFaq: PageFaqContent = {
  eyebrow: "Bilan orthophonique",
  title: "Tout savoir avant le rendez-vous",
  description: "Télésoin, préparation, déroulé et compte rendu.",
  filters: [
    {
      id: "telesoin",
      label: "Télésoin",
      itemIndexes: [0, 1, 2, 3, 4, 8, 9, 10],
    },
    {
      id: "rendez-vous",
      label: "Rendez-vous",
      itemIndexes: [5, 6, 7, 8, 10],
    },
    {
      id: "seance",
      label: "Séance",
      itemIndexes: [1, 2, 9, 11],
    },
    {
      id: "resultats",
      label: "Résultats",
      itemIndexes: [12, 13, 14, 15],
    },
  ],
  items: [
    {
      question: "Un bilan à distance, est-ce que ça vaut vraiment un bilan en cabinet ?",
      answer:
        "Oui, pour les troubles que nous prenons en charge. Nous utilisons les mêmes tests étalonnés, les mêmes protocoles et les mêmes critères d’analyse qu’en cabinet. La recherche internationale sur la téléorthophonie est aujourd’hui solide : pour le langage oral, le langage écrit et le bégaiement notamment, les résultats obtenus à distance sont équivalents à ceux du présentiel. Ce qui change, ce n’est pas la qualité de l’évaluation : c’est le délai pour l’obtenir, et le fait que votre enfant reste dans un environnement où il se sent bien.",
    },
    {
      question: "J’ai peur que mon enfant ne tienne pas une heure devant l’écran.",
      answer:
        "C’est une inquiétude que beaucoup de parents nous partagent. En pratique, un bilan est une succession d’activités courtes, imagées, souvent ludiques, entrecoupées de pauses. Nos orthophonistes sont formées à capter et maintenir l’attention des jeunes enfants à travers l’écran, et adaptent le rythme en temps réel. Si votre enfant fatigue, la séance peut être scindée en deux temps.",
    },
    {
      question: "Et si mon enfant refuse de participer le jour du rendez-vous ?",
      answer:
        "Cela arrive, et ce n’est pas grave. Votre orthophoniste prendra le temps d’installer le contact avant toute évaluation ; parfois la séance se transforme en simple prise de connaissance, et l’on reprend la passation une autre fois. Si le bilan n’a pas pu se dérouler du tout, nous vous proposons un nouveau créneau sans frais supplémentaires. Nous ne facturons jamais une évaluation qui n’a pas eu lieu.",
    },
    {
      question: "Prenez-vous en charge tous les troubles en visioconférence ?",
      answer:
        "Non, le télésoin convient à l’évaluation et la prise en charge de la plupart des troubles du langage oral et écrit, des apprentissages et certains troubles de l’oralité et oro-myo-fonctionnels. En revanche, les troubles de la voix, de la déglutition avec fausses routes, les suites de chirurgie ORL, les troubles sensoriels ou les troubles neurologiques en phase aiguë nécessitent un examen physique que nous ne pouvons pas réaliser à distance. Retrouvez l’ensemble des troubles que nous prenons en charge dans la section « Troubles » de notre site.",
    },
    {
      question: "À partir de quel âge, et jusqu’à quel âge ?",
      answer:
        "Nous accompagnons les enfants dès 1 an, les adolescents et les adultes, sans limite d’âge supérieure. Pour les plus jeunes, la présence active d’un parent pendant la séance fait partie intégrante de l’accompagnement. Pour les adultes, la présence d’un aidant est parfois nécessaire, voire indispensable selon les troubles à évaluer.",
    },
    {
      question: "Comment se passe la prise de rendez-vous ?",
      answer:
        "Tout se fait en ligne, en quelques minutes. Vous choisissez votre créneau dans notre agenda, vous réglez la consultation, et vous recevez immédiatement une confirmation par e-mail. Un questionnaire vous est ensuite adressé pour recueillir les informations utiles sur votre parcours ou celui de votre enfant : il est à compléter avant le rendez-vous et permet à votre orthophoniste d’arriver déjà informée.",
    },
    {
      question: "Combien de temps faut-il attendre pour obtenir un rendez-vous ?",
      answer:
        "Il n’y a pas de liste d’attente chez nous : les créneaux disponibles s’affichent directement dans l’agenda au moment de la réservation, vous voyez donc en temps réel ce que nous pouvons vous proposer.",
    },
    {
      question: "Faut-il une ordonnance médicale pour prendre rendez-vous ?",
      answer:
        "Une prescription médicale est nécessaire pour tout bilan orthophonique, en ligne comme en cabinet. Mais elle n’est pas un obstacle : vous pouvez réserver votre créneau dès maintenant et obtenir l’ordonnance en parallèle, auprès de votre médecin traitant ; il suffit qu’elle nous parvienne avant le rendez-vous.",
    },
    {
      question: "De quoi ai-je besoin à la maison pour le rendez-vous ?",
      answer:
        "D’un ordinateur ou d’une tablette équipés d’une caméra et d’un micro de bonne qualité, d’une connexion internet stable, et d’une pièce calme où vous ne serez pas dérangé. Un casque avec micro améliore nettement le confort, sans être indispensable. Nous vous conseillons de vous connecter cinq minutes avant l’heure prévue pour vérifier tranquillement que tout fonctionne.",
    },
    {
      question: "Dois-je rester auprès de mon enfant pendant la séance ?",
      answer:
        "Un adulte doit être présent au domicile pendant toute la durée de la séance. Votre présence effective dans la pièce dépend ensuite de l’âge et des objectifs : pour les plus jeunes et pour certains accompagnements, votre participation est un véritable levier thérapeutique. Pour un adolescent, il est souvent préférable de le laisser en autonomie. Dans tous les cas, votre orthophoniste vous le dira dès le début de la séance.",
    },
    {
      question: "J’habite à l’étranger ou en outre-mer, puis-je consulter ?",
      answer:
        "Oui. Nous accompagnons les familles de France métropolitaine, des départements et territoires d’outre-mer, ainsi que les francophones installés à l’étranger. Le décalage horaire n’est pas un problème : nous pouvons ouvrir des créneaux adaptés sur demande. C’est aussi pour ces familles, souvent privées de tout accès à l’orthophonie en français, que le télésoin prend tout son sens.",
    },
    {
      question: "Que se passe-t-il pendant le bilan ?",
      answer:
        "Le rendez-vous dure environ une heure. Votre orthophoniste commence par un temps d’échange pour comprendre votre situation et ce qui vous préoccupe, puis conduit l’évaluation à travers une série d’activités et de tests adaptés à l’âge de votre enfant. À la fin de la séance, elle vous donne déjà ses premières impressions et répond à vos questions si vous en avez.",
    },
    {
      question: "Quand et comment vais-je recevoir les résultats ?",
      answer:
        "Vous recevez le compte rendu écrit complet dans un délai de dix jours, directement dans votre espace personnel sécurisé. Il détaille les résultats des tests, l’analyse clinique de votre orthophoniste, les conclusions, et des recommandations concrètes pour l’école comme pour la maison. Si vous avez besoin de ce document plus rapidement, vous pouvez souscrire à une option de rédaction accélérée sous 48 heures au moment de la réservation.",
    },
    {
      question: "Le compte rendu est-il accepté par la MDPH ?",
      answer:
        "Oui. Il est rédigé selon les exigences de la profession, à partir de tests étalonnés, et signé par une orthophoniste titulaire du Certificat de Capacité d’Orthophoniste avec son numéro RPPS. Il constitue une pièce recevable pour une demande de PAP, de PPS, d’aménagements d’examens ou pour un dossier MDPH. Nous vous indiquons également, dans nos recommandations, les aménagements précis à solliciter auprès de l’établissement.",
    },
    {
      question: "Et si le bilan conclut qu’il n’y a pas de trouble ?",
      answer:
        "C’est une conclusion possible, et c’est une bonne nouvelle. Vous repartez alors avec une réponse claire à votre question, des repères sur le développement de votre enfant, et une réorientation vers un autre professionnel de santé si besoin.",
    },
    {
      question: "Mon enfant a plusieurs problèmes, faut-il plusieurs bilans ?",
      answer:
        "Oui, l’orthophoniste évalue un seul domaine par bilan (langage oral, langage écrit, cognition mathématique…). Si une première évaluation révèle des difficultés dans un second domaine qui mérite d’être exploré à part entière, votre orthophoniste vous le proposera à un tarif préférentiel.",
    },
  ],
};

export const followupFaq: PageFaqContent = {
  eyebrow: "Suivi et accompagnement",
  title: "Le suivi en pratique",
  description: "Rythme, organisation, paiement et accompagnement entre les séances.",
  items: [
    {
      question: "Comment déterminez-vous le nombre de séances nécessaires ?",
      answer:
        "À l’issue du bilan, votre orthophoniste définit des objectifs thérapeutiques précis et estime le nombre de séances nécessaires pour les atteindre. Elle vous transmet alors une proposition écrite que vous êtes libre d’accepter ou non. Ce nombre de séances découle de l’analyse clinique, et est adapté à chaque patient. Voilà pourquoi nous ne proposons pas de forfait, de pack ou d’abonnement mensuel : c’est un principe qu’impose la déontologie de notre profession.",
    },
    {
      question: "Suis-je obligé de prendre le suivi que vous proposez ?",
      answer:
        "Absolument pas. Le bilan se suffit à lui-même : beaucoup de familles viennent uniquement pour comprendre et repartent avec le compte rendu et des recommandations. Si un suivi est indiqué, l’orthophoniste vous en explique les modalités mais c’est vous qui décidez de vous engager ou non.",
    },
    {
      question: "Que se passe-t-il si nous arrêtons avant la fin des séances prévues ?",
      answer:
        "Les séances non utilisées vous sont remboursées en intégralité, que ce soit parce qu’une place s’est libérée en cabinet, parce que les objectifs sont atteints plus vite que prévu, ou pour toute autre raison. Le solde est recalculé au tarif correspondant au nombre de séances réellement effectuées, et vous êtes remboursée sous quatorze jours.",
    },
    {
      question: "Combien de temps dure une séance de suivi, et qu’est-ce qui est compris ?",
      answer:
        "La séance dure 30 minutes en visioconférence, mais l’accompagnement ne s’arrête pas là : après chaque séance, vous recevez un compte rendu écrit précisant ce qui a été travaillé et ce qu’il faut poursuivre à la maison, ainsi que des supports et exercices personnalisés. Vous disposez également d’une messagerie sécurisée pour poser vos questions sur les exercices entre deux rendez-vous.",
    },
    {
      question: "À quel rythme se déroulent les séances ?",
      answer:
        "Le plus souvent une fois par semaine, mais rien n’est figé. Selon les besoins de votre enfant, son évolution et votre organisation familiale, le rythme peut être plus soutenu au démarrage, puis s’espacer. Des pauses thérapeutiques sont parfois indiquées. Ces ajustements se décident avec vous, toujours dans l’intérêt de votre enfant.",
    },
    {
      question: "Ma mutuelle peut-elle prendre en charge une partie des frais ?",
      answer:
        "C’est possible : un nombre croissant de complémentaires santé prévoient une prise en charge des soins non conventionnés, parfois au titre des médecines douces ou d’un forfait annuel. Nous vous remettons une facture détaillée comportant toutes les mentions requises, dont le numéro RPPS de votre orthophoniste. Nous ne pouvons cependant pas garantir la décision de votre organisme, mais nous vous fournissons tout ce dont il a besoin pour statuer.",
    },
    {
      question: "Comment se passe le paiement ?",
      answer:
        "Le règlement se fait en ligne par carte bancaire, au moment de la réservation, via un prestataire de paiement sécurisé. Votre facture est disponible immédiatement dans votre espace personnel. Nous ne conservons aucune donnée bancaire.",
    },
    {
      question: "Comment annuler ou déplacer un rendez-vous ?",
      answer:
        "Depuis votre espace personnel, jusqu’à 24 heures avant l’horaire prévu, sans aucun frais. Passé ce délai, la séance est décomptée — un créneau libéré au dernier moment ne peut malheureusement pas être ré-attribué. En cas d’imprévu sérieux, écrivez-nous : nous examinons chaque situation.",
    },
    {
      question: "Que se passe-t-il si la connexion coupe pendant la séance ?",
      answer:
        "Si le problème vient de notre côté ou de la plateforme, nous reprogrammons la séance sans frais. Si la coupure est brève, votre orthophoniste reprend simplement là où vous en étiez et prolonge si nécessaire. Ces incidents sont rares, et nous préférons toujours reporter plutôt que de conduire une évaluation dans de mauvaises conditions.",
    },
    {
      question: "Comment vous joindre ?",
      answer:
        "Par le formulaire de contact du site : nous répondons sous 48 heures ouvrées. Si vous êtes déjà accompagnée par l’une de nos orthophonistes, la messagerie sécurisée de votre espace personnel est le canal le plus direct pour toute question liée à votre suivi.",
    },
  ],
};

export const careersFaq: PageFaqContent = {
  eyebrow: "Recrutement",
  title: "Rejoindre Les Orthos en Visio",
  description: "Le statut, l’organisation et l’accompagnement proposés à nos orthophonistes.",
  items: [
    {
      question: "Quel est le statut proposé aux orthophonistes qui rejoignent Les Orthos en Visio ?",
      answer:
        "Nos orthophonistes sont salariées de la structure, et non des praticiennes indépendantes facturant à l’acte. Ce choix nous permet de garantir une qualité de suivi homogène aux familles et d’offrir un cadre d’exercice stable à nos équipes.",
    },
    {
      question: "Comment les patients sont-ils attribués aux orthophonistes ?",
      answer:
        "Chaque orthophoniste a ses domaines de prédilection, déclarés lors de son intégration. Les demandes des familles sont orientées vers la praticienne dont l’expertise correspond le mieux à la situation, ce qui vous permet d’exercer sur les troubles que vous maîtrisez le mieux.",
    },
    {
      question: "Quel matériel et quelle installation dois-je avoir pour exercer en téléconsultation ?",
      answer:
        "Un ordinateur équipé d’une caméra et d’un micro de bonne qualité, une connexion internet stable, et un espace calme garantissant la confidentialité des échanges. Nous vous accompagnons sur le choix des outils si besoin.",
    },
    {
      question: "Puis-je exercer en parallèle de mon activité en cabinet ?",
      answer:
        "Cela dépend du volume d’activité souhaité et de votre organisation ; nous en discutons ensemble lors de l’entretien de recrutement pour définir un rythme qui vous convient.",
    },
    {
      question: "Quelle formation est prévue à la téléconsultation ?",
      answer:
        "L’exercice à distance demande des ajustements spécifiques, notamment pour capter l’attention d’un jeune enfant à travers un écran ou adapter la passation des tests. Nous accompagnons chaque nouvelle orthophoniste à sa prise de poste et échangeons régulièrement sur les pratiques entre praticiennes.",
    },
    {
      question: "Comment se passe le recrutement, de la candidature à la prise de poste ?",
      answer:
        "Vous nous transmettez votre candidature via le formulaire dédié ; un entretien permet ensuite d’échanger sur votre parcours, vos domaines de prédilection et votre disponibilité. Une fois l’intégration validée, vous êtes accompagnée dans la prise en main des outils avant de recevoir vos premiers patients.",
    },
  ],
};

export const blogFaq: PageFaqContent = {
  eyebrow: "Ressources",
  title: "À propos de nos contenus",
  description: "Le rôle du blog et la manière dont nos articles sont préparés.",
  items: [
    {
      question: "Les articles du blog remplacent-ils un avis d’orthophoniste ?",
      answer:
        "Non. Les articles apportent des repères généraux et des explications sur les troubles, le développement du langage ou le fonctionnement du télésoin. Seul un bilan individuel permet d’évaluer la situation précise de votre enfant.",
    },
    {
      question: "Qui rédige le contenu du blog ?",
      answer:
        "Les articles sont écrits ou relus par nos orthophonistes, à partir de leur pratique clinique et des recommandations de la profession.",
    },
    {
      question: "À quelle fréquence publiez-vous de nouveaux articles ?",
      answer:
        "Nous publions régulièrement, au fil des questions que nous recevons le plus souvent de la part des familles et de l’actualité de la profession.",
    },
    {
      question: "Puis-je proposer un sujet ou poser une question à une orthophoniste ?",
      answer:
        "Oui, via le formulaire de contact du site. Nous ne pouvons pas répondre à des questions individuelles sur la situation d’un enfant en particulier, mais vos suggestions de sujets sont les bienvenues.",
    },
  ],
};

export const troublesFaq: PageFaqContent = {
  eyebrow: "Les troubles",
  title: "Comprendre avant d’agir",
  description: "Des repères généraux pour mieux vous orienter.",
  items: [
    {
      question: "Quels troubles prenez-vous en charge en téléconsultation ?",
      answer:
        "La plupart des troubles du langage oral et écrit, des apprentissages, ainsi que certains troubles de l’oralité et oro-myo-fonctionnels. Retrouvez le détail par catégorie ci-dessous ; les troubles nécessitant un examen physique — voix, déglutition avec fausses routes, suites de chirurgie ORL, phase aiguë d’un trouble neurologique — ne peuvent pas être évalués à distance.",
    },
    {
      question: "Comment savoir quel trouble correspond à la situation de mon enfant ?",
      answer:
        "Les fiches ci-dessous donnent des repères généraux, mais elles ne remplacent pas une évaluation individuelle. Si vous hésitez entre plusieurs catégories, le plus simple est de réserver un bilan : l’orthophoniste orientera l’évaluation en fonction de ce qu’elle observe.",
    },
    {
      question: "Le bilan permet-il de confirmer un diagnostic ?",
      answer:
        "Le bilan orthophonique évalue le langage, la communication ou les fonctions concernées, à l’aide de tests étalonnés. Selon le trouble, il peut poser un diagnostic orthophonique ou nécessiter une coordination avec un autre professionnel de santé — médecin, neurologue ou ORL — pour un diagnostic complet.",
    },
    {
      question: "Un enfant peut-il présenter plusieurs troubles associés ?",
      answer:
        "Oui, certains troubles sont fréquemment associés entre eux, par exemple un trouble du langage oral et un trouble des apprentissages. L’orthophoniste évalue un domaine par bilan ; si un second domaine mérite d’être exploré, elle vous le proposera à un tarif préférentiel.",
    },
    {
      question: "Que faire si je ne trouve pas le trouble qui correspond à ma situation ?",
      answer:
        "Contactez-nous via le formulaire du site : nous vous indiquerons si le télésoin est adapté à votre situation, ou nous vous orienterons vers un autre type de prise en charge si nécessaire.",
    },
  ],
};

export const speechLanguageFaq: PageFaqContent = {
  eyebrow: "Retard de parole et langage",
  title: "Les questions des parents",
  description: "Repères, signes d’alerte et place du télésoin.",
  items: [
    {
      question: "Comment distinguer un simple retard de langage d’un trouble plus durable ?",
      answer:
        "Le langage se développe à un rythme propre à chaque enfant, et un léger décalage n’est pas toujours le signe d’un trouble. C’est la persistance des difficultés au-delà des âges attendus, et leur impact sur la communication au quotidien, qui orientent vers une évaluation.",
    },
    {
      question: "À partir de quel âge un retard de langage doit-il alerter ?",
      answer:
        "Certains repères sont classiquement observés : peu ou pas de mots vers deux ans, phrases très limitées vers trois ans, ou difficultés à se faire comprendre par des personnes extérieures à la famille. Un bilan permet de préciser la situation, sans attendre l’entrée à l’école.",
    },
    {
      question: "Le télésoin est-il adapté pour évaluer un jeune enfant qui ne parle pas encore beaucoup ?",
      answer:
        "Oui. L’évaluation s’appuie autant sur l’observation du jeu, des interactions et de la compréhension que sur la production de mots. La présence active d’un parent pendant la séance fait partie intégrante de ce type de bilan.",
    },
    {
      question: "Quels signes doivent m’amener à consulter ?",
      answer:
        "Un vocabulaire très pauvre pour l’âge, des phrases mal construites, une difficulté à être compris en dehors du cercle familial, ou une communication qui semble en retrait par rapport aux enfants du même âge.",
    },
    {
      question: "Un retard de langage peut-il se résorber sans suivi ?",
      answer:
        "Certains décalages s’estompent naturellement, d’autres persistent et se répercutent sur les apprentissages scolaires. Le bilan permet justement de faire la différence et de proposer un accompagnement seulement s’il est utile.",
    },
  ],
};

export const dyslexiaFaq: PageFaqContent = {
  eyebrow: "Dyslexie et dysorthographie",
  title: "Comprendre le langage écrit",
  description: "Évaluation, diagnostic et aménagements scolaires.",
  items: [
    {
      question: "À quel âge peut-on évaluer une suspicion de dyslexie ?",
      answer:
        "Un bilan du langage écrit se fait généralement à partir du CE1, une fois que l’apprentissage de la lecture est engagé depuis un à deux ans. Avant cet âge, un diagnostic de dyslexie ne peut pas être posé de façon fiable.",
    },
    {
      question: "Quelle est la différence entre dyslexie et dysorthographie ?",
      answer:
        "La dyslexie touche l’apprentissage de la lecture — déchiffrage, fluence, compréhension —, la dysorthographie concerne la production écrite — orthographe. Les deux troubles sont souvent associés, mais peuvent aussi exister séparément.",
    },
    {
      question: "Le bilan permet-il d’obtenir un dossier recevable pour l’école (PAP) ?",
      answer:
        "Oui. Le compte rendu détaille les résultats des tests et des recommandations d’aménagements concrets à solliciter auprès de l’établissement, dans le cadre d’un PAP ou d’un dossier MDPH si nécessaire.",
    },
    {
      question: "Mon enfant lit mais très lentement, est-ce forcément une dyslexie ?",
      answer:
        "Pas nécessairement. La lenteur de lecture peut avoir plusieurs origines : manque d’entraînement, trouble de l’attention, ou trouble spécifique du langage écrit. Le bilan permet de situer précisément la difficulté.",
    },
    {
      question: "Combien de temps dure généralement l’accompagnement ?",
      answer:
        "Cela dépend des objectifs définis à l’issue du bilan et de l’évolution de l’enfant : il n’y a pas de durée fixe, et nous ne proposons pas de forfait. Le nombre de séances est réévalué au fil du suivi.",
    },
  ],
};

export const stutteringFaq: PageFaqContent = {
  eyebrow: "Bégaiement et fluence",
  title: "Mieux comprendre le bégaiement",
  description: "Quand consulter et comment se déroule l’accompagnement.",
  items: [
    {
      question: "Le bégaiement de mon enfant va-t-il disparaître seul ?",
      answer:
        "Une partie des bégaiements qui apparaissent chez le jeune enfant s’atténue naturellement, mais certains persistent. Plus une prise en charge intervient tôt en cas de persistance, plus elle a de chances d’être efficace : un bilan permet d’évaluer la situation sans attendre.",
    },
    {
      question: "À quel âge faut-il s’inquiéter d’un bégaiement ?",
      answer:
        "Si les hésitations durent depuis plus de six mois, s’intensifient, ou s’accompagnent de tension visible ou d’une gêne exprimée par l’enfant, un avis orthophonique est recommandé, quel que soit son âge.",
    },
    {
      question: "Le télésoin est-il adapté à l’évaluation du bégaiement, un trouble qui varie selon le contexte ?",
      answer:
        "Oui, à condition d’observer l’enfant dans plusieurs situations de parole pendant le bilan. Le fait que la séance se déroule à la maison, dans un environnement familier, permet souvent d’obtenir une image représentative du quotidien.",
    },
    {
      question: "Le bégaiement touche-t-il aussi les adultes ?",
      answer:
        "Oui, un bégaiement peut persister à l’âge adulte ou, plus rarement, apparaître suite à un événement particulier. La prise en charge est adaptée à chaque âge et à l’impact du trouble sur la vie quotidienne et professionnelle.",
    },
    {
      question: "Comment se déroule l’accompagnement au quotidien ?",
      answer:
        "Le suivi combine un travail en séance et des exercices à poursuivre à la maison, entre les rendez-vous. Le rythme et les objectifs sont ajustés en fonction de l’évolution, en lien avec vous et, selon l’âge, avec l’enfant lui-même.",
    },
  ],
};

export const mathFaq: PageFaqContent = {
  eyebrow: "Cognition mathématique",
  title: "Comprendre les difficultés en mathématiques",
  description: "Les signes, le bilan et la complémentarité avec l’école.",
  items: [
    {
      question: "Qu’est-ce qu’un trouble de la cognition mathématique (dyscalculie) ?",
      answer:
        "C’est une difficulté durable à traiter les nombres et les quantités : compter, comparer des grandeurs, effectuer des calculs ou comprendre un énoncé mathématique, alors que le niveau intellectuel général de l’enfant ne l’explique pas.",
    },
    {
      question: "Comment différencier une difficulté scolaire passagère d’un trouble ?",
      answer:
        "Une difficulté passagère s’améliore généralement avec de la pratique et du soutien scolaire classique. Un trouble se caractérise par sa persistance malgré les efforts, et par son écart avec le niveau attendu pour l’âge.",
    },
    {
      question: "Ce bilan est-il différent d’un bilan pour dyslexie ?",
      answer:
        "Oui, ce sont deux domaines distincts que nous évaluons séparément, même s’ils peuvent être associés chez un même enfant. Si les deux semblent concernés, un second bilan pourra être proposé à un tarif préférentiel.",
    },
    {
      question: "Le suivi peut-il se faire en parallèle d’un soutien scolaire classique ?",
      answer:
        "Oui, les deux sont complémentaires. Le suivi orthophonique cible les mécanismes cognitifs à l’origine de la difficulté, quand le soutien scolaire travaille sur le contenu des programmes.",
    },
    {
      question: "Quels sont les signes qui doivent alerter ?",
      answer:
        "Une difficulté marquée à retenir les nombres, à les comparer, à poser une opération simple, ou un décalage important entre les résultats en mathématiques et dans les autres matières.",
    },
  ],
};

export const oromyofacialFaq: PageFaqContent = {
  eyebrow: "Fonctions oro-myo-faciales",
  title: "Respiration, déglutition et articulation",
  description: "Comprendre ce qui peut être évalué à distance.",
  items: [
    {
      question: "Que sont les troubles oro-myo-fonctionnels ?",
      answer:
        "Ce sont des troubles du fonctionnement des muscles de la bouche et du visage impliqués dans la respiration, la déglutition ou l’articulation : position de la langue au repos, respiration par la bouche, déglutition dite « atypique »…",
    },
    {
      question: "Ce trouble est-il lié à la respiration ou à la déglutition ?",
      answer:
        "Il peut concerner l’une, l’autre, ou les deux : les fonctions de respiration, de mastication, de déglutition et de phonation sont liées, et un déséquilibre dans l’une peut affecter les autres.",
    },
    {
      question: "Le télésoin permet-il vraiment d’évaluer une fonction physique comme la déglutition ?",
      answer:
        "Le bilan à distance permet d’observer certains signes — respiration, posture de la langue, articulation — et de recueillir les informations utiles. Certaines situations, notamment en cas de fausses routes, nécessitent un examen physique en cabinet : votre orthophoniste vous orientera si c’est le cas.",
    },
    {
      question: "Ce trouble est-il souvent associé à d’autres troubles ?",
      answer:
        "Oui, un trouble oro-myo-fonctionnel peut retentir sur l’articulation de certains sons, et est parfois associé à des troubles orthodontiques suivis en parallèle par un orthodontiste.",
    },
    {
      question: "Quand consulter un orthophoniste pour ce type de trouble plutôt qu’un autre spécialiste ?",
      answer:
        "Un orthodontiste ou un ORL peuvent orienter vers un bilan orthophonique lorsqu’une rééducation des fonctions musculaires est nécessaire, en complément de leur propre prise en charge.",
    },
  ],
};

export const feedingFaq: PageFaqContent = {
  eyebrow: "Oralité alimentaire",
  title: "Comprendre les difficultés alimentaires",
  description: "Sélectivité, sensorialité et accompagnement à la maison.",
  items: [
    {
      question: "Qu’appelle-t-on trouble de l’oralité alimentaire ?",
      answer:
        "C’est une difficulté durable dans le rapport à l’alimentation : refus de certaines textures, sélectivité alimentaire marquée, réactions de dégoût ou d’angoisse face à la nourriture, au-delà des préférences habituelles d’un enfant.",
    },
    {
      question: "Mon enfant est simplement difficile à table, est-ce un trouble ?",
      answer:
        "Pas nécessairement. La plupart des enfants traversent des périodes de sélectivité alimentaire. On parle de trouble lorsque les difficultés sont marquées, durables, et retentissent sur la croissance, la vie sociale ou familiale.",
    },
    {
      question: "Le télésoin est-il adapté pour ce type de trouble, souvent lié aux repas et à la sensorialité ?",
      answer:
        "Oui : observer un enfant dans son environnement habituel, au moment d’un repas, apporte souvent des informations que l’on n’obtient pas en cabinet. L’orthophoniste peut également accompagner les parents dans l’adaptation des repas à la maison.",
    },
    {
      question: "Ce trouble concerne-t-il uniquement les jeunes enfants ?",
      answer:
        "Il se manifeste le plus souvent tôt dans le développement, mais des difficultés peuvent persister ou être identifiées plus tardivement, notamment chez des enfants ayant un parcours médical particulier.",
    },
    {
      question: "Travaillez-vous en lien avec d’autres professionnels ?",
      answer:
        "Oui, ces troubles nécessitent souvent une approche pluridisciplinaire. Nous échangeons avec les autres professionnels impliqués, avec votre accord, pour coordonner la prise en charge.",
    },
  ],
};

export const neurologicalFaq: PageFaqContent = {
  eyebrow: "Troubles neurologiques",
  title: "Le télésoin après une atteinte neurologique",
  description: "Quand il est adapté et comment se coordonne le suivi.",
  items: [
    {
      question: "Quels troubles d’origine neurologique prenez-vous en charge ?",
      answer:
        "Nous accompagnons notamment les troubles du langage et de la communication consécutifs à un accident vasculaire cérébral — aphasie —, ou associés à certaines pathologies neurodégénératives ou neurodéveloppementales, une fois la phase aiguë passée.",
    },
    {
      question: "Le télésoin est-il adapté après un AVC ou une pathologie neurologique récente ?",
      answer:
        "Pas immédiatement : la phase aiguë nécessite un examen physique et une prise en charge en cabinet ou en établissement. Le télésoin prend le relais une fois l’état stabilisé, souvent en poursuite d’une rééducation déjà engagée.",
    },
    {
      question: "Comment se passe le suivi pour un trouble neurologique évolutif ?",
      answer:
        "Les objectifs et le rythme des séances sont réévalués régulièrement en fonction de l’évolution du patient, en coordination avec les autres professionnels de santé qui le suivent.",
    },
    {
      question: "Le télésoin est-il adapté aux personnes ayant des difficultés de mobilité ?",
      answer:
        "C’est souvent l’un des principaux intérêts du télésoin dans ce contexte : éviter les déplacements pour des patients pour qui ils sont difficiles ou fatigants, tout en maintenant un suivi régulier.",
    },
    {
      question: "Travaillez-vous en coordination avec le médecin ou le neurologue ?",
      answer:
        "Oui, cette coordination est particulièrement importante pour les troubles neurologiques. Avec votre accord, nous échangeons avec les professionnels de santé impliqués dans le suivi.",
    },
  ],
};

export const faqGroups: FaqGroup[] = [
  { id: "essentiel", label: "L’essentiel", content: homeFaq },
  { id: "bilan", label: "Bilan", content: bilanFaq },
  { id: "suivi", label: "Suivi", content: followupFaq },
  { id: "equipe", label: "Notre équipe", content: aboutFaq },
  { id: "troubles", label: "Les troubles", content: troublesFaq },
  {
    id: "langage",
    label: "Parole et langage",
    content: speechLanguageFaq,
  },
  { id: "dyslexie", label: "Dyslexie", content: dyslexiaFaq },
  { id: "begaiement", label: "Bégaiement", content: stutteringFaq },
  { id: "mathematiques", label: "Mathématiques", content: mathFaq },
  {
    id: "oro-myo-facial",
    label: "Oro-myo-facial",
    content: oromyofacialFaq,
  },
  {
    id: "oralite",
    label: "Oralité alimentaire",
    content: feedingFaq,
  },
  {
    id: "neurologique",
    label: "Neurologique",
    content: neurologicalFaq,
  },
  { id: "ressources", label: "Ressources", content: blogFaq },
  { id: "carrieres", label: "Carrières", content: careersFaq },
];

const troubleFaqBySlug: Record<string, PageFaqContent> = {
  dyslexie: dyslexiaFaq,
  dysorthographie: dyslexiaFaq,
  "retard-parole-langage": speechLanguageFaq,
  dysphasie: speechLanguageFaq,
  begaiement: stutteringFaq,
  dyscalculie: mathFaq,
  articulation: oromyofacialFaq,
  voix: troublesFaq,
};

export function getFaqForPathname(pathname: string): PageFaqContent | null {
  if (pathname === "/") return homeFaq;
  if (pathname === "/a-propos") return aboutFaq;
  if (pathname === "/bilan") return bilanFaq;
  if (pathname === "/carrieres") return careersFaq;
  if (pathname === "/ressources" || pathname.startsWith("/ressources/")) {
    return blogFaq;
  }
  if (pathname === "/troubles") return troublesFaq;
  if (pathname.startsWith("/troubles/")) {
    const slug = pathname.split("/")[2] ?? "";
    return troubleFaqBySlug[slug] ?? troublesFaq;
  }
  return null;
}
