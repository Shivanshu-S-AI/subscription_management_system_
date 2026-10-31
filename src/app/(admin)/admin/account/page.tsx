import { ShieldCheck, LogOut } from "lucide-react";
import { signOutAction } from "@/modules/auth/actions";

export default function AdminAccountPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Administrator Account
        </h1>
        <p className="text-xs text-body mt-1">
          Root governance credentials and active session control.
        </p>
      </div>

      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-ink">
              Brightloop Administrator
            </h2>
            <span className="font-mono text-xs text-mute block">
              admin@brightloop.com
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline-soft grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">Role Authorization</span>
            <span className="font-semibold text-ink mt-0.5 block">ADMIN (SUPERUSER)</span>
          </div>
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">Access Status</span>
            <span className="font-semibold text-emerald-600 mt-0.5 block">ACTIVE PRIVILEGES</span>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline-soft flex justify-end">
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-sm border border-error/30 bg-error/5 px-4 text-xs font-medium text-error hover:bg-error/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out of Admin Session</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

