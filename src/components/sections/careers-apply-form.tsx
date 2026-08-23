"use client";

import { Check, FileText, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { careers } from "@/data/carrieres";
import { submitFormData } from "@/lib/submit";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full min-w-0 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/40 focus:border-accent focus:shadow-[0_0_0_4px_rgba(254,81,16,0.25)]";

export function CareersApplyForm({
  role,
  roleSlug,
}: {
  role?: string;
  roleSlug?: string;
} = {}) {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    formData.set("kind", "careers");
    if (role) formData.set("role", role);
    if (roleSlug) formData.set("roleSlug", roleSlug);

    try {
      await submitFormData(formData);
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Une erreur est survenue.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex w-full max-w-md flex-col items-start gap-3 lg:items-end lg:text-right">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-white">
          <Check className="size-5" aria-hidden />
        </span>
        <p className="font-display text-xl font-semibold tracking-tight text-white">
          {careers.cta.successTitle}
        </p>
        <p className="max-w-sm text-sm leading-6 text-white/70 lg:text-right">
          {careers.cta.successDescription}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="sr-only">Nom</span>
          <input
            name="name"
            required
            autoComplete="name"
            className={fieldClassName}
            placeholder="Votre nom"
          />
        </label>
        <label className="block min-w-0">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
            placeholder="Votre adresse mail"
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">{careers.cta.fileLabel}</span>
        <span
          className={cn(
            "flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-dashed border-white/25 bg-white/10 px-4 py-2.5 transition-colors hover:bg-white/15",
            fileName && "border-accent/50 bg-accent/10",
          )}
        >
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            {fileName ? (
              <FileText className="size-4" aria-hidden />
            ) : (
              <Upload className="size-4" aria-hidden />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-white">
              {fileName || careers.cta.fileLabel}
            </span>
            <span className="mt-0.5 block text-xs text-white/45">
              PDF, DOC, DOCX · 4 Mo max.
            </span>
          </span>
          <input
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
            className="sr-only"
            onChange={(event) =>
              setFileName(event.target.files?.[0]?.name ?? "")
            }
          />
        </span>
      </label>

      {error ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      <CtaButton type="submit" size="lg" disabled={submitting} className="w-full justify-between sm:w-auto sm:self-start lg:self-end">
        {submitting ? "Envoi…" : careers.cta.action}
      </CtaButton>
    </form>
  );
}
