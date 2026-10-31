import Link from "next/link";
import {
  Repeat,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Plus,
  Play,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { getDashboardKPIs } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default function AdminOverviewDashboard() {
  const kpis = getDashboardKPIs();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Operational Intelligence
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Overview Dashboard
          </h1>
          <p className="text-xs text-body mt-1">
            Real-time subscription metrics, cashflow reconciliation, and billing operations.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/billing"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Process Billing</span>
          </Link>
          <Link
            href="/admin/quotations/new"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink shadow-whisper hover:bg-canvas transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Quote</span>
          </Link>
        </div>
      </div>

      {/* 4 Required Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Subscriptions */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Active Subscriptions
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-emerald-500/10 text-emerald-600">
              <Repeat className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-ink">
              {kpis.activeSubscriptionsCount}
            </span>
            <span className="text-xs text-emerald-600 font-mono">live recurring</span>
          </div>
          <p className="mt-2 text-[11px] text-mute">
            Live client contracts generating recurring cashflow
          </p>
        </div>

        {/* KPI 2: Revenue Received */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Revenue Received
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-link/10 text-link">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-ink">
              {formatCurrency(kpis.revenueReceivedTotal)}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-mute">
            Total verified cash collected against processed invoices
          </p>
        </div>

        {/* KPI 3: Outstanding Amount */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Outstanding Amount
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-amber-500/10 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-ink">
              {formatCurrency(kpis.outstandingAmountTotal)}
            </span>
            <span className="text-xs text-mute font-mono">unpaid</span>
          </div>
          <p className="mt-2 text-[11px] text-mute">
            Total unpaid balances on issued invoices
          </p>
        </div>

        {/* KPI 4: Overdue Invoices */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Overdue Invoices
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-error/10 text-error">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-error">
              {kpis.overdueInvoicesCount}
            </span>
            <span className="text-xs text-error font-mono">
              ({formatCurrency(kpis.overdueAmountTotal)})
            </span>
          </div>
          <p className="mt-2 text-[11px] text-mute">
            Invoices past due date requiring collection attention
          </p>
        </div>
      </div>

      {/* Operational Sections: Overdue Alerts & Upcoming Billing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Invoices Requiring Attention */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <div className="flex items-center justify-between mb-4 border-b border-hairline-soft pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-error" />
              <h2 className="text-sm font-semibold text-ink">
                Overdue Invoices Requiring Attention
              </h2>
            </div>
            <Link
              href="/admin/invoices?filter=overdue"
              className="text-xs font-mono text-link hover:underline"
            >
              View all ({kpis.overdueInvoicesCount})
            </Link>
          </div>

          {kpis.overdueInvoices.length === 0 ? (
            <div className="py-8 text-center text-xs text-mute">
              <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
              <span>All invoices are current. No overdue receivables.</span>
            </div>
          ) : (
            <div className="divide-y divide-hairline-soft">
              {kpis.overdueInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="text-xs font-semibold text-ink hover:text-link font-mono"
                      >
                        {inv.invoice_number}
                      </Link>
                      <span className="rounded-xs bg-error/10 px-1.5 py-0.2 text-[10px] font-mono text-error uppercase font-medium">
                        Due {inv.due_date}
                      </span>
                    </div>
                    <span className="text-xs text-mute block mt-0.5">
                      {inv.customer?.company_name || inv.customer?.full_name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-error block">
                      {formatCurrency(inv.amount_due)}
                    </span>
                    <Link
                      href={`/admin/payments?invoiceId=${inv.id}`}
                      className="text-[11px] text-link hover:underline block mt-0.5 font-mono"
                    >
                      Record payment →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Subscription Billing */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <div className="flex items-center justify-between mb-4 border-b border-hairline-soft pb-3">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-ink" />
              <h2 className="text-sm font-semibold text-ink">
                Active Subscriptions Billing Schedule
              </h2>
            </div>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-mono text-link hover:underline"
            >
              Manage subs
            </Link>
          </div>

          <div className="divide-y divide-hairline-soft">
            {kpis.upcomingBillingSubscriptions.slice(0, 4).map((sub) => (
              <div
                key={sub.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/subscriptions/${sub.id}`}
                      className="text-xs font-semibold text-ink hover:text-link font-mono"
                    >
                      {sub.subscription_number}
                    </Link>
                    <span className="rounded-xs bg-canvas px-1.5 py-0.2 text-[10px] font-mono text-mute border border-hairline uppercase">
                      {sub.billing_frequency}
                    </span>
                  </div>
                  <span className="text-xs text-mute block mt-0.5">
                    {sub.customer?.company_name || sub.customer?.full_name} · {sub.plan?.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-ink block">
                    {formatCurrency(sub.total_amount)}
                  </span>
                  <span className="text-[10px] font-mono text-mute block mt-0.5">
                    Next: {sub.next_billing_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Subscriptions & Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscriptions */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <div className="flex items-center justify-between mb-4 border-b border-hairline-soft pb-3">
            <h2 className="text-sm font-semibold text-ink">Recent Subscriptions</h2>
            <Link
              href="/admin/subscriptions"
              className="text-xs font-mono text-link hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-hairline-soft">
            {kpis.recentSubscriptions.map((sub) => (
              <div key={sub.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
                    className="font-mono font-medium text-ink hover:text-link"
                  >
                    {sub.subscription_number}
                  </Link>
                  <span className="text-mute block text-[11px]">
                    {sub.customer?.full_name} · Started {sub.start_date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-ink">
                    {formatCurrency(sub.total_amount)}
                  </span>
                  <span
                    className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                      sub.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : sub.status === "confirmed"
                        ? "bg-blue-500/10 text-blue-600"
                        : "bg-canvas text-mute border border-hairline"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments Received */}
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
          <div className="flex items-center justify-between mb-4 border-b border-hairline-soft pb-3">
            <h2 className="text-sm font-semibold text-ink">Recent Payments Received</h2>
            <Link
              href="/admin/payments"
              className="text-xs font-mono text-link hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-hairline-soft">
            {kpis.recentPayments.map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-medium text-ink">
                    {p.payment_reference}
                  </span>
                  <span className="text-mute block text-[11px]">
                    {p.customer?.company_name || p.customer?.full_name} · {p.payment_date}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-600 block">
                    +{formatCurrency(p.amount)}
                  </span>
                  <span className="font-mono text-[10px] text-mute uppercase block">
                    {p.payment_method.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
