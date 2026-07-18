"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} sur 5`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star
          key={index}
          className="size-3.5 fill-voice text-voice"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const featured =
    testimonials.items.find((item) => "featured" in item && item.featured) ??
    testimonials.items[0];
  const others = testimonials.items.filter((item) => item !== featured);

  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-lg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(26,43,60,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {testimonials.title}{" "}
            <span className="font-medium italic text-voice">
              {testimonials.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {testimonials.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Featured */}
          <Reveal variant="fade-scale" className="lg:col-span-7">
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border bg-surface p-7 shadow-[var(--shadow-card)] sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-accent-soft/70 blur-2xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Quote className="size-5" aria-hidden />
                  </span>
                  <Stars count={featured.rating} />
                </div>
                <blockquote className="mt-7 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl sm:leading-[1.25]">
                  “{featured.quote}”
                </blockquote>
              </div>
              <footer className="relative mt-10 flex items-center gap-3 border-t border-border pt-6">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">
                  {initials(featured.author)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {featured.author}
                  </p>
                  <p className="text-sm text-muted">{featured.role}</p>
                </div>
              </footer>
            </article>
          </Reveal>

          {/* Side stack */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {others.slice(0, 2).map((item, index) => (
              <Reveal
                key={item.author}
                delay={0.06 + index * 0.06}
                variant="fade"
                className="flex-1"
              >
                <TestimonialCard item={item} compact />
              </Reveal>
            ))}
          </div>

          {/* Bottom row */}
          {others.slice(2).map((item, index) => (
            <Reveal
              key={item.author}
              delay={0.1 + index * 0.05}
              variant="fade"
              className="lg:col-span-4"
            >
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Floating trust chip */}
        <Reveal delay={0.15} className="mt-8 flex justify-center" variant="fade">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted shadow-sm"
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span className="inline-flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-voice text-voice"
                  aria-hidden
                />
              ))}
            </span>
            4.9 / 5 · avis familles Lov
          </motion.p>
        </Reveal>
      </Container>
    </section>
  );
}

function TestimonialCard({
  item,
  compact = false,
}: {
  item: (typeof testimonials.items)[number];
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.5rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-[border-color,transform] hover:border-accent/35",
        compact ? "sm:p-6" : "sm:p-7",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent">
          {initials(item.author)}
        </span>
        <Stars count={item.rating} />
      </div>
      <blockquote
        className={cn(
          "mt-4 flex-1 font-display font-medium tracking-tight text-foreground",
          compact
            ? "text-base leading-7 sm:text-lg"
            : "text-lg leading-8",
        )}
      >
        “{item.quote}”
      </blockquote>
      <footer className="mt-5">
        <p className="text-sm font-semibold text-foreground">{item.author}</p>
        <p className="mt-0.5 text-sm text-muted">{item.role}</p>
      </footer>
    </article>
  );
}
