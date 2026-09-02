import type { PricingPackage } from "@/types/pricing";

/**
 * PLACEHOLDER PRICING — Phase 1 only. Per build spec §18 this moves into
 * a Supabase `pricing` table so it's editable from the admin dashboard
 * without a code change. Confirm real package pricing before launch.
 */
export const pricingPackages: PricingPackage[] = [
  {
    name: "Starter",
    tagline: "For a single listing that needs to stand out.",
    includes: ["360° virtual tour", "Up to 8 scenes", "Shareable link & embed"],
    bestFor: "Individual agents, single-unit listings",
    featured: false,
  },
  {
    name: "Pro",
    tagline: "The full walkthrough experience.",
    includes: [
      "360° virtual tour",
      "Professional photography",
      "Measured floor plans",
      "Shareable link & embed",
    ],
    bestFor: "Agencies, property managers, regular listings",
    featured: true,
  },
  {
    name: "Premium",
    tagline: "Everything, for properties that need to sell themselves.",
    includes: [
      "360° virtual tour",
      "Professional photography",
      "Measured floor plans",
      "Interactive dollhouse view",
      "Property video",
    ],
    bestFor: "Luxury listings, hotels, developments",
    featured: false,
  },
];
