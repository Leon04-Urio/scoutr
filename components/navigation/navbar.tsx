"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  // Close the mobile menu on route change — adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in a useEffect, so it doesn't cause an extra render pass.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // The wordmark only appears once the hero (home page only) is scrolled
  // past. Pages with no #hero (about, portfolio, ...) show it immediately.
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      setShowWordmark(true);
      return;
    }
    setShowWordmark(false);
    const observer = new IntersectionObserver(
      ([entry]) => setShowWordmark(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [pathname]);

  // The bar is solid cream once past the hero, and also whenever the mobile
  // menu is open (so the open menu never sits on a transparent/black bar).
  const solid = showWordmark || open;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        solid ? "bg-paper" : "bg-transparent"
      )}
    >
      <Container className="grid grid-cols-2 items-center py-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className={cn(
            "hidden font-display text-lg transition-[opacity,color] duration-300 md:block",
            showWordmark ? "text-ink opacity-100" : "text-paper opacity-0 pointer-events-none"
          )}
        >
          Scoutr.
        </Link>

        <nav className="hidden items-center justify-self-center gap-6 md:flex">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors",
                  showWordmark
                    ? active
                      ? "text-ink"
                      : "text-ink/70 hover:text-ink"
                    : active
                      ? "text-paper"
                      : "text-paper/70 hover:text-paper"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={cn(
            "hidden items-center justify-self-end rounded-sm px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors md:inline-flex",
            showWordmark
              ? "bg-ink text-paper hover:bg-ink/85"
              : "border border-paper/50 text-paper hover:bg-paper/10"
          )}
        >
          Get a Quote
        </Link>

        <Link
          href="/"
          className={cn(
            "font-display text-lg transition-[opacity,color] duration-300 md:hidden",
            solid ? "text-ink opacity-100" : "text-paper opacity-0 pointer-events-none"
          )}
        >
          Scoutr.
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-10 w-10 items-center justify-center justify-self-end rounded-full transition-colors md:hidden",
            // Over the hero's light sky a bare cream icon disappears, so it
            // gets a dark translucent backing until the bar turns solid.
            solid ? "text-ink" : "bg-ink/35 text-paper backdrop-blur-md"
          )}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open ? (
        // Overlays the page (absolute) rather than pushing it down, in the
        // same cream as the bar.
        <div className="absolute inset-x-0 top-full border-t border-ink/10 bg-paper px-6 pb-6 pt-2 shadow-[0_16px_32px_rgba(5,5,6,0.25)] md:hidden">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2 py-3 text-[15px] font-medium hover:bg-ink/5",
                  isActive(item.href) ? "text-ink" : "text-ink/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" variant="ink" caps className="mt-4 w-full">
            Get a Quote
          </Button>
        </div>
      ) : null}
    </header>
  );
}
