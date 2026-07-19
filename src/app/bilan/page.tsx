import type { Metadata } from "next";
import { Check } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { BilanOverview } from "@/components/sections/bilan-overview";
import { BilanProcess } from "@/components/sections/bilan-process";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { bilan } from "@/data/bilan";

export const metadata: Metadata = {
  title: "Bilan orthophonique",
  description: bilan.description,
};

export default function BilanPage() {
  return (
    <main>
      <PageIntro
        eyebrow={bilan.heroEyebrow}
        title={bilan.title}
        description={bilan.description}
        image="/images/path-bilan.jpg"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Bilan" }]}
        actions={
          <CtaButton href="/nous-contacter" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />

      {/* Reassurance */}
      <section className="bg-background py-[var(--section-space-sm)]">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {bilan.reassurance.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.06} variant="up" className="h-full">
                  <article className="flex h-full flex-col rounded-[1.5rem] border border-border bg-surface px-6 py-7 shadow-[var(--shadow-card)] sm:px-7">
                    <span className="font-display text-3xl font-semibold tracking-tight text-foreground/15">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <BilanOverview />
      <BilanProcess />

      {/* Includes + price */}
      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="h-full rounded-[1.75rem] border border-border bg-surface p-7 shadow-[var(--shadow-card)] sm:p-9">
                <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
                  Inclus
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">
                  Ce que contient{" "}
                  <span className="font-medium italic text-voice">le bilan</span>
                </h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {bilan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground sm:text-base"
                    >
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border p-7 sm:p-9">
                <Image
                  src="/images/pricing-bilan.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20"
                />
                <div className="relative">
                  <p className="text-xs font-medium tracking-[0.18em] text-white/75 uppercase">
                    {bilan.price.label}
                  </p>
                  <p className="mt-3 font-display text-5xl font-semibold tracking-tight text-white">
                    {bilan.price.amount}
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/85">
                    {bilan.price.detail}
                  </p>
                </div>
                <CtaButton href="/nous-contacter" size="lg" className="relative mt-8">
                  Demander un bilan
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
