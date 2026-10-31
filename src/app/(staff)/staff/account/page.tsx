import { Briefcase, LogOut, CheckCircle2, ShieldAlert } from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import { signOutAction } from "@/modules/auth/actions";

export const dynamic = "force-dynamic";

export default async function StaffAccountPage() {
  const { user, profile, role } = await getCurrentUser();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          My Account
        </h1>
        <p className="text-xs text-body mt-1">
          Operational employee profile and active role privileges.
        </p>
      </div>

      <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-white">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-ink">
              {profile?.full_name || "Operations Staff"}
            </h2>
            <span className="font-mono text-xs text-mute block">
              {user?.email || "staff@brightloopsoftware.com"}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline-soft grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">User Role</span>
            <span className="font-semibold text-blue-600 mt-0.5 block uppercase">
              INTERNAL STAFF
            </span>
          </div>
          <div className="p-3 rounded-sm bg-canvas border border-hairline">
            <span className="text-mute block text-[10px] uppercase">Operational Scope</span>
            <span className="font-semibold text-emerald-600 mt-0.5 block">
              DAILY OPERATIONS ACTIVE
            </span>
          </div>
        </div>

        {/* Permissions & Boundaries Notice */}
        <div className="pt-4 border-t border-hairline-soft space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block">
            Role Permissions & System Boundaries
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-sm bg-emerald-50/50 border border-emerald-200/50 space-y-1.5">
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Permitted Operations
              </span>
              <ul className="text-emerald-700 text-[11px] space-y-1 list-disc pl-4">
                <li>Search & view customer directory</li>
                <li>Prepare and send quotations</li>
                <li>Convert quotations to subscriptions</li>
                <li>Manage permitted subscription actions</li>
                <li>Confirm, cancel, send & print invoices</li>
                <li>Record payments against invoices</li>
                <li>Access operational & collections reports</li>
              </ul>
            </div>

            <div className="p-3 rounded-sm bg-zinc-50 border border-hairline space-y-1.5">
              <span className="font-semibold text-body flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 text-mute" />
                Administrative Restrictions
              </span>
              <ul className="text-mute text-[11px] space-y-1 list-disc pl-4">
                <li>Cannot modify product catalog or variants</li>
                <li>Cannot create or edit subscription plans</li>
                <li>Cannot modify tax rules or default rates</li>
                <li>Cannot create or alter discount rules</li>
                <li>Cannot add staff or change user roles</li>
                <li>Cannot trigger batch recurring billing runs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-hairline-soft flex justify-end">
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-sm border border-error/30 bg-error/5 px-4 text-xs font-medium text-error hover:bg-error/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out of Staff Session</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
