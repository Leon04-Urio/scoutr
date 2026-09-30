import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectByIdForAdmin, getProjectTestimonial } from "@/lib/supabase/queries";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdForAdmin(id);
  if (!project) notFound();

  const testimonial = await getProjectTestimonial(project.id);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl text-paper">Edit project</h1>
      <ProjectForm project={project} testimonial={testimonial} />
    </div>
  );
}
