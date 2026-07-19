"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

const starClip =
  "polygon(50% 0%, 66% 34%, 100% 50%, 66% 66%, 50% 100%, 34% 66%, 0% 50%, 34% 34%)";

type SiteCtaProps = {
  title?: string;
  accent?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SiteCta({
  title = "Prêt à y voir",
  accent = "plus clair ?",
  description = "Bilan, orientation et accompagnement — pour les familles qui veulent des repères concrets.",
  ctaLabel = "Bilan orthophonique",
  ctaHref,
}: SiteCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-[var(--section-space-md)]">
      <Container className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[var(--shadow-card)]">
          <StarCutout
            src="/images/hero-therapist.jpg"
            className="absolute top-[-12%] right-[-6%] hidden w-[200px] lg:block lg:top-[-10%] lg:right-[-3%] lg:w-[240px]"
            reduceMotion={!!reduceMotion}
            float="up"
          />
          <StarCutout
            src="/images/hero-child.jpg"
            className="absolute bottom-[-14%] left-[-8%] hidden w-[190px] lg:block lg:bottom-[-12%] lg:left-[-4%] lg:w-[230px]"
            reduceMotion={!!reduceMotion}
            float="down"
          />

          <div className="relative z-10 mx-auto flex min-h-[340px] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[380px] sm:px-10 sm:py-20 lg:min-h-[420px]">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              <span className="block">{title}</span>
              <span className="mt-1 block font-medium italic text-voice">
                {accent}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {description}
            </p>
            <CtaButton
              {...(ctaHref ? { href: ctaHref } : {})}
              size="lg"
              className="mt-8"
            >
              {ctaLabel}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StarCutout({
  src,
  className,
  reduceMotion,
  float,
}: {
  src: string;
  className?: string;
  reduceMotion: boolean;
  float: "up" | "down";
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none aspect-square", className)}
      animate={
        reduceMotion
          ? undefined
          : {
              y: float === "up" ? [0, -12, 0] : [0, 12, 0],
              rotate: float === "up" ? [0, 3, 0] : [0, -3, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: float === "up" ? 7 : 8,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <div
        className="relative size-full overflow-hidden bg-accent-soft"
        style={{ clipPath: starClip }}
      >
        <Image src={src} alt="" fill sizes="240px" className="object-cover" />
      </div>
    </motion.div>
  );
}
