"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HomeFaq } from "@/components/sections/home/faq";
import { SiteCta } from "@/components/sections/site-cta";

const immersiveRoutes = ["/simulateur"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const immersive = immersiveRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (immersive) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip">
      <Navbar />
      <div className="min-w-0 flex-1">{children}</div>
      <HomeFaq />
      <SiteCta />
      <Footer />
    </div>
  );
}
