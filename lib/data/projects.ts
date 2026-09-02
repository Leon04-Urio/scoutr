import type { Project } from "@/types/project";

/**
 * PLACEHOLDER DATA — Phase 1 only.
 *
 * These six projects exist so the Home and Portfolio pages render real
 * layouts instead of empty states. In Phase 2 this array is replaced by
 * a Supabase query against the `projects` table (see build spec §7/§11),
 * and `coverImage` becomes a real Cloudinary URL instead of a gradient
 * placeholder. Swap this file's contents for real project photography
 * and copy before launch.
 */
export const projects: Project[] = [
  {
    slug: "villa-karen",
    title: "Karen Hillside Villa",
    location: "Karen, Nairobi",
    propertyType: "Residential",
    summary:
      "A five-bedroom hillside villa, scanned room-by-room with a full dollhouse model and measured floor plans across both levels.",
    coverImage: { gradient: "from-[#3a2f22] via-[#20180f] to-[#0b0c0e]", label: "Villa" },
    featured: true,
    has360: true,
    hasDollhouse: true,
    hasFloorPlan: true,
  },
  {
    slug: "kilimani-loft",
    title: "Kilimani Loft Apartment",
    location: "Kilimani, Nairobi",
    propertyType: "Residential",
    summary:
      "An open-plan two-bedroom loft with a 360° tour built for a fast-moving rental listing.",
    coverImage: { gradient: "from-[#22303a] via-[#141c22] to-[#0b0c0e]", label: "Apartment" },
    featured: true,
    has360: true,
    hasDollhouse: true,
    hasFloorPlan: false,
  },
  {
    slug: "westlands-office-tower",
    title: "Westlands Office Tower",
    location: "Westlands, Nairobi",
    propertyType: "Commercial",
    summary:
      "Full-floor commercial space digitized for a developer marketing pre-lease units to prospective tenants.",
    coverImage: { gradient: "from-[#2a2a1f] via-[#181811] to-[#0b0c0e]", label: "Commercial" },
    featured: true,
    has360: true,
    hasDollhouse: false,
    hasFloorPlan: true,
  },
  {
    slug: "diani-boutique-hotel",
    title: "Diani Boutique Hotel",
    location: "Diani Beach, Kwale",
    propertyType: "Hospitality",
    summary:
      "Twelve room types and shared spaces tour-mapped so guests can preview the exact room they're booking.",
    coverImage: { gradient: "from-[#233327] via-[#141d17] to-[#0b0c0e]", label: "Hotel" },
    featured: true,
    has360: true,
    hasDollhouse: true,
    hasFloorPlan: true,
  },
  {
    slug: "runda-new-build",
    title: "Runda New-Build Show Home",
    location: "Runda, Nairobi",
    propertyType: "Development",
    summary:
      "Show home for an off-plan development, used by the sales team to sell units before the estate was complete.",
    coverImage: { gradient: "from-[#332a1f] via-[#1d1811] to-[#0b0c0e]", label: "Development" },
    featured: false,
    has360: true,
    hasDollhouse: true,
    hasFloorPlan: true,
  },
  {
    slug: "lavington-townhouse",
    title: "Lavington Townhouse",
    location: "Lavington, Nairobi",
    propertyType: "Residential",
    summary:
      "A three-bedroom townhouse listing photographed and tour-mapped inside a single afternoon.",
    coverImage: { gradient: "from-[#2e2620] via-[#191510] to-[#0b0c0e]", label: "Townhouse" },
    featured: false,
    has360: true,
    hasDollhouse: false,
    hasFloorPlan: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
