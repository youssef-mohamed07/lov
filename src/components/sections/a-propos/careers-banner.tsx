import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { about } from "@/data/a-propos";

export function AboutCareersBanner() {
  const content = about.recruitment;

  return (
    <section className="overflow-hidden bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-48 right-[-8rem] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(249,171,108,0.3),transparent_64%)] blur-2xl" />
              <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
            </div>

            <div className="relative grid items-end gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
              <div className="max-w-3xl">
                <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                  {content.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                  <span className="mark-brush">{content.title}</span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  {content.description}
                </p>
              </div>

              <div className="shrink-0 lg:pb-1">
                <CtaButton href="/carrieres#postes-ouverts" size="lg">
                  {content.ctaLabel}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
