import type { Metadata } from "next";

import { HomeTestimonials } from "@/components/sections/home";
import {
  SuiviBento,
  SuiviHero,
  SuiviPlatformBento,
  SuiviPricing,
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

const description =
  "Suivi orthophonique en visio : séances individuelles de 30 minutes, compte rendu après chaque séance, exercices personnalisés. 60 € la séance, sans abonnement.";

export const metadata: Metadata = createPageMetadata({
  title: "Suivi orthophonique en visioconférence",
  description,
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
      description,
      url: absoluteUrl("/suivi"),
      serviceType: "Suivi orthophonique",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      provider: {
        "@id": absoluteUrl("/#organization"),
      },
      offers: {
        "@type": "Offer",
        price: "60",
        priceCurrency: "EUR",
        url: absoluteUrl("/deja-un-bilan"),
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
      <SuiviPlatformBento />
      <SuiviBento />
      <SuiviPricing />
      <HomeTestimonials />
    </main>
  );
}
