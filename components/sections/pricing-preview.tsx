import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { pricingPackages } from "@/lib/data/pricing";

export function PricingPreview() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Packages that scale with the property."
            description="Every package is built around what you need published, not around us."
          />
          <Button href="/pricing" variant="outline">
            See full pricing
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPackages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.06}>
              <div
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl border p-8",
                  pkg.featured
                    ? "border-bronze/50 bg-surface"
                    : "border-line bg-surface/40"
                )}
              >
                <div className="flex flex-col gap-2">
                  {pkg.featured ? (
                    <span className="w-fit rounded-full bg-bronze px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink">
                      Most booked
                    </span>
                  ) : null}
                  <h3 className="font-display text-2xl text-paper">{pkg.name}</h3>
                  <p className="text-[13.5px] text-muted">{pkg.tagline}</p>
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px] text-paper/85">
                      <Check size={16} className="mt-0.5 shrink-0 text-bronze" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-2">
                  Best for — {pkg.bestFor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
