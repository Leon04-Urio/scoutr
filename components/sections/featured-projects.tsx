import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import { featuredProjects } from "@/lib/data/projects";

export function FeaturedProjects() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent work."
            description="A sample of properties we've digitized across residential, commercial, and hospitality."
          />
          <Button href="/portfolio" variant="outline">
            View all projects
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
