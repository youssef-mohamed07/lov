import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
  title?: string;
  description?: string;
  className?: string;
};

export function Faq({
  items,
  title = "Questions fréquentes",
  description,
  className,
}: FaqProps) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-10)]", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-[var(--space-3)] text-xs font-medium tracking-[0.22em] text-muted uppercase">
          Questions
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-[var(--space-4)] text-base leading-7 text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-3)]">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl bg-surface px-[var(--space-5)] py-[var(--space-2)] shadow-[0_12px_40px_-32px_rgba(14,14,15,0.45)] open:pb-[var(--space-5)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[var(--space-4)] text-left text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-3xl pb-1 text-sm leading-7 text-muted sm:text-base">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
