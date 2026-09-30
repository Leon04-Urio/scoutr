"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { Project } from "@/types/project";

const SCROLL_AMOUNT = 320;

export function ProjectScrollRow({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: direction * SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div key={project.slug} className="w-64 shrink-0 sm:w-72">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-line-strong bg-ink/80 text-paper backdrop-blur transition-colors hover:border-paper sm:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center border border-line-strong bg-ink/80 text-paper backdrop-blur transition-colors hover:border-paper sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
