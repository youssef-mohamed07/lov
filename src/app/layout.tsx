import type { Metadata } from "next";
import localFont from "next/font/local";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
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
    default: "Lov — Bilan et orthophonie en téléconsultation",
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
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
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    title: "Lov — Bilan et orthophonie en téléconsultation",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Lov — bilan et orthophonie en téléconsultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lov — Bilan et orthophonie en téléconsultation",
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  alternateName: "Les Orthos en Visio",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/logo-512.png"),
  image: absoluteUrl("/opengraph-image.png"),
  description: SITE_DESCRIPTION,
  email: "bonjour@lov.care",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "service client",
    email: "bonjour@lov.care",
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
