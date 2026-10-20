import { Container } from "@/components/ui/container";
import { stats } from "@/lib/data/stats";

export function StatsStrip() {
  return (
    <section className="relative border-b border-line py-8 sm:py-12 md:py-16">
      {/* All four in one row at every width; phones get smaller type to fit. */}
      <Container className="grid grid-cols-4 divide-x divide-line">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 px-1 text-center sm:gap-2 sm:px-4"
          >
            <span className="font-display text-[22px] leading-none text-paper sm:text-4xl md:text-5xl">
              {stat.value}
            </span>
            <span className="text-balance font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-muted-2 sm:text-[11px] sm:tracking-[0.15em]">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
