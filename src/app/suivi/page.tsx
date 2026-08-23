import type { Metadata } from "next";

import { AboutPlatformBento } from "@/components/sections/a-propos";
import { HomeBento, HomeTestimonials } from "@/components/sections/home";
import {
  SuiviHero,
  SuiviSteps,
  SuiviTrust,
} from "@/components/sections/suivi";
import { JsonLd } from "@/components/seo/json-ld";
import { suivi } from "@/data/suivi";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Suivi orthophonique en visioconférence",
  description: suivi.description,
  path: "/suivi",
  image: suivi.trust.image,
  imageAlt: suivi.trust.imageAlt,
});

const suiviJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": absoluteUrl("/suivi#service"),
      name: "Suivi orthophonique en téléconsultation",
      description: suivi.description,
      url: absoluteUrl("/suivi"),
      serviceType: "Suivi orthophonique",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      provider: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Suivi", path: "/suivi" },
    ]),
  ],
};

export default function SuiviPage() {
  return (
    <main>
      <JsonLd id="suivi-jsonld" data={suiviJsonLd} />
      <SuiviHero />
      <SuiviTrust />
      <SuiviSteps />
      <AboutPlatformBento />
      <HomeBento />
      <HomeTestimonials />
    </main>
  );
}
