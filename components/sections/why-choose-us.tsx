import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { Reveal } from "@/components/motion/reveal";

const reasons = [
  {
    title: "One team, every deliverable",
    description:
      "Tour, dollhouse, floor plan, photography, and video come from a single shoot and a single point of contact — not four different vendors.",
  },
  {
    title: "Built for how you sell",
    description:
      "Everything is made to embed directly into your listing, MLS entry, or booking page — not locked inside a viewer only we control.",
  },
  {
    title: "Measured, not estimated",
    description:
      "Floor plan dimensions come from the scan itself, so what a buyer sees matches the actual property.",
  },
  {
    title: "Fast turnaround",
    description:
      "Most properties go from shoot to published tour in days, not weeks — because listings lose momentum while they wait.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="Why Scoutr"
          title="The digital experience does the selling for you."
          description="A listing photo asks a buyer to imagine the space. A Scoutr tour lets them walk it."
        />

        <div className="flex flex-col divide-y divide-line">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.05}>
              <div className="flex flex-col gap-2 py-6 first:pt-0">
                <h3 className="font-display text-lg text-paper">{reason.title}</h3>
                <p className="max-w-lg text-[14px] leading-relaxed text-muted">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <SectionDivider />
    </section>
  );
}
