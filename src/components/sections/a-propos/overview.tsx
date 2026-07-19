import { Check } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { about } from "@/data/a-propos";

export function AboutOverview() {
  const { overview } = about;

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="left">
            <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
              {overview.eyebrow}
            </p>
            <h2 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {overview.title}{" "}
              <span className="font-medium italic text-voice">
                {overview.titleAccent}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted">
              {overview.body}
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {overview.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaButton href="/bilan" size="lg">
                Demander un bilan
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.08} variant="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-border">
              <Image
                src={overview.image}
                alt={overview.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
