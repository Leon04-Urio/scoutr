"use client";

import { useState } from "react";
import type { ProjectImage } from "@/types/project";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/portfolio/lightbox";

export function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const withAlt = images.map((img, i) => ({
    url: img.url,
    alt: img.alt ?? `${title} — photo ${i + 1}`,
  }));

  return (
    <>
      {/* Compact thumbnail grid — full-size viewing happens in the lightbox. */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {withAlt.map((img, i) => (
          <button
            key={`${img.url}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View ${img.alt}`}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface",
              // Lead photo gets a 2×2 cell so the set has a focal point.
              i === 0 && "col-span-2 row-span-2"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- see project-card.tsx */}
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
      <Lightbox images={withAlt} index={open} onChange={setOpen} />
    </>
  );
}
