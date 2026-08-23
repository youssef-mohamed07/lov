import type { Metadata } from "next";

import { BilanHero } from "@/components/sections/bilan-hero";
import { BilanOverview } from "@/components/sections/bilan-overview";
import { BilanProcess } from "@/components/sections/bilan-process";
import { BilanSteps } from "@/components/sections/bilan-steps";
import { BilanTrust } from "@/components/sections/bilan-trust";
import { JsonLd } from "@/components/seo/json-ld";
import { bilan } from "@/data/bilan";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bilan orthophonique en ligne et en visioconférence",
  description: bilan.description,
  path: "/bilan",
  image: "/images/path-bilan.jpg",
  imageAlt: "Bilan orthophonique en téléconsultation",
});

const bilanJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": absoluteUrl("/bilan#service"),
      name: "Bilan orthophonique en téléconsultation",
      description: bilan.description,
      url: absoluteUrl("/bilan"),
      serviceType: "Bilan orthophonique",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      provider: {
        "@id": absoluteUrl("/#organization"),
      },
      offers: {
        "@type": "Offer",
        price: "180",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/demander-un-bilan"),
      },
    },
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Bilan orthophonique", path: "/bilan" },
    ]),
  ],
};

export default function BilanPage() {
  return (
    <main>
      <JsonLd id="bilan-jsonld" data={bilanJsonLd} />
      <BilanHero />
      <BilanTrust />
      <BilanSteps />
      <BilanOverview />
      <BilanProcess />
    </main>
  );
}
