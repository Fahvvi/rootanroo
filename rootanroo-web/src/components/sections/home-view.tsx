"use client";

import { useRef } from "react";
import { SideRail } from "@/components/shared/side-rail";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { ServicesSummary } from "@/components/sections/services-summary";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCta } from "@/components/sections/contact-cta";

const SECTIONS = ["hero", "services", "work", "testimonial", "contact"];

export function HomeView() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <SideRail containerRef={containerRef} />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <ServicesSummary />
        <FeaturedWork />
        <Testimonials />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
