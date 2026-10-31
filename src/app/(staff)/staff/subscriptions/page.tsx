import Link from "next/link";
import { Repeat, ArrowUpRight, Search } from "lucide-react";
import { getSubscriptions, getCustomers, getPlans } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffSubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; customer_id?: string; plan_id?: string }>;
}) {
  const { status, customer_id, plan_id } = await searchParams;
  const subscriptions = getSubscriptions({
    status,
    customer_id,
    plan_id,
  });
  const customers = getCustomers();
  const plans = getPlans();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Operations
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Subscriptions Directory
          </h1>
          <p className="text-xs text-body mt-1">
            Monitor subscriber contracts, lifecycle states, next billing dates, and permitted operations.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/staff/subscriptions"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status || status === "all"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All ({subscriptions.length})
        </Link>
        <Link
          href="/staff/subscriptions?status=active"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "active"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Active
        </Link>
        <Link
          href="/staff/subscriptions?status=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "confirmed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed
        </Link>
        <Link
          href="/staff/subscriptions?status=paused"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "paused"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paused
        </Link>
        <Link
          href="/staff/subscriptions?status=draft"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "draft"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Draft
        </Link>
        <Link
          href="/staff/subscriptions?status=closed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "closed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Closed
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Sub #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Frequency</th>
                <th className="px-5 py-3 font-medium">Next Billing</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Recurring Amount</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-mute">
                    No subscriptions found for the selected filter.
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => {
                  const isActive = sub.status === "active";
                  const isConfirmed = sub.status === "confirmed";
                  const isPaused = sub.status === "paused";
                  const isClosed = sub.status === "closed";

                  return (
                    <tr key={sub.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-medium text-ink">
                        <Link
                          href={`/staff/subscriptions/${sub.id}`}
                          className="hover:underline font-semibold"
                        >
                          {sub.subscription_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-ink">
                          {sub.customer?.company_name || sub.customer?.full_name}
                        </div>
                        <div className="font-mono text-[11px] text-mute">{sub.customer?.email}</div>
                      </td>
                      <td className="px-5 py-4 text-body">{sub.plan?.name}</td>
                      <td className="px-5 py-4 capitalize font-mono text-mute">
                        {sub.billing_frequency}
                      </td>
                      <td className="px-5 py-4 font-mono text-mute">
                        {sub.next_billing_date || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isConfirmed
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : isPaused
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : isClosed
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-zinc-100 text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-ink">
                        ${sub.total_amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/staff/subscriptions/${sub.id}`}
                          className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
