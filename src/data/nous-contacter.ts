export const contact = {
  title: "Parlons de votre besoin",
  description:
    "Une question, un bilan, ou simplement savoir par où commencer — écrivez-nous, nous répondons sous 24–48h.",
  details: [
    {
      label: "Courriel",
      value: "bonjour@lesorthosenvisio.fr",
      href: "mailto:bonjour@lesorthosenvisio.fr",
    },
    {
      label: "Horaires",
      value: "Lun–Ven, 9h–18h",
    },
  ],
  location: {
    eyebrow: "Nous trouver",
    title: "Un point d’ancrage",
    titleAccent: "à Lyon",
    description:
      "Les bilans et les accompagnements se déroulent en téléconsultation. Le premier échange permet de vérifier que ce format est adapté.",
    label: "Adresse",
    // Siège social
    address: "30 avenue Maréchal Foch, Bureau 3",
    city: "69006 Lyon",
    lat: 45.77166,
    lng: 4.84309,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30+avenue+Mar%C3%A9chal+Foch+69006+Lyon",
  },
  subjects: [
    { value: "bilan", label: "Bilan orthophonique" },
    { value: "rdv", label: "Prise de rendez-vous" },
    { value: "trouble", label: "Question sur un trouble" },
    { value: "carriere", label: "Candidature" },
    { value: "autre", label: "Autre demande" },
  ],
  note: "En cas d’urgence vitale, contactez le 15. Pour une souffrance psychique aiguë, le 3114 est disponible 24h/24.",
} as const;
