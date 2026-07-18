"use client";

import { useEffect, useState } from "react";

import {
  emptyBilanAnswers,
  type BilanAnswers,
} from "@/data/bilan-form";

const STORAGE_KEY = "lov-bilan-draft-v1";

type Draft = {
  stepIndex: number;
  answers: BilanAnswers;
};

function readDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft;
    if (
      typeof parsed?.stepIndex !== "number" ||
      typeof parsed?.answers !== "object" ||
      !parsed.answers
    ) {
      return null;
    }
    return {
      stepIndex: Math.min(Math.max(0, parsed.stepIndex), 7),
      answers: { ...emptyBilanAnswers, ...parsed.answers },
    };
  } catch {
    return null;
  }
}

export function clearBilanDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function useBilanDraft() {
  const [hydrated, setHydrated] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<BilanAnswers>(emptyBilanAnswers);

  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      setStepIndex(draft.stepIndex);
      setAnswers(draft.answers);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (stepIndex >= 8) return;
    const draft: Draft = { stepIndex, answers };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [answers, hydrated, stepIndex]);

  function updateAnswer<K extends keyof BilanAnswers>(
    key: K,
    value: BilanAnswers[K],
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function resetDraft() {
    clearBilanDraft();
    setStepIndex(0);
    setAnswers(emptyBilanAnswers);
  }

  return {
    hydrated,
    stepIndex,
    setStepIndex,
    answers,
    updateAnswer,
    resetDraft,
  };
}
