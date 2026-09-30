import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="max-w-2xl text-balance font-display text-3xl leading-[1.1] text-paper md:text-[3rem]">
            Give your next listing a tour, not just a photo set.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap justify-center gap-4">
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
