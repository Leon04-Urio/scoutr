import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { NotFound } from "@/components/ui/ghost-404-page";

export const metadata: Metadata = {
  title: "Page not found",
};

// Root not-found: handles unmatched URLs and every notFound() call (e.g. an
// unknown or unpublished /portfolio/[slug]). It renders inside the root
// layout only, so the site chrome is added here explicitly.
export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
