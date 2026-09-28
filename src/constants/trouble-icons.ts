import {
  AudioLines,
  BookOpenText,
  Brain,
  Calculator,
  MessageCircle,
  Smile,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const troubleIcons: Record<string, LucideIcon> = {
  "retard-parole-langage": MessageCircle,
  dyslexie: BookOpenText,
  begaiement: AudioLines,
  dyscalculie: Calculator,
  "fonctions-oro-myo-faciales": Smile,
  "oralite-alimentaire": Utensils,
  "origine-neurologique": Brain,
};

export function getTroubleIcon(slug: string): LucideIcon {
  return troubleIcons[slug] ?? BookOpenText;
}
