import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import {
  AccentTitle,
  SectionHeading,
} from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { expertiseItems } from "@/data/home";

const images = [
  "/images/expertise-pedagogy.jpg",
  "/images/expertise-listening.jpg",
  "/images/expertise-follow.jpg",
] as const;

export function HomeExpertise() {
  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <SectionHeading
          eyebrow="Savoir-faire"
          title={
            <>
              Une clinique au service de <AccentTitle>la clarté</AccentTitle>
            </>
          }
          description="La pédagogie, l’écoute et le suivi — réunis dans une même intention."
        />

        <div className="mt-[var(--space-12)] grid gap-4 lg:grid-cols-3">
          {expertiseItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1} variant="fade-scale">
              <article className="h-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-background shadow-[var(--shadow-card)] transition-[border-color,background-color] duration-200 hover:border-accent/35">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={images[index] ?? images[0]}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
