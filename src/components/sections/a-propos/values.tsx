import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

export function AboutValues() {
  const { values } = about;

  return (
    <section className="bg-background py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {values.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {values.title}{" "}
            <span className="font-medium italic text-voice">
              {values.titleAccent}
            </span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 0.06} variant="fade" className="h-full">
                <article className="flex h-full flex-col rounded-[1.35rem] border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-7">
                  <span className="font-display text-sm font-semibold tracking-[0.14em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
