"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

const trustPoints = [
  { icon: ShieldCheck, label: "Bilan structuré" },
  { icon: HeartHandshake, label: "Approche familiale" },
  { icon: Sparkles, label: "Orientation claire" },
] as const;

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-8, 28]);

  const rightY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [6, -32]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Soft clinical wash instead of a hard grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,var(--accent-soft),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(254,81,16,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(14,14,15,0.06)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
      </div>

      <StarCutout
        src="/images/hero-child.jpg"
        alt=""
        className="absolute top-[22%] left-[-7%] hidden w-[220px] lg:block xl:left-[-4%] xl:w-[260px]"
        tone="warm"
        reduceMotion={!!reduceMotion}
        x={leftX}
        y={leftY}
        rotate={leftRotate}
      />
      <StarCutout
        src="/images/hero-therapist.jpg"
        alt=""
        className="absolute top-[32%] right-[-8%] hidden w-[240px] lg:block xl:right-[-3%] xl:w-[280px]"
        tone="cool"
        reduceMotion={!!reduceMotion}
        x={rightX}
        y={rightY}
        rotate={rightRotate}
      />

      <Container className="relative flex min-h-svh flex-col items-center justify-center pt-[calc(var(--header-height)+var(--space-8))] pb-[var(--space-16)] text-center sm:pb-[var(--space-20)]">
        <FadeStagger immediate className="mx-auto flex max-w-3xl flex-col items-center">
          <FadeItem>
            <div className="inline-flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-md bg-success px-2 py-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-3.5 fill-white text-white"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                4.9 <span className="text-muted/80">(1 248)</span>
              </p>
            </div>
          </FadeItem>

          <FadeItem className="mt-[var(--space-6)]">
            <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-accent sm:text-6xl lg:text-7xl">
              Lov
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Comprendre le langage</span>
              <span className="mt-2 block font-medium italic text-voice">
                pour avancer mieux
              </span>
            </h1>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <p className="mx-auto max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Bilan orthophonique, orientation et accompagnement — pour les
              familles et les adultes qui veulent des repères clairs.
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-8)]">
            <CtaButton size="lg">
              Commencer le bilan
            </CtaButton>
          </FadeItem>

          <FadeItem className="mt-10 w-full max-w-md lg:hidden">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/hero-child.jpg"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover object-[50%_20%]"
                  priority
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/images/hero-therapist.jpg"
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover object-[50%_18%]"
                  priority
                />
              </div>
            </div>
          </FadeItem>
        </FadeStagger>
      </Container>

      <Container className="relative pb-[var(--space-12)]">
        <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-sm font-medium text-foreground shadow-[0_10px_28px_-22px_rgba(14,14,15,0.35)] backdrop-blur-sm">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function StarCutout({
  src,
  alt,
  className,
  tone = "warm",
  reduceMotion,
  x,
  y,
  rotate,
}: {
  src: string;
  alt: string;
  className?: string;
  tone?: "warm" | "cool";
  reduceMotion: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none aspect-square will-change-transform",
        tone === "cool" && "opacity-95",
        className,
      )}
      style={reduceMotion ? undefined : { x, y, rotate }}
    >
      <div
        className={cn(
          "relative size-full overflow-hidden",
          "bg-surface-muted",
        )}
        style={{
          clipPath:
            "polygon(50% 0%, 66% 34%, 100% 50%, 66% 66%, 50% 100%, 34% 66%, 0% 50%, 34% 34%)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="280px"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}
