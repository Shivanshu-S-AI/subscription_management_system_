import Link from "next/link";
import {
  Repeat,
  Receipt,
  AlertCircle,
  Calendar,
  ArrowRight,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser, getCustomerOverviewMetrics } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function CustomerPortalOverviewPage() {
  const { user } = await getCurrentUser();
  const customer = getCustomerForUser(user?.id || user?.email || "");

  if (!customer) {
    return (
      <div className="rounded-md border border-hairline bg-canvas-elevated p-8 text-center text-sm text-mute">
        Customer profile record not found. Please contact support.
      </div>
    );
  }

  const { summary, activeSubscriptions, recentInvoices, attentionRequired } =
    getCustomerOverviewMetrics(customer.id);

  return (
    <div className="space-y-8">
      {/* Title & Customer Greeting */}
      <div className="border-b border-hairline pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Account Overview
        </span>
        <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
          Welcome, {customer.full_name}
        </h1>
        <p className="text-xs text-body mt-1">
          {customer.company_name ? `${customer.company_name} · ` : ""}
          Manage your software subscriptions, monitor renewals, and review billing statements.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Subscriptions */}
        <Link
          href="/portal/subscriptions?status=active"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Active Subscriptions
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <Repeat className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {summary.activeSubscriptionsCount}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>In service & renewing</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* Total Subscriptions */}
        <Link
          href="/portal/subscriptions"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Total Contracts
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-50 text-blue-600 border border-blue-200/60">
              <Calendar className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {summary.totalSubscriptionsCount}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>All lifetime subscriptions</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* Outstanding Amount */}
        <Link
          href="/portal/invoices?filter=outstanding"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Outstanding Balance
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-zinc-100 text-zinc-700 border border-zinc-200">
              <Receipt className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className={`text-2xl font-semibold tracking-tight ${summary.outstandingAmount > 0 ? "text-red-600" : "text-ink"}`}>
              ${summary.outstandingAmount.toFixed(2)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>Unsettled invoice amount</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* Unpaid Invoices Count */}
        <Link
          href="/portal/invoices?filter=outstanding"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Unpaid Invoices
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-amber-50 text-amber-600 border border-amber-200/60">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {summary.unpaidInvoicesCount}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>{summary.overdueInvoicesCount > 0 ? `${summary.overdueInvoicesCount} past due` : "All on schedule"}</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>
      </div>

      {/* Attention Required Banner (if any overdue invoices or expiring subscriptions) */}
      {(attentionRequired.overdueInvoices.length > 0 || attentionRequired.expiringSubscriptions.length > 0) && (
        <div className="rounded-md border border-amber-200/80 bg-amber-50/50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>Attention Required</span>
          </div>

          <div className="space-y-2 text-xs text-amber-900">
            {attentionRequired.overdueInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between bg-white/70 p-2.5 rounded-sm border border-amber-200/60">
                <div>
                  <span className="font-mono font-semibold">{inv.invoice_number}</span> is past due ({inv.due_date}).
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-red-600">${inv.amount_due.toFixed(2)}</span>
                  <Link
                    href={`/portal/invoices/${inv.id}`}
                    className="text-xs text-blue-600 hover:underline font-medium inline-flex items-center gap-0.5"
                  >
                    <span>View Invoice</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}

            {attentionRequired.expiringSubscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between bg-white/70 p-2.5 rounded-sm border border-amber-200/60">
                <div>
                  Subscription <span className="font-mono font-semibold">{sub.subscription_number}</span> ({sub.plan?.name}) expires on {sub.expiry_date}.
                </div>
                <Link
                  href={`/portal/subscriptions/${sub.id}`}
                  className="text-xs text-blue-600 hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  <span>Manage Renewal</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Columns: Active Subscriptions & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Active Subscriptions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-ink flex items-center gap-2">
              <Repeat className="h-4 w-4 text-mute" />
              <span>My Active Subscriptions</span>
            </h2>
            <Link
              href="/portal/subscriptions"
              className="text-xs text-mute hover:text-ink transition-colors font-medium"
            >
              View all ({summary.totalSubscriptionsCount})
            </Link>
          </div>

          <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
            {activeSubscriptions.length === 0 ? (
              <div className="p-6 text-center text-xs text-mute">
                You do not have any active subscriptions.
              </div>
            ) : (
              <div className="divide-y divide-hairline text-xs">
                {activeSubscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 flex items-center justify-between hover:bg-canvas transition-colors"
                  >
                    <div>
                      <Link
                        href={`/portal/subscriptions/${sub.id}`}
                        className="font-mono font-semibold text-ink hover:underline block"
                      >
                        {sub.subscription_number}
                      </Link>
                      <span className="text-body font-medium block mt-0.5">
                        {sub.plan?.name} · {sub.billing_frequency}
                      </span>
                      {sub.expiry_date && (
                        <span className="font-mono text-[11px] text-mute block mt-0.5">
                          Renews/Expires: {sub.expiry_date}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-semibold text-ink block">
                        ${sub.total_amount.toFixed(2)}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-block mt-1">
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Invoices */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-ink flex items-center gap-2">
              <Receipt className="h-4 w-4 text-mute" />
              <span>Recent Invoices</span>
            </h2>
            <Link
              href="/portal/invoices"
              className="text-xs text-mute hover:text-ink transition-colors font-medium"
            >
              View all
            </Link>
          </div>

          <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
            {recentInvoices.length === 0 ? (
              <div className="p-6 text-center text-xs text-mute">
                No invoices issued yet.
              </div>
            ) : (
              <div className="divide-y divide-hairline text-xs">
                {recentInvoices.map((inv) => {
                  const isPaid = inv.status === "paid";
                  return (
                    <div
                      key={inv.id}
                      className="p-4 flex items-center justify-between hover:bg-canvas transition-colors"
                    >
                      <div>
                        <Link
                          href={`/portal/invoices/${inv.id}`}
                          className="font-mono font-semibold text-ink hover:underline block"
                        >
                          {inv.invoice_number}
                        </Link>
                        <span className="text-mute font-mono text-[11px] block mt-0.5">
                          Date: {inv.issue_date} · Due: {inv.due_date}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-semibold text-ink block">
                          ${inv.total_amount.toFixed(2)}
                        </span>
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border inline-block mt-1 ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
