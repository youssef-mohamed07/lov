"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  BookOpen,
  Calculator,
  Ear,
  MessageCircle,
  Mic2,
  PencilLine,
  AudioLines,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { troubles, type Trouble } from "@/data/troubles";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof BookOpen> = {
  dyslexie: BookOpen,
  "retard-parole-langage": MessageCircle,
  begaiement: Mic2,
  dysorthographie: PencilLine,
  dyscalculie: Calculator,
  articulation: AudioLines,
  dysphasie: Ear,
  voix: Mic2,
};

const featuredSlugs = [
  "dyslexie",
  "retard-parole-langage",
  "begaiement",
  "dysorthographie",
] as const;

function TroublePanelContent({
  active,
  reduceMotion,
}: {
  active: Trouble;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.slug}
        role="tabpanel"
        initial={
          reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(4px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={
          reduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }
        }
        transition={{ duration: 0.35, ease: easeOutExpo }}
      >
        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
          {active.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/80 lg:mt-3">
          {active.overview}
        </p>
        <ul className="mt-3 flex flex-col gap-1.5 lg:mt-4">
          {active.signs.slice(0, 3).map((sign) => (
            <li key={sign} className="text-sm leading-6 text-white/75">
              — {sign}
            </li>
          ))}
        </ul>
        <div className="mt-5 lg:mt-6">
          <CtaButton href={`/troubles/${active.slug}`} size="sm">
            Voir le détail
          </CtaButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HomeTroublesPanel() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lockRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const items = useMemo(
    () =>
      featuredSlugs
        .map((slug) => troubles.find((trouble) => trouble.slug === slug))
        .filter(Boolean) as Trouble[],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];
  const scrubEnabled = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!scrubEnabled || lockRef.current || items.length === 0) return;
    const next = Math.min(
      items.length - 1,
      Math.max(0, Math.floor(value * items.length)),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  const selectIndex = (index: number) => {
    setActiveIndex(index);
    const section = sectionRef.current;
    if (!section || !scrubEnabled) return;

    lockRef.current = true;
    const rect = section.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const scrollable = section.offsetHeight - window.innerHeight;
    const target =
      absoluteTop + (scrollable * (index + 0.5)) / items.length;

    window.scrollTo({ top: target, behavior: "smooth" });
    window.setTimeout(() => {
      lockRef.current = false;
    }, 700);
  };

  if (!active) return null;

  const content = (
    <Container className="w-full">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <Reveal variant="fade">
            <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
              Troubles
            </p>
            <h2 className="mt-2 max-w-sm font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choisissez un trouble,{" "}
              <span className="font-medium italic text-voice">
                explorez le parcours
              </span>
            </h2>
          </Reveal>

          <ul
            role="tablist"
            aria-label="Troubles"
            className="mt-8 flex flex-col border-t border-border"
          >
            {items.map((item, index) => {
              const Icon = iconMap[item.slug] ?? BookOpen;
              const selected = index === activeIndex;
              return (
                <li key={item.slug} className="border-b border-border">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 py-4 text-left transition-colors",
                      selected
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
                        selected
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-muted text-muted",
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-base font-medium tracking-tight">
                      {item.title}
                    </span>
                    {selected ? (
                      <motion.span
                        layoutId={
                          reduceMotion ? undefined : "trouble-scroll-dot"
                        }
                        aria-hidden
                        className="ml-auto size-1.5 rounded-full bg-accent"
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {scrubEnabled ? (
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full origin-left rounded-full bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-foreground">
          {/* Image — text sits below on mobile, overlays on desktop.
              All images stay mounted; we crossfade so the dark base never shows. */}
          <div className="relative aspect-[16/11] sm:aspect-[16/9] lg:aspect-[4/5]">
            {items.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={false}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale:
                    reduceMotion || index === activeIndex ? 1 : 1.04,
                }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            ))}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/10 to-transparent lg:from-foreground/85 lg:via-foreground/25"
            />

            <div className="absolute inset-x-0 bottom-0 hidden p-6 sm:p-8 lg:block">
              <TroublePanelContent
                active={active}
                reduceMotion={!!reduceMotion}
              />
            </div>
          </div>

          {/* Mobile / tablet text block */}
          <div className="-mt-10 relative px-5 pb-6 sm:px-7 sm:pb-8 lg:hidden">
            <TroublePanelContent
              active={active}
              reduceMotion={!!reduceMotion}
            />
          </div>
        </div>
      </div>
    </Container>
  );

  if (!scrubEnabled) {
    return (
      <section ref={sectionRef} className="bg-background py-[var(--section-space-md)]">
        {content}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: `${Math.max(items.length, 1) * 85}vh` }}
    >
      <div className="sticky top-0 flex min-h-svh items-center py-[var(--section-space-md)]">
        {content}
      </div>
    </section>
  );
}
