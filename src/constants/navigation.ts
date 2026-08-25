export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/bilan", label: "Bilan" },
  { href: "/suivi", label: "Suivi" },
  { href: "/troubles", label: "Troubles" },
  { href: "/a-propos", label: "À propos" },
  { href: "/carrieres", label: "Nous rejoindre" },
  { href: "/ressources", label: "Ressources" },
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
    { href: "/carrieres", label: "Nous rejoindre" },
    { href: "/nous-contacter", label: "Nous contacter" },
  ],
} as const;
