import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { clients, type ClientLogo } from "@/lib/data/clients";
import { cn } from "@/lib/utils";

const fontClass: Record<ClientLogo["font"], string> = {
  display: "font-display text-3xl md:text-4xl",
  "display-italic": "font-display italic text-3xl md:text-4xl",
  geo: "font-geo font-semibold uppercase tracking-wide text-xl md:text-2xl",
  "sans-bold": "font-sans font-bold uppercase tracking-wide text-xl md:text-2xl",
  wordmark: "font-wordmark text-4xl md:text-5xl",
};

export function ClientLogos() {
  const track = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="center"
          eyebrow="Trusted by"
          title="Partnering with the teams building the next chapter of real estate."
          className="mx-auto"
          titleClassName="text-2xl md:text-3xl"
        />
      </Container>

      <div className="relative">
        <div className="flex w-max items-center gap-16 animate-marquee md:gap-24">
          {track.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              className={cn("shrink-0 text-paper/70", fontClass[client.font])}
            >
              {client.name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />
      </div>

      <SectionDivider />
    </section>
  );
}
