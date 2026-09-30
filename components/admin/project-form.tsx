"use client";

import { useActionState, useState } from "react";
import { saveProject, type ProjectFormState } from "@/app/admin/(protected)/projects/actions";
import type { Project, PropertyType } from "@/types/project";
import type { Testimonial } from "@/types/testimonial";

const propertyTypes: PropertyType[] = ["Residential", "Commercial", "Hospitality", "Development"];

const inputClasses =
  "w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-[14px] text-paper placeholder:text-muted-2 outline-none focus:border-accent";
const labelClasses = "text-[13px] font-medium text-muted";
const checkboxRowClasses = "flex items-center gap-2 text-[13px] text-muted";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectForm({
  project,
  testimonial,
}: {
  project?: Project;
  testimonial?: Testimonial | null;
}) {
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(
    saveProject,
    undefined
  );
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            className={inputClasses}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={inputClasses}
          />
        </Field>
        <Field label="Location" htmlFor="location">
          <input
            id="location"
            name="location"
            required
            defaultValue={project?.location}
            placeholder="e.g. Karen, Nairobi"
            className={inputClasses}
          />
        </Field>
        <Field label="Property type" htmlFor="propertyType">
          <select
            id="propertyType"
            name="propertyType"
            defaultValue={project?.propertyType ?? "Residential"}
            className={inputClasses}
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Summary (shown on cards)" htmlFor="summary">
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          defaultValue={project?.summary}
          className={inputClasses}
        />
      </Field>

      <Field label="Description (shown on the project page)" htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={project?.description}
          className={inputClasses}
        />
      </Field>

      <Field label="Cover image URL (optional — leave blank to use a placeholder)" htmlFor="coverImageUrl">
        <input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          defaultValue={project?.coverImage.url}
          placeholder="https://…"
          className={inputClasses}
        />
      </Field>

      <Field
        label="Walkthrough video URL (optional — plays on card hover instead of the cover image)"
        htmlFor="walkthroughVideoUrl"
      >
        <input
          id="walkthroughVideoUrl"
          name="walkthroughVideoUrl"
          type="url"
          defaultValue={project?.walkthroughVideoUrl}
          placeholder="https://…mp4"
          className={inputClasses}
        />
      </Field>

      <div className="flex flex-wrap gap-5">
        <label className={checkboxRowClasses}>
          <input type="checkbox" name="published" defaultChecked={project?.published} /> Published
        </label>
        <label className={checkboxRowClasses}>
          <input type="checkbox" name="featured" defaultChecked={project?.featured} /> Featured on homepage
        </label>
        <label className={checkboxRowClasses}>
          <input type="checkbox" name="has360" defaultChecked={project?.has360} /> Has 360° tour
        </label>
        <label className={checkboxRowClasses}>
          <input type="checkbox" name="hasDollhouse" defaultChecked={project?.hasDollhouse} /> Has dollhouse
        </label>
        <label className={checkboxRowClasses}>
          <input type="checkbox" name="hasFloorPlan" defaultChecked={project?.hasFloorPlan} /> Has floor plan
        </label>
      </div>

      <fieldset className="flex flex-col gap-4 rounded-xl border border-line p-5">
        <legend className="px-1 text-[13px] font-medium text-muted">
          Client testimonial (optional)
        </legend>
        <Field label="Quote" htmlFor="testimonialQuote">
          <textarea
            id="testimonialQuote"
            name="testimonialQuote"
            rows={2}
            defaultValue={testimonial?.quote}
            className={inputClasses}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" htmlFor="testimonialName">
            <input
              id="testimonialName"
              name="testimonialName"
              defaultValue={testimonial?.name}
              className={inputClasses}
            />
          </Field>
          <Field label="Role" htmlFor="testimonialRole">
            <input
              id="testimonialRole"
              name="testimonialRole"
              defaultValue={testimonial?.role}
              className={inputClasses}
            />
          </Field>
        </div>
      </fieldset>

      {state?.error ? <p className="text-[13px] text-red-400">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-fit rounded-full bg-accent px-6 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong disabled:opacity-50"
      >
        {pending ? "Saving…" : project ? "Save changes" : "Create project"}
      </button>
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
