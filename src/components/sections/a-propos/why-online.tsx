import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/ui/container";
import { about } from "@/data/a-propos";

export function AboutWhyOnline() {
  const { whyOnline } = about;

  return (
    <section className="bg-surface py-[var(--section-space-lg)]">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" variant="fade">
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            {whyOnline.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {whyOnline.title}{" "}
            <span className="font-medium italic text-voice">
              {whyOnline.titleAccent}
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
            {whyOnline.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {whyOnline.points.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 0.07}>
                <p className="font-display text-sm font-semibold tracking-[0.14em] text-muted uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {point.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
