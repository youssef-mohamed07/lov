import type { Metadata } from "next";
import localFont from "next/font/local";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

import "./globals.css";

const modulus = localFont({
  src: [
    {
      path: "../fonts/modulus-pro/ModulusPro-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/modulus-pro/ModulusPro-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_FULL_NAME,
  keywords: [
    "orthophoniste en ligne",
    "bilan orthophonique en ligne",
    "bilan orthophonique en visio",
    "téléorthophonie",
    "téléconsultation orthophonique",
    "langage",
    "parole",
    "apprentissages",
  ],
  authors: [{ name: SITE_FULL_NAME, url: SITE_URL }],
  creator: SITE_FULL_NAME,
  publisher: SITE_FULL_NAME,
  metadataBase: SITE_URL,
  manifest: "/manifest.webmanifest",
  category: "Santé",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_FULL_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Les Orthos en Visio — bilan et orthophonie en téléconsultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.png"],
  },
  // Search Console ownership: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the
  // token Google provides; the tag is only rendered when it is set.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_FULL_NAME,
  alternateName: ["LOV", SITE_NAME],
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/logo-512.png"),
  image: absoluteUrl("/opengraph-image.png"),
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 avenue Maréchal Foch, Bureau 3",
    postalCode: "69006",
    addressLocality: "Lyon",
    addressCountry: "FR",
  },
  areaServed: { "@type": "Country", name: "France" },
  knowsLanguage: "fr",
  email: "bonjour@lesorthosenvisio.fr",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "service client",
    email: "bonjour@lesorthosenvisio.fr",
    availableLanguage: "fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${modulus.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans">
        <JsonLd id="organization-jsonld" data={organizationJsonLd} />
        <CustomCursor />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
