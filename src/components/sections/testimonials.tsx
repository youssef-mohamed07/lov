"use client";

import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

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
          className="size-3.5 fill-success text-success"
          aria-hidden
        />
      ))}
    </div>
  );
}

type Item = (typeof testimonials.items)[number];

function TestimonialCard({
  item,
  tilt,
  accent,
  fluid,
}: {
  item: Item;
  tilt: string;
  accent?: boolean;
  fluid?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative flex flex-col justify-between gap-5 rounded-[1.35rem] border p-5 transition-transform duration-300 ease-out sm:p-6",
        fluid
          ? "w-full"
          : "w-[min(19rem,calc(100vw-3rem))] shrink-0 hover:rotate-0 hover:scale-[1.03] sm:w-[21rem]",
        tilt,
        accent
          ? "border-transparent bg-foreground text-background shadow-[0_24px_60px_-30px_rgba(14,14,15,0.55)]"
          : "border-border bg-surface shadow-[var(--shadow-card)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-1 right-4 select-none font-display text-6xl leading-none",
          accent ? "text-accent" : "text-accent/25",
        )}
      >
        ”
      </span>

      <div>
        <Stars count={item.rating} />
        <blockquote
          className={cn(
            "mt-4 font-display text-lg font-medium leading-snug tracking-tight",
            accent ? "text-background" : "text-foreground",
          )}
        >
          {item.quote}
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-semibold",
            accent
              ? "bg-background text-foreground"
              : "bg-foreground text-background",
          )}
        >
          {initials(item.author)}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-semibold",
              accent ? "text-background" : "text-foreground",
            )}
          >
            {item.author}
          </p>
          <p
            className={cn(
              "truncate text-xs",
              accent ? "text-background/65" : "text-muted",
            )}
          >
            {item.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

const tilts = [
  "rotate-[-1.5deg]",
  "rotate-[1.2deg]",
  "rotate-[-0.8deg]",
  "rotate-[1.6deg]",
  "rotate-[-1.2deg]",
  "rotate-[0.9deg]",
] as const;

function MarqueeRow({
  items,
  reverse,
  duration,
  accentIndex,
}: {
  items: readonly Item[];
  reverse?: boolean;
  duration: number;
  accentIndex: number;
}) {
  return (
    <div className="group/row overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-4 py-4 group-hover/row:[animation-play-state:paused] motion-reduce:animate-none",
          reverse
            ? "animate-[testimonial-marquee-reverse_var(--marquee-duration)_linear_infinite]"
            : "animate-[testimonial-marquee_var(--marquee-duration)_linear_infinite]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-4"
          >
            {items.map((item, index) => (
              <TestimonialCard
                key={`${copy}-${item.author}`}
                item={item}
                tilt={tilts[index % tilts.length]}
                accent={index === accentIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const items = testimonials.items;
  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items.slice(half);

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-md)]">
      <Container className="relative">
        <Reveal className="mx-auto mb-4 max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {testimonials.title}{" "}
            <span className="font-medium italic text-voice">
              {testimonials.titleAccent}
            </span>
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted shadow-[var(--shadow-card)]">
            <Stars count={5} />
            <span>
              <span className="font-semibold text-foreground">4.9 / 5</span>
              <span className="mx-1.5 text-border">·</span>
              avis familles
            </span>
          </div>
        </Reveal>
      </Container>

      {reduceMotion ? (
        <Container className="relative mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <TestimonialCard
                key={item.author}
                item={item}
                tilt="rotate-0"
                accent={index === 0}
                fluid
              />
            ))}
          </div>
        </Container>
      ) : (
        <Reveal variant="fade" className="relative mt-6">
          {/* Edge fades so cards melt into the page */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
          />

          <MarqueeRow items={rowA} duration={42} accentIndex={1} />
          <MarqueeRow items={rowB} reverse duration={52} accentIndex={2} />
        </Reveal>
      )}
    </section>
  );
}
