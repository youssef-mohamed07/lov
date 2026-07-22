import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import {
  articles,
  getArticle,
  getArticleHref,
  getCategory,
  getCategoryHref,
  getRelatedArticles,
} from "@/data/articles";
import { cn } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = getArticle(categorySlug, slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getRelatedArticles(article);
  const [firstParagraph, ...restParagraphs] = article.content;
  const wordCount = article.content.join(" ").split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <main>
      <PageIntro
        title={article.title}
        description={article.excerpt}
        image={article.image}
        eyebrow={`${category?.title ?? "Ressource"} · ${article.date}`}
        breadcrumbs={[
          { label: "Ressources", href: "/ressources" },
          ...(category
            ? [
                {
                  label: category.title,
                  href: getCategoryHref(category.slug),
                },
              ]
            : []),
          { label: article.title },
        ]}
      />

      {/* Body */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-20">
            {/* Meta rail */}
            <Reveal variant="fade">
              <aside className="flex flex-row flex-wrap items-center gap-x-6 gap-y-3 lg:sticky lg:top-28 lg:flex-col lg:items-start lg:gap-6">
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-muted-soft uppercase">
                    Catégorie
                  </p>
                  <p className="mt-1.5 text-sm font-semibold tracking-tight text-accent">
                    {category?.title ?? "Ressource"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-muted-soft uppercase">
                    Publié le
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {article.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.18em] text-muted-soft uppercase">
                    Lecture
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">
                    {readingMinutes} min
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden h-px w-12 bg-accent lg:block"
                />
                <p className="hidden max-w-[13rem] text-sm leading-6 text-muted lg:block">
                  {article.excerpt}
                </p>
              </aside>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.06}>
              <p
                className={cn(
                  "font-display text-xl font-medium leading-9 tracking-tight text-foreground sm:text-2xl sm:leading-[1.55]",
                  "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4em] first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-accent",
                )}
              >
                {firstParagraph}
              </p>
              <div className="mt-9 flex flex-col gap-7 border-t border-border pt-9">
                {restParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-9"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
        <Container className="relative">
          <Reveal
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            variant="fade"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                Galerie
              </p>
              <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Autour de{" "}
                <span className="mark-accent">la ressource</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid auto-rows-[150px] gap-3 sm:auto-rows-[180px] sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
            {article.gallery.map((frame, index) => (
              <Reveal
                key={frame.src + index}
                delay={index * 0.06}
                variant="fade-scale"
                className={cn(
                  "min-w-0",
                  index === 0 && "sm:col-span-2 sm:row-span-2",
                  index === 3 && "sm:col-span-2",
                )}
              >
                <div className="relative h-full min-h-[150px] overflow-hidden rounded-[1.35rem] border border-border">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-background py-[var(--section-space-md)]">
        <Container size="md">
          <Reveal>
            <div className="rounded-[1.75rem] border border-border bg-surface px-6 py-8 sm:px-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Envie d’aller{" "}
                <span className="squiggle-accent">plus loin</span> ?
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted sm:text-base">
                Clarifiez le besoin avec le simulateur, ou préparez directement
                une demande de bilan.
              </p>
              <div className="mt-6">
                <CtaButton href="/bilan" size="md">
                  Bilan orthophonique
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="bg-background pb-[var(--section-space-lg)]">
          <Container>
            <Reveal
              className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              variant="fade"
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                À lire{" "}
                <span className="font-medium italic text-voice">aussi</span>
              </h2>
              <Link
                href="/ressources"
                className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline-offset-4 hover:underline sm:pb-1"
              >
                Toutes les ressources
              </Link>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <Reveal delay={index * 0.05} variant="fade" className="h-full">
                    <Link
                      href={getArticleHref(item)}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface transition-[border-color] hover:border-accent/40"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col p-5">
                        <p className="text-xs text-muted">{item.date}</p>
                        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
                          {item.title}
                        </h3>
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
