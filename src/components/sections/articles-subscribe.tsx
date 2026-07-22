"use client";

import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { articlesPage } from "@/data/articles";

export function ArticlesSubscribe() {
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-full border border-accent/30 bg-accent-soft px-5 py-3.5 text-sm font-medium text-accent">
        Merci — vous êtes bien inscrit(e).
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
    >
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">{articlesPage.subscribePlaceholder}</span>
        <Mail
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={articlesPage.subscribePlaceholder}
          className="w-full min-w-0 rounded-full border border-border bg-surface py-3.5 pr-4 pl-11 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]"
        />
      </label>
      <CtaButton type="submit" size="md" className="w-full shrink-0 sm:w-auto">
        {articlesPage.subscribeCta}
      </CtaButton>
    </form>
  );
}
