import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { ArticlesSubscribe } from "@/components/sections/articles-subscribe";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import {
  articleCategories,
  articles,
  articlesPage,
  getArticleHref,
  getCategoryHref,
} from "@/data/articles";

export const metadata: Metadata = {
  title: "Ressources",
  description: articlesPage.description,
};

export default function ArticlesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Ressources"
        title={articlesPage.title}
        description={articlesPage.description}
        image="/images/ortho-reading.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Ressources" },
        ]}
        actions={
          <div className="w-full max-w-lg">
            <ArticlesSubscribe />
          </div>
        }
      />

      <section className="bg-background py-[var(--section-space-md)] pb-[var(--section-space-lg)]">
        <Container>
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/ressources"
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
              >
                Tous
              </Link>
              {articleCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={getCategoryHref(category.slug)}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent-soft"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {articles.map((article, index) => {
              const category = articleCategories.find(
                (item) => item.slug === article.category,
              );
              return (
                <li key={article.slug}>
                  <Reveal
                    delay={(index % 4) * 0.05}
                    variant="fade"
                    className="h-full"
                  >
                    <Link
                      href={getArticleHref(article)}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-[var(--shadow-card)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-accent-soft">
                        <Image
                          src={article.image}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          {category ? (
                            <span className="font-medium tracking-[0.12em] text-accent uppercase">
                              {category.title}
                            </span>
                          ) : null}
                          <span aria-hidden>·</span>
                          <span>{article.date}</span>
                        </div>
                        <h2 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                          {article.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted">
                          {article.excerpt}
                        </p>
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
