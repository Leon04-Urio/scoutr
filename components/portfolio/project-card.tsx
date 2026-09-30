"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/types/project";
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
      className="group relative aspect-[3/4] w-full overflow-hidden"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link href={`/portfolio/${project.slug}`} className="absolute inset-0 block">
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
              "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
              project.coverImage.gradient,
              playing ? "opacity-0" : "opacity-100"
            )}
          />
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <h3 className="absolute bottom-6 left-6 max-w-[80%] font-geo text-lg font-semibold uppercase leading-tight tracking-tight text-paper">
          {project.title}
        </h3>
      </Link>
    </article>
  );
}
