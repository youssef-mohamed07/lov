import { ClipboardList, Target, Video } from "lucide-react";

import { SimpleSteps } from "@/components/sections/simple-steps";
import { suivi } from "@/data/suivi";

const stepIcons = [ClipboardList, Target, Video] as const;

export function SuiviSteps() {
  const { parcours } = suivi;

  return (
    <SimpleSteps
      eyebrow={parcours.eyebrow}
      title={<span className="mark-accent">{parcours.title}</span>}
      steps={parcours.steps.map((step, index) => ({
        title: step.title,
        description: step.description,
        icon: stepIcons[index] ?? Video,
      }))}
    />
  );
}
