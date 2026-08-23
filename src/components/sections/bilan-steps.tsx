import { CalendarDays, ClipboardList, FileText } from "lucide-react";

import { SimpleSteps } from "@/components/sections/simple-steps";
import { bilan } from "@/data/bilan";

const stepIcons = [CalendarDays, ClipboardList, FileText] as const;

export function BilanSteps() {
  const { parcours } = bilan;

  return (
    <SimpleSteps
      eyebrow={parcours.eyebrow}
      title={<span className="mark-accent">{parcours.title}</span>}
      steps={parcours.steps.map((step, index) => ({
        title: step.title,
        description: step.description,
        icon: stepIcons[index] ?? FileText,
      }))}
    />
  );
}
