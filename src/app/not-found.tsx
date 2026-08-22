import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page demandée n’existe pas ou a été déplacée.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center bg-background py-[var(--section-space-lg)]">
      <Container size="sm" className="text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Erreur 404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Cette page reste introuvable.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted">
          Son adresse a peut-être changé. Revenez à l’accueil ou consultez nos
          ressources pour poursuivre votre recherche.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/ressources"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
          >
            Voir les ressources
          </Link>
        </div>
      </Container>
    </main>
  );
}
