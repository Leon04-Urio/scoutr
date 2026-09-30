import { Container } from "@/components/ui/container";
import { SectionDivider } from "@/components/ui/section-divider";
import { ProjectScrollRow } from "@/components/portfolio/project-scroll-row";
import { getFeaturedProjects } from "@/lib/supabase/queries";

export async function FeaturedProjects() {
  const featuredProjects = await getFeaturedProjects();
  if (featuredProjects.length === 0) return null;

  return (
    <section className="relative py-16">
      <Container className="flex flex-col gap-6">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
          Portfolio
        </span>
        <ProjectScrollRow projects={featuredProjects} />
      </Container>
      <SectionDivider />
    </section>
  );
}
