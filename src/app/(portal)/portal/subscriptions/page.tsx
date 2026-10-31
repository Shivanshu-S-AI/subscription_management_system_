import Link from "next/link";
import { Repeat, ArrowUpRight, Calendar, AlertCircle } from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser, getCustomerSubscriptions } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function CustomerSubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { user } = await getCurrentUser();
  const customer = getCustomerForUser(user?.id || user?.email || "");

  if (!customer) {
    return (
      <div className="rounded-md border border-hairline bg-canvas-elevated p-8 text-center text-sm text-mute">
        Customer profile not found.
      </div>
    );
  }

  // Strict customer-level data isolation
  const subscriptions = getCustomerSubscriptions(customer.id, status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-hairline pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Subscriber Workspace
        </span>
        <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
          My Subscriptions
        </h1>
        <p className="text-xs text-body mt-1">
          Review your contracted service tiers, billing frequencies, renewal schedules, and seat allocations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/portal/subscriptions"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status || status === "all"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All Subscriptions ({subscriptions.length})
        </Link>
        <Link
          href="/portal/subscriptions?status=active"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "active"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Active
        </Link>
        <Link
          href="/portal/subscriptions?status=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "confirmed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed
        </Link>
        <Link
          href="/portal/subscriptions?status=paused"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "paused"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paused
        </Link>
        <Link
          href="/portal/subscriptions?status=closed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "closed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Closed
        </Link>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Subscription #</th>
                <th className="px-5 py-3 font-medium">Plan Tier</th>
                <th className="px-5 py-3 font-medium">Billing Frequency</th>
                <th className="px-5 py-3 font-medium">Start Date</th>
                <th className="px-5 py-3 font-medium">Next Renewal</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Recurring Charge</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-mute">
                    No subscriptions found under this filter.
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
                      <td className="px-5 py-4 font-mono font-semibold text-ink">
                        <Link
                          href={`/portal/subscriptions/${sub.id}`}
                          className="hover:underline"
                        >
                          {sub.subscription_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4 font-medium text-ink">
                        {sub.plan?.name}
                      </td>
                      <td className="px-5 py-4 capitalize font-mono text-mute">
                        {sub.billing_frequency}
                      </td>
                      <td className="px-5 py-4 font-mono text-mute">{sub.start_date}</td>
                      <td className="px-5 py-4 font-mono text-mute">
                        {sub.expiry_date || sub.next_billing_date || "—"}
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
                          href={`/portal/subscriptions/${sub.id}`}
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
