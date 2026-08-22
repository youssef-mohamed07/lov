import type { Metadata } from "next";

import { FaqDirectory } from "@/components/sections/faq-directory";
import { PageIntro } from "@/components/sections/page-intro";
import { CtaButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Toutes les réponses de Lov sur le bilan orthophonique, le suivi à distance, notre équipe et les troubles pris en charge.",
};

export default function FaqPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Questions fréquentes"
        title={
          <>
            Toutes vos questions,{" "}
            <span className="font-medium italic">nos réponses</span>
          </>
        }
        description="Retrouvez toutes les réponses sur le bilan, le suivi, notre équipe et les troubles accompagnés à distance."
        image="/images/faq-calm.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "FAQ" },
        ]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Nous écrire
          </CtaButton>
        }
      />
      <FaqDirectory />
    </main>
  );
}
