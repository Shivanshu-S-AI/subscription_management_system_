import Link from "next/link";
import { ArrowLeft, UserPlus, ShieldAlert } from "lucide-react";
import { addStaffAction } from "@/modules/team/actions";

export default function NewStaffPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-1.5 text-xs text-mute hover:text-ink transition-colors font-mono uppercase"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Team</span>
      </Link>

      <div className="border-b border-hairline pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Provision Internal Staff Account
        </h1>
        <p className="text-xs text-body mt-1">
          Internal staff members receive operational permissions (quotations, billing, orders).
        </p>
      </div>

      <div className="rounded-sm border border-hairline bg-canvas p-3 text-xs flex items-center gap-2 text-mute">
        <ShieldAlert className="h-4 w-4 text-ink shrink-0" />
        <span>Public registration for staff is strictly forbidden. Only admins can invite staff.</span>
      </div>

      <form action={addStaffAction} className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-5">
        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Full Name *
          </label>
          <input
            name="full_name"
            required
            placeholder="e.g. Alex Rivera"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink focus:outline-none focus:border-ink"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink mb-1.5">
            Internal Staff Email *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="e.g. alex.ops@brightloopsoftware.com"
            className="h-9 w-full rounded-sm border border-hairline bg-canvas px-3 text-xs text-ink font-mono focus:outline-none focus:border-ink"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-hairline-soft">
          <Link
            href="/admin/team"
            className="h-9 rounded-sm border border-hairline bg-canvas px-4 text-xs font-medium text-ink flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="h-9 rounded-sm bg-ink px-5 text-xs font-medium text-white hover:bg-black transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Provision Account</span>
          </button>
        </div>
      </form>
    </div>
  );
}

