import { Container } from "@/components/ui/container";
import { SectionDivider } from "@/components/ui/section-divider";
import { Reveal } from "@/components/motion/reveal";
import { HeroPhoto } from "@/components/sections/hero-photo";

const hotspots = [
  { top: "46%", left: "36%" },
  { top: "58%", left: "64%" },
];

export function Hero() {
  return (
    <section id="hero" className="relative isolate -mt-20 flex min-h-screen items-end overflow-hidden">
      <HeroPhoto />

      {hotspots.map((spot, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={spot}
        >
          <span className="absolute inset-0 -m-2 animate-ping rounded-full border border-paper/40" />
          <span className="block h-2.5 w-2.5 rounded-full bg-paper ring-4 ring-paper/20" />
        </span>
      ))}

      <Container className="relative z-20 flex w-full flex-col gap-8 pb-12 md:pb-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Reveal>
              <div className="w-64 rounded-2xl border border-line-strong bg-paper/10 p-5 backdrop-blur-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2">
                  Featured scan
                </span>
                <p className="mt-1 font-display text-lg text-paper">Maua Residence</p>
                <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-[12px] text-paper/75">
                  <dt className="text-muted-2">Location</dt>
                  <dd>Nairobi, KE</dd>
                  <dt className="text-muted-2">Year</dt>
                  <dd>2026</dd>
                  <dt className="text-muted-2">Size</dt>
                  <dd>310 m²</dd>
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="max-w-xs sm:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
              Property digitization &amp; marketing
            </p>
            <p className="mt-2 font-display text-[15px] italic leading-snug text-paper/75">
              The digital experience that makes a property impossible to
              scroll past.
            </p>
          </Reveal>
        </div>
      </Container>

      <SectionDivider />
    </section>
  );
}
