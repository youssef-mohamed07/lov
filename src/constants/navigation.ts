export const navLinks = [
  { href: "/bilan", label: "Bilan" },
  { href: "/troubles", label: "Troubles" },
  { href: "/simulateur", label: "Simulateur" },
  { href: "/ressources", label: "Ressources" },
  { href: "/suivi", label: "Suivi" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/carrieres", label: "Carrières" },
] as const;

export const footerLinks = {
  parcours: [
    { href: "/bilan", label: "Bilan orthophonique" },
    { href: "/suivi", label: "Suivi" },
    { href: "/troubles", label: "Troubles" },
    { href: "/simulateur", label: "Simulateur" },
  ],
  ressources: [
    { href: "/ressources", label: "Toutes les ressources" },
    { href: "/faq", label: "Questions fréquentes" },
    { href: "/ressources/familles", label: "Pour les familles" },
    { href: "/ressources/orientation", label: "Orientation" },
  ],
  contact: [
    { href: "/a-propos", label: "À propos" },
    { href: "/carrieres", label: "Carrières" },
    { href: "/nous-contacter", label: "Nous contacter" },
  ],
} as const;
