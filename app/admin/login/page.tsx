"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/login/actions";

const inputClasses =
  "w-full rounded-lg border border-line-strong bg-surface px-4 py-3 text-[14px] text-paper placeholder:text-muted-2 outline-none focus:border-accent";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-line bg-surface p-8"
      >
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            Scoutr Admin
          </span>
          <h1 className="font-display text-2xl text-paper">Sign in</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[13px] font-medium text-muted">
              Email
            </label>
            <input id="email" name="email" type="email" required className={inputClasses} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[13px] font-medium text-muted">
              Password
            </label>
            <input id="password" name="password" type="password" required className={inputClasses} />
          </div>
        </div>

        {state?.error ? <p className="text-[13px] text-red-400">{state.error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-accent px-6 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
