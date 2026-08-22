import type { Metadata } from "next";

import { BilanFlow } from "@/components/sections/bilan-flow";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Demander un bilan orthophonique",
  description:
    "Vérifiez votre éligibilité et préparez votre demande de bilan orthophonique en téléconsultation.",
  path: "/demander-un-bilan",
  noIndex: true,
});

export default function DemanderUnBilanPage() {
  return (
    <main>
      <BilanFlow />
    </main>
  );
}
