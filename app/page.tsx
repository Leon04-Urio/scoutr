import { Hero } from "@/components/sections/hero";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhoWeWorkWith } from "@/components/sections/who-we-work-with";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveDemo />
      <WhatWeDo />
      <FeaturedProjects />
      <HowItWorks />
      <WhoWeWorkWith />
      <WhyChooseUs />
      <Testimonials />
      <PricingPreview />
      <FinalCta />
    </>
  );
}
