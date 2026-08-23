import type { Metadata } from "next";
import {
  BookOpen,
  Clock3,
  HeartHandshake,
  Lightbulb,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { TroubleProcess } from "@/components/sections/trouble-process";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { getAllTroubleSlugs, getTrouble } from "@/data/troubles";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

type TroublePageProps = {
  params: Promise<{ slug: string }>;
};

const recommendationIcons = [
  MessageCircleMore,
  HeartHandshake,
  Clock3,
  BookOpen,
  Lightbulb,
  ShieldCheck,
] as const;

export async function generateStaticParams() {
  return getAllTroubleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TroublePageProps): Promise<Metadata> {
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
        publisher: { "@id": absoluteUrl("/#organization") },
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

      <PageIntro
        eyebrow={trouble.eyebrow}
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
          <CtaButton href="/nous-contacter" size="lg">
            Nous contacter
          </CtaButton>
        }
      />

      <section className="overflow-hidden bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              Comprendre
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {trouble.overviewTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {trouble.overview}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-14">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Signes fréquents
              </h3>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
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

      <section className="overflow-hidden bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              Recommandations
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Ce que vous pouvez faire <span className="mark-accent">dès maintenant</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Quelques gestes simples, à intégrer dans le quotidien.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trouble.recommendations.map((recommendation, index) => {
              const Icon = recommendationIcons[index] ?? Lightbulb;
              return (
                <li key={recommendation.title}>
                  <Reveal delay={(index % 3) * 0.06} variant="fade" className="h-full">
                    <article className="h-full min-h-[210px] rounded-[1.35rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                        {recommendation.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {recommendation.description}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <TroubleProcess steps={trouble.journey} />

      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-12 text-center sm:px-10 sm:py-16">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_100%_at_50%_120%,rgba(249,171,108,0.28),transparent_65%)]" />
              <div className="relative mx-auto max-w-3xl">
                <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                  Prêt à commencer ?
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                  Un bilan pour y voir plus clair
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  {trouble.ctaDescription}
                </p>
                <div className="mt-8 flex justify-center">
                  <CtaButton href="/bilan" size="lg">
                    Explorer le bilan
                  </CtaButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
