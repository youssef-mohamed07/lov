import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { reassuranceItems } from "@/data/home";

export function HomeReassurance() {
  return (
    <section className="bg-background py-[var(--section-space-sm)]">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {reassuranceItems.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.06} variant="up" className="h-full">
                <article className="flex h-full flex-col rounded-[1.5rem] border border-border bg-surface px-6 py-7 shadow-[var(--shadow-card)] sm:px-7">
                  <span className="font-display text-3xl font-semibold tracking-tight text-foreground/15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted sm:text-[0.95rem] sm:leading-7">
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
