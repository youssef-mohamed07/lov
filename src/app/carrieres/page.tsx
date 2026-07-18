import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { careers } from "@/data/carrieres";

export const metadata: Metadata = {
  title: "Carrières",
  description: careers.description,
};

export default function CareersPage() {
  return (
    <main>
      <PageIntro
        eyebrow={careers.eyebrow}
        title={
          <>
            {careers.title}{" "}
            <span className="font-medium italic text-voice">
              {careers.titleAccent}
            </span>
          </>
        }
        description={careers.description}
        image="/images/ortho-session.jpg"
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Carrières" },
        ]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Envoyer une candidature
          </CtaButton>
        }
      />

      {/* Culture */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal variant="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/expertise-listening.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#142636]/55 via-transparent to-transparent"
                />
                <p className="absolute bottom-6 left-6 max-w-[16rem] font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Une équipe au service du soin, pas du spectacle.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} variant="right">
              <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                {careers.culture.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {careers.culture.title}{" "}
                <span className="font-medium italic text-voice">
                  {careers.culture.titleAccent}
                </span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-muted">
                {careers.culture.description}
              </p>

              <ul className="mt-10 flex flex-col gap-8">
                {careers.culture.items.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="font-display text-sm font-semibold tracking-[0.14em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-surface py-[var(--section-space-lg)]">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center" variant="up">
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              {careers.process.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {careers.process.title}{" "}
              <span className="font-medium italic text-voice">
                {careers.process.titleAccent}
              </span>
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {careers.process.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.06} variant="up">
                  <span className="font-display text-4xl font-semibold tracking-tight text-accent/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Roles */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <Reveal className="max-w-2xl" variant="up">
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              {careers.roles.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {careers.roles.title}{" "}
              <span className="font-medium italic text-voice">
                {careers.roles.titleAccent}
              </span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {careers.roles.description}
            </p>
          </Reveal>

          <ul className="mt-12 flex flex-col gap-4">
            {careers.roles.items.map((role, index) => (
              <li key={role.title}>
                <Reveal delay={index * 0.05} variant="fade">
                  <article className="group grid gap-6 rounded-[1.5rem] border border-border bg-surface p-6 transition-[border-color,background-color] duration-200 hover:border-accent/30 hover:bg-accent-soft/20 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">
                          {role.type}
                        </span>
                        <span className="rounded-full bg-background px-2.5 py-1">
                          {role.mode}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1">
                          <MapPin className="size-3.5" aria-hidden />
                          {role.location}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
                        {role.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                        {role.description}
                      </p>
                    </div>

                    <CtaButton
                      href="/nous-contacter"
                      size="sm"
                      className="w-fit shrink-0"
                    >
                      Postuler
                    </CtaButton>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Spontaneous CTA */}
      <section className="relative overflow-hidden bg-surface py-[var(--section-space-lg)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_20%,var(--accent-soft),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(224,122,95,0.14),transparent_50%)]"
        />
        <Container className="relative">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {careers.cta.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {careers.cta.description}
            </p>
            <CtaButton href="/nous-contacter" size="lg" className="mt-8">
              {careers.cta.action}
            </CtaButton>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
              Réponse sous quelques jours
              <ArrowUpRight className="size-3.5" aria-hidden />
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
