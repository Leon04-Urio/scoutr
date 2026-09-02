/**
 * Phase 1 shape — hard-coded here so Pricing/PricingPreview render real
 * content immediately. Per spec §18, this moves into a Supabase `pricing`
 * table in a later phase so the admin can edit it without a deploy.
 */
export interface PricingPackage {
  name: string;
  tagline: string;
  includes: string[];
  bestFor: string;
  featured: boolean;
}
