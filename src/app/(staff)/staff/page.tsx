import Link from "next/link";
import {
  Users,
  Repeat,
  Receipt,
  AlertCircle,
  FileText,
  CreditCard,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";
import { getStaffDashboardMetrics } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default function StaffOverviewPage() {
  const metrics = getStaffDashboardMetrics();
  const { summary, attentionRequired, recentActivity } = metrics;

  return (
    <div className="space-y-8">
      {/* Title & Operational Mission */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            Operations Workspace
          </h1>
          <p className="text-xs text-mute mt-0.5">
            Operational queue, active workflows, and customer accounts requiring daily attention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/staff/quotations/new"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-ink/90 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Create Quotation</span>
          </Link>
          <Link
            href="/staff/payments/new"
            className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-hairline bg-canvas-elevated px-3 text-xs font-medium text-ink hover:bg-canvas transition-colors shadow-whisper"
          >
            <CreditCard className="h-3.5 w-3.5 text-mute" />
            <span>Record Payment</span>
          </Link>
        </div>
      </div>

      {/* 4 Summary Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Active Subscriptions */}
        <Link
          href="/staff/subscriptions?status=active"
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

        {/* 2. Invoices Awaiting Confirmation */}
        <Link
          href="/staff/invoices?status=draft"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Awaiting Confirmation
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-amber-50 text-amber-600 border border-amber-200/60">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {summary.invoicesAwaitingConfirmationCount}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>Draft invoices pending review</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* 3. Outstanding Invoices */}
        <Link
          href="/staff/invoices?status=outstanding"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Outstanding Invoices
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-50 text-blue-600 border border-blue-200/60">
              <Receipt className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {summary.outstandingInvoicesCount}
            </span>
            <span className="font-mono text-xs text-mute">
              (${summary.outstandingAmountTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })})
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>Confirmed open receivables</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* 4. Overdue Invoices */}
        <Link
          href="/staff/invoices?status=overdue"
          className="group rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper hover:border-ink/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
              Overdue Invoices
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-red-50 text-red-600 border border-red-200/60">
              <AlertCircle className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-red-600">
              {summary.overdueInvoicesCount}
            </span>
            <span className="font-mono text-xs text-red-500">
              (${summary.overdueAmountTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })})
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute flex items-center gap-1">
            <span>Immediate collection required</span>
            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>
      </div>

      {/* Quick Actions Bar */}
      <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper">
        <span className="font-mono text-[10px] uppercase tracking-wider text-mute block mb-3">
          Quick Operational Actions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <Link
            href="/staff/customers"
            className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-xs font-medium text-ink hover:bg-canvas-elevated hover:border-ink/20 transition-colors"
          >
            <Users className="h-3.5 w-3.5 text-mute" />
            <span>Find Customer</span>
          </Link>
          <Link
            href="/staff/quotations/new"
            className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-xs font-medium text-ink hover:bg-canvas-elevated hover:border-ink/20 transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-mute" />
            <span>Create Quotation</span>
          </Link>
          <Link
            href="/staff/subscriptions"
            className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-xs font-medium text-ink hover:bg-canvas-elevated hover:border-ink/20 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-mute" />
            <span>Search Subs</span>
          </Link>
          <Link
            href="/staff/invoices?status=outstanding"
            className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-xs font-medium text-ink hover:bg-canvas-elevated hover:border-ink/20 transition-colors"
          >
            <Receipt className="h-3.5 w-3.5 text-mute" />
            <span>Open Invoices</span>
          </Link>
          <Link
            href="/staff/payments/new"
            className="flex items-center gap-2 rounded-sm border border-hairline bg-canvas p-2.5 text-xs font-medium text-ink hover:bg-canvas-elevated hover:border-ink/20 transition-colors"
          >
            <CreditCard className="h-3.5 w-3.5 text-mute" />
            <span>Record Payment</span>
          </Link>
        </div>
      </div>

      {/* Main Two-Column Operational Queues: Attention Required & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Attention Required */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-ink flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>Attention Required</span>
            </h2>
            <span className="font-mono text-[10px] uppercase text-mute">
              Actionable Work Items
            </span>
          </div>

          {/* Overdue Invoices */}
          <div className="rounded-md border border-hairline bg-canvas-elevated overflow-hidden shadow-whisper">
            <div className="px-4 py-3 border-b border-hairline bg-red-50/30 flex items-center justify-between">
              <span className="text-xs font-medium text-red-800 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                Overdue Invoices ({attentionRequired.overdueInvoices.length})
              </span>
              <Link
                href="/staff/invoices?status=overdue"
                className="text-[11px] text-red-700 hover:underline"
              >
                View all
              </Link>
            </div>
            {attentionRequired.overdueInvoices.length === 0 ? (
              <div className="p-4 text-center text-xs text-mute">
                No overdue invoices requiring collection.
              </div>
            ) : (
              <div className="divide-y divide-hairline">
                {attentionRequired.overdueInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 flex items-center justify-between hover:bg-canvas transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/staff/invoices/${inv.id}`}
                          className="font-mono text-xs font-semibold text-ink hover:underline"
                        >
                          {inv.invoice_number}
                        </Link>
                        <span className="text-xs text-body font-medium">
                          {inv.customer?.company_name || inv.customer?.full_name}
                        </span>
                      </div>
                      <div className="text-[11px] text-red-600 font-mono mt-0.5">
                        Due {inv.due_date} · Past Due
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-semibold text-ink">
                        ${inv.amount_due.toFixed(2)}
                      </div>
                      <Link
                        href={`/staff/payments/new?invoice_id=${inv.id}`}
                        className="text-[10px] text-blue-600 hover:underline font-medium block mt-0.5"
                      >
                        Record Payment →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Invoices Awaiting Confirmation */}
          <div className="rounded-md border border-hairline bg-canvas-elevated overflow-hidden shadow-whisper">
            <div className="px-4 py-3 border-b border-hairline bg-amber-50/30 flex items-center justify-between">
              <span className="text-xs font-medium text-amber-900 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                Draft Invoices Pending Review ({attentionRequired.draftInvoices.length})
              </span>
              <Link
                href="/staff/invoices?status=draft"
                className="text-[11px] text-amber-800 hover:underline"
              >
                View all
              </Link>
            </div>
            {attentionRequired.draftInvoices.length === 0 ? (
              <div className="p-4 text-center text-xs text-mute">
                No draft invoices awaiting review.
              </div>
            ) : (
              <div className="divide-y divide-hairline">
                {attentionRequired.draftInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 flex items-center justify-between hover:bg-canvas transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/staff/invoices/${inv.id}`}
                          className="font-mono text-xs font-semibold text-ink hover:underline"
                        >
                          {inv.invoice_number}
                        </Link>
                        <span className="text-xs text-body font-medium">
                          {inv.customer?.company_name || inv.customer?.full_name}
                        </span>
                      </div>
                      <div className="text-[11px] text-mute font-mono mt-0.5">
                        Issued {inv.issue_date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-semibold text-ink">
                        ${inv.total_amount.toFixed(2)}
                      </div>
                      <Link
                        href={`/staff/invoices/${inv.id}`}
                        className="text-[10px] text-ink hover:underline font-medium block mt-0.5"
                      >
                        Review & Confirm →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Operational Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-ink flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Recent Activity</span>
            </h2>
            <span className="font-mono text-[10px] uppercase text-mute">
              Real-Time Feed
            </span>
          </div>

          {/* Activity Feed Container */}
          <div className="rounded-md border border-hairline bg-canvas-elevated p-4 shadow-whisper space-y-4">
            {/* Recent Payments */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                  Recent Payments Recorded
                </span>
                <Link
                  href="/staff/payments"
                  className="text-[11px] text-body hover:text-ink font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-1.5">
                {recentActivity.payments.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-sm bg-canvas border border-hairline text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <div>
                        <span className="font-medium text-ink">
                          {p.customer?.company_name || p.customer?.full_name}
                        </span>
                        <span className="font-mono text-[10px] text-mute block">
                          Ref: {p.payment_reference} · {p.payment_method.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-emerald-600">
                      +${p.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Subscriptions */}
            <div className="pt-3 border-t border-hairline">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                  Active Subscriptions Status
                </span>
                <Link
                  href="/staff/subscriptions"
                  className="text-[11px] text-body hover:text-ink font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-1.5">
                {recentActivity.subscriptions.slice(0, 3).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2 rounded-sm bg-canvas border border-hairline text-xs"
                  >
                    <div>
                      <Link
                        href={`/staff/subscriptions/${sub.id}`}
                        className="font-medium text-ink hover:underline block"
                      >
                        {sub.subscription_number} · {sub.customer?.full_name}
                      </Link>
                      <span className="font-mono text-[10px] text-mute">
                        Plan: {sub.plan?.name} ({sub.billing_frequency})
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-canvas-elevated border border-hairline text-ink font-medium">
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quotations */}
            <div className="pt-3 border-t border-hairline">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                  Recent Quotations Prepared
                </span>
                <Link
                  href="/staff/quotations"
                  className="text-[11px] text-body hover:text-ink font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-1.5">
                {recentActivity.quotations.slice(0, 3).map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-2 rounded-sm bg-canvas border border-hairline text-xs"
                  >
                    <div>
                      <Link
                        href={`/staff/quotations/${q.id}`}
                        className="font-medium text-ink hover:underline block"
                      >
                        {q.quote_number} · {q.customer?.full_name}
                      </Link>
                      <span className="font-mono text-[10px] text-mute">
                        Valid until {q.valid_until}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-ink">
                      ${q.total_amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

