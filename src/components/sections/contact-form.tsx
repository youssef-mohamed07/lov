"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { contact } from "@/data/nous-contacter";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full min-w-0 rounded-2xl border border-border/80 bg-background px-4 py-3.5 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/50 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]";

export function ContactForm() {
  const [subject, setSubject] = useState<(typeof contact.subjects)[number]["value"]>(
    contact.subjects[0].value,
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start rounded-[1.75rem] border border-border bg-surface px-6 py-10 sm:px-9">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="size-5" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
          Message{" "}
          <span className="font-medium italic text-voice">envoyé</span>
        </h2>
        <p className="mt-2 max-w-sm text-base leading-7 text-muted">
          Merci. Nous vous répondrons rapidement aux horaires d’ouverture.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Nom
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className={fieldClassName}
            placeholder="Votre nom"
          />
        </label>
        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Courriel
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
            placeholder="vous@exemple.fr"
          />
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">
          Sujet
        </legend>
        <div className="flex flex-wrap gap-2">
          {contact.subjects.map((item) => {
            const selected = subject === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setSubject(item.value)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                  selected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:border-accent/40 hover:bg-accent-soft/50",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="subject" value={subject} />
      </fieldset>

      <label className="block min-w-0">
        <span className="mb-2 block text-sm font-medium text-foreground">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(fieldClassName, "resize-none leading-7")}
          placeholder="Expliquez brièvement votre besoin…"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted">
          Réponse sous 24–48h ouvrables.
        </p>
        <CtaButton type="submit" size="md" className="w-full sm:w-auto">
          Envoyer le message
        </CtaButton>
      </div>
    </form>
  );
}
