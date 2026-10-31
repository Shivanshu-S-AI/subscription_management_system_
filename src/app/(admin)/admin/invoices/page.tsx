import Link from "next/link";
import { FileText, ArrowUpRight, AlertTriangle, Filter } from "lucide-react";
import { getInvoices } from "@/lib/data/store";
import { formatCurrency } from "@/lib/utils";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; filter?: string; customerId?: string }>;
}) {
  const { status, filter, customerId } = await searchParams;
  const isOverdueFilter = filter === "overdue";
  const invoices = getInvoices({
    status,
    customer_id: customerId,
    overdue_only: isOverdueFilter,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-5">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-mute">
            Finance & Invoicing
          </span>
          <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
            Invoice Management
          </h1>
          <p className="text-xs text-body mt-1">
            Track receivables, issue states, outstanding balances, and payment reconciliations.
          </p>
        </div>

        <Link
          href="/admin/billing"
          className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-medium text-white shadow-whisper hover:bg-black transition-colors"
        >
          <span>Run Recurring Billing</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/admin/invoices"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !status && !filter
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All Invoices
        </Link>
        <Link
          href="/admin/invoices?filter=overdue"
          className={`px-3 py-1 rounded-sm transition-colors flex items-center gap-1.5 ${
            isOverdueFilter
              ? "bg-error text-white font-medium"
              : "text-error hover:bg-error/10"
          }`}
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Overdue Only</span>
        </Link>
        <Link
          href="/admin/invoices?status=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "confirmed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed (Unpaid)
        </Link>
        <Link
          href="/admin/invoices?status=paid"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "paid"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paid in Full
        </Link>
        <Link
          href="/admin/invoices?status=draft"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "draft"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Drafts
        </Link>
        <Link
          href="/admin/invoices?status=cancelled"
          className={`px-3 py-1 rounded-sm transition-colors ${
            status === "cancelled"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Cancelled
        </Link>
      </div>

      {/* Invoices Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Invoice #</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Issue Date</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Amount Due</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-semibold text-ink">
                    <Link href={`/admin/invoices/${inv.id}`} className="hover:text-link">
                      {inv.invoice_number}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/customers/${inv.customer_id}`}
                      className="font-medium text-ink hover:text-link block"
                    >
                      {inv.customer?.full_name}
                    </Link>
                    <span className="text-[11px] text-mute">
                      {inv.customer?.company_name}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-mute">{inv.issue_date}</td>
                  <td className="px-5 py-4 font-mono">
                    <span
                      className={
                        inv.amount_due > 0 &&
                        inv.due_date < new Date().toISOString().split("T")[0]
                          ? "text-error font-semibold"
                          : "text-mute"
                      }
                    >
                      {inv.due_date}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {formatCurrency(inv.total_amount)}
                  </td>
                  <td className="px-5 py-4 font-mono">
                    {inv.amount_due > 0 ? (
                      <span className="font-semibold text-error">
                        {formatCurrency(inv.amount_due)}
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-medium">$0.00</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-xs px-2 py-0.5 font-mono text-[10px] uppercase font-medium ${
                        inv.status === "paid"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : inv.status === "confirmed"
                          ? "bg-blue-500/10 text-blue-600"
                          : inv.status === "cancelled"
                          ? "bg-error/10 text-error"
                          : "bg-canvas text-mute border border-hairline"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/invoices/${inv.id}`}
                      className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                    >
                      <span>Review</span>
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

