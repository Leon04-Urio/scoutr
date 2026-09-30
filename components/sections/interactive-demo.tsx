"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCw, Box, Ruler, GalleryHorizontal, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionDivider } from "@/components/ui/section-divider";
import { cn } from "@/lib/utils";

/**
 * The homepage's most important section (build spec §3/§4): a preview of
 * the actual product experience, not a screenshot of it.
 *
 * The 360° tour is the one thing that actually renders and responds to
 * drag — it's the persistent canvas. Dollhouse, Floor Plan, and Gallery
 * float on top of it as small glass panels, the way a real virtual-tour
 * viewer overlays a mini floor plan / thumbnail strip over the main view.
 * Clicking a panel expands it to the center, on top of the 360°; a cancel
 * button sends it back to its corner.
 *
 * Phase 1 note: the Dollhouse panel auto-rotates (CSS) instead of taking
 * drag input, so it doesn't fight the 360° drag underneath it. Floor Plan
 * and Gallery are static previews. All three get swapped for real
 * Three.js / React Three Fiber / Drei viewers bound to actual scan data
 * in Phase 3 — nothing here is scanned from a real property.
 */

type PanelId = "dollhouse" | "floorplan" | "gallery";

const panels: {
  id: PanelId;
  label: string;
  icon: typeof RotateCw;
  corner: string;
}[] = [
  { id: "dollhouse", label: "Dollhouse", icon: Box, corner: "right-4 top-4" },
  { id: "floorplan", label: "Floor Plan", icon: Ruler, corner: "left-4 bottom-4" },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontal, corner: "right-4 bottom-4" },
];

export function InteractiveDemo() {
  const [expanded, setExpanded] = useState<PanelId | null>(null);

  return (
    <section id="demo" className="relative py-20 md:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            The property experience
          </span>
          <h2 className="max-w-2xl text-balance font-display text-3xl leading-[1.1] text-paper md:text-[2.75rem]">
            See exactly what your buyers and guests will see.
          </h2>
        </div>

        <div className="relative h-[380px] overflow-hidden border border-line bg-surface md:h-[440px]">
          <div className="pointer-events-none absolute left-4 top-4 z-40 flex items-center gap-2 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted backdrop-blur">
            <RotateCw size={12} />
            360° View
          </div>

          <PanoramaPreview />

          <AnimatePresence>
            {expanded ? (
              <motion.div
                key="scrim"
                className="absolute inset-0 z-20 bg-ink/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpanded(null)}
              />
            ) : null}
          </AnimatePresence>

          {panels.map(({ id, label, icon, corner }) => (
            <FloatingPanel
              key={id}
              label={label}
              icon={icon}
              cornerClassName={corner}
              isExpanded={expanded === id}
              onExpand={() => setExpanded(id)}
              onCollapse={() => setExpanded(null)}
            >
              {id === "dollhouse" ? <MiniDollhouse expanded={expanded === id} /> : null}
              {id === "floorplan" ? <MiniFloorPlan /> : null}
              {id === "gallery" ? <MiniGallery expanded={expanded === id} /> : null}
            </FloatingPanel>
          ))}
        </div>
      </Container>
      <SectionDivider />
    </section>
  );
}

/* ── Floating glass panel — sits on top of the live 360° canvas, and can
   expand to the center on click ─────────────────────────────────────── */
function FloatingPanel({
  label,
  icon: Icon,
  cornerClassName,
  isExpanded,
  onExpand,
  onCollapse,
  children,
}: {
  label: string;
  icon: typeof RotateCw;
  cornerClassName: string;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  children: ReactNode;
}) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onClick={() => {
        if (!isExpanded) onExpand();
      }}
      className={cn(
        "absolute flex flex-col border border-line-strong bg-ink/75 shadow-xl backdrop-blur-md",
        isExpanded
          ? "left-1/2 top-1/2 z-30 h-[75%] w-[90%] -translate-x-1/2 -translate-y-1/2 cursor-default sm:w-[70%]"
          : cn("z-10 h-20 w-28 cursor-pointer sm:h-28 sm:w-40", cornerClassName)
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-1.5 border-b border-line-strong/60 px-2.5 py-1.5">
        <span className="flex items-center gap-1.5">
          <Icon size={11} className="text-muted-2" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted sm:text-[10px]">
            {label}
          </span>
        </span>
        {isExpanded ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
            className="flex items-center text-muted transition-colors hover:text-paper"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </motion.div>
  );
}

/* ── 360° panorama — draggable pan across a wide tiling gradient ────── */
function PanoramaPreview() {
  const [offset, setOffset] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  return (
    <div
      className="relative h-full w-full cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastX.current;
        lastX.current = e.clientX;
        setOffset((o) => o + dx * 1.4);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div
        className="absolute inset-y-0 flex h-full items-stretch"
        style={{
          width: "300%",
          left: `${((offset % 1600) - 1600) % 1600}px`,
          backgroundImage:
            "repeating-linear-gradient(90deg, #23282f 0px, #171a1f 240px, #23282f 480px)",
        }}
      >
        {["Exterior", "Living Room", "Kitchen", "Bedroom", "Garden"].map((room, i) => (
          <div
            key={room}
            className="flex h-full w-[320px] flex-none flex-col items-center justify-center gap-3 border-r border-white/5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-2">
              Scene {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl text-paper/70">{room}</span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        <span className="rounded-full bg-ink/70 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted backdrop-blur">
          Drag to look around
        </span>
      </div>
    </div>
  );
}

/* ── Dollhouse — auto-rotating CSS 3D model, floats over the pano ────── */
function MiniDollhouse({ expanded }: { expanded?: boolean }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#1c1e23_0%,#0b0c0e_75%)]"
      style={{ perspective: expanded ? 1600 : 700 }}
    >
      <div style={{ transform: `scale(${expanded ? 2.6 : 1})`, transformStyle: "preserve-3d" }}>
        <div
          className="animate-dollhouse-spin"
          style={{ transformStyle: "preserve-3d", width: 1, height: 1 }}
        >
          <Room x={-40} z={-28} w={78} d={62} h={38} />
          <Room x={30} z={-22} w={56} d={48} h={38} />
        </div>
      </div>
    </div>
  );
}

function Room({ x, z, w, d, h }: { x: number; z: number; w: number; d: number; h: number }) {
  const face = "absolute top-0 left-0 border border-white/10";
  return (
    <div
      className="absolute top-0 left-0"
      style={{ transformStyle: "preserve-3d", transform: `translate3d(${x}px,0,${z}px)` }}
    >
      <div
        className={cn(face, "bg-[#2c2f36]")}
        style={{
          width: w,
          height: d,
          transform: `translate3d(0,${-d / 2}px,${d / 2}px) rotateX(90deg)`,
        }}
      />
      <div
        className={cn(face, "bg-[#20232a]")}
        style={{ width: w, height: h, transform: `translate3d(0,${-h}px,${d}px)` }}
      />
      <div
        className={cn(face, "bg-[#181a1f]")}
        style={{
          width: d,
          height: h,
          transform: `translate3d(${-d / 2}px,${-h}px,${d / 2}px) rotateY(90deg)`,
        }}
      />
      <div
        className={cn(face, "bg-[#181a1f]")}
        style={{
          width: d,
          height: h,
          transform: `translate3d(${w - d / 2}px,${-h}px,${d / 2}px) rotateY(90deg)`,
        }}
      />
    </div>
  );
}

/* ── Floor plan — static top-down SVG with a camera-position dot ─────── */
function MiniFloorPlan() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface p-2.5">
      <svg viewBox="0 0 400 260" className="h-full w-full">
        <rect x="20" y="20" width="360" height="220" fill="none" stroke="#3a3d44" strokeWidth="5" />
        <line x1="220" y1="20" x2="220" y2="140" stroke="#3a3d44" strokeWidth="5" />
        <line x1="20" y1="140" x2="380" y2="140" stroke="#3a3d44" strokeWidth="5" />
        <line x1="220" y1="140" x2="220" y2="240" stroke="#3a3d44" strokeWidth="5" />
        <circle cx="115" cy="80" r="9" fill="#b9b4a8" />
      </svg>
    </div>
  );
}

/* ── Gallery — placeholder photography thumbnails ────────────────────── */
function MiniGallery({ expanded }: { expanded?: boolean }) {
  const tiles = expanded
    ? ["Exterior", "Living Room", "Kitchen", "Primary Suite", "Bathroom", "Garden"]
    : ["Exterior", "Living", "Kitchen", "Bath"];
  return (
    <div className={cn("grid h-full gap-px bg-line", expanded ? "grid-cols-3" : "grid-cols-2")}>
      {tiles.map((t) => (
        <div
          key={t}
          className={cn(
            "flex items-center justify-center bg-surface-2 text-center font-medium leading-tight text-muted",
            expanded ? "text-[13px]" : "text-[9px]"
          )}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
