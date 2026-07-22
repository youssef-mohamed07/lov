import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { contact } from "@/data/nous-contacter";

export function ContactMap() {
  const { location } = contact;
  const delta = 0.012;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    location.lng - delta
  }%2C${location.lat - delta}%2C${location.lng + delta}%2C${
    location.lat + delta
  }&layer=mapnik&marker=${location.lat}%2C${location.lng}`;

  return (
    <section className="section-warm overflow-hidden py-[var(--section-space-lg)]">
      <Container className="relative">
        <Reveal className="max-w-2xl" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {location.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {location.title}{" "}
            <span className="squiggle-accent">{location.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="grid overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[var(--shadow-card)] lg:grid-cols-[0.85fr_1.15fr]">
            {/* Info side */}
            <div className="flex flex-col justify-between gap-8 p-7 sm:p-9">
              <div>
                <p className="max-w-sm text-base leading-7 text-muted">
                  {location.description}
                </p>

                <div className="mt-8 flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
                        {location.label}
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                        {location.address}
                      </p>
                      <p className="text-sm text-muted">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Clock3 className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
                        Horaires
                      </p>
                      <p className="mt-1 text-base font-medium text-foreground">
                        Lun–Ven, 9h–18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Voir l’itinéraire
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>

            {/* Map side */}
            <div className="relative min-h-[280px] border-t border-border lg:border-t-0 lg:border-l">
              <iframe
                title={`Carte — ${location.address}, ${location.city}`}
                src={embedSrc}
                className="absolute inset-0 size-full border-0 grayscale-[0.15] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
