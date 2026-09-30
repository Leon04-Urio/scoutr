import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { services } from "@/lib/data/services";

export function WhatWeDo() {
  const track = [...services, ...services];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="w-full shrink-0 lg:w-[320px]">
          <SectionHeading
            eyebrow="What we do"
            title="The 360° tour is the centerpiece."
            description="Everything else — dollhouse, floor plan, photography, video — supports it."
          />
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-5">
            {track.map((service, i) => (
              <div
                key={service.title + i}
                className="flex h-40 w-56 shrink-0 flex-col justify-between border border-line bg-surface p-7 md:h-44 md:w-64"
              >
                <service.icon className="text-accent" size={22} strokeWidth={1.5} />
                <h3 className="font-display text-lg text-paper">{service.title}</h3>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-24" />
        </div>
      </Container>
      <SectionDivider />
    </section>
  );
}
