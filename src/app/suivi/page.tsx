import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaButton } from "@/components/ui/cta-button";
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
  image: suivi.image,
  imageAlt: suivi.imageAlt,
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
      <PageIntro
        eyebrow={suivi.eyebrow}
        title={
          <>
            {suivi.title}{" "}
            <span className="font-medium italic text-voice">
              {suivi.titleAccent}
            </span>
          </>
        }
        description={suivi.description}
        image={suivi.image}
        imageAlt={suivi.imageAlt}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Suivi" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <CtaButton href={suivi.ctaHref} size="lg">
              {suivi.ctaLabel}
            </CtaButton>
            <Link
              href={suivi.secondaryHref}
              className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {suivi.secondaryLabel}
            </Link>
          </div>
        }
      />
    </main>
  );
}
