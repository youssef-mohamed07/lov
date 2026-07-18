import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import {
  AccentTitle,
  SectionHeading,
} from "@/components/sections/section-heading";
import { CtaButton } from "@/components/ui/cta-button";
import { Section } from "@/components/ui/section";
import { conditions } from "@/data/home";

export function HomeConditions() {
  return (
    <Section space="lg" className="bg-surface">
      <SectionHeading
        eyebrow="Troubles"
        title={
          <>
            Des situations que{" "}
            <AccentTitle>nous accompagnons</AccentTitle>
          </>
        }
        description="Explorez les difficultés les plus fréquentes, puis trouvez le parcours adapté."
        action={
          <CtaButton href="/troubles" size="sm">
            Voir tous les troubles
          </CtaButton>
        }
      />

      <ul className="mt-[var(--space-12)] grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
        {conditions.map((condition, index) => (
          <Reveal key={condition.label} delay={(index % 4) * 0.05} variant="scale">
            <li>
              <Link
                href={condition.href}
                className="group flex min-h-[5.5rem] items-center justify-between gap-3 rounded-2xl bg-background px-[var(--space-5)] py-[var(--space-5)] transition-all duration-300 hover:bg-accent-soft"
              >
                <span className="text-base font-medium tracking-tight text-foreground">
                  {condition.label}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                  aria-hidden
                />
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
