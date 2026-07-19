"use client";

import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { getTrouble } from "@/data/troubles";

const services = [
  { slug: "dyslexie", featured: true },
  { slug: "retard-parole-langage" },
  { slug: "begaiement" },
  { slug: "articulation" },
  { slug: "dyscalculie" },
  { slug: "dysphasie" },
] as const;

export function HomeServicesGrid() {
  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal
          className="mb-[var(--space-10)] flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          variant="fade"
        >
          <div>
            <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-muted uppercase">
              Spécialités
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Des accompagnements{" "}
              <span className="font-medium italic text-voice">
                adaptés à chaque besoin
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted sm:pb-1.5 sm:text-right">
            Six motifs fréquents — chacun avec un parcours pensé pour lui.
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const trouble = getTrouble(service.slug);
            if (!trouble) return null;
            const featured = "featured" in service && service.featured;

            return (
              <Reveal
                key={service.slug}
                delay={(index % 3) * 0.07}
                variant="fade"
                className="h-full"
              >
                <li className="h-full">
                  <article className="relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[1.35rem] border border-border sm:min-h-[340px]">
                    <Image
                      src={trouble.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
                    />

                    {featured ? (
                      <span className="absolute top-4 left-4 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-accent-foreground">
                        Populaire
                      </span>
                    ) : null}

                    <div className="relative z-10 p-5 sm:p-6">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                        {trouble.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm leading-6 text-white/85">
                        {trouble.description}
                      </p>
                    </div>
                  </article>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
