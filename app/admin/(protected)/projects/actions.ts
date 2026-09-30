"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/dal";
import { createClient } from "@/lib/supabase/server";
import type { PropertyTypeRow } from "@/types/database";

export type ProjectFormState = { error?: string } | undefined;

function readProjectFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    property_type: String(formData.get("propertyType") ?? "Residential") as PropertyTypeRow,
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    cover_image_url: String(formData.get("coverImageUrl") ?? "").trim() || null,
    walkthrough_video_url: String(formData.get("walkthroughVideoUrl") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    has_360: formData.get("has360") === "on",
    has_dollhouse: formData.get("hasDollhouse") === "on",
    has_floor_plan: formData.get("hasFloorPlan") === "on",
  };
}

export async function saveProject(
  _state: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const fields = readProjectFields(formData);

  if (!fields.slug || !fields.title || !fields.location || !fields.summary) {
    return { error: "Title, slug, location, and summary are required." };
  }

  const supabase = await createClient();
  let projectId = id;

  if (id) {
    const { error } = await supabase.from("projects").update(fields).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data, error } = await supabase.from("projects").insert(fields).select("id").single();
    if (error) return { error: error.message };
    projectId = data.id;
  }

  const testimonialQuote = String(formData.get("testimonialQuote") ?? "").trim();
  const testimonialName = String(formData.get("testimonialName") ?? "").trim();
  const testimonialRole = String(formData.get("testimonialRole") ?? "").trim();

  // Simplest way to keep at most one project testimonial in sync with the
  // form without tracking a separate testimonial id: replace it wholesale.
  await supabase.from("testimonials").delete().eq("project_id", projectId);
  if (testimonialQuote && testimonialName) {
    await supabase.from("testimonials").insert({
      project_id: projectId,
      quote: testimonialQuote,
      name: testimonialName,
      role: testimonialRole || null,
    });
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${fields.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
}

export async function toggleProjectField(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const field = String(formData.get("field") ?? "");
  const current = formData.get("value") === "true";
  if (!id) return;

  const supabase = await createClient();
  if (field === "published") {
    await supabase.from("projects").update({ published: !current }).eq("id", id);
  } else if (field === "featured") {
    await supabase.from("projects").update({ featured: !current }).eq("id", id);
  } else {
    return;
  }

  revalidatePath("/portfolio");
  revalidatePath("/admin/projects");
}
