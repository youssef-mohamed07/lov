"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { homeStats } from "@/data/stats";

export function HomeStats() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <div className="grid items-end gap-[var(--space-10)] lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal variant="left">
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              {homeStats.eyebrow}
            </p>
            <h2 className="mt-[var(--space-3)] max-w-md font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {homeStats.title}{" "}
              <span className="font-display font-medium italic text-voice">
                {homeStats.titleAccent}
              </span>
            </h2>
            <p className="mt-[var(--space-4)] max-w-md text-base leading-7 text-muted">
              {homeStats.description}
            </p>
            <CtaButton href="/a-propos" size="sm" className="mt-[var(--space-6)]">
              Découvrir Lov
            </CtaButton>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal variant="fade-scale" className="sm:row-span-2">
              <article className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-border p-7 sm:p-8">
                <Image
                  src="/images/stats-impact.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/55"
                />

                <div className="relative">
                  <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                    Résultat
                  </p>
                  <p className="mt-4 font-display text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
                    <Counter
                      value={homeStats.featured.value}
                      suffix={homeStats.featured.suffix}
                    />
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {homeStats.featured.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {homeStats.featured.detail}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="relative mt-8 h-2 overflow-hidden rounded-full bg-surface"
                >
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={reduceMotion ? false : { width: "0%" }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </article>
            </Reveal>

            {homeStats.secondary.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={0.08 + index * 0.06}
                variant="scale"
              >
                <article className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-border bg-background p-6 shadow-[var(--shadow-card)] transition-[border-color,background-color] duration-200 hover:border-accent/35 hover:bg-accent-soft/15">
                  <div>
                    <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                      {stat.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {stat.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
