import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "360° tours, dollhouse views, floor plans, and photography from properties Scoutr has digitized across residential, commercial, and hospitality.",
};

export default function PortfolioPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            Portfolio
          </span>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
            Work we&rsquo;ve shipped.
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            Individual project pages — with the full tour, dollhouse, and
            floor plan for each property — are coming in the next phase of
            the build. For now, here&rsquo;s the full list.
          </p>
        </div>

        <PortfolioGrid />
      </Container>
    </section>
  );
}
