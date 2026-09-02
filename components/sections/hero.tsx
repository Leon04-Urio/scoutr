import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Ambient studio-light glow instead of a stock photo — cheap, on-brand,
          and doesn't compete with the interactive demo just below it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-bronze/10 blur-[140px]"
      />

      <Container className="relative flex flex-col gap-8">
        <Reveal>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            Property digitization &amp; marketing
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-balance font-display text-[2.6rem] leading-[1.05] text-paper md:text-[4.2rem]">
            Bring properties to life.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-xl text-[16px] leading-relaxed text-muted md:text-[18px]">
            We turn a walkthrough into an immersive 360° tour, an interactive
            dollhouse view, and a measured floor plan — the kind of digital
            experience that makes a property impossible to scroll past.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
