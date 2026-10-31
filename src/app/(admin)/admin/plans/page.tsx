import Link from "next/link";
import { CalendarDays, Plus, Edit, Check, X } from "lucide-react";
import { getPlans } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default function PlansPage() {
  const plans = getPlans();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Catalog & Pricing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Subscription Plans
          </h1>
          <p className="text-xs text-body mt-1">
            Define recurring cadences, minimum commitments, and lifecycle policies.
          </p>
        </div>

        <Link
          href="/admin/plans/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Create Plan</span>
        </Link>
      </div>

      {/* Plans Listing */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Plan Name</th>
                <th className="px-5 py-3 font-medium">Cadence</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Min Qty</th>
                <th className="px-5 py-3 font-medium">Lifecycle Policies</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {plans.map((p) => (
                <tr key={p.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-semibold text-ink text-sm block">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-mute font-mono block mt-0.5">
                      {p.start_date || "Anytime"} → {p.end_date || "Open-ended"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink">
                      {p.billing_frequency}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {formatCurrency(p.price)} / {p.billing_frequency}
                  </td>
                  <td className="px-5 py-4 font-mono">{p.min_quantity} seat(s)</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      {p.auto_close ? (
                        <span className="rounded-xs bg-amber-500/10 text-amber-700 px-1.5 py-0.2">
                          Auto-close
                        </span>
                      ) : (
                        <span className="rounded-xs bg-canvas text-mute border border-hairline px-1.5 py-0.2">
                          Continuous
                        </span>
                      )}
                      {p.early_close_eligible && (
                        <span className="rounded-xs bg-canvas text-mute border border-hairline px-1.5 py-0.2">
                          Early Close
                        </span>
                      )}
                      {p.pause_eligible && (
                        <span className="rounded-xs bg-canvas text-mute border border-hairline px-1.5 py-0.2">
                          Pauseable
                        </span>
                      )}
                      {p.renewal_eligible && (
                        <span className="rounded-xs bg-canvas text-mute border border-hairline px-1.5 py-0.2">
                          Renewable
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/plans/${p.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <Edit className="h-3 w-3 text-mute" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

