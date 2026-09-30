import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.05] text-balance md:text-5xl",
          tone === "dark" ? "text-ink" : "text-paper",
          align === "center" && "max-w-2xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-xl font-display text-xl italic leading-snug",
            tone === "dark" ? "text-muted-2" : "text-muted",
            align === "center" && "max-w-lg"
          )}
        >
          {description}
        </p>
      ) : null}
      <div
        className={cn(
          "mt-2 h-px w-10",
          tone === "dark" ? "bg-ink/15" : "bg-line-strong",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
