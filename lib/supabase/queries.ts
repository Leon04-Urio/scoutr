import { createClient } from "@/lib/supabase/server";
import { toProject } from "@/lib/supabase/mappers";
import type { Project } from "@/types/project";
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

export async function getGeneralTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("quote, name, role")
    .is("project_id", null)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data.map((row) => ({ quote: row.quote, name: row.name, role: row.role ?? "" }));
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
