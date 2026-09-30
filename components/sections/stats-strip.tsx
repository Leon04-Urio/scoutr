import { Container } from "@/components/ui/container";
import { stats } from "@/lib/data/stats";

export function StatsStrip() {
  return (
    <section className="relative border-b border-line py-12 md:py-16">
      <Container className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-line">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="font-display text-4xl text-paper md:text-5xl">{stat.value}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
              {stat.label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
