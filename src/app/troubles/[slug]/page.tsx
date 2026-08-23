import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, MessageCircle, Speech } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { HomeBento } from "@/components/sections/home";
import { PageIntro } from "@/components/sections/page-intro";
import { TroubleProcess } from "@/components/sections/trouble-process";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import {
  getAllTroubleSlugs,
  getRelatedTroubles,
  getTrouble,
} from "@/data/troubles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type TroublePageProps = {
  params: Promise<{ slug: string }>;
};

const relatedIcons = [BookOpen, MessageCircle, Speech] as const;

export async function generateStaticParams() {
  return getAllTroubleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TroublePageProps): Promise<Metadata> {
  const { slug } = await params;
  const trouble = getTrouble(slug);
  if (!trouble) return {};
  return createPageMetadata({
    title: `${trouble.title} : signes et accompagnement orthophonique`,
    description: trouble.description,
    path: `/troubles/${trouble.slug}`,
    image: trouble.image,
    imageAlt: `${trouble.title} — accompagnement orthophonique`,
  });
}

export default async function TroubleDetailPage({ params }: TroublePageProps) {
  const { slug } = await params;
  const trouble = getTrouble(slug);
  if (!trouble) notFound();

  const related = getRelatedTroubles(trouble.slug);
  const path = `/troubles/${trouble.slug}`;
  const troubleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": absoluteUrl(`${path}#webpage`),
        name: trouble.title,
        description: trouble.description,
        url: absoluteUrl(path),
        inLanguage: "fr-FR",
        image: absoluteUrl(trouble.image),
        about: {
          "@type": "MedicalCondition",
          name: trouble.title,
          description: trouble.overview,
        },
        publisher: {
          "@id": absoluteUrl("/#organization"),
        },
      },
      breadcrumbJsonLd([
        { name: "Accueil", path: "/" },
        { name: "Troubles", path: "/troubles" },
        { name: trouble.title, path },
      ]),
    ],
  };

  return (
    <main>
      <JsonLd id="trouble-jsonld" data={troubleJsonLd} />

      {/* 1 — Hero */}
      <PageIntro
        eyebrow="Orthophonie"
        title={trouble.title}
        description={trouble.description}
        image={trouble.image}
        imageAlt={`Illustration de la page ${trouble.title}`}
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Troubles", href: "/troubles" },
          { label: trouble.title },
        ]}
        actions={
          <CtaButton href="/bilan" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />

      {/* 2 — Overview + signs */}
      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              Comprendre
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              De quoi <span className="mark-accent">parle-t-on ?</span>
            </h2>
            <p className="mt-6 border-l-2 border-accent pl-5 font-display text-lg font-medium leading-8 tracking-tight text-foreground sm:pl-6 sm:text-xl sm:leading-9">
              {trouble.overview}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Signes fréquents
              </h3>
              <span
                aria-hidden
                className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"
              />
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {trouble.signs.map((sign, index) => (
                <li
                  key={sign}
                  className="flex items-start gap-3.5 rounded-2xl border border-border bg-surface px-4 py-4 text-sm leading-6 text-foreground shadow-[var(--shadow-card)] sm:px-5 sm:text-base sm:leading-7"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 3 — Platform 6 cards */}
      <HomeBento />

      {/* 4 — Process (hotspot timeline) */}
      <TroubleProcess troubleTitle={trouble.title} />

      {/* 5 — Approach bar */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-foreground">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[260px] lg:min-h-[440px]">
                  <Image
                    src={trouble.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#0E0E0F]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0E0E0F]"
                  />
                </div>

                <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(254,81,16,0.22),transparent_60%)]"
                  />
                  <div className="relative">
                    <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                      Notre approche
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:leading-[1.15]">
                      Un accompagnement{" "}
                      <span className="mark-brush">sur mesure</span>
                    </h2>
                    <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                      {trouble.approach}
                    </p>
                    <div className="mt-8">
                      <CtaButton href="/bilan" size="lg">
                        Demander un bilan
                      </CtaButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6 — Related troubles */}
      {related.length > 0 ? (
        <section className="bg-background py-[var(--section-space-lg)]">
          <Container>
            <Reveal
              className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              variant="fade"
            >
              <div>
                <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
                  Explorer
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Autres{" "}
                  <span className="font-medium italic text-voice">troubles</span>
                </h2>
              </div>
              <Link
                href="/troubles"
                className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline-offset-4 hover:underline sm:pb-1"
              >
                Voir tout
              </Link>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => {
                const Icon = relatedIcons[index] ?? BookOpen;

                return (
                  <li key={item.slug}>
                    <Reveal
                      delay={index * 0.05}
                      variant="fade"
                      className="h-full"
                    >
                      <Link
                        href={`/troubles/${item.slug}`}
                        className="group flex h-full min-h-[240px] flex-col rounded-[1.35rem] border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent-soft/15 sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <span className="font-display text-xs font-semibold tabular-nums text-muted-soft">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                          {item.description}
                        </p>
                        <span className="mt-6 inline-flex w-fit min-h-11 items-center gap-2.5 rounded-full bg-accent py-1 pl-4 pr-1 text-sm font-medium text-white transition-[background-color,box-shadow] duration-300 group-hover:bg-accent-hover group-hover:shadow-[0_14px_32px_-18px_rgba(254,81,16,0.45)]">
                          <span className="tracking-[-0.01em]">
                            En savoir plus
                          </span>
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-105">
                            <ArrowUpRight className="size-3.5" aria-hidden />
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* 7 — FAQ injected via SiteChrome for /troubles/[slug] */}
    </main>
  );
}
