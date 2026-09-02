import { Building2, Hotel, Home, KeyRound, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const audiences = [
  { icon: Home, label: "Real estate agents & agencies" },
  { icon: Building2, label: "Property developers" },
  { icon: Hotel, label: "Hotels & resorts" },
  { icon: KeyRound, label: "Airbnb & short-term rentals" },
  { icon: Users, label: "Property managers" },
];

export function WhoWeWorkWith() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Who we work with" title="Built for anyone selling a space." />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.05}>
              <div className="flex h-full flex-col items-start gap-4 bg-ink p-6">
                <a.icon className="text-bronze" size={20} strokeWidth={1.5} />
                <span className="text-[14px] leading-snug font-medium text-paper/90">
                  {a.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
