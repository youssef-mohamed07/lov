"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { navLinks, secondaryNavLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const mobileLinks = [...navLinks, ...secondaryNavLinks];

const secondaryMeta: Record<(typeof secondaryNavLinks)[number]["href"], string> =
  {
    "/a-propos": "Notre histoire et notre approche",
    "/faq": "Toutes vos questions, par thème",
    "/carrieres": "Rejoindre l'équipe Lov",
  };

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const solid = pathname !== "/" || scrolled || open;
  const moreActive = secondaryNavLinks.some(
    (link) =>
      pathname === link.href || pathname.startsWith(`${link.href}/`),
  );

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

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

      if (y < 48 || open) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

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
      <Container className="pointer-events-auto relative z-10">
        <div
          className={cn(
            "relative flex h-14 min-w-0 items-center justify-between gap-2 rounded-full border px-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:gap-3 sm:px-4",
            solid
              ? "border-border/80 bg-surface/95 shadow-[0_12px_40px_-28px_rgba(14,14,15,0.45)] backdrop-blur-xl"
              : "border-transparent bg-transparent shadow-none backdrop-blur-0",
          )}
        >
          <BrandMark
            compact
            className="min-w-0 shrink rounded-full px-1.5 py-1"
          />

          <nav
            className="absolute left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            aria-label="Principal"
          >
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-foreground/70 hover:bg-background/80 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="group/more relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-controls="nav-autres"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  moreActive
                    ? "bg-accent-soft text-accent"
                    : "text-foreground/70 group-hover/more:bg-background/80 group-hover/more:text-foreground group-focus-within/more:bg-background/80 group-focus-within/more:text-foreground",
                )}
              >
                Autres
                <ChevronDown
                  className="size-3.5 transition-transform duration-200 ease-out group-hover/more:rotate-180 group-focus-within/more:rotate-180"
                  aria-hidden
                />
              </button>

              <div
                id="nav-autres"
                role="menu"
                className={cn(
                  "pointer-events-none absolute top-full left-1/2 z-[80] w-[17.5rem] -translate-x-1/2 pt-3",
                  "invisible translate-y-1 opacity-0",
                  "transition-[opacity,transform,visibility] duration-200 ease-out",
                  "group-hover/more:pointer-events-auto group-hover/more:visible group-hover/more:translate-y-0 group-hover/more:opacity-100",
                  "group-focus-within/more:pointer-events-auto group-focus-within/more:visible group-focus-within/more:translate-y-0 group-focus-within/more:opacity-100",
                )}
              >
                <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-surface/95 p-1.5 shadow-[0_24px_48px_-28px_rgba(14,14,15,0.55)] backdrop-blur-xl">
                  <div
                    aria-hidden
                    className="mb-1.5 rounded-[0.9rem] bg-gradient-to-br from-brand-soft/90 via-surface to-accent-soft/70 px-3.5 py-2.5"
                  >
                    <p className="text-[11px] font-medium tracking-[0.18em] text-brand uppercase">
                      Découvrir
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-muted">
                      Lov au-delà du parcours
                    </p>
                  </div>

                  {secondaryNavLinks.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className={cn(
                          "group/item relative flex flex-col rounded-[0.9rem] px-3.5 py-2.5 transition-colors",
                          active
                            ? "bg-accent-soft text-accent"
                            : "text-foreground hover:bg-brand-soft/70",
                        )}
                      >
                        <span className="text-sm font-medium tracking-tight">
                          {link.label}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 text-xs leading-5 transition-colors",
                            active
                              ? "text-accent/80"
                              : "text-muted group-hover/item:text-brand",
                          )}
                        >
                          {secondaryMeta[link.href]}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <CtaButton
              href="/nous-contacter"
              size="sm"
              tone="accent"
              className="max-w-[11.5rem] sm:max-w-none"
            >
              <span className="truncate sm:hidden">Écrire</span>
              <span className="hidden sm:inline">Nous contacter</span>
            </CtaButton>

            <button
              type="button"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 text-foreground backdrop-blur-sm lg:hidden"
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
          className="pointer-events-auto fixed inset-0 bg-foreground/25 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        id="mobile-nav"
        className={cn(
          "pointer-events-auto relative px-[var(--gutter)] pt-3 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="rounded-[1.5rem] border border-border bg-surface p-3 shadow-[var(--shadow-card)]">
          {mobileLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block min-h-11 rounded-xl px-3 py-3 text-sm font-medium",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-background",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <CtaButton
            href="/nous-contacter"
            size="md"
            tone="accent"
            className="mt-2 w-full justify-between"
          >
            Nous contacter
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
