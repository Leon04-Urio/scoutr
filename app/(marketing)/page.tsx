import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ClientLogos } from "@/components/sections/client-logos";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <WhatWeDo />
      <InteractiveDemo />
      <FeaturedProjects />
      <WhyChooseUs />
      <ClientLogos />
      <FinalCta />
    </>
  );
}
