import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Real authorization check (as opposed to proxy.ts's optimistic redirect).
 * There is no self-serve signup in this app — any authenticated user is
 * the admin (build spec §23) — so verifying a session is sufficient.
 */
export const requireAdmin = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
});
