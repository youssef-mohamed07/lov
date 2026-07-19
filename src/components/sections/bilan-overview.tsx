import {
  ClipboardList,
  FileText,
  ListChecks,
  MessageCircle,
  Route,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { bilan } from "@/data/bilan";

const leftIcons: LucideIcon[] = [MessageCircle, ClipboardList, Sparkles];
const rightIcons: LucideIcon[] = [ListChecks, Route, FileText];

function FeatureBlock({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface-muted text-accent">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}

export function BilanOverview() {
  const { overview } = bilan;

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-muted uppercase">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {overview.badge}
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {overview.title}{" "}
            <span className="font-medium italic text-voice">
              {overview.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {overview.body}
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_minmax(260px,0.95fr)_1fr] lg:gap-8 xl:gap-12">
          {/* Left features */}
          <ul className="flex flex-col gap-8 lg:gap-10">
            {overview.leftFeatures.map((feature, index) => (
              <li key={feature.title}>
                <Reveal delay={index * 0.06} variant="left">
                  <FeatureBlock
                    title={feature.title}
                    description={feature.description}
                    icon={leftIcons[index] ?? MessageCircle}
                  />
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Center image */}
          <Reveal delay={0.08} variant="fade-scale" className="order-first lg:order-none">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-card)] lg:max-w-none">
              <Image
                src={overview.image}
                alt={overview.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 30vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          {/* Right features */}
          <ul className="flex flex-col gap-8 lg:gap-10">
            {overview.rightFeatures.map((feature, index) => (
              <li key={feature.title}>
                <Reveal delay={0.1 + index * 0.06} variant="right">
                  <FeatureBlock
                    title={feature.title}
                    description={feature.description}
                    icon={rightIcons[index] ?? FileText}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
