import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export type SimpleStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type SimpleStepsProps = {
  eyebrow: string;
  title: ReactNode;
  steps: readonly SimpleStep[];
  align?: "left" | "center";
};

export function SimpleSteps({
  eyebrow,
  title,
  steps,
  align = "center",
}: SimpleStepsProps) {
  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <Reveal variant="fade">
          <div className={cn(align === "center" && "text-center")}>
            <p className="text-xs font-medium tracking-[0.22em] text-brand uppercase">
              {eyebrow}
            </p>
            <h2
              className={cn(
                "mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
                align === "center" ? "mx-auto" : "max-w-xl",
              )}
            >
              {title}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mt-10" variant="fade">
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-0">
            <div
              aria-hidden
              className="absolute top-5 right-[16.666%] left-[16.666%] hidden h-px bg-border md:block"
            />

            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="relative px-0 text-center md:px-6"
                >
                  <div className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent shadow-[0_10px_24px_-14px_rgba(254,81,16,0.5)]">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <span className="mt-3 block font-display text-xs font-semibold tracking-[0.14em] text-muted-soft uppercase">
                    Étape {index + 1}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="mx-auto mt-6 block h-px w-10 bg-border md:hidden"
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
