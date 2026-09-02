"use client";

import { useRef, useState } from "react";
import { RotateCw, Box, Ruler, GalleryHorizontal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * The homepage's most important section (build spec §3/§4): a preview of
 * the actual product experience, not a screenshot of it.
 *
 * Phase 1 note: the Dollhouse tab is a genuinely interactive (drag to
 * rotate) CSS 3D model — a real preview of the interaction model. The
 * 360° tab is a draggable panning strip standing in for a real panorama.
 * Floor Plan and Gallery are static previews. All four get swapped for
 * real Three.js / React Three Fiber / Drei viewers bound to actual scan
 * data in Phase 3 — nothing here is scanned from a real property.
 */

type Tab = "tour" | "dollhouse" | "floorplan" | "gallery";

const tabs: { id: Tab; label: string; icon: typeof RotateCw }[] = [
  { id: "tour", label: "360° View", icon: RotateCw },
  { id: "dollhouse", label: "Dollhouse", icon: Box },
  { id: "floorplan", label: "Floor Plan", icon: Ruler },
  { id: "gallery", label: "Gallery", icon: GalleryHorizontal },
];

export function InteractiveDemo() {
  const [tab, setTab] = useState<Tab>("tour");

  return (
    <section id="demo" className="border-b border-line py-20 md:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            The property experience
          </span>
          <h2 className="max-w-2xl text-balance font-display text-3xl leading-[1.1] text-paper md:text-[2.75rem]">
            See exactly what your buyers and guests will see.
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
            <div className="flex flex-wrap gap-1.5">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-paper",
                    tab === id && "bg-surface-2 text-paper"
                  )}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted-2">
              Sample preview
            </span>
          </div>

          <div className="relative h-[420px] md:h-[520px]">
            {tab === "tour" ? <PanoramaPreview /> : null}
            {tab === "dollhouse" ? <DollhousePreview /> : null}
            {tab === "floorplan" ? <FloorPlanPreview /> : null}
            {tab === "gallery" ? <GalleryPreview /> : null}
          </div>
        </div>
      </Container>
    </section>
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

/* ── Dollhouse — real drag-to-rotate CSS 3D model ────────────────────── */
function DollhousePreview() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(-32);
  const [tilt] = useState(-22);
  const dragging = useRef(false);
  const lastX = useRef(0);

  return (
    <div
      ref={stageRef}
      className="flex h-full w-full cursor-grab touch-none items-center justify-center bg-[radial-gradient(circle_at_center,#1c1e23_0%,#0b0c0e_75%)] active:cursor-grabbing"
      style={{ perspective: "1400px" }}
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastX.current;
        lastX.current = e.clientX;
        setAngle((a) => a + dx * 0.35);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg) rotateY(${angle}deg)`,
          width: 1,
          height: 1,
        }}
      >
        <Room x={-95} z={-70} w={190} d={150} h={90} />
        <Room x={70} z={-55} w={140} d={120} h={90} />
      </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        <span className="rounded-full bg-ink/70 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted backdrop-blur">
          Drag to rotate
        </span>
      </span>
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

/* ── Floor plan — static top-down SVG ────────────────────────────────── */
function FloorPlanPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface p-8">
      <svg viewBox="0 0 400 260" className="h-full max-h-[340px] w-auto">
        <rect x="20" y="20" width="360" height="220" fill="none" stroke="#3a3d44" strokeWidth="2" />
        <line x1="220" y1="20" x2="220" y2="140" stroke="#3a3d44" strokeWidth="2" />
        <line x1="20" y1="140" x2="380" y2="140" stroke="#3a3d44" strokeWidth="2" />
        <line x1="220" y1="140" x2="220" y2="240" stroke="#3a3d44" strokeWidth="2" />

        <text x="115" y="80" textAnchor="middle" fill="#c69a5a" fontSize="12" fontFamily="var(--font-mono)">
          LIVING ROOM
        </text>
        <text x="115" y="96" textAnchor="middle" fill="#6f6c65" fontSize="10" fontFamily="var(--font-mono)">
          18&apos;-0&quot; × 14&apos;-0&quot;
        </text>

        <text x="300" y="80" textAnchor="middle" fill="#c69a5a" fontSize="12" fontFamily="var(--font-mono)">
          KITCHEN
        </text>
        <text x="300" y="96" textAnchor="middle" fill="#6f6c65" fontSize="10" fontFamily="var(--font-mono)">
          12&apos;-0&quot; × 14&apos;-0&quot;
        </text>

        <text x="115" y="192" textAnchor="middle" fill="#c69a5a" fontSize="12" fontFamily="var(--font-mono)">
          BEDROOM
        </text>
        <text x="300" y="192" textAnchor="middle" fill="#c69a5a" fontSize="12" fontFamily="var(--font-mono)">
          BATH
        </text>

        <line x1="20" y1="252" x2="380" y2="252" stroke="#3a3d44" strokeWidth="1" />
        <text x="200" y="248" textAnchor="middle" fill="#6f6c65" fontSize="9" fontFamily="var(--font-mono)">
          36&apos;-0&quot;
        </text>
      </svg>
    </div>
  );
}

/* ── Gallery — placeholder photography grid ──────────────────────────── */
function GalleryPreview() {
  const tiles = ["Exterior", "Living Room", "Kitchen", "Primary Suite", "Bathroom", "Garden"];
  return (
    <div className="grid h-full grid-cols-3 gap-px bg-line">
      {tiles.map((t) => (
        <div
          key={t}
          className="flex items-center justify-center bg-surface-2 text-[12px] font-medium text-muted"
        >
          {t}
        </div>
      ))}
    </div>
  );
}
