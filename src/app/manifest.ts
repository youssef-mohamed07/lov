import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lov — Orthophonie en téléconsultation",
    short_name: "Lov",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfd",
    theme_color: "#f9ab6c",
    lang: "fr",
    icons: [
      {
        src: "/brand/logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
