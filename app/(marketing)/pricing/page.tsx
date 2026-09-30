import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pricingPackages } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Scoutr packages for 360° tours, photography, floor plans, and dollhouse views — or request a custom quote for larger properties.",
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-line py-16 md:py-24">
        <Container className="flex flex-col gap-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            Pricing
          </span>
          <h1 className="max-w-2xl text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
            Packages that scale with the property.
          </h1>
          <p className="max-w-xl font-display text-xl italic leading-snug text-muted">
            Get an exact number with a quote.
          </p>
          <div className="mt-2 h-px w-10 bg-line-strong" />
          <p className="max-w-xl text-[15px] leading-relaxed text-muted">
            Prices depend on property size and location — the packages below
            show what&rsquo;s included at each tier.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-16 md:py-24">
        <Container className="grid gap-6 lg:grid-cols-3">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={cn(
                "flex h-full flex-col gap-6 rounded-2xl border p-8",
                pkg.featured ? "border-accent/50 bg-surface" : "border-line bg-surface/40"
              )}
            >
              <div className="flex flex-col gap-2">
                {pkg.featured ? (
                  <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink">
                    Most booked
                  </span>
                ) : null}
                <h2 className="font-display text-2xl text-paper">{pkg.name}</h2>
                <p className="text-[13.5px] text-muted">{pkg.tagline}</p>
              </div>

              <ul className="flex flex-1 flex-col gap-3">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[14px] text-paper/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 border-t border-line pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-2">
                  Best for — {pkg.bestFor}
                </p>
                <Button href="/contact" variant={pkg.featured ? "primary" : "outline"}>
                  Get a Quote
                </Button>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-surface px-8 py-14 text-center">
          <h2 className="max-w-xl text-balance font-display text-2xl text-paper md:text-3xl">
            Large property, portfolio, or a hotel with many rooms?
          </h2>
          <p className="max-w-lg text-[14.5px] leading-relaxed text-muted">
            Pricing for multi-unit and large-scale projects depends on scope.
            Tell us what you&rsquo;re working with and we&rsquo;ll put
            together a custom quote.
          </p>
          <Button href="/contact" size="lg">
            Request a Custom Quote
          </Button>
        </Container>
      </section>
    </>
  );
}
