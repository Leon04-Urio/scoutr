import { Hero } from "@/components/sections/hero";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ClientLogos } from "@/components/sections/client-logos";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <InteractiveDemo />
      <HowItWorks />
      <FeaturedProjects />
      <WhyChooseUs />
      <ClientLogos />
      <FinalCta />
    </>
  );
}
