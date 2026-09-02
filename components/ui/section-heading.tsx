import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.1] text-balance text-paper md:text-[2.75rem]",
          align === "center" && "max-w-2xl"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-[15px] leading-relaxed text-muted",
            align === "center" && "max-w-lg"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
