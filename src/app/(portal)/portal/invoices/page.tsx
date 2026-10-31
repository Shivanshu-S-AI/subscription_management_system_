import Link from "next/link";
import { Receipt, ArrowUpRight, AlertTriangle } from "lucide-react";
import { getCurrentUser } from "@/modules/auth/service";
import { getCustomerForUser, getCustomerInvoices } from "@/lib/data/store";

export const dynamic = "force-dynamic";

export default async function CustomerInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
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
  const invoices = getCustomerInvoices(customer.id, filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-hairline pb-5">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Billing & Statements
        </span>
        <h1 className="text-2xl font-semibold tracking-[-0.4px] text-ink mt-0.5">
          My Invoices
        </h1>
        <p className="text-xs text-body mt-1">
          Access your recurring software statements, track payment statuses, and review outstanding balances.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-2 text-xs">
        <Link
          href="/portal/invoices"
          className={`px-3 py-1 rounded-sm transition-colors ${
            !filter
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          All Invoices ({invoices.length})
        </Link>
        <Link
          href="/portal/invoices?filter=outstanding"
          className={`px-3 py-1 rounded-sm transition-colors ${
            filter === "outstanding"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Outstanding
        </Link>
        <Link
          href="/portal/invoices?filter=overdue"
          className={`px-3 py-1 rounded-sm transition-colors flex items-center gap-1.5 ${
            filter === "overdue"
              ? "bg-red-600 text-white font-medium"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          <AlertTriangle className="h-3 w-3" />
          <span>Overdue</span>
        </Link>
        <Link
          href="/portal/invoices?filter=confirmed"
          className={`px-3 py-1 rounded-sm transition-colors ${
            filter === "confirmed"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Confirmed
        </Link>
        <Link
          href="/portal/invoices?filter=paid"
          className={`px-3 py-1 rounded-sm transition-colors ${
            filter === "paid"
              ? "bg-ink text-white font-medium"
              : "text-body hover:text-ink"
          }`}
        >
          Paid
        </Link>
      </div>

      {/* Invoices Table */}
      <div className="rounded-md border border-hairline bg-canvas-elevated shadow-whisper overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-[11px] font-mono uppercase text-mute">
              <tr>
                <th className="px-5 py-3 font-medium">Invoice #</th>
                <th className="px-5 py-3 font-medium">Issue Date</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Subscription</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Total Amount</th>
                <th className="px-5 py-3 font-medium text-right">Amount Paid</th>
                <th className="px-5 py-3 font-medium text-right">Balance Due</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-8 text-center text-mute">
                    No invoices found matching the selected filter.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => {
                  const isPaid = inv.status === "paid";
                  const isConfirmed = inv.status === "confirmed";
                  const isCancelled = inv.status === "cancelled";

                  return (
                    <tr key={inv.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-semibold text-ink">
                        <Link
                          href={`/portal/invoices/${inv.id}`}
                          className="hover:underline"
                        >
                          {inv.invoice_number}
                        </Link>
                      </td>
                      <td className="px-5 py-4 font-mono text-mute">{inv.issue_date}</td>
                      <td className="px-5 py-4 font-mono text-mute">{inv.due_date}</td>
                      <td className="px-5 py-4 font-mono text-body">
                        {inv.subscription_id ? (
                          <Link
                            href={`/portal/subscriptions/${inv.subscription_id}`}
                            className="text-ink hover:underline"
                          >
                            {inv.subscription?.subscription_number || "View Sub"}
                          </Link>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : isConfirmed
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : isCancelled
                              ? "bg-zinc-100 text-zinc-500 border-zinc-200 line-through"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-ink">
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
                          href={`/portal/invoices/${inv.id}`}
                          className="inline-flex items-center gap-1 rounded-sm border border-hairline bg-canvas-elevated px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas transition-colors"
                        >
                          <span>Details</span>
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

