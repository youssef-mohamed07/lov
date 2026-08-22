import type { Metadata } from "next";

import { FaqDirectory } from "@/components/sections/faq-directory";
import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaButton } from "@/components/ui/cta-button";
import { faqGroups } from "@/data/faqs";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const description =
  "Toutes les réponses de Lov sur le bilan orthophonique, le suivi à distance, notre équipe et les troubles pris en charge.";

export const metadata: Metadata = createPageMetadata({
  title: "Questions fréquentes sur l’orthophonie en ligne",
  description,
  path: "/faq",
  image: "/images/faq-calm.jpg",
  imageAlt: "Réponses aux questions sur l’orthophonie en ligne",
});

const uniqueFaqItems = Array.from(
  new Map(
    faqGroups
      .flatMap((group) => group.content.items)
      .map((item) => [item.question, item]),
  ).values(),
);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/faq#questions"),
      url: absoluteUrl("/faq"),
      inLanguage: "fr-FR",
      mainEntity: uniqueFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Questions fréquentes", path: "/faq" },
    ]),
  ],
};

export default function FaqPage() {
  return (
    <main>
      <JsonLd id="faq-jsonld" data={faqJsonLd} />
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
        imageAlt="Famille consultant les réponses de Lov"
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
