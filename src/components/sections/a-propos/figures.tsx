"use client";

import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

export function AboutFigures() {
  const { figures } = about;

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {figures.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {figures.title}{" "}
            <span className="font-medium italic text-voice">
              {figures.titleAccent}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {figures.items.map((item, index) => (
            <li key={item.label} className="bg-surface px-6 py-10 text-center">
              <Reveal delay={index * 0.06} variant="fade">
                <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-3 text-sm font-medium text-muted">{item.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
