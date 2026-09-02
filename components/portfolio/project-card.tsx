import { MapPin } from "lucide-react";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";

/**
 * Phase 1: links to `/portfolio` — individual project pages
 * (`/portfolio/[slug]`) ship in Phase 2 once projects are real, database-
 * backed records instead of the placeholder array in lib/data/projects.ts.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
      <div
        className={`flex h-56 items-end bg-gradient-to-br p-6 ${project.coverImage.gradient}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          {project.coverImage.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-paper">{project.title}</h3>
          <Badge>{project.propertyType}</Badge>
        </div>
        <p className="flex items-center gap-1.5 text-[13px] text-muted-2">
          <MapPin size={13} /> {project.location}
        </p>
        <p className="text-[14px] leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-auto flex gap-2 pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">
          {project.has360 ? <span>360°</span> : null}
          {project.hasDollhouse ? <span>· Dollhouse</span> : null}
          {project.hasFloorPlan ? <span>· Floor Plan</span> : null}
        </div>
      </div>
    </article>
  );
}
