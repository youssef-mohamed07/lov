"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HomeFaq } from "@/components/sections/home/faq";
import { HomePricing } from "@/components/sections/home/pricing";
import { SiteCta } from "@/components/sections/site-cta";
import { getFaqForPathname } from "@/data/faqs";

const immersiveRoutes = [
  "/simulateur",
  "/demander-un-bilan",
  "/deja-un-bilan",
];

const hidePricingRoutes = ["/suivi", "/carrieres"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const immersive = immersiveRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const hidePricing = hidePricingRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const hideClosingCta =
    pathname === "/carrieres" || pathname.startsWith("/carrieres/");
  const faq = getFaqForPathname(pathname);

  if (immersive) {
    return (
      <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip">
      <Navbar />
      <div className="min-w-0 flex-1">{children}</div>
      {hidePricing ? null : <HomePricing />}
      {faq ? (
        <HomeFaq key={pathname} content={faq} showAllLink />
      ) : null}
      {hideClosingCta ? null : <SiteCta />}
      <Footer />
    </div>
  );
}
