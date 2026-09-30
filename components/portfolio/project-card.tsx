"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const HOVER_PLAY_DELAY = 2700;

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnter = () => {
    if (!project.walkthroughVideoUrl) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      setPlaying(true);
      videoRef.current?.play().catch(() => {});
    }, HOVER_PLAY_DELAY);
  };

  const handleLeave = () => {
    clearTimer();
    setPlaying(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-none border border-line bg-surface transition-colors hover:border-line-strong"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link href={`/portfolio/${project.slug}`} className="flex flex-col">
        <div className="relative aspect-[9/16] max-h-[450px] w-full overflow-hidden">
          {/* next/image needs a known set of remote hosts configured in
              next.config.ts; arbitrary pasted admin URLs are out of scope
              until real photography/Cloudinary lands. */}
          {project.coverImage.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage.url}
              alt={project.coverImage.label ?? project.title}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                playing ? "opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 flex items-end bg-gradient-to-br p-6 transition-opacity duration-500",
                project.coverImage.gradient,
                playing ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                {project.coverImage.label}
              </span>
            </div>
          )}

          {/* Frameless — no controls, no border, just the loop. Only
              starts after a sustained hover (HOVER_PLAY_DELAY) so it
              doesn't fire on a passing cursor. */}
          {project.walkthroughVideoUrl ? (
            <video
              ref={videoRef}
              src={project.walkthroughVideoUrl}
              muted
              loop
              playsInline
              preload="none"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                playing ? "opacity-100" : "opacity-0"
              )}
            />
          ) : null}

          {/* Text overlaid on the media itself, not a separate block below. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg text-paper">{project.title}</h3>
              <Badge>{project.propertyType}</Badge>
            </div>
            <p className="flex items-center gap-1.5 text-[13px] text-paper/75">
              <MapPin size={13} /> {project.location}
            </p>
            <div className="flex gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60">
              {project.has360 ? <span>360°</span> : null}
              {project.hasDollhouse ? <span>· Dollhouse</span> : null}
              {project.hasFloorPlan ? <span>· Floor Plan</span> : null}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
