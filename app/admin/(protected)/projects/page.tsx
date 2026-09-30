import Link from "next/link";
import { getAllProjectsForAdmin } from "@/lib/supabase/queries";
import { deleteProject, toggleProjectField } from "@/app/admin/(protected)/projects/actions";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsForAdmin();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-paper">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="h-11 rounded-full bg-accent px-5 text-[13px] font-semibold leading-[44px] text-ink transition-colors hover:bg-accent-strong"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-[14px] text-muted">No projects yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-line bg-surface text-muted-2">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-paper">{project.title}</td>
                  <td className="px-4 py-3 text-muted">{project.propertyType}</td>
                  <td className="px-4 py-3">
                    <ToggleButton project={project} field="published" />
                  </td>
                  <td className="px-4 py-3">
                    <ToggleButton project={project} field="featured" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/projects/${project.id}`} className="text-accent hover:underline">
                        Edit
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button type="submit" className="text-muted-2 hover:text-red-400">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ToggleButton({
  project,
  field,
}: {
  project: { id: string; published: boolean; featured: boolean };
  field: "published" | "featured";
}) {
  const value = project[field];
  return (
    <form action={toggleProjectField}>
      <input type="hidden" name="id" value={project.id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={String(value)} />
      <button
        type="submit"
        className={
          value
            ? "rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-accent"
            : "rounded-full border border-line-strong px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-2"
        }
      >
        {value ? "Yes" : "No"}
      </button>
    </form>
  );
}
