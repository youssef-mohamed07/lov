import type { Metadata } from "next";

import {
  AboutFigures,
  AboutFounders,
  AboutOverview,
  AboutReassurance,
  AboutTestimonials,
  AboutValues,
  AboutWhyOnline,
} from "@/components/sections/a-propos";
import {
  HomeBento,
  HomeDialogue,
  HomeShowcase,
} from "@/components/sections/home";
import { PageIntro } from "@/components/sections/page-intro";
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
        eyebrow="À propos"
        title={about.title}
        description={about.description}
        image="/images/home-showcase.jpg"
        imageAlt="Échange entre une famille et une professionnelle de l’orthophonie"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        actions={
          <CtaButton href="/bilan" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />
      <AboutReassurance />
      <HomeShowcase />
      <HomeDialogue />
      <AboutOverview />
      <AboutWhyOnline />
      <HomeBento />
      <AboutFigures />
      <AboutFounders />
      <AboutValues />
      <AboutTestimonials />
    </main>
  );
}
