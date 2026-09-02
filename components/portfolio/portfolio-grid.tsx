"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projects } from "@/lib/data/projects";
import type { PropertyType } from "@/types/project";
import { cn } from "@/lib/utils";

const filters: ("All" | PropertyType)[] = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Development",
];

export function PortfolioGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.propertyType === active)),
    [active]
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-paper",
              active === f && "border-bronze bg-bronze/10 text-bronze"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
