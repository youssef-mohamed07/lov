import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import type { LegalDocument } from "@/data/legal";
import { contact } from "@/data/nous-contacter";

const email = contact.details[0];

export function LegalDocumentPage({ doc }: { doc: LegalDocument }) {
  return (
    <main>
      <PageIntro
        eyebrow="Informations légales"
        title={doc.title}
        description={doc.description}
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: doc.title }]}
      />

      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Document en cours de rédaction
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Ce document sera publié sur cette page très prochainement.
            </p>
            <p className="mt-3 text-base leading-7 text-muted">
              Pour toute question, écrivez-nous à{" "}
              <a
                href={email.href}
                className="font-medium wrap-anywhere text-brand underline-offset-4 hover:underline"
              >
                {email.value}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
