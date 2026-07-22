import { Lock, Route, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

const icons = [ShieldCheck, Route, Lock] as const;

export function AboutReassurance() {
  return (
    <section className="bg-background py-[var(--section-space-sm)]">
      <Container className="relative">
        <Reveal variant="fade">
          <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[var(--shadow-card)] sm:flex-row sm:divide-x sm:divide-y-0">
            {about.reassurance.map((item, index) => {
              const Icon = icons[index] ?? ShieldCheck;
              return (
                <li
                  key={item.title}
                  className="flex flex-1 items-start gap-4 px-6 py-6 sm:px-7 sm:py-7"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
