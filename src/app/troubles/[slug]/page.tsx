import type { Metadata } from "next";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import {
  getAllTroubleSlugs,
  getRelatedTroubles,
  getTrouble,
} from "@/data/troubles";

type TroublePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllTroubleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TroublePageProps): Promise<Metadata> {
  const { slug } = await params;
  const trouble = getTrouble(slug);
  if (!trouble) return {};
  return {
    title: trouble.title,
    description: trouble.description,
  };
}

export default async function TroubleDetailPage({ params }: TroublePageProps) {
  const { slug } = await params;
  const trouble = getTrouble(slug);
  if (!trouble) notFound();

  const related = getRelatedTroubles(trouble.slug);

  return (
    <main>
      <PageIntro
        eyebrow="Orthophonie"
        title={trouble.title}
        description={trouble.description}
        image={trouble.image}
        breadcrumbs={[
          { label: "Troubles", href: "/troubles" },
          { label: trouble.title },
        ]}
        actions={
          <CtaButton href="/bilan" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />

      {/* Overview + signs */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Comprendre
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                De quoi{" "}
                <span className="font-medium italic text-voice">parle-t-on ?</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {trouble.overview}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Signes fréquents
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {trouble.signs.map((sign) => (
                    <li
                      key={sign}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground sm:text-base"
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-surface py-[var(--section-space-lg)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal variant="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border">
                <Image
                  src={trouble.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08} variant="right">
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Notre approche
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Un accompagnement{" "}
                <span className="font-medium italic text-voice">sur mesure</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {trouble.approach}
              </p>
              <div className="mt-8">
                <CtaButton href="/bilan" size="lg">
                  Demander un bilan
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-background py-[var(--section-space-lg)]">
          <Container>
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                  Explorer
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Autres troubles
                </h2>
              </div>
              <Link
                href="/troubles"
                className="hidden text-sm font-medium text-accent underline-offset-4 hover:underline sm:inline"
              >
                Voir tout
              </Link>
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={index * 0.05} variant="fade" className="h-full">
                    <Link
                      href={`/troubles/${item.slug}`}
                      className="group relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-border"
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                      />
                      <div className="relative z-10 p-5">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-white/80">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
