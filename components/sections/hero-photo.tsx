import { CloudShader } from "@/components/ui/cloud-shader";

export function HeroPhoto() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden bg-ink">
      {/* Live animated sky, in place of the old static gradient — shows
          through wherever the roof cutout below doesn't cover it. */}
      <CloudShader
        className="absolute inset-0 z-0"
        cloudColor="#f5f3ec"
        skyTopColor="#4c85b3"
        skyBottomColor="#a6d5e5"
      />

      {/* Wordmark sits behind the photo, so the building's own roofline
          (traced via clip-path below) hides parts of the letters. */}
      <div className="pointer-events-none absolute inset-x-0 top-[13%] z-10 flex -translate-x-[18%] -translate-y-1/2 justify-center px-4 lg:top-[32%] lg:-translate-x-[22%]">
        <h1
          className="select-none text-center font-geo font-medium uppercase leading-none tracking-tighter text-zinc-100"
          style={{
            fontSize: "clamp(4rem, 14vw, 9rem)",
            textShadow: "0 6px 30px rgba(5,5,6,0.45), 0 2px 10px rgba(5,5,6,0.35)",
          }}
        >
          Scoutr.
        </h1>
      </div>

      {/* Full-bleed photo — pre-cut to the building's own roofline (real
          alpha transparency above it), so the actual roof hides parts of
          the wordmark behind it instead of a flat rectangle. */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[100vh] translate-y-[6px] lg:h-[88vh]">
        <img
          src="/hero-roof-cutout.png"
          alt="Modern residential property digitized by Scoutr, exterior at dusk"
          className="h-full w-full object-cover object-top drop-shadow-[0_12px_20px_rgba(5,5,6,0.35)]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
    </div>
  );
}
