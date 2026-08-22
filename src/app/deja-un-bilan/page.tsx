import type { Metadata } from "next";

import { ExistingBilanForm } from "@/components/sections/existing-bilan-form";

export const metadata: Metadata = {
  title: "J’ai déjà un bilan",
  description:
    "Partagez votre bilan existant pour être orienté vers la suite adaptée.",
};

export default function DejaUnBilanPage() {
  return (
    <main>
      <ExistingBilanForm />
    </main>
  );
}
