import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/lib/data/services";

export function WhatWeDo() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="What we do"
          title="Every deliverable a property needs to sell itself."
          description="Book one shoot. Walk away with the full set — tour, model, plan, photography, and video."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.04}>
              <div className="flex h-full flex-col gap-4 bg-ink p-7">
                <service.icon className="text-bronze" size={22} strokeWidth={1.5} />
                <h3 className="font-display text-lg text-paper">{service.title}</h3>
                <p className="text-[14px] leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
