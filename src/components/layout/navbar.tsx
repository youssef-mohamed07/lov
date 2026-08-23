"use client";

import {
  ArrowRight,
  AudioWaveform,
  BookOpenText,
  Brain,
  Calculator,
  ChevronDown,
  Menu,
  MessageCircleMore,
  SmilePlus,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { navLinks } from "@/constants/navigation";
import { troubles } from "@/data/troubles";
import { cn } from "@/lib/utils";

const primaryNavLinks = navLinks.filter((link) => link.href !== "/faq");
const troubleIcons = [
  MessageCircleMore,
  BookOpenText,
  AudioWaveform,
  Calculator,
  SmilePlus,
  Utensils,
  Brain,
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileTroublesOpen, setMobileTroublesOpen] = useState(false);
  const lastScrollY = useRef(0);

  const solid = pathname !== "/" || scrolled || open;
  const troublesActive =
    pathname === "/troubles" || pathname.startsWith("/troubles/");
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      setScrolled(y > 12);
      if (y < 48 || open) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] pt-3 transition-transform duration-300 ease-out",
        hidden && !open ? "-translate-y-[calc(100%+0.75rem)]" : "translate-y-0",
      )}
    >
      <Container size="xl" className="pointer-events-auto relative z-10">
        <div
          className={cn(
            "relative flex h-16 min-w-0 items-center justify-between gap-3 rounded-[1.6rem] border px-3 transition-[background-color,box-shadow,border-color] duration-300 sm:px-4",
            solid
              ? "border-border/80 bg-surface/95 shadow-[0_18px_55px_-36px_rgba(14,14,15,0.5)] backdrop-blur-2xl"
              : "border-white/70 bg-white/82 shadow-[0_16px_46px_-38px_rgba(14,14,15,0.35)] backdrop-blur-xl",
          )}
        >
          <BrandMark compact className="min-w-0 shrink rounded-xl px-1.5 py-2" />

          <nav
            className="absolute left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 xl:flex"
            aria-label="Principal"
          >
            {primaryNavLinks.map((link) => {
              if (link.href === "/troubles") {
                return (
                  <div key={link.href} className="group/troubles relative">
                    <Link
                      href={link.href}
                      aria-haspopup="menu"
                      className={cn(
                        "inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                        troublesActive
                          ? "bg-accent-soft/80 text-accent-hover"
                          : "text-foreground/70 group-hover/troubles:bg-surface-muted group-hover/troubles:text-foreground group-focus-within/troubles:bg-surface-muted group-focus-within/troubles:text-foreground",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className="size-3.5 transition-transform duration-200 group-hover/troubles:rotate-180 group-focus-within/troubles:rotate-180"
                        aria-hidden
                      />
                    </Link>

                    <div
                      role="menu"
                      aria-label="Troubles accompagnés"
                      className={cn(
                        "pointer-events-none absolute top-full left-1/2 z-[80] w-[46rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4",
                        "invisible translate-y-2 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-out",
                        "group-hover/troubles:pointer-events-auto group-hover/troubles:visible group-hover/troubles:translate-y-0 group-hover/troubles:opacity-100",
                        "group-focus-within/troubles:pointer-events-auto group-focus-within/troubles:visible group-focus-within/troubles:translate-y-0 group-focus-within/troubles:opacity-100",
                      )}
                    >
                      <div className="grid grid-cols-[15rem_minmax(0,1fr)] gap-2.5 overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface/98 p-2.5 shadow-[0_28px_70px_-34px_rgba(14,14,15,0.42)] backdrop-blur-2xl">
                        <div className="relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.25rem] bg-brand-soft p-5">
                          <div aria-hidden className="absolute -right-10 -bottom-12 size-44 rounded-full bg-accent-soft/80 blur-2xl" />
                          <span className="relative inline-flex size-10 items-center justify-center rounded-xl bg-white/80 text-brand shadow-sm">
                            <Sparkles className="size-4.5" aria-hidden />
                          </span>
                          <p className="relative mt-8 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
                            Notre expertise
                          </p>
                          <p className="relative mt-2 font-display text-xl font-semibold leading-6 tracking-tight text-foreground">
                            Comprendre avant d’accompagner
                          </p>
                          <p className="relative mt-3 text-xs leading-5 text-muted">
                            Des repères simples pour identifier les signes et choisir le bon parcours.
                          </p>
                          <Link
                            href="/troubles"
                            role="menuitem"
                            className="relative mt-auto inline-flex items-center justify-between rounded-xl bg-foreground px-3.5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand"
                          >
                            Tous les troubles
                            <ArrowRight className="size-4" aria-hidden />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 content-start gap-1.5 p-1">
                          {troubles.map((trouble, index) => {
                            const href = `/troubles/${trouble.slug}`;
                            const active = pathname === href;
                            const Icon = troubleIcons[index] ?? MessageCircleMore;
                            return (
                              <Link
                                key={trouble.slug}
                                href={href}
                                role="menuitem"
                                className={cn(
                                  "group/item flex min-h-[4.35rem] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                                  active
                                    ? "bg-accent-soft text-accent-hover"
                                    : "text-foreground hover:bg-surface-muted",
                                )}
                              >
                                <span
                                  className={cn(
                                    "inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                    active
                                      ? "bg-white text-accent-hover"
                                      : "bg-brand-soft text-brand group-hover/item:bg-white",
                                  )}
                                >
                                  <Icon className="size-4" aria-hidden />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-medium leading-5">
                                    {trouble.shortTitle}
                                  </span>
                                  <span className="mt-0.5 block truncate text-[11px] leading-4 text-muted">
                                    {trouble.eyebrow}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft/80 text-accent-hover"
                      : "text-foreground/70 hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <CtaButton href="/nous-contacter" size="sm" tone="accent">
              <span className="sm:hidden">Écrire</span>
              <span className="hidden sm:inline">Nous contacter</span>
            </CtaButton>
            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="pointer-events-auto fixed inset-0 bg-foreground/25 backdrop-blur-[2px] xl:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        id="mobile-nav"
        className={cn(
          "pointer-events-auto relative px-[var(--gutter)] pt-3 xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-h-[calc(100dvh-var(--header-height)-1rem)] max-w-[var(--container-xl)] overflow-y-auto overscroll-contain rounded-[1.5rem] border border-border bg-surface p-3 shadow-[0_24px_60px_-32px_rgba(14,14,15,0.45)]">
          <div className="grid gap-1 sm:grid-cols-2">
            {primaryNavLinks.map((link) => {
              if (link.href === "/troubles") {
                return (
                  <div key={link.href} className="sm:col-span-2">
                    <button
                      type="button"
                      aria-expanded={mobileTroublesOpen}
                      onClick={() => setMobileTroublesOpen((value) => !value)}
                      className={cn(
                        "flex min-h-12 w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium",
                        troublesActive ? "bg-accent-soft text-accent-hover" : "hover:bg-surface-muted",
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("size-4 transition-transform", mobileTroublesOpen && "rotate-180")} aria-hidden />
                    </button>
                    {mobileTroublesOpen ? (
                      <div className="mt-1.5 grid gap-1 rounded-xl bg-surface-muted p-1.5 sm:grid-cols-2">
                        <Link href="/troubles" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand">
                          Tous les troubles
                        </Link>
                        {troubles.map((trouble) => {
                          const href = `/troubles/${trouble.slug}`;
                          return (
                            <Link
                              key={trouble.slug}
                              href={href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "rounded-lg px-3 py-2.5 text-sm leading-5",
                                pathname === href ? "bg-white font-medium text-accent-hover" : "text-muted",
                              )}
                            >
                              {trouble.shortTitle}
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              }

              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center rounded-xl px-3.5 py-3 text-sm font-medium",
                    active ? "bg-accent-soft text-accent-hover" : "hover:bg-surface-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
}
