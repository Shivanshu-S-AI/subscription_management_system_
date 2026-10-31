import Link from "next/link";
import { UserCheck, Plus, Shield, Mail } from "lucide-react";
import { getTeamMembers } from "@/lib/data/store";

export default function TeamPage() {
  const staff = getTeamMembers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Access Governance
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Internal Staff & Operators
          </h1>
          <p className="text-xs text-body mt-1">
            Only administrators are authorized to provision internal operator accounts.
          </p>
        </div>

        <Link
          href="/admin/team/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Provision Staff Member</span>
        </Link>
      </div>

      {/* Staff Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
            <tr>
              <th className="px-5 py-3 font-medium">Operator Name</th>
              <th className="px-5 py-3 font-medium">Assigned Email</th>
              <th className="px-5 py-3 font-medium">Permission Scope</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Provisioned Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {staff.map((s) => (
              <tr key={s.id} className="hover:bg-canvas/50 transition-colors">
                <td className="px-5 py-4 font-semibold text-ink text-sm">
                  {s.full_name}
                </td>
                <td className="px-5 py-4 text-mute font-mono">
                  {s.email}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink font-medium">
                    Internal Staff (Operational Access)
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    ACTIVE
                  </span>
                </td>
                <td className="px-5 py-4 text-mute font-mono">
                  {s.created_at.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

