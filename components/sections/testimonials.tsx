import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDivider } from "@/components/ui/section-divider";
import { Reveal } from "@/components/motion/reveal";
import { getProjectTestimonials } from "@/lib/supabase/queries";

export async function Testimonials() {
  const testimonials = await getProjectTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Client feedback" title="What it changes for the people we work with." />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.06}>
              <figure className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface p-7">
                <Quote className="text-accent" size={20} />
                <blockquote className="flex-1 text-[14.5px] leading-relaxed text-paper/85">
                  {t.quote}
                </blockquote>
                <figcaption className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2">
                    {t.name}
                    {t.role ? ` — ${t.role}` : ""}
                  </span>
                  {t.project ? (
                    <Link
                      href={`/portfolio/${t.project.slug}`}
                      className="flex w-fit items-center gap-1 text-[13px] text-paper/90 transition-colors hover:text-accent"
                    >
                      {t.project.title}
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
      <SectionDivider />
    </section>
  );
}
