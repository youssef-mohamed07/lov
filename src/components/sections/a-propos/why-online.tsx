import { HeartHandshake, MessagesSquare, Zap } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

const icons = [Zap, MessagesSquare, HeartHandshake] as const;

export function AboutWhyOnline() {
  const { whyOnline } = about;

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container className="relative">
        <Reveal
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          variant="fade"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
              {whyOnline.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {whyOnline.title}{" "}
              <span className="squiggle-accent">{whyOnline.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted sm:pb-1 sm:text-right sm:text-lg">
            {whyOnline.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-3">
          {whyOnline.points.map((point, index) => {
            const Icon = icons[index] ?? Zap;
            return (
              <li key={point.title} className="bg-surface">
                <Reveal delay={index * 0.07} className="h-full">
                  <div className="group flex h-full flex-col p-7 transition-colors hover:bg-accent-soft/25 sm:p-8">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted sm:leading-7">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
