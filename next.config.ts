import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Anciennes URLs anglaises → français
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/about", destination: "/a-propos", permanent: true },
      { source: "/careers", destination: "/carrieres", permanent: true },
      { source: "/contact", destination: "/nous-contacter", permanent: true },
      { source: "/simulator", destination: "/simulateur", permanent: true },
      { source: "/articles", destination: "/ressources", permanent: true },
      {
        source: "/articles/:path*",
        destination: "/ressources/:path*",
        permanent: true,
      },
      {
        source: "/ressources/parents",
        destination: "/ressources/familles",
        permanent: true,
      },
      {
        source: "/ressources/parents/:path*",
        destination: "/ressources/familles/:path*",
        permanent: true,
      },
      {
        source: "/articles/parents",
        destination: "/ressources/familles",
        permanent: true,
      },
      {
        source: "/articles/parents/:path*",
        destination: "/ressources/familles/:path*",
        permanent: true,
      },
      {
        source: "/troubles/dyslexia",
        destination: "/troubles/dyslexie",
        permanent: true,
      },
      {
        source: "/troubles/speech-delay",
        destination: "/troubles/retard-parole-langage",
        permanent: true,
      },
      {
        source: "/troubles/stuttering",
        destination: "/troubles/begaiement",
        permanent: true,
      },
      {
        source: "/troubles/dysorthographia",
        destination: "/troubles/dyslexie",
        permanent: true,
      },
      {
        source: "/troubles/dyscalculia",
        destination: "/troubles/dyscalculie",
        permanent: true,
      },
      {
        source: "/troubles/dysphasia",
        destination: "/troubles/retard-parole-langage",
        permanent: true,
      },
      {
        source: "/troubles/voice",
        destination: "/troubles",
        permanent: true,
      },
      // Pages regroupées : anciens slugs → page qui couvre aujourd’hui le sujet
      {
        source: "/troubles/dysorthographie",
        destination: "/troubles/dyslexie",
        permanent: true,
      },
      {
        source: "/troubles/dysphasie",
        destination: "/troubles/retard-parole-langage",
        permanent: true,
      },
      {
        source: "/troubles/articulation",
        destination: "/troubles/retard-parole-langage",
        permanent: true,
      },
      {
        source: "/troubles/voix",
        destination: "/troubles",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
