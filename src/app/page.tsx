import type { Metadata } from "next";

import { AboutPlatformBento } from "@/components/sections/a-propos";
import {
  HomeBento,
  HomeDialogue,
  HomeHero,
  HomePlatform,
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
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: absoluteUrl("/"),
  name: SITE_FULL_NAME,
  alternateName: ["LOV", SITE_NAME],
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
      <AboutPlatformBento />
      <HomeBento />
      <HomeServicesGrid />
      <HomePlatform />
      <HomeTestimonials />
    </main>
  );
}
