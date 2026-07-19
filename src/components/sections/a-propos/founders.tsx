import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

export function AboutFounders() {
  const { founders } = about;

  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {founders.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {founders.title}{" "}
            <span className="font-medium italic text-voice">
              {founders.titleAccent}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {founders.people.map((person, index) => (
            <li key={person.name}>
              <Reveal delay={index * 0.08} variant={index === 0 ? "left" : "right"}>
                <article className="grid overflow-hidden rounded-[1.75rem] border border-border bg-background sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[260px] sm:min-h-[300px]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover object-[50%_20%]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {person.role}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                      {person.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
