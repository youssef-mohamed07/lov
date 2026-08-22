import type { Metadata } from "next";

import { ExistingBilanForm } from "@/components/sections/existing-bilan-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Transmettre un bilan orthophonique existant",
  description:
    "Partagez votre bilan existant pour être orienté vers la suite adaptée.",
  path: "/deja-un-bilan",
  noIndex: true,
});

export default function DejaUnBilanPage() {
  return (
    <main>
      <ExistingBilanForm />
    </main>
  );
}
