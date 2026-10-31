import Link from "next/link";
import { Receipt, ArrowUpRight, AlertTriangle, CreditCard } from "lucide-react";
import { getInvoices } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function StaffInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; filter?: string; customer_id?: string }>;
}) {
  const { status, filter, customer_id } = await searchParams;
  const isOverdueFilter = filter === "overdue" || status === "overdue";
  const isOutstandingFilter = filter === "outstanding" || status === "outstanding";

  const allInvoices = getInvoices({
    status: isOverdueFilter || isOutstandingFilter ? undefined : status,
    customer_id,
    overdue_only: isOverdueFilter,
  });

  const invoices = isOutstandingFilter
    ? allInvoices.filter((i) => i.status === "confirmed" && Number(i.amount_due) > 0)
    : allInvoices;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Operations & Billing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Invoice Management
          </h1>
          <p className="text-xs text-body mt-1">
            Review draft invoices, confirm and send client billing, track balances, and chase collections.
          </p>
        </div>

        <Link
          href="/staff/payments/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <CreditCard className="h-3.5 w-3.5" />
          <span>Record Payment</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/staff/invoices"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status && !filter
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All ({invoices.length})
        </Link>
        <Link
          href="/staff/invoices?filter=overdue"
          className={`px-3 py-1 rounded-sm transition-colors flex items-center gap-1.5 ${
            isOverdueFilter
              ? "bg-red-600 text-white font-medium"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Overdue</span>
        </Link>
        <Link
          href="/staff/invoices?filter=outstanding"
          className={`px-3 py-1 rounded-sm transition-colors ${
            isOutstandingFilter
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Outstanding
        </Link>
        <Link
          href="/staff/invoices?status=draft"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "draft"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Draft (Pending)
        </Link>
        <Link
          href="/staff/invoices?status=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "confirmed" && !isOutstandingFilter
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed
        </Link>
        <Link
          href="/staff/invoices?status=paid"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "paid"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paid
        </Link>
        <Link
          href="/staff/invoices?status=cancelled"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "cancelled"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Cancelled
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Invoice #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Issue Date</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
                <th className="px-5 py-3 font-medium text-right">Paid</th>
                <th className="px-5 py-3 font-medium text-right">Balance Due</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-8 text-center text-mute">
                    No invoices match the selected filter.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => {
                  const isPaid = inv.status === "paid";
                  const isCancelled = inv.status === "cancelled";
                  const isDraft = inv.status === "draft";
                  const isConfirmed = inv.status === "confirmed";

                  return (
                    <tr key={inv.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-medium text-ink">
                        <Link
                          href={`/staff/invoices/${inv.id}`}
                          className="hover:underline font-semibold"
                        >
                          {inv.invoice_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-ink">
                          {inv.customer?.company_name || inv.customer?.full_name}
                        </div>
                        <div className="font-mono text-[11px] text-mute">{inv.customer?.email}</div>
                      </td>
                      <td className="px-5 py-4 font-mono text-mute">{inv.issue_date}</td>
                      <td className="px-5 py-4 font-mono text-mute">{inv.due_date}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isDraft
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : isConfirmed
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : isCancelled
                              ? "bg-zinc-100 text-zinc-500 border-zinc-200 line-through"
                              : "bg-zinc-100 text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-medium text-ink">
                        ${inv.total_amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-emerald-600">
                        ${inv.amount_paid.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold">
                        <span className={inv.amount_due > 0 ? "text-red-600" : "text-mute"}>
                          ${inv.amount_due.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/staff/invoices/${inv.id}`}
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

