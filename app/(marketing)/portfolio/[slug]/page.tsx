import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/quote-form";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { getProjectBySlug, getProjectImages, getProjectTestimonial } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

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

  const [testimonial, images] = await Promise.all([
    getProjectTestimonial(project.id),
    getProjectImages(project.id),
  ]);
  const available = experiences.filter((e) => project[e.key]);

  return (
    <>
      <section
        className={cn(
          "relative flex items-end sm:h-[40vh] sm:min-h-[300px]",
          !project.coverImage.url && ["bg-gradient-to-br", project.coverImage.gradient]
        )}
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
        {/* Phones: banner is just its content plus padding (no fixed height). */}
        <Container className="relative flex flex-col gap-3 pb-8 pt-6 sm:pb-10 sm:pt-0">
          <Link
            href="/portfolio"
            className="mb-2 flex w-fit items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-paper"
          >
            <ArrowLeft size={14} /> All projects
          </Link>
          <Badge className="w-fit">{project.propertyType}</Badge>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
            {project.title}
          </h1>
          <p className="flex items-center gap-1.5 text-[14px] text-muted-2">
            <MapPin size={14} /> {project.location}
          </p>
        </Container>
      </section>

      <section className="pb-12 pt-8 sm:py-16 md:py-20">
        <Container className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4">
            <SectionLabel>About the Project</SectionLabel>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
              {project.description || project.summary}
            </p>
          </div>

          {available.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {available.map((e) => (
                <div
                  key={e.key}
                  className="rounded-xl border border-line bg-surface px-4 py-3 text-[13px] text-paper/90"
                >
                  {e.label}
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {project.tourEmbedUrl ? (
        <MediaSection label="3D Tour" hint="Drag to look around. Use the controls to switch to the dollhouse or floor plan view.">
          {/* Phones: exactly one screen tall minus the sticky navbar and a
              margin (svh = height with browser bars showing), so the whole
              tour is visible at once with no scrolling. */}
          <div className="relative h-[calc(100svh-6rem)] w-full overflow-hidden rounded-2xl border border-line bg-surface sm:aspect-video sm:h-auto">
            <iframe
              src={project.tourEmbedUrl}
              title={`${project.title} — 3D tour`}
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </MediaSection>
      ) : null}

      {project.walkthroughVideoUrl ? (
        <MediaSection label="Walkthrough">
          <video
            src={project.walkthroughVideoUrl}
            poster={project.coverImage.url}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full rounded-2xl border border-line bg-surface object-cover"
          />
        </MediaSection>
      ) : null}

      {images.length > 0 ? (
        <MediaSection label="Gallery">
          <ProjectGallery images={images} title={project.title} />
        </MediaSection>
      ) : null}

      {testimonial ? (
        <MediaSection label="From the Owners">
          <figure className="flex max-w-3xl flex-col gap-3 rounded-2xl border border-accent/30 bg-surface p-5 sm:gap-5 sm:p-7 md:p-9">
            <Quote className="size-[18px] text-accent sm:size-[22px]" />
            <blockquote className="font-display text-[15px] leading-relaxed text-paper/90 sm:text-xl sm:leading-snug sm:text-paper md:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2 sm:text-[11px]">
              {testimonial.name}
              {testimonial.role ? ` — ${testimonial.role}` : ""}
            </figcaption>
          </figure>
        </MediaSection>
      ) : null}

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="flex w-full flex-col gap-5 rounded-2xl border border-line bg-surface/40 p-4 sm:gap-6 sm:p-6 md:p-10">
            <h2 className="text-balance font-display text-xl leading-snug text-paper sm:text-2xl md:text-3xl">
              Want this experience for your property?
            </h2>
            <QuoteForm wide />
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
      {children}
    </span>
  );
}

function MediaSection({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-12 sm:pb-16 md:pb-20">
      <Container className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col gap-1.5">
          <SectionLabel>{label}</SectionLabel>
          {hint ? <p className="text-[13px] text-muted-2">{hint}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
