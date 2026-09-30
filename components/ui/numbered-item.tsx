export function NumberedItem({
  index,
  title,
  description,
  eyebrow,
}: {
  index: number;
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3 border-t border-line-strong pt-4">
        <span className="font-mono text-[12px] text-muted-2">{String(index).padStart(2, "0")}</span>
        <h3 className="font-display text-xl text-paper md:text-2xl">{title}</h3>
      </div>
      {eyebrow ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2">
          {eyebrow}
        </span>
      ) : null}
      <p className="max-w-sm text-[14px] leading-relaxed text-muted">{description}</p>
    </div>
  );
}
