import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";

const frames = [
  {
    src: "/images/gallery-play.jpg",
    alt: "Coin de jeu thérapeutique",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/gallery-materials.jpg",
    alt: "Matériel d’orthophonie",
    className: "",
  },
  {
    src: "/images/clinic-welcome.jpg",
    alt: "Accueil du cabinet",
    className: "",
  },
  {
    src: "/images/family-consult.jpg",
    alt: "Échange avec une famille",
    className: "sm:col-span-2",
  },
] as const;

export function HomeGallery() {
  return (
    <section className="bg-background py-[var(--section-space-md)]">
      <Container>
        <Reveal className="mb-[var(--space-8)] max-w-xl" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            Ambiance
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Un cadre{" "}
            <span className="font-medium italic text-voice">chaleureux</span>
          </h2>
        </Reveal>

        <div className="grid auto-rows-[160px] gap-3 sm:auto-rows-[180px] sm:grid-cols-4 lg:auto-rows-[220px]">
          {frames.map((frame, index) => (
            <Reveal
              key={frame.src}
              delay={index * 0.08}
              variant="fade-scale"
              className={frame.className}
            >
              <div className="relative h-full overflow-hidden rounded-[1.35rem] border border-border">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
