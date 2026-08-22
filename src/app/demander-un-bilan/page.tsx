import type { Metadata } from "next";

import { BilanFlow } from "@/components/sections/bilan-flow";

export const metadata: Metadata = {
  title: "Demander un bilan",
  description: "Préparez votre demande de bilan orthophonique en quelques étapes.",
};

export default function DemanderUnBilanPage() {
  return (
    <main>
      <BilanFlow />
    </main>
  );
}
