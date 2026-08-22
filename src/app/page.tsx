import {
  HomeBento,
  HomeDialogue,
  HomeExpertise,
  HomeHero,
  HomePlatform,
  HomePricing,
  HomeServicesGrid,
  HomeShowcase,
  HomeSteps,
  HomeTestimonials,
  HomeTroublesPanel,
} from "@/components/sections/home";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeShowcase />
      <HomeSteps />
      <HomeDialogue />
      <HomeTroublesPanel />
      <HomeServicesGrid />
      <HomeBento />
      <HomeTestimonials />
      <HomePlatform />
      <HomeExpertise />
      <HomePricing />
    </main>
  );
}
