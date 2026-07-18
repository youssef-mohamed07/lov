import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";

import { SiteChrome } from "@/components/layout/site-chrome";

import "./globals.css";

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Lov",
    template: "%s · Lov",
  },
  description:
    "Bilan orthophonique, orientation et ressources pour le langage, la parole et les apprentissages.",
  metadataBase: new URL("https://lov.care"),
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    locale: "fr_FR",
    type: "website",
    siteName: "Lov",
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
      className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
