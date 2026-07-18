import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/ui/cta-button";
import { navLinks, secondaryNavLinks } from "@/constants/navigation";

const links = [
  ...navLinks,
  ...secondaryNavLinks,
  { href: "/nous-contacter", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-background pb-4">
      <Container>
        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-foreground text-white shadow-[var(--shadow-card)]">
          <div className="grid sm:grid-cols-[140px_minmax(0,1fr)] md:grid-cols-[180px_minmax(0,1fr)]">
            <div className="relative hidden min-h-[132px] sm:block">
              <Image
                src="/images/footer-welcome.jpg"
                alt=""
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-6">
              <div className="min-w-0">
                <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Prêt à clarifier{" "}
                  <span className="font-medium italic text-voice">
                    la suite&nbsp;?
                  </span>
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Un bilan structuré, des repères concrets.
                </p>
              </div>
              <CtaButton href="/bilan" size="md" className="w-fit shrink-0">
                Commencer le bilan
              </CtaButton>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
          <BrandMark compact />
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap gap-x-1 gap-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-4 px-1 text-xs text-muted/80">
          © {new Date().getFullYear()} Lov. Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
}
