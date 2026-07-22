import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { bilan } from "@/data/bilan";

export function BilanProcess() {
  const { process, steps } = bilan;

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal variant="left" className="lg:sticky lg:top-28">
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              {process.badge}
            </span>
            <h2 className="mt-5 max-w-md font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {process.title}{" "}
              <span className="squiggle-accent">{process.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted sm:text-lg">
              {process.body}
            </p>
            <div className="mt-8">
              <CtaButton href={process.ctaHref} size="lg" className="min-h-11">
                {process.ctaLabel}
              </CtaButton>
            </div>
          </Reveal>

          <ol className="flex flex-col gap-4">
            {steps.map((item, index) => (
              <li key={item.step}>
                <Reveal delay={index * 0.08} variant="right">
                  <article className="overflow-hidden rounded-[1.5rem] border border-border bg-surface p-4 shadow-[var(--shadow-card)] sm:p-5">
                    <div className="grid gap-5 sm:grid-cols-[minmax(0,140px)_1fr] sm:items-center">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] sm:aspect-square">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-display text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                            {item.step}
                          </span>
                          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
