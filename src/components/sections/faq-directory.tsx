"use client";

import { ChevronLeft, ChevronRight, Layers3, MoveHorizontal } from "lucide-react";
import { useRef, useState } from "react";

import { HomeFaq } from "@/components/sections/home/faq";
import { Container } from "@/components/ui/container";
import { faqGroups } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqDirectory() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeGroupId, setActiveGroupId] = useState(faqGroups[0].id);
  const activeGroup =
    faqGroups.find((group) => group.id === activeGroupId) ?? faqGroups[0];
  const questionCount = faqGroups.reduce(
    (total, group) => total + group.content.items.length,
    0,
  );

  function scrollTabs(direction: -1 | 1) {
    tabsRef.current?.scrollBy({
      left: direction * Math.min(520, window.innerWidth * 0.7),
      behavior: "smooth",
    });
  }

  return (
    <div>
      <section className="border-b border-border bg-surface py-6 sm:py-7">
        <Container>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Layers3 className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
                  Catégories FAQ
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  Choisissez votre thème
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {faqGroups.length} thèmes · {questionCount} réponses
                </p>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
              <p className="inline-flex items-center gap-2 text-xs font-medium text-muted">
                <MoveHorizontal className="size-4 text-accent" aria-hidden />
                Faites défiler les thèmes
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  aria-label="Voir les catégories précédentes"
                  onClick={() => scrollTabs(-1)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Voir les catégories suivantes"
                  onClick={() => scrollTabs(1)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-accent bg-accent text-white transition-colors hover:bg-accent-hover"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-surface to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent"
            />
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Catégories de questions"
              className="flex snap-x gap-2 overflow-x-auto px-1 pb-3 [scrollbar-color:var(--color-accent)_var(--color-border)] [scrollbar-width:auto] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-border [&::-webkit-scrollbar]:h-2"
            >
              {faqGroups.map((group) => {
                const active = group.id === activeGroup.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="faq-group-panel"
                    onClick={(event) => {
                      setActiveGroupId(group.id);
                      event.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    className={cn(
                      "min-h-12 shrink-0 snap-center rounded-full border px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow]",
                      active
                        ? "border-accent bg-accent text-white shadow-[0_10px_24px_-14px_rgba(254,81,16,0.7)]"
                        : "border-border bg-background text-foreground hover:border-accent/50 hover:bg-accent-soft",
                    )}
                  >
                    {group.label}
                    <span
                      className={cn(
                        "ml-2 inline-flex min-w-6 justify-center rounded-full px-1.5 py-0.5 text-xs",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-surface-muted text-muted",
                      )}
                    >
                      {group.content.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <div
        id="faq-group-panel"
        role="tabpanel"
        aria-label={activeGroup.label}
      >
        <HomeFaq key={activeGroup.id} content={activeGroup.content} />
      </div>
    </div>
  );
}
