import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/quote-form";
import { getProjectBySlug, getProjectTestimonial } from "@/lib/supabase/queries";

// No generateStaticParams: projects are admin-edited at runtime (published/
// unpublished, content changes), so these render dynamically per request
// rather than being frozen at build time.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

const experiences = [
  { key: "has360" as const, label: "360° Virtual Tour" },
  { key: "hasDollhouse" as const, label: "Dollhouse View" },
  { key: "hasFloorPlan" as const, label: "Floor Plan" },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const testimonial = await getProjectTestimonial(project.id);
  const available = experiences.filter((e) => project[e.key]);

  return (
    <>
      <section
        className={
          project.coverImage.url
            ? "relative flex h-[46vh] min-h-[320px] items-end"
            : `relative flex h-[46vh] min-h-[320px] items-end bg-gradient-to-br ${project.coverImage.gradient}`
        }
      >
        {project.coverImage.url ? (
          // eslint-disable-next-line @next/next/no-img-element -- see project-card.tsx
          <img
            src={project.coverImage.url}
            alt={project.coverImage.label ?? project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Container className="relative flex flex-col gap-3 pb-10">
          <Badge className="w-fit">{project.propertyType}</Badge>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
            {project.title}
          </h1>
          <p className="flex items-center gap-1.5 text-[14px] text-muted-2">
            <MapPin size={14} /> {project.location}
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
                About the Project
              </span>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
                {project.description || project.summary}
              </p>
            </div>

            {available.length > 0 ? (
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
                  Experience
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  {available.map((e) => (
                    <div
                      key={e.key}
                      className="rounded-xl border border-line bg-surface px-4 py-3 text-[13px] text-paper/90"
                    >
                      {e.label}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-muted-2">
                  Interactive viewers for these are on the way — this page will
                  let you walk through them directly once they ship.
                </p>
              </div>
            ) : null}

            {testimonial ? (
              <blockquote className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-surface p-7">
                <p className="text-[15px] leading-relaxed text-paper/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="text-[13px] text-muted-2">
                  {testimonial.name}
                  {testimonial.role ? `, ${testimonial.role}` : ""}
                </footer>
              </blockquote>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
            <h2 className="font-display text-xl text-paper">
              Want this experience for your property?
            </h2>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
