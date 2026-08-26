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
import { about } from "@/data/a-propos";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "À propos de Lov et de notre approche orthophonique",
  description: about.description,
  path: "/a-propos",
  image: "/images/home-showcase.jpg",
  imageAlt: "L’équipe et l’approche de Lov",
});

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Qui sommes-nous ?"
        title={about.title}
        description={about.description}
        image="/images/home-showcase.jpg"
        imageAlt="Échange entre une famille et une professionnelle de l’orthophonie"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Nous contacter
          </CtaButton>
        }
      />
      <AboutReassurance />
      <TrustShowcase
        image="/images/showcase-family.jpg"
        imageAlt="Échange entre une famille et un professionnel autour d’un bilan"
        badgeLabel="Bilans réalisés"
        badgeValue="400"
        imageCaption="Une évaluation claire, pensée pour être comprise."
        eyebrow="Notre histoire"
        title={<span className="mark-brush">Pourquoi Les Orthos en Visio existent ?</span>}
        description="En cabinet, les délais d’attente pour un premier rendez-vous se comptent souvent en mois. Pendant ce temps, les difficultés d’un enfant s’installent, parfois se compliquent. Nous avons voulu un relais à cette attente : un premier pas plus rapide, pour que la prise en soin commence le plus tôt possible, sans attendre une place en libéral."
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
