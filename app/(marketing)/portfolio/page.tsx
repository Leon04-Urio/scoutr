import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { getPublishedProjects } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "360° tours, dollhouse views, floor plans, and photography from properties Scoutr has digitized across residential, commercial, and hospitality.",
};

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            Portfolio
          </span>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
            Work we&rsquo;ve shipped.
          </h1>
          <p className="max-w-xl font-display text-xl italic leading-snug text-muted">
            Every project below has its own page.
          </p>
          <div className="mt-2 h-px w-10 bg-line-strong" />
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            Each one links out to the full tour, dollhouse, and floor plan
            for that property.
          </p>
        </div>

        <PortfolioGrid projects={projects} />
      </Container>
    </section>
  );
}
