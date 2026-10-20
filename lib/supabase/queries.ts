import { createClient } from "@/lib/supabase/server";
import { toProject } from "@/lib/supabase/mappers";
import type { Project, ProjectImage } from "@/types/project";
import type { Testimonial } from "@/types/testimonial";

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(toProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? toProject(data) : null;
}

export async function getAllProjectsForAdmin(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map(toProject);
}

export async function getProjectByIdForAdmin(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();

  if (error) throw error;
  return data ? toProject(data) : null;
}

export async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_images")
    .select("url, alt")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data.map((row) => ({ url: row.url, alt: row.alt ?? undefined }));
}

/** Every published property's testimonial, newest first, tagged with its property. */
export async function getProjectTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const [{ data, error }, projects] = await Promise.all([
    supabase
      .from("testimonials")
      .select("project_id, quote, name, role")
      .not("project_id", "is", null)
      .order("created_at", { ascending: false }),
    getPublishedProjects(),
  ]);

  if (error) throw error;
  const byId = new Map(projects.map((p) => [p.id, p]));

  // Filtering against published projects (rather than relying on RLS alone)
  // keeps unpublished properties off the homepage for a signed-in admin too.
  return data.flatMap((row) => {
    const project = row.project_id ? byId.get(row.project_id) : undefined;
    if (!project) return [];
    return [
      {
        quote: row.quote,
        name: row.name,
        role: row.role ?? "",
        project: { title: project.title, slug: project.slug },
      },
    ];
  });
}

export async function getProjectTestimonial(projectId: string): Promise<Testimonial | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("quote, name, role")
    .eq("project_id", projectId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? { quote: data.quote, name: data.name, role: data.role ?? "" } : null;
}
