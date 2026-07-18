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
        <Container size="md">
          <Reveal>
            <p className="font-display text-xl font-medium leading-8 tracking-tight text-foreground sm:text-2xl sm:leading-9">
              {firstParagraph}
            </p>
            <div className="mt-8 flex flex-col gap-6">
              {restParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-7 text-muted sm:text-lg sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-[var(--section-space-md)]">
        <Container>
          <Reveal className="mb-8 max-w-xl" variant="fade">
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              Galerie
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Autour de{" "}
              <span className="font-medium italic text-voice">
                la ressource
              </span>
            </h2>
          </Reveal>

          <div className="grid auto-rows-[150px] gap-3 sm:auto-rows-[180px] sm:grid-cols-4 lg:auto-rows-[220px]">
            {article.gallery.map((frame, index) => (
              <Reveal
                key={frame.src + index}
                delay={index * 0.06}
                variant="fade-scale"
                className={cn(
                  index === 0 && "sm:col-span-2 sm:row-span-2",
                  index === 3 && "sm:col-span-2",
                )}
              >
                <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-border">
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
                Envie d’aller plus loin ?
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
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                À lire aussi
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
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
                      <div className="flex flex-1 flex-col p-5">
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
