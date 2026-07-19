/** Labels only — home-only preview: nav items don't navigate anywhere. */
export const navLinks = [
  { label: "Bilan" },
  { label: "Troubles" },
  { label: "Simulateur" },
  { label: "Ressources" },
] as const;

export const secondaryNavLinks = [
  { label: "À propos" },
  { label: "Carrières" },
] as const;

export const footerLinks = {
  parcours: [
    { label: "Bilan orthophonique" },
    { label: "Troubles" },
    { label: "Simulateur" },
  ],
  ressources: [
    { label: "Toutes les ressources" },
    { label: "Pour les familles" },
    { label: "Orientation" },
  ],
  contact: [
    { label: "À propos" },
    { label: "Carrières" },
    { label: "Nous contacter" },
  ],
} as const;
