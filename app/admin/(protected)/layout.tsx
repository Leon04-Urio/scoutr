import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/dal";
import { signOut } from "@/app/admin/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <Link href="/admin/projects" className="font-display text-lg text-paper">
          Scoutr Admin
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-muted-2">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-paper"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
