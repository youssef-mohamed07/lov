export const contact = {
  title: "Parlons de votre besoin",
  description:
    "Une question, un bilan, ou simplement savoir par où commencer — écrivez-nous, nous répondons sous 24–48h.",
  details: [
    {
      label: "Courriel",
      value: "bonjour@lov.care",
      href: "mailto:bonjour@lov.care",
    },
    {
      label: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      label: "Horaires",
      value: "Lun–Ven, 9h–18h",
    },
  ],
  location: {
    eyebrow: "Nous trouver",
    title: "Un point d’ancrage",
    titleAccent: "à Paris",
    description:
      "Les bilans se déroulent en présentiel. L’orientation et le premier échange peuvent commencer à distance.",
    label: "Adresse",
    address: "12 rue de la Clarté",
    city: "75011 Paris",
    // Approximate pin — update when the real address is confirmed.
    lat: 48.8584,
    lng: 2.379,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=12+rue+de+la+Clart%C3%A9+75011+Paris",
  },
  subjects: [
    { value: "bilan", label: "Bilan orthophonique" },
    { value: "rdv", label: "Prise de rendez-vous" },
    { value: "trouble", label: "Question sur un trouble" },
    { value: "autre", label: "Autre demande" },
  ],
  note: "En cas d’urgence vitale, contactez le 15. Pour une souffrance psychique aiguë, le 3114 est disponible 24h/24.",
} as const;
