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

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Transparent nav only on the home hero; elsewhere keep a solid bar for contrast.
  const solid = pathname !== "/" || scrolled || open;
  const moreActive = secondaryNavLinks.some(
    (link) =>
      pathname === link.href || pathname.startsWith(`${link.href}/`),
  );

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
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

      // Keep visible near the top or while the mobile menu is open.
      if (y < 48 || open) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
        setMoreOpen(false);
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
    if (!moreOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] pt-3 transition-transform duration-300 ease-out",
        hidden && !open ? "-translate-y-[calc(100%+0.75rem)]" : "translate-y-0",
      )}
    >
      <Container className="pointer-events-auto relative">
        <div
          className={cn(
            "relative flex h-14 min-w-0 items-center justify-between gap-2 rounded-full border px-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:gap-3 sm:px-4",
            solid
              ? "border-border/80 bg-surface/95 shadow-[0_12px_40px_-28px_rgba(26,43,60,0.45)] backdrop-blur-xl"
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

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                aria-controls="nav-autres"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  moreOpen || moreActive
                    ? "bg-accent-soft text-accent"
                    : "text-foreground/70 hover:bg-background/80 hover:text-foreground",
                )}
              >
                Autres
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    moreOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              {moreOpen ? (
                <div
                  id="nav-autres"
                  role="menu"
                  className="absolute top-[calc(100%+0.45rem)] left-1/2 z-[80] w-48 -translate-x-1/2 rounded-2xl border border-border bg-surface p-1.5 shadow-[0_18px_40px_-20px_rgba(26,43,60,0.55)]"
                >
                  <div
                    aria-hidden
                    className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-t border-l border-border bg-surface"
                  />
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
                          "relative block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-accent-soft text-accent"
                            : "text-foreground/80 hover:bg-background hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
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

      <div
        id="mobile-nav"
        className={cn(
          "pointer-events-auto px-[var(--gutter)] pt-3 lg:hidden",
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
                  "block rounded-xl px-3 py-3 text-sm font-medium",
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
