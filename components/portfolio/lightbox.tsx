"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  url: string;
  alt: string;
}

/**
 * Full-screen image viewer. Controlled: the parent owns which index is open
 * (null = closed). Esc closes, arrow keys step through the set.
 */
export function Lightbox({
  images,
  index,
  onChange,
}: {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") onChange((index + 1) % count);
      else if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onChange]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (index === null) return null;
  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={() => onChange(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- see project-card.tsx */}
      <img
        src={image.url}
        alt={image.alt}
        className="max-h-[88vh] max-w-[92vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        aria-label="Close"
        onClick={() => onChange(null)}
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-surface/80 text-paper transition-colors hover:bg-surface"
      >
        <X size={20} />
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + count) % count);
            }}
            className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-paper transition-colors hover:bg-surface md:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % count);
            }}
            className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-paper transition-colors hover:bg-surface md:right-6"
          >
            <ChevronRight size={22} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[12px] tracking-[0.15em] text-muted">
            {index + 1} / {count}
          </p>
        </>
      ) : null}
    </div>
  );
}
