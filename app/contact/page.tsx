import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { QuoteForm } from "@/components/forms/quote-form";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a quote for a 360° tour, dollhouse view, floor plan, photography, or video for your property.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              Contact
            </span>
            <h1 className="max-w-md text-balance font-display text-4xl leading-[1.08] text-paper md:text-5xl">
              Let&rsquo;s talk about your property.
            </h1>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Fill out the form, or reach us directly — WhatsApp is usually
              the fastest way to get a reply.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7">
            <ContactRow icon={MessageCircle} label="WhatsApp" value={`+${site.whatsapp}`} href={`https://wa.me/${site.whatsapp}`} />
            <ContactRow icon={Phone} label="Phone" value={site.phone} href={`tel:${site.phone.replace(/\s+/g, "")}`} />
            <ContactRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow icon={MapPin} label="Service area" value={site.serviceArea} />
            <ContactRow icon={Clock} label="Hours" value="Mon–Sat, 8am–6pm EAT" />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface/40 p-6 md:p-10">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <Icon size={17} className="mt-0.5 shrink-0 text-bronze" />
      <div className="flex flex-col">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">
          {label}
        </span>
        <span className="text-[14.5px] text-paper/90">{value}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:opacity-80">
        {content}
      </a>
    );
  }
  return content;
}
