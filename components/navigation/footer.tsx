import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { footerNav, site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

// Phones get a compact footer (logo + socials on one row, links in a single
// wrapped row, no description/service-area copy); md+ keeps the 3 columns.
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="grid gap-7 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:py-16">
        {/* Phones: logo and socials share a row; md+: stacked with the description. */}
        <div className="flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-start">
          <Link href="/" className="font-display text-xl text-paper">
            Scoutr<span className="text-accent">.</span>
          </Link>
          <p className="hidden max-w-sm text-[14px] leading-relaxed text-muted md:block">
            {site.description}
          </p>
          <SocialLinks className="md:mt-2" />
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h4 className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2 md:block">
            Navigate
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-3">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-paper/85 hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-2.5 md:gap-3">
          <h4 className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2 md:block">
            Get in touch
          </h4>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 text-[14px] text-paper/85 hover:text-paper"
          >
            <Mail size={15} /> {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-[14px] text-paper/85 hover:text-paper"
          >
            <Phone size={15} /> {site.phone}
          </a>
          <p className="hidden text-[13px] text-muted-2 md:block">{site.serviceArea}</p>
        </div>
      </Container>

      <div className="border-t border-line py-4 md:py-6">
        <Container className="flex items-center justify-between gap-4 text-[12px] text-muted-2">
          <span>&copy; {new Date().getFullYear()} Scoutr. All rights reserved.</span>
          <span>Nairobi, Kenya</span>
        </Container>
      </div>
    </footer>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4 text-muted", className)}>
      <a href={site.social.instagram} aria-label="Instagram" className="hover:text-paper">
        <InstagramIcon />
      </a>
      <a href={site.social.linkedin} aria-label="LinkedIn" className="hover:text-paper">
        <LinkedinIcon />
      </a>
      <a href={site.social.youtube} aria-label="YouTube" className="hover:text-paper">
        <YoutubeIcon />
      </a>
    </div>
  );
}
