import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { PageIntro } from "@/components/sections/page-intro";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { troubles, troublesPage } from "@/data/troubles";

export const metadata: Metadata = {
  title: "Troubles",
  description: troublesPage.description,
};

export default function TroublesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Troubles"
        title={troublesPage.title}
        description={troublesPage.description}
        image="/images/trouble-language.jpg"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Troubles" }]}
        actions={
          <CtaButton href="/bilan" size="lg">
            Demander un bilan
          </CtaButton>
        }
      />

      <section className="bg-background py-[var(--section-space-lg)]">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {troubles.map((trouble, index) => (
              <li key={trouble.slug}>
                <Reveal
                  delay={(index % 3) * 0.06}
                  variant="fade"
                  className="h-full"
                >
                  <Link
                    href={`/troubles/${trouble.slug}`}
                    className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-border sm:min-h-[340px]"
                  >
                    <Image
                      src={trouble.image}
                      alt=""
                      fill
                      sizes="(max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
                    />
                    <div className="relative z-10 p-5 sm:p-6">
                      <h2 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {trouble.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/85">
                        {trouble.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 group-hover:underline">
                        En savoir plus
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
