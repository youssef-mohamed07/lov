import type { Metadata } from "next";
import localFont from "next/font/local";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { SiteChrome } from "@/components/layout/site-chrome";

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
    default: "Lov — Orthophonie & Accompagnement",
    template: "%s · Lov",
  },
  description:
    "Lov propose un accompagnement en orthophonie, des bilans, et des ressources dédiées au langage, à la parole et aux apprentissages pour vous et votre famille.",
  keywords: ["orthophonie", "bilan orthophonique", "langage", "parole", "apprentissages", "lov", "accompagnement familial"],
  authors: [{ name: "Lov" }],
  creator: "Lov",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://lov.build8.dev")
  ),
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Lov — Orthophonie & Accompagnement",
    description: "Bilan orthophonique, orientation et ressources pour le langage, la parole et les apprentissages.",
    url: "https://lov.care",
    siteName: "Lov",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lov — Orthophonie & Accompagnement",
    description: "Bilan orthophonique, orientation et ressources pour le langage, la parole et les apprentissages.",
    creator: "@lov",
  },
  robots: {
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
        <CustomCursor />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
