import {
  CalendarDays,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import { SimpleSteps } from "@/components/sections/simple-steps";

const steps = [
  {
    title: "Réservation",
    description: "Choisissez un créneau dans notre agenda en ligne.",
    icon: CalendarDays,
  },
  {
    title: "Évaluation",
    description: "Le bilan est réalisé en visio, depuis chez vous.",
    icon: ClipboardList,
  },
  {
    title: "Rééducation",
    description: "Objectifs clairs et adaptés pour progresser.",
    icon: TrendingUp,
  },
] as const;

export function HomeSteps() {
  return (
    <SimpleSteps
      eyebrow="Parcours"
      title={
        <>
          3 <span className="mark-brush">étapes simples</span>
        </>
      }
      steps={steps}
    />
  );
}
