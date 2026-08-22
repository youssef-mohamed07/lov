import type { Metadata } from "next";

import { SimulatorFlow } from "@/components/sections/simulateur-flow";
import { simulatorPage } from "@/data/simulateur";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Simulateur d’orientation orthophonique en ligne",
  description: simulatorPage.description,
  path: "/simulateur",
  image: "/images/path-simulator.jpg",
  imageAlt: "Simulateur d’orientation pour un parcours orthophonique",
});

export default function SimulatorPage() {
  return (
    <main>
      <SimulatorFlow />
    </main>
  );
}
