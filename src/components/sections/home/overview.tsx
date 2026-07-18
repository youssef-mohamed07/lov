import { Reveal } from "@/components/common/reveal";
import {
  AccentTitle,
  SectionHeading,
} from "@/components/sections/section-heading";
import { Section } from "@/components/ui/section";
import { overview } from "@/data/home";

export function HomeOverview() {
  return (
    <Section space="lg" containerSize="md" className="bg-surface">
      <SectionHeading
        align="center"
        eyebrow={overview.eyebrow}
        title={
          <>
            {overview.titleStart}{" "}
            <AccentTitle>{overview.titleAccent}</AccentTitle>
          </>
        }
        description={overview.description}
      />
      <Reveal delay={0.1} className="mx-auto mt-[var(--space-12)] max-w-xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </Reveal>
    </Section>
  );
}
