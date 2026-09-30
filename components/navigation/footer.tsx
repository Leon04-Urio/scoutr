import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/social";
import { Container } from "@/components/ui/container";
import { footerNav, site } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-display text-xl text-paper">
            Scoutr<span className="text-accent">.</span>
          </Link>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted">
            {site.description}
          </p>
          <div className="mt-2 flex gap-4 text-muted">
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
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
            Navigate
          </h4>
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

        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
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
          <p className="text-[13px] text-muted-2">{site.serviceArea}</p>
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container className="flex flex-col gap-2 text-[12px] text-muted-2 md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} Scoutr. All rights reserved.</span>
          <span>Nairobi, Kenya</span>
        </Container>
      </div>
    </footer>
  );
}
