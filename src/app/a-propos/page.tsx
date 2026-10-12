import type { Metadata } from "next";

import {
  AboutCareersBanner,
  AboutFounders,
  AboutOverview,
  AboutPlatformBento,
  AboutReassurance,
  AboutTestimonials,
  AboutValues,
} from "@/components/sections/a-propos";
import { HomeDialogue } from "@/components/sections/home";
import { PageIntro } from "@/components/sections/page-intro";
import { TrustShowcase } from "@/components/sections/trust-showcase";
import { CtaButton } from "@/components/ui/cta-button";
import { JsonLd } from "@/components/seo/json-ld";
import { about } from "@/data/a-propos";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const description =
  "Les Orthos en Visio (LOV) : deux orthophonistes diplômées qui rendent le bilan et le suivi orthophonique accessibles en téléconsultation, sans liste d’attente.";

export const metadata: Metadata = createPageMetadata({
  title: "À propos des Orthos en Visio (LOV), orthophonistes en ligne",
  absoluteTitle: true,
  description,
  path: "/a-propos",
  image: "/images/photo-05-morgane-de-dos.jpg",
  imageAlt: "L’équipe et l’approche de Lov",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": absoluteUrl("/a-propos#about"),
      name: "À propos des Orthos en Visio",
      description,
      url: absoluteUrl("/a-propos"),
      inLanguage: "fr-FR",
      about: { "@id": absoluteUrl("/#organization") },
    },
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "À propos", path: "/a-propos" },
    ]),
  ],
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd id="about-jsonld" data={aboutJsonLd} />
      <PageIntro
        eyebrow="Qui sommes-nous ?"
        title={about.title}
        description={about.description}
        image="/images/photo-05-morgane-de-dos.jpg"
        imageAlt="Orthophoniste travaillant depuis son cabinet en ligne"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Nous contacter
          </CtaButton>
        }
      />
      <AboutReassurance />
      <TrustShowcase
        image="/images/drive-home-section-7-a.png"
        imageAlt="Orthophoniste accompagnant une enfant en visioconférence"
        badgeLabel="Bilans réalisés"
        badgeValue="400"
        imageCaption="Une évaluation claire, pensée pour être comprise."
        eyebrow="Notre histoire"
        title="Pourquoi Les Orthos en Visio existent ?"
        description="En cabinet, les délais d’attente pour un premier rendez-vous se comptent souvent en mois. Pendant ce temps, les difficultés d’un enfant s’installent, parfois se compliquent. Nous avons voulu un relais à cette attente : un premier pas plus rapide, pour que la prise en soin commence le plus tôt possible sans attendre une place en libéral."
        ctaLabel="Demander un bilan"
        ctaHref="/demander-un-bilan"
      />
      <AboutPlatformBento />
      <HomeDialogue />
      <AboutOverview />
      <AboutFounders />
      <AboutValues />
      <AboutCareersBanner />
      <AboutTestimonials />
    </main>
  );
}
