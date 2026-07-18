import type { Metadata } from "next";

import { SimulatorFlow } from "@/components/sections/simulateur-flow";
import { simulatorPage } from "@/data/simulateur";

export const metadata: Metadata = {
  title: "Simulateur",
  description: simulatorPage.description,
};

export default function SimulatorPage() {
  return (
    <main>
      <h1 className="sr-only">{simulatorPage.title}</h1>
      <SimulatorFlow />
    </main>
  );
}
