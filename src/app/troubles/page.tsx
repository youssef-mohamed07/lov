import type { Metadata } from "next";
import {
  ArrowUpRight,
  AudioLines,
  BookOpen,
  BrainCircuit,
  Calculator,
  MessageCircle,
  Mic2,
  PenLine,
  Speech,
} from "lucide-react";
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

const troubleIcons = [
  BookOpen,
  MessageCircle,
  AudioLines,
  PenLine,
  Calculator,
  Speech,
  BrainCircuit,
  Mic2,
] as const;

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
          <CtaButton href="/nous-contacter" size="lg">
            Nous contacter
          </CtaButton>
        }
      />

      <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
        <Container className="relative">
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {troubles.map((trouble, index) => {
              const Icon = troubleIcons[index] ?? BookOpen;

              return (
                <li key={trouble.slug}>
                  <Reveal
                    delay={(index % 3) * 0.06}
                    variant="fade"
                    className="h-full"
                  >
                    <Link
                      href={`/troubles/${trouble.slug}`}
                      className="group flex h-full min-h-[250px] flex-col rounded-[1.35rem] border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent-soft/15 sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className="font-display text-xs font-semibold tabular-nums text-muted-soft">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="mt-6 flex flex-1 flex-col">
                        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          {trouble.title}
                        </h2>
                        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                          {trouble.description}
                        </p>
                        <span className="mt-6 inline-flex w-fit min-h-11 items-center gap-2.5 rounded-full bg-accent py-1 pl-4 pr-1 text-sm font-medium text-white transition-[background-color,box-shadow] duration-300 group-hover:bg-accent-hover group-hover:shadow-[0_14px_32px_-18px_rgba(254,81,16,0.45)]">
                          <span className="tracking-[-0.01em]">
                            En savoir plus
                          </span>
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-105">
                            <ArrowUpRight className="size-3.5" aria-hidden />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}
