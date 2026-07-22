import type { Metadata } from "next";
import { Clock3, Mail, Phone, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactMap } from "@/components/sections/contact-map";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { contact } from "@/data/nous-contacter";

const detailIcons = {
  Courriel: Mail,
  Téléphone: Phone,
  Horaires: Clock3,
} as const;

export const metadata: Metadata = {
  title: "Nous contacter",
  description: contact.description,
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Nous contacter"
        title={
          <>
            Parlons de{" "}
            <span className="squiggle-accent">votre besoin</span>
          </>
        }
        description={contact.description}
        image="/images/family-consult.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Nous contacter" },
        ]}
      />

      <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
        <Container className="relative">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <Reveal variant="left" className="flex flex-col gap-8">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-border">
                <Image
                  src="/images/family-consult.jpg"
                  alt="Échange avec une famille"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[50%_30%]"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent"
                />
                <p className="absolute bottom-5 left-5 max-w-[14rem] text-sm font-medium text-white">
                  Un premier échange clair, sans engagement.
                </p>
              </div>

              <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                {contact.details.map((item) => {
                  const Icon =
                    detailIcons[item.label as keyof typeof detailIcons] ?? Mail;
                  const content = (
                    <>
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium tracking-[0.16em] text-muted uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-base font-medium break-words text-foreground">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {"href" in item && item.href ? (
                        <Link
                          href={item.href}
                          className="group flex min-h-11 items-center gap-4 px-5 py-4 transition-colors hover:bg-accent-soft/25"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="group flex items-center gap-4 px-5 py-4">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-start gap-3 rounded-[1.25rem] border border-danger/25 bg-danger/[0.06] px-5 py-4">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <ShieldAlert className="size-4" aria-hidden />
                </span>
                <p className="text-sm leading-6 text-muted">{contact.note}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08} variant="right">
              <div className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
                <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  Écrire à Lov
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Envoyez votre{" "}
                  <span className="mark-accent">message</span>
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Remplissez les champs — nous revenons vers vous rapidement.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ContactMap />
    </main>
  );
}
