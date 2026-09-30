import { SectionDivider } from "@/components/ui/section-divider";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getFeaturedProjects } from "@/lib/supabase/queries";

export async function FeaturedProjects() {
  const featuredProjects = (await getFeaturedProjects()).slice(0, 4);
  if (featuredProjects.length === 0) return null;

  return (
    <section className="relative">
      <span className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-paper/70">
        Portfolio
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <SectionDivider />
    </section>
  );
}
