import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { troubles, troublesPage } from "@/data/troubles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Troubles du langage, de la parole et des apprentissages",
  description: troublesPage.description,
  path: "/troubles",
  image: "/images/trouble-language.jpg",
  imageAlt: "Accompagnement des troubles du langage et des apprentissages",
});

const troublesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/troubles#collection"),
      name: troublesPage.title,
      description: troublesPage.description,
      url: absoluteUrl("/troubles"),
      inLanguage: "fr-FR",
      hasPart: troubles.map((trouble) => ({
        "@type": "MedicalWebPage",
        name: trouble.title,
        description: trouble.description,
        url: absoluteUrl(`/troubles/${trouble.slug}`),
      })),
    },
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Troubles", path: "/troubles" },
    ]),
  ],
};

export default function TroublesPage() {
  return (
    <main>
      <JsonLd id="troubles-jsonld" data={troublesJsonLd} />
      <PageIntro
        eyebrow="Troubles"
        title={
          <>
            Troubles que nous{" "}
            <span className="font-medium italic text-voice">accompagnons</span>
          </>
        }
        description={troublesPage.description}
        image="/images/trouble-language.jpg"
        imageAlt="Activité d’accompagnement du langage"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Troubles" }]}
        actions={
          <CtaButton href="/bilan" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />

      <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
        <Container className="relative">
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {troubles.map((trouble, index) => (
              <li key={trouble.slug}>
                <Reveal
                  delay={(index % 3) * 0.06}
                  variant="fade"
                  className="h-full"
                >
                  <Link
                    href={`/troubles/${trouble.slug}`}
                    className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-border sm:min-h-[340px]"
                  >
                    <Image
                      src={trouble.image}
                      alt=""
                      fill
                      sizes="(max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
                    />
                    <div className="relative z-10 p-5 sm:p-6">
                      <h2 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {trouble.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/85">
                        {trouble.description}
                      </p>
                      <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-white underline-offset-4 group-hover:underline">
                        Comprendre {trouble.shortTitle.toLowerCase()}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
