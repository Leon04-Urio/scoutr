"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { propertyTypes, servicesRequired } from "@/lib/data/site";

const inputClasses =
  "w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-[14px] text-paper placeholder:text-muted-2 outline-none focus:border-bronze";
const labelClasses = "text-[13px] font-medium text-muted";

type Status = "idle" | "submitting" | "submitted";

export function QuoteForm() {
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
      <div className="flex flex-col gap-3 rounded-2xl border border-bronze/40 bg-surface p-8">
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Wanjiru" />
        </Field>
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" className={inputClasses} placeholder="Optional" />
        </Field>
        <Field label="Email" htmlFor="email">
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
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="+254 7XX XXX XXX" />
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
        <Field label="Property location" htmlFor="propertyLocation">
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
          <input id="preferredDate" name="preferredDate" type="date" className={inputClasses} />
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
                "rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-paper",
                services.includes(s) && "border-bronze bg-bronze/10 text-bronze"
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
          rows={4}
          className={inputClasses}
          placeholder="Tell us a bit about the property and your timeline."
        />
      </Field>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? "Sending…" : "Send Request"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
      </label>
      {children}
    </div>
  );
}
