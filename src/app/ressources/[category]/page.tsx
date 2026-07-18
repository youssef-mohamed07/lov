import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import {
  articleCategories,
  getArticleHref,
  getArticlesByCategory,
  getCategory,
} from "@/data/articles";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return articleCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function ArticleCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const items = getArticlesByCategory(category.slug);

  return (
    <main>
      <PageIntro
        eyebrow="Ressources"
        title={category.title}
        description={category.description}
        image="/images/ortho-reading.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources" },
          { label: category.title },
        ]}
        actions={
          <CtaButton href="/ressources" size="lg">
            Toutes les ressources
          </CtaButton>
        }
      />

      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          {items.length === 0 ? (
            <p className="text-muted">
              Aucun article dans cette catégorie pour le moment.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {items.map((article, index) => (
                <li key={article.slug}>
                  <Reveal delay={index * 0.04}>
                    <Link
                      href={getArticleHref(article)}
                      className="block py-8 transition-colors hover:text-accent"
                    >
                      <span className="text-sm text-muted">{article.date}</span>
                      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        {article.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                        {article.excerpt}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </main>
  );
}
