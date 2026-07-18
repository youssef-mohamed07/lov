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

export const metadata: Metadata = {
  title: "À propos",
  description: about.description,
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="À propos"
        title={about.title}
        description={about.description}
        image="/images/home-showcase.jpg"
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
