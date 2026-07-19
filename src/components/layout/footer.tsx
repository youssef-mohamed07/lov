"use client";

import { motion, useReducedMotion } from "framer-motion";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/ui/container";
import { footerLinks } from "@/constants/navigation";
import { easeOutExpo } from "@/lib/motion";

const columns = [
  { title: "Parcours", links: footerLinks.parcours },
  { title: "Ressources", links: footerLinks.ressources },
  { title: "Contact", links: footerLinks.contact },
] as const;

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative mt-auto overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(14,14,15,0.05)_0.8px,transparent_0.8px)] [background-size:18px_18px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <Container className="relative py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="max-w-xs"
          >
            <BrandMark />
            <p className="mt-4 text-sm leading-6 text-muted">
              Orientation, bilan et accompagnement — pour les familles qui
              veulent des repères clairs.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Nous écrire →
            </button>
          </motion.div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-xl lg:gap-10">
            {columns.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.06 + columnIndex * 0.05,
                  duration: 0.4,
                  ease: easeOutExpo,
                }}
              >
                <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        className="group inline-flex items-center text-sm text-foreground transition-colors hover:text-accent"
                      >
                        <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5">
                          {link.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Lov. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Orthophonie · France</span>
            <span className="size-1 rounded-full bg-accent" aria-hidden />
            <span>Accompagnement familial</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
