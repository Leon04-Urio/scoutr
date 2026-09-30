import type { ProjectRow } from "@/types/database";
import type { Project } from "@/types/project";

export function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    propertyType: row.property_type,
    summary: row.summary,
    description: row.description,
    published: row.published,
    coverImage: {
      url: row.cover_image_url ?? undefined,
      gradient: row.cover_gradient ?? undefined,
      label: row.cover_label ?? undefined,
    },
    walkthroughVideoUrl: row.walkthrough_video_url ?? undefined,
    featured: row.featured,
    has360: row.has_360,
    hasDollhouse: row.has_dollhouse,
    hasFloorPlan: row.has_floor_plan,
  };
}
