export type PropertyType =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Development";

/**
 * Phase 1 shape. In Phase 2 this becomes the row type generated from the
 * Supabase `projects` table (see build spec §7/§11) — `has360`, `hasDollhouse`
 * and `hasFloorPlan` will instead be derived from whether related
 * `tours` / `dollhouses` / `floor_plans` rows exist.
 */
export interface Project {
  slug: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  summary: string;
  coverImage: {
    gradient: string; // placeholder treatment until real photography is loaded
    label: string;
  };
  featured: boolean;
  has360: boolean;
  hasDollhouse: boolean;
  hasFloorPlan: boolean;
}
