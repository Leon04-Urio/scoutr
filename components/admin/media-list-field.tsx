"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "project-media";

/**
 * A "one per line" textarea that also accepts uploads. Uploaded files go to
 * the `project-media` Storage bucket and their public URL is appended as a
 * new line via `toLine`, so pasting links and uploading can be mixed freely.
 */
export function MediaListField({
  id,
  name,
  label,
  rows,
  defaultValue,
  placeholder,
  folder,
  toLine,
  className,
}: {
  id: string;
  name: string;
  label: string;
  rows: number;
  defaultValue: string;
  placeholder: string;
  folder: string;
  /** Builds the line for an uploaded file; `index` is its 0-based position in the list. */
  toLine: (url: string, index: number) => string;
  className: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const supabase = createClient();
    const lines = value.split(/\r?\n/).filter((l) => l.trim());
    const list = Array.from(files);

    for (const [i, file] of list.entries()) {
      setUploading(`Uploading ${i + 1} of ${list.length}…`);
      const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
      if (uploadError) {
        setError(`${file.name}: ${uploadError.message}`);
        break;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      lines.push(toLine(data.publicUrl, lines.length));
      setValue(lines.join("\n"));
    }

    setUploading(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-muted">
          {label}
        </label>
        <button
          type="button"
          disabled={uploading !== null}
          onClick={() => fileRef.current?.click()}
          className="flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] text-paper transition-colors hover:border-accent disabled:opacity-50"
        >
          <Upload size={14} />
          {uploading ?? "Upload images"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      {error ? <p className="text-[13px] text-red-400">{error}</p> : null}
    </div>
  );
}
