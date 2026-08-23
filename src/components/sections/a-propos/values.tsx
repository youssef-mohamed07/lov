import {
  Eye,
  HeartHandshake,
  Infinity as InfinityIcon,
  MessageCircle,
  ShieldCheck,
  Unlock,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

const icons = [
  Eye,
  ShieldCheck,
  HeartHandshake,
  Unlock,
  MessageCircle,
  InfinityIcon,
] as const;

export function AboutValues() {
  const { values } = about;

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container className="relative">
        <Reveal className="max-w-2xl" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
            {values.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {values.title}{" "}
            <span className="mark-tint">{values.titleAccent}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.items.map((item, index) => {
            const Icon = icons[index] ?? Eye;
            return (
              <li key={item.title} className="min-w-0">
                <Reveal
                  delay={(index % 3) * 0.06}
                  variant="fade"
                  className="h-full"
                >
                  <article className="group flex h-full flex-col rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent-soft/20 sm:p-7">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
