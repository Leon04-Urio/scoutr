import { Container } from "@/components/ui/container";

/**
 * Bottom-of-section hairline inset to the same width as the content
 * (Container's max-width + side padding) instead of spanning the full
 * browser width edge-to-edge.
 */
export function SectionDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      <Container>
        <div className={tone === "dark" ? "h-px w-full bg-ink/10" : "h-px w-full bg-line"} />
      </Container>
    </div>
  );
}
