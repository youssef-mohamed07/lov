import type { Metadata } from "next";
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
      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
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

      {/* Approach */}
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
                      <span className="font-medium italic text-accent">
                        sur mesure
                      </span>
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

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-background py-[var(--section-space-lg)]">
          <Container>
            <Reveal
              className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              variant="fade"
            >
              <div>
                <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
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
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={index * 0.05} variant="fade" className="h-full">
                    <Link
                      href={`/troubles/${item.slug}`}
                      className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-border sm:min-h-[240px]"
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
