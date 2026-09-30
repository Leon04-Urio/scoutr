export type PropertyType =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Development";

/**
 * App-facing shape, mapped from the Supabase `projects` row (see
 * lib/supabase/mappers.ts and build spec §7/§11). `has360`, `hasDollhouse`
 * and `hasFloorPlan` are admin-set booleans for now, not yet derived from
 * related `tours` / `dollhouses` / `floor_plans` rows — that lands with
 * their authoring UI in Phase 3.
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  summary: string;
  description: string;
  published: boolean;
  coverImage: {
    url?: string; // real photography, once Cloudinary lands
    gradient?: string; // placeholder treatment used until then
    label?: string;
  };
  /** Short 360°/walkthrough clip that autoplays on card hover, in place of the cover image. */
  walkthroughVideoUrl?: string;
  featured: boolean;
  has360: boolean;
  hasDollhouse: boolean;
  hasFloorPlan: boolean;
}
