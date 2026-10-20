"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { propertyTypes, servicesRequired } from "@/lib/data/site";

// 16px on phones: iOS Safari zooms the page when focusing inputs under 16px.
const inputClasses =
  "w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-base text-paper placeholder:text-muted-2 outline-none focus:border-accent sm:px-4 sm:py-3 sm:text-[14px]";
const labelClasses = "text-[13px] font-medium text-muted";

type Status = "idle" | "submitting" | "submitted";

/** `wide` lays the fields out four across on large screens, for full-width placements. */
export function QuoteForm({ wide = false }: { wide?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [services, setServices] = useState<string[]>([]);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  // Phase 1: no backend yet. Phase 4 (build spec §16/§17) replaces this
  // with a POST to /api/leads, which writes to the Supabase `leads` table
  // and triggers a Resend email notification.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("submitted"), 500);
  }

  if (status === "submitted") {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-accent/40 bg-surface p-8">
        <h3 className="font-display text-xl text-paper">Thanks — that&rsquo;s in.</h3>
        <p className="text-[14px] leading-relaxed text-muted">
          This is a Phase 1 preview, so nothing was actually sent yet — form
          submissions start reaching us once lead capture ships in Phase 4.
          In the meantime, reach us directly using the details alongside
          this form.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      {/* Two columns even on phones, with Email and Location spanning both,
          so the form is 5 rows tall there instead of 8. */}
      <div className={cn("grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-6", wide && "lg:grid-cols-4")}>
        <Field label="Name" htmlFor="name">
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Wanjiru" />
        </Field>
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" className={inputClasses} placeholder="Optional" />
        </Field>
        <Field label="Email" htmlFor="email" className="col-span-2 sm:col-span-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="jane@example.com"
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="07XX XXX XXX" />
        </Field>
        <Field label="Property type" htmlFor="propertyType">
          <select id="propertyType" name="propertyType" required className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property location" htmlFor="propertyLocation" className="col-span-2 sm:col-span-1">
          <input
            id="propertyLocation"
            name="propertyLocation"
            className={inputClasses}
            placeholder="e.g. Karen, Nairobi"
          />
        </Field>
        <Field label="Number of properties" htmlFor="propertyCount">
          <input
            id="propertyCount"
            name="propertyCount"
            type="number"
            min={1}
            defaultValue={1}
            className={inputClasses}
          />
        </Field>
        <Field label="Preferred date" htmlFor="preferredDate">
          <DatePicker id="preferredDate" name="preferredDate" className={inputClasses} />
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <span className={labelClasses}>Services required</span>
        <div className="flex flex-wrap gap-2">
          {servicesRequired.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={cn(
                "rounded-full border border-line-strong px-3 py-1.5 text-[12px] font-medium text-muted transition-colors hover:text-paper sm:px-4 sm:py-2 sm:text-[13px]",
                services.includes(s) && "border-accent bg-accent/10 text-accent"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={3}
          className={inputClasses}
          placeholder="Tell us a bit about the property and your timeline."
        />
      </Field>

      {/* Full-width default size on phones, lg-sized from sm up. */}
      <Button
        type="submit"
        caps
        disabled={status === "submitting"}
        className={cn(
          "w-full sm:h-14 sm:w-fit sm:px-8 sm:text-base",
          wide && "sm:self-center"
        )}
      >
        {status === "submitting" ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5 sm:gap-2", className)}>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
      </label>
      {children}
    </div>
  );
}
