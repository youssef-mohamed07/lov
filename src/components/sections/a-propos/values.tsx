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
import { cn } from "@/lib/utils";

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
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {values.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {values.title}{" "}
            <span className="squiggle-accent">{values.titleAccent}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.items.map((item, index) => {
            const Icon = icons[index] ?? Eye;
            // First card is a filled accent feature to break the grid rhythm.
            const feature = index === 0;
            return (
              <li key={item.title} className="min-w-0">
                <Reveal
                  delay={(index % 3) * 0.06}
                  variant="fade"
                  className="h-full"
                >
                  <article
                    className={cn(
                      "group flex h-full flex-col rounded-[1.5rem] p-6 transition-all duration-200 sm:p-7",
                      feature
                        ? "bg-accent text-white shadow-[0_20px_50px_-24px_rgba(254,81,16,0.65)]"
                        : "border border-border bg-surface shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:border-accent/35 hover:bg-accent-soft/20",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5",
                        feature
                          ? "bg-white/20 text-white"
                          : "bg-accent-soft text-accent",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3
                      className={cn(
                        "mt-6 font-display text-xl font-semibold tracking-tight",
                        feature ? "text-white" : "text-foreground",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-6 sm:text-base sm:leading-7",
                        feature ? "text-white/85" : "text-muted",
                      )}
                    >
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
