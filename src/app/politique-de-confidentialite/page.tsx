import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/sections/legal-document";
import { legalDocuments } from "@/data/legal";
import { createPageMetadata } from "@/lib/seo";

const doc = legalDocuments.confidentialite;

export const metadata: Metadata = createPageMetadata({
  title: doc.title,
  description: doc.description,
  path: doc.path,
  // Placeholder until the final document is supplied.
  noIndex: true,
});

export default function Page() {
  return <LegalDocumentPage doc={doc} />;
}
