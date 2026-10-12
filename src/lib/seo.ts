import type { Metadata } from "next";

/** Short brand, used as the title suffix. */
export const SITE_NAME = "Lov";
/** Full brand name, used for the site name in search and social previews. */
export const SITE_FULL_NAME = "Les Orthos en Visio";
export const SITE_TITLE =
  "Les Orthos en Visio (LOV) · Bilan orthophonique en ligne";
export const SITE_DESCRIPTION =
  "Bilan et suivi orthophonique en ligne avec des orthophonistes diplômées, sans liste d’attente. Langage, parole et apprentissages, partout en France.";

const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
// On Vercel, fall back to the project's production domain rather than a
// hard-coded one, so canonicals never point at a domain we don't serve.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const SITE_URL = new URL(
  configuredUrl && /^https?:\/\//.test(configuredUrl)
    ? configuredUrl
    : vercelUrl
      ? `https://${vercelUrl}`
      : "https://lov.care",
);

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image.png",
  imageAlt = `${SITE_FULL_NAME} — orthophonie en téléconsultation`,
  type = "website",
  publishedTime,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_FULL_NAME,
      locale: "fr_FR",
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
