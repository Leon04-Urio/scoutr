import type { Metadata } from "next";
import { Aperture, Award, Ruler, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Scoutr is a property digitization studio building 360° tours, dollhouse views, floor plans, photography, and video for real estate and hospitality.",
};

const standards = [
  {
    icon: Aperture,
    title: "Our equipment",
    description:
      "Purpose-built 360° cameras and scanning hardware, paired with photography gear chosen for how a room actually looks in person — not just how it measures.",
  },
  {
    icon: Ruler,
    title: "How we measure",
    description:
      "Every floor plan dimension comes from the scan itself. We don't estimate room sizes after the fact from a sketch.",
  },
  {
    icon: Sparkles,
    title: "Our finishing",
    description:
      "Every tour, photo, and video is graded and checked before it ships — nothing goes out looking like a raw export.",
  },
  {
    icon: Award,
    title: "Our standard",
    description:
      "If a delivered tour or plan doesn't match the property, we reshoot it. What a buyer sees has to match what they'll walk into.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <Container className="flex flex-col gap-6">
          <Reveal>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
              About Scoutr
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-3xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-6xl">
              We started Scoutr because photos stopped being enough.
            </h1>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="max-w-2xl font-display text-xl italic leading-snug text-muted">
              A listing photo asks a buyer to imagine a space.
            </p>
          </Reveal>
          <Reveal delay={0.09}>
            <div className="h-px w-10 bg-line-strong" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted">
              It leaves out the thing that actually sells a property — what
              it feels like to walk through it. Scoutr exists to close that
              gap: we digitize a property once and turn it into a 360°
              tour, a dollhouse model, a measured floor plan, and
              photography and video that all come from the same visit.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <Container className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
                Our mission
              </span>
              <h2 className="font-display text-2xl leading-snug text-paper md:text-3xl">
                Give every property the digital presence its price deserves.
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                Whether it&rsquo;s a single rental unit or a twelve-room
                hotel, the property is competing for attention on a screen
                before anyone ever sees it in person. We build the
                experience that wins that first impression.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
                Why it matters
              </span>
              <h2 className="font-display text-2xl leading-snug text-paper md:text-3xl">
                Fewer wasted viewings, faster decisions.
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                A buyer or guest who&rsquo;s already walked a property
                virtually shows up more informed and more committed. That
                means less time spent on viewings that were never going to
                convert.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="How we work"
            title="Equipment, process, and standards we hold ourselves to."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {standards.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 bg-ink p-7">
                  <s.icon className="text-accent" size={22} strokeWidth={1.5} />
                  <h3 className="font-display text-lg text-paper">{s.title}</h3>
                  <p className="text-[14px] leading-relaxed text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-center gap-8 text-center">
          <Reveal>
            <h2 className="max-w-xl text-balance font-display text-3xl text-paper md:text-4xl">
              Want to see what we&rsquo;d build for your property?
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <Button href="/contact" size="lg">
              Get a Quote
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
