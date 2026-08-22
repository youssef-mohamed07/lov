"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BadgeCheck,
  HeartHandshake,
  ShieldPlus,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { FadeItem, FadeStagger } from "@/components/common/fade";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

const trustPoints = [
  { icon: BadgeCheck, label: "Bilan normé" },
  { icon: HeartHandshake, label: "Accompagnement parental" },
  { icon: ShieldPlus, label: "Conseils et prévention" },
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
        {/* Soft clinical wash — orange + bleu azur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,var(--accent-soft),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_8%_75%,var(--brand-soft),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(13,128,175,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(14,14,15,0.06)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
      </div>

      <HeartCutout
        src="/images/hero-child.jpg"
        alt=""
        className="absolute top-[20%] left-[-7%] hidden w-[230px] lg:block xl:left-[-4%] xl:w-[278px]"
        tone="warm"
        reduceMotion={!!reduceMotion}
        x={leftX}
        y={leftY}
        rotate={leftRotate}
      />
      <HeartCutout
        src="/images/hero-therapist.jpg"
        alt=""
        className="absolute top-[29%] right-[-8%] hidden w-[250px] lg:block xl:right-[-3%] xl:w-[300px]"
        tone="cool"
        reduceMotion={!!reduceMotion}
        x={rightX}
        y={rightY}
        rotate={rightRotate}
      />

      <Container className="relative flex flex-col items-center justify-center pt-[calc(var(--header-height)+var(--space-8))] pb-[var(--space-8)] text-center lg:min-h-svh lg:pb-[var(--space-20)]">
        <FadeStagger immediate className="mx-auto flex max-w-4xl flex-col items-center">
          <FadeItem>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Les Orthos en Visio
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <h1 className="font-display text-[2rem] font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              <span className="block">
                Bilan et rééducation orthophonique
              </span>
              <span className="mt-2 block font-medium italic text-voice">
                en téléconsultation, depuis chez vous.
              </span>
            </h1>
          </FadeItem>

          <FadeItem className="mt-[var(--space-5)]">
            <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Une évaluation structurée du langage, de la parole et des
              apprentissages, suivie d’un accompagnement adapté pour progresser
              à votre rythme.
            </p>
          </FadeItem>

          <FadeItem className="mt-[var(--space-8)]">
            <CtaButton href="/demander-un-bilan" size="lg">
              Prendre rendez-vous
            </CtaButton>
          </FadeItem>

          <FadeItem className="mt-10 w-full max-w-md px-2 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              <MobileHeartImage
                src="/images/hero-child.jpg"
                className="-rotate-6"
                imageClassName="object-[50%_18%]"
              />
              <MobileHeartImage
                src="/images/hero-therapist.jpg"
                className="rotate-6"
                imageClassName="object-[50%_16%]"
              />
            </div>
          </FadeItem>
        </FadeStagger>
      </Container>

      <Container className="pointer-events-none relative pb-[var(--space-10)] sm:pb-[var(--space-12)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-[var(--space-10)]">
        <ul className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
          {trustPoints.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex items-center gap-6 sm:gap-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-soft text-brand ring-1 ring-brand/15">
                  <Icon className="size-4" aria-hidden />
                </span>
                {label}
              </span>
              {index < trustPoints.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden size-1 rounded-full bg-brand/35 sm:block"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function HeartCutout({
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
        "pointer-events-none aspect-[1.185] will-change-transform",
        tone === "cool" && "opacity-95",
        className,
      )}
      style={reduceMotion ? undefined : { x, y, rotate }}
    >
      <div
        className={cn(
          "relative size-full",
          tone === "cool" ? "drop-shadow-[0_18px_42px_rgba(13,128,175,0.22)]" : "drop-shadow-[0_18px_42px_rgba(249,171,108,0.2)]",
        )}
      >
        <div className="lov-heart-clip absolute inset-[-5%] bg-brand/25" />
        <div className="lov-heart-clip absolute inset-0 overflow-hidden bg-surface-muted">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

function MobileHeartImage({
  src,
  className,
  imageClassName,
}: {
  src: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn(
        "lov-heart-clip relative aspect-[1.185] overflow-hidden bg-surface-muted",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="50vw"
        className={cn("object-cover", imageClassName)}
        priority
      />
    </div>
  );
}
