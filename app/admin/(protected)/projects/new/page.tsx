import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl text-paper">New project</h1>
      <ProjectForm />
    </div>
  );
}
