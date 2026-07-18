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
  subjects: [
    { value: "bilan", label: "Bilan orthophonique" },
    { value: "rdv", label: "Prise de rendez-vous" },
    { value: "trouble", label: "Question sur un trouble" },
    { value: "autre", label: "Autre demande" },
  ],
  note: "En cas d’urgence vitale, contactez le 15. Pour une souffrance psychique aiguë, le 3114 est disponible 24h/24.",
} as const;
