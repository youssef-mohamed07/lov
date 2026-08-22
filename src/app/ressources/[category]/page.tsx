import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import {
  articleCategories,
  getArticleHref,
  getArticlesByCategory,
  getCategory,
  getCategoryHref,
} from "@/data/articles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

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
  return createPageMetadata({
    title: `${category.title} — ressources en orthophonie`,
    description: category.description,
    path: getCategoryHref(category.slug),
    image: "/images/ortho-reading.jpg",
    imageAlt: `Ressources d’orthophonie : ${category.title}`,
  });
}

export default async function ArticleCategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const items = getArticlesByCategory(category.slug);
  const path = getCategoryHref(category.slug);
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${path}#collection`),
        name: category.title,
        description: category.description,
        url: absoluteUrl(path),
        inLanguage: "fr-FR",
        hasPart: items.map((article) => ({
          "@type": "Article",
          headline: article.title,
          url: absoluteUrl(getArticleHref(article)),
        })),
      },
      breadcrumbJsonLd([
        { name: "Accueil", path: "/" },
        { name: "Ressources", path: "/ressources" },
        { name: category.title, path },
      ]),
    ],
  };

  return (
    <main>
      <JsonLd id="resource-category-jsonld" data={categoryJsonLd} />
      <PageIntro
        eyebrow="Ressources"
        title={category.title}
        description={category.description}
        image="/images/ortho-reading.jpg"
        imageAlt={`Lecture de ressources sur ${category.title.toLowerCase()}`}
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

      <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
        <Container className="relative">
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
                      className="block min-h-11 py-8 transition-colors hover:text-accent"
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
