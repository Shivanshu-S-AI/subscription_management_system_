import Link from "next/link";
import {
  BarChart3,
  Repeat,
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { getStore, getDashboardKPIs } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "overview" } = await searchParams;
  const store = getStore();
  const kpis = getDashboardKPIs();

  // Financial aggregates
  const totalInvoiced = store.invoices
    .filter((i) => i.status !== "cancelled")
    .reduce((sum, i) => sum + Number(i.total_amount), 0);

  const totalCollected = kpis.revenueReceivedTotal;
  const totalOutstanding = kpis.outstandingAmountTotal;
  const totalOverdue = kpis.overdueAmountTotal;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Analytics & Audit
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Financial & Operational Reports
          </h1>
          <p className="text-xs text-body mt-1">
            Aggregated audit statements: cashflow, receivables aging, and subscription cohorts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/admin/reports?tab=overview"
          className={`px-3 py-1 rounded-sm transition-colors ${
            tab === "overview"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Executive Summary
        </Link>
        <Link
          href="/admin/reports?tab=revenue"
          className={`px-3 py-1 rounded-sm transition-colors ${
            tab === "revenue"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Revenue & Payments
        </Link>
        <Link
          href="/admin/reports?tab=receivables"
          className={`px-3 py-1 rounded-sm transition-colors ${
            tab === "receivables"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Outstanding & Aging
        </Link>
        <Link
          href="/admin/reports?tab=subscriptions"
          className={`px-3 py-1 rounded-sm transition-colors ${
            tab === "subscriptions"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Subscription Health
        </Link>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Total Invoiced to Date
          </span>
          <span className="text-2xl font-semibold text-ink font-mono block">
            {formatCurrency(totalInvoiced)}
          </span>
          <span className="text-[11px] text-mute block mt-1">Excludes cancelled items</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Cash Collected (Received)
          </span>
          <span className="text-2xl font-semibold text-emerald-600 font-mono block">
            {formatCurrency(totalCollected)}
          </span>
          <span className="text-[11px] text-mute block mt-1">
            {((totalCollected / (totalInvoiced || 1)) * 100).toFixed(1)}% collection rate
          </span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Outstanding Balance
          </span>
          <span className="text-2xl font-semibold text-amber-600 font-mono block">
            {formatCurrency(totalOutstanding)}
          </span>
          <span className="text-[11px] text-mute block mt-1">Awaiting client payment</span>
        </div>

        <div className="rounded-md border border-hairline bg-canvas-elevated p-5 shadow-whisper">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-1">
            Overdue Balance
          </span>
          <span className="text-2xl font-semibold text-error font-mono block">
            {formatCurrency(totalOverdue)}
          </span>
          <span className="text-[11px] text-error font-mono block mt-1">
            {kpis.overdueInvoicesCount} invoice(s) past due
          </span>
        </div>
      </div>

      {/* Tab Specific Content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Stream Breakdown */}
          <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
            <h2 className="text-sm font-semibold text-ink mb-4 font-mono uppercase tracking-wider text-xs">
              Revenue Stream Breakdown by Plan Cadence
            </h2>
            <div className="space-y-4 text-xs">
              {["monthly", "yearly", "weekly"].map((freq) => {
                const subs = store.subscriptions.filter(
                  (s) => s.billing_frequency === freq && s.status === "active"
                );
                const subTotal = subs.reduce((acc, s) => acc + Number(s.total_amount), 0);
                return (
                  <div key={freq} className="p-3 rounded-sm bg-canvas border border-hairline">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono uppercase font-semibold text-ink">
                        {freq} Subscriptions
                      </span>
                      <span className="font-mono font-semibold text-ink">
                        {formatCurrency(subTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-mute text-[11px]">
                      <span>{subs.length} active contract(s)</span>
                      <span>Contracted Recurring Volume</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aging Receivables */}
          <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper">
            <h2 className="text-sm font-semibold text-ink mb-4 font-mono uppercase tracking-wider text-xs">
              Aging Accounts Receivable
            </h2>
            <div className="divide-y divide-hairline-soft">
              {store.invoices
                .filter((i) => i.amount_due > 0 && i.status !== "cancelled")
                .map((inv) => (
                  <div key={inv.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="font-mono font-medium text-ink hover:text-link"
                      >
                        {inv.invoice_number}
                      </Link>
                      <span className="text-mute block text-[11px]">
                        {inv.customer?.company_name || inv.customer?.full_name} · Due {inv.due_date}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-error block">
                        {formatCurrency(inv.amount_due)}
                      </span>
                      <span className="text-[10px] font-mono text-mute block">
                        Total: {formatCurrency(inv.total_amount)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {tab === "revenue" && (
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
          <h2 className="text-sm font-semibold text-ink font-mono uppercase tracking-wider text-xs">
            Complete Cash Payment Log ({store.payments.length})
          </h2>
          <div className="divide-y divide-hairline-soft">
            {store.payments.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-semibold text-ink">{p.payment_reference}</span>
                  <span className="text-mute block text-[11px]">
                    Customer: {p.customer?.full_name} · Paid {p.payment_date} · {p.notes}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-600 text-sm block">
                    +{formatCurrency(p.amount)}
                  </span>
                  <span className="font-mono text-[10px] text-mute uppercase">
                    {p.payment_method.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "subscriptions" && (
        <div className="rounded-md border border-hairline bg-canvas-elevated p-6 shadow-whisper space-y-4">
          <h2 className="text-sm font-semibold text-ink font-mono uppercase tracking-wider text-xs">
            Subscription Contract Health Breakdown
          </h2>
          <div className="divide-y divide-hairline-soft">
            {store.subscriptions.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/admin/subscriptions/${s.id}`}
                    className="font-mono font-semibold text-ink hover:text-link"
                  >
                    {s.subscription_number}
                  </Link>
                  <span className="text-mute block text-[11px]">
                    {s.customer?.full_name} · Next Billing: {s.next_billing_date}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-ink font-mono">
                    {formatCurrency(s.total_amount)}
                  </span>
                  <span
                    className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                      s.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-canvas text-mute border border-hairline"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

