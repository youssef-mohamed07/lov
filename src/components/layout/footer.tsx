"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { footerLinks } from "@/constants/navigation";
import { easeOutExpo } from "@/lib/motion";

const columns = [
  { title: "Parcours", links: footerLinks.parcours },
  { title: "Ressources", links: footerLinks.ressources },
  { title: "À propos", links: footerLinks.contact },
] as const;

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative mt-auto overflow-hidden bg-foreground text-background">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-[20%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(249,171,108,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute top-[42%] -left-24 size-[20rem] rounded-full bg-[radial-gradient(circle,rgba(13,128,175,0.1),transparent_72%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.8px,transparent_0.8px)] [background-size:22px_22px]" />
      </div>

      <Container className="relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="flex flex-col gap-6 border-b border-white/10 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              Prêt à commencer
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-background sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Un premier échange,{" "}
              <span className="font-medium text-accent">et déjà plus clair</span>
            </h2>
          </div>

          <Link
            href="/nous-contacter"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-accent py-2 pr-2 pl-6 text-[15px] font-medium text-white transition-[background-color,box-shadow] hover:bg-accent-hover hover:shadow-[0_0_28px_-6px_rgba(249,171,108,0.75)] lg:self-auto"
          >
            Nous contacter
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 ease-out group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </motion.div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <p className="text-base leading-7 text-background/75 sm:text-[1.05rem] sm:leading-8">
              Orientation, bilan et accompagnement — pour les familles qui
              veulent des repères clairs.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-background/55">
              <span>Orthophonie · France</span>
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span>Accompagnement familial</span>
            </div>
          </div>

          {columns.map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.05 + columnIndex * 0.05,
                duration: 0.4,
                ease: easeOutExpo,
              }}
            >
              <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-background/82 transition-colors hover:text-accent"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 py-6 text-xs text-background/45">
          <p>© {new Date().getFullYear()} Lov</p>
          <p>Tous droits réservés</p>
        </div>
      </Container>

      <Link
        href="/"
        aria-label="Lov — Accueil"
        className="group relative block w-full overflow-hidden px-[var(--gutter)] pt-4 pb-10 sm:pb-12"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="relative mx-auto w-full max-w-[72rem]"
        >
          <Image
            src="/brand/logo-horizontal.svg"
            alt="Lov — les orthos en visio"
            width={1200}
            height={270}
            className="h-auto w-full opacity-80 grayscale transition-[filter,opacity] duration-400 group-hover:opacity-100 group-hover:grayscale-0"
            priority={false}
          />
        </motion.div>
      </Link>
    </footer>
  );
}
