import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { Reveal } from "@/components/motion/reveal";

const reasons = [
  "One shoot, every deliverable",
  "Embeds anywhere you sell",
  "Measured, not estimated",
  "Days, not weeks",
];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28 lg:pb-28 lg:pt-36">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Why Scoutr"
            title="The tour does the selling for you."
          />

          <div className="flex flex-col divide-y divide-line">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.05}>
                <div className="py-6 first:pt-0">
                  <h3 className="font-display text-lg text-paper">{reason}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-md">
          <div className="absolute right-0 top-0 aspect-[4/5] w-3/4 overflow-hidden lg:-top-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop"
              alt="Scoutr scan — property exterior"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-[4/5] w-3/4 overflow-hidden border-4 border-ink shadow-xl lg:bottom-auto lg:-left-14 lg:top-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop"
              alt="Scoutr scan — property interior"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
      <SectionDivider />
    </section>
  );
}
