import type { Metadata } from "next";

import {
  HomeBento,
  HomeDialogue,
  HomeHero,
  HomePlatform,
  HomePricing,
  HomeServicesGrid,
  HomeShowcase,
  HomeSteps,
  HomeTestimonials,
} from "@/components/sections/home";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Lov — Bilan et orthophonie en téléconsultation",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: absoluteUrl("/"),
  name: SITE_NAME,
  alternateName: "Les Orthos en Visio",
  description: SITE_DESCRIPTION,
  inLanguage: "fr-FR",
  publisher: {
    "@id": absoluteUrl("/#organization"),
  },
};

export default function HomePage() {
  return (
    <main>
      <JsonLd id="website-jsonld" data={websiteJsonLd} />
      <HomeHero />
      <HomeShowcase />
      <HomeSteps />
      <HomeDialogue />
      <HomeBento />
      <HomeServicesGrid />
      <HomeTestimonials />
      <HomePlatform />
      <HomePricing />
    </main>
  );
}
