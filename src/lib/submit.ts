export async function submitJson(payload: unknown) {
  const response = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error || "Une erreur est survenue.");
  }
}

export async function submitFormData(formData: FormData) {
  const response = await fetch("/api/submissions", {
    method: "POST",
    body: formData,
  });

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error || "Une erreur est survenue.");
  }
}
