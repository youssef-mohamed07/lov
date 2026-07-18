import {
  HomeBento,
  HomeDialogue,
  HomeExpertise,
  HomeGallery,
  HomeHero,
  HomePlatform,
  HomePricing,
  HomeServicesGrid,
  HomeShowcase,
  HomeStats,
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
      <HomeGallery />
      <HomeBento />
      <HomeStats />
      <HomeTestimonials />
      <HomePlatform />
      <HomeExpertise />
      <HomePricing />
    </main>
  );
}
