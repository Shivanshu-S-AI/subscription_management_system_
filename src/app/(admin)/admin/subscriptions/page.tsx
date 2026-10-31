import Link from "next/link";
import { Repeat, Plus, ArrowUpRight, Filter } from "lucide-react";
import { getSubscriptions, getCustomers, getPlans } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; customerId?: string; planId?: string }>;
}) {
  const { status, customerId, planId } = await searchParams;
  const subscriptions = getSubscriptions({
    status,
    customer_id: customerId,
    plan_id: planId,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Subscription Operations
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            All Subscriptions
          </h1>
          <p className="text-xs text-body mt-1">
            Central repository for contract lifecycles, billing dates, and itemized accounts.
          </p>
        </div>

        <Link
          href="/admin/subscriptions/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Subscription</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/admin/subscriptions"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status || status === "all"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All ({subscriptions.length})
        </Link>
        <Link
          href="/admin/subscriptions?status=active"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "active"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Active
        </Link>
        <Link
          href="/admin/subscriptions?status=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "confirmed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed
        </Link>
        <Link
          href="/admin/subscriptions?status=paused"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "paused"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paused
        </Link>
        <Link
          href="/admin/subscriptions?status=closed"
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
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Cadence</th>
                <th className="px-5 py-3 font-medium">Next Billing</th>
                <th className="px-5 py-3 font-medium">Total Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {subscriptions.map((s) => (
                <tr key={s.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-semibold text-ink">
                    <Link href={`/admin/subscriptions/${s.id}`} className="hover:text-link">
                      {s.subscription_number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/customers/${s.customer_id}`}
                      className="font-medium text-ink hover:text-link block"
                    >
                      {s.customer?.full_name}
                    </Link>
                    <span className="text-[11px] text-mute">
                      {s.customer?.company_name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-body font-medium">
                    {s.plan?.name || "Standard Plan"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-xs bg-canvas px-2 py-0.5 font-mono text-[10px] uppercase border border-hairline text-ink">
                      {s.billing_frequency}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-mute">
                    {s.next_billing_date}
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {formatCurrency(s.total_amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                        s.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : s.status === "confirmed"
                          ? "bg-blue-500/10 text-blue-600"
                          : s.status === "paused"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-canvas text-mute border border-hairline"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/subscriptions/${s.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <span>Manage</span>
                      <ArrowUpRight className="h-3 w-3 text-mute" />
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

