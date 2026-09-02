import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    num: "01",
    title: "Book a shoot",
    description:
      "Tell us about the property and what you need. We schedule a visit that fits your timeline.",
  },
  {
    num: "02",
    title: "We capture on site",
    description:
      "Our team scans and photographs the property — usually inside a single visit, occupied or vacant.",
  },
  {
    num: "03",
    title: "We build the experience",
    description:
      "The 360° tour, dollhouse model, measured floor plan, and photography come together as one package.",
  },
  {
    num: "04",
    title: "You publish & share",
    description:
      "Embed it on your listing, send the link directly to a client, or hand it to your marketing team.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="How it works"
          title="From booking to published tour, in days."
          align="center"
          className="mx-auto"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="flex flex-col gap-3 border-t border-line-strong pt-5">
                <span className="font-mono text-[12px] text-bronze">{step.num}</span>
                <h3 className="font-display text-lg text-paper">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
