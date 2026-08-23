import type { MetadataRoute } from "next";

import {
  articleCategories,
  articles,
  getArticleHref,
  getCategoryHref,
} from "@/data/articles";
import { careers, getCareerRoleHref } from "@/data/carrieres";
import { troubles } from "@/data/troubles";
import { absoluteUrl } from "@/lib/seo";

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/bilan", priority: 0.95, changeFrequency: "monthly" },
  { path: "/troubles", priority: 0.9, changeFrequency: "monthly" },
  { path: "/simulateur", priority: 0.85, changeFrequency: "monthly" },
  { path: "/ressources", priority: 0.85, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/a-propos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/nous-contacter", priority: 0.7, changeFrequency: "monthly" },
  { path: "/carrieres", priority: 0.6, changeFrequency: "weekly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: absoluteUrl(page.path),
    priority: page.priority,
    changeFrequency: page.changeFrequency,
  }));

  const troubleEntries: MetadataRoute.Sitemap = troubles.map((trouble) => ({
    url: absoluteUrl(`/troubles/${trouble.slug}`),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const careerEntries: MetadataRoute.Sitemap = careers.roles.items.map(
    (role) => ({
      url: absoluteUrl(getCareerRoleHref(role.slug)),
      priority: 0.55,
      changeFrequency: "weekly",
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = articleCategories.map(
    (category) => ({
      url: absoluteUrl(getCategoryHref(category.slug)),
      priority: 0.65,
      changeFrequency: "weekly",
    }),
  );

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(getArticleHref(article)),
    lastModified: article.datePublished,
    priority: 0.75,
    changeFrequency: "monthly",
  }));

  return [
    ...staticEntries,
    ...troubleEntries,
    ...careerEntries,
    ...categoryEntries,
    ...articleEntries,
  ];
}
